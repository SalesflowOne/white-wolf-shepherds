-- Fix inflated student payment totals caused by cross-user payment→order links.
--
-- Root cause: sync_order_payments_from_logs summed ALL succeeded payments on an
-- order, even when payment.user_id belonged to a different student than
-- order.user_id. Example: Zoe Bonnier showed $1,150 total ($900 hers + $250
-- from Nicolas Popeson incorrectly linked to her order).

-- 1. Only count payments that belong to the order owner (or are unassigned).
CREATE OR REPLACE FUNCTION public.sync_order_payments_from_logs(p_order_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_order record;
  v_paid numeric;
  v_status text;
BEGIN
  IF p_order_id IS NULL THEN
    RETURN jsonb_build_object('skipped', true, 'reason', 'null order_id');
  END IF;

  SELECT id, user_id, program_id, total_amount INTO v_order
  FROM orders WHERE id = p_order_id;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('skipped', true, 'reason', 'order not found');
  END IF;

  SELECT coalesce(sum(amount), 0) INTO v_paid
  FROM payment_logs
  WHERE order_id = p_order_id
    AND lower(status) IN ('succeeded', 'completed', 'approved')
    AND (user_id IS NULL OR user_id = v_order.user_id);

  v_status := CASE
    WHEN v_paid <= 0 THEN 'pending'
    WHEN v_paid >= coalesce(v_order.total_amount, 0) THEN 'paid'
    ELSE 'partial'
  END;

  UPDATE orders
  SET deposit_paid = v_paid,
      payment_status = v_status,
      updated_at = now()
  WHERE id = p_order_id;

  UPDATE enrollments
  SET amount_paid = v_paid,
      payment_status = v_status,
      updated_at = now()
  WHERE user_id = v_order.user_id
    AND program_id = v_order.program_id
    AND (enrollment_kind IS NULL OR enrollment_kind = 'primary')
    AND status IN ('pending', 'active', 'reserved', 'completed');

  RETURN jsonb_build_object(
    'order_id', p_order_id,
    'deposit_paid', v_paid,
    'payment_status', v_status
  );
END;
$function$;

-- 2. Block manual links when payer and order owner are different students.
CREATE OR REPLACE FUNCTION public.link_payment_to_order(p_payment_log_id uuid, p_order_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_user_id uuid;
  v_payment_user_id uuid;
  v_raw jsonb;
  v_square_customer_id text;
  v_existing jsonb;
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'admin role required';
  END IF;

  SELECT user_id INTO v_user_id FROM public.orders WHERE id = p_order_id;
  SELECT user_id INTO v_payment_user_id FROM public.payment_logs WHERE id = p_payment_log_id;

  IF v_payment_user_id IS NOT NULL
     AND v_user_id IS NOT NULL
     AND v_payment_user_id <> v_user_id THEN
    RAISE EXCEPTION
      'Cannot link payment to order: payment belongs to a different student. Unlink or reassign the payment first.';
  END IF;

  UPDATE public.payment_logs
  SET order_id = p_order_id,
      user_id = COALESCE(user_id, v_user_id),
      match_status = 'manually_matched',
      match_confidence = 'exact',
      matched_at = now(),
      matched_by = auth.uid(),
      student_match_status = CASE WHEN COALESCE(user_id, v_user_id) IS NULL THEN student_match_status ELSE 'manual_matched' END,
      student_match_confidence = CASE WHEN COALESCE(user_id, v_user_id) IS NULL THEN student_match_confidence ELSE 'exact' END,
      student_matched_at = CASE WHEN COALESCE(user_id, v_user_id) IS NULL THEN student_matched_at ELSE COALESCE(student_matched_at, now()) END
  WHERE id = p_payment_log_id
  RETURNING raw_response_json, square_customer_id INTO v_raw, v_square_customer_id;

  PERFORM public.sync_order_payments_from_logs(p_order_id);

  v_square_customer_id := COALESCE(
    v_square_customer_id,
    public.payment_log_square_customer_id(v_raw)
  );

  IF v_user_id IS NOT NULL AND v_square_customer_id IS NOT NULL THEN
    SELECT external_contact_ids INTO v_existing
    FROM public.profiles WHERE user_id = v_user_id;

    IF v_existing IS NULL OR (v_existing->>'square') IS NULL OR v_existing->>'square' = '' THEN
      UPDATE public.profiles
      SET external_contact_ids = COALESCE(external_contact_ids, '{}'::jsonb)
                                 || jsonb_build_object('square', v_square_customer_id)
      WHERE user_id = v_user_id;
    END IF;
  END IF;
END;
$function$;

-- 3. Prevent future cross-user payment→order assignments at the DB layer.
CREATE OR REPLACE FUNCTION public.trg_validate_payment_order_user_match()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_order_user_id uuid;
BEGIN
  IF NEW.order_id IS NULL THEN
    RETURN NEW;
  END IF;

  SELECT user_id INTO v_order_user_id
  FROM public.orders
  WHERE id = NEW.order_id;

  IF NEW.user_id IS NOT NULL
     AND v_order_user_id IS NOT NULL
     AND NEW.user_id <> v_order_user_id THEN
    RAISE EXCEPTION
      'payment user_id does not match order user_id — cannot assign this payment to that order';
  END IF;

  RETURN NEW;
END;
$function$;

DROP TRIGGER IF EXISTS trg_validate_payment_order_user_match ON public.payment_logs;
CREATE TRIGGER trg_validate_payment_order_user_match
  BEFORE INSERT OR UPDATE OF order_id, user_id
  ON public.payment_logs
  FOR EACH ROW
  EXECUTE FUNCTION public.trg_validate_payment_order_user_match();

-- 4. Repair existing bad links: unlink cross-user payments, then recalc orders.
DO $repair$
DECLARE
  v_order_id uuid;
BEGIN
  CREATE TEMP TABLE _cross_user_payment_orders ON COMMIT DROP AS
  SELECT DISTINCT pl.order_id
  FROM public.payment_logs pl
  JOIN public.orders o ON o.id = pl.order_id
  WHERE pl.user_id IS NOT NULL
    AND o.user_id IS NOT NULL
    AND pl.user_id <> o.user_id;

  UPDATE public.payment_logs pl
  SET order_id = NULL,
      match_status = 'unmatched',
      match_confidence = NULL,
      matched_at = NULL,
      matched_by = NULL
  FROM public.orders o
  WHERE pl.order_id = o.id
    AND pl.user_id IS NOT NULL
    AND o.user_id IS NOT NULL
    AND pl.user_id <> o.user_id;

  FOR v_order_id IN SELECT order_id FROM _cross_user_payment_orders
  LOOP
    PERFORM public.sync_order_payments_from_logs(v_order_id);
  END LOOP;
END;
$repair$;
