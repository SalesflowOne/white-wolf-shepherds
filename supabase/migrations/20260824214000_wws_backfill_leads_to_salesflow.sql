-- One-time backfill: import legacy puppy_waitlist rows and sync wws_leads → Salesflow CRM.
-- Safe to re-run: upsert_lead dedupes by email/phone; waitlist import is idempotent.

INSERT INTO public.wws_leads (
  full_name, email, phone, preferred_sex, additional_notes, source, stage, created_at, updated_at
)
SELECT
  trim(coalesce(pw.first_name, '') || ' ' || coalesce(pw.last_name, '')),
  lower(trim(pw.email)),
  nullif(trim(pw.phone), ''),
  pw.preferred_sex,
  pw.message,
  'puppy_waitlist_backfill',
  'waitlist',
  pw.created_at,
  now()
FROM public.puppy_waitlist pw
WHERE pw.email IS NOT NULL
  AND lower(trim(pw.email)) NOT IN (
    SELECT lower(email) FROM public.wws_leads WHERE email IS NOT NULL
  )
  AND lower(trim(pw.email)) NOT LIKE '%@example.com%'
  AND lower(trim(pw.email)) <> 'direct-insert@example.com';

DO $$
DECLARE
  r record;
  v_sf_id uuid;
  v_source text;
BEGIN
  FOR r IN
    SELECT *
    FROM public.wws_leads
    WHERE email IS NOT NULL
      AND lower(email) NOT LIKE '%@example.com%'
      AND lower(email) NOT LIKE '%salesflow-test%'
      AND lower(email) <> 'direct-insert@example.com'
    ORDER BY created_at ASC
  LOOP
    v_source := coalesce(r.source, 'white_wolf_shepherds_backfill');

    SELECT public.upsert_lead(
      coalesce(nullif(trim(r.full_name), ''), r.email),
      lower(trim(r.email)),
      coalesce(nullif(trim(r.phone), ''), ''),
      'White Wolf Shepherds'
    ) INTO v_sf_id;

    UPDATE public.leads
    SET
      source = v_source,
      utm_campaign = coalesce(r.utm_campaign, utm_campaign)
    WHERE id = v_sf_id;

    UPDATE public.wws_leads
    SET
      salesflow_lead_id = v_sf_id,
      salesflow_synced_at = now(),
      updated_at = now()
    WHERE id = r.id;
  END LOOP;
END $$;
