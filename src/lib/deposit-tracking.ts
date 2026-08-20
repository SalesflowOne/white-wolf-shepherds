import { supabase, T } from "@/integrations/supabase/client";
import { trackConversion } from "@/lib/conversions";
import { readFunnelState } from "@/lib/wws-funnel";

type DepositConfirmation = {
  leadId: string;
  transactionId: string;
};

/**
 * Confirms a deposit via the database (post-Stripe redirect) and fires
 * `deposit_paid` once per payment session. Never fires on click — only after
 * the lead's deposit_status is verified as paid.
 */
export async function confirmAndTrackDeposit(
  sessionIdFromUrl?: string | null,
): Promise<DepositConfirmation | null> {
  const funnel = readFunnelState();
  if (!funnel?.leadId) return null;

  const { data: lead } = await supabase
    .from(T.leads)
    .select("id, deposit_status")
    .eq("id", funnel.leadId)
    .maybeSingle();

  if (!lead || lead.deposit_status !== "paid") return null;

  let transactionId = sessionIdFromUrl?.trim() || "";

  if (!transactionId) {
    const { data: reservation } = await supabase
      .from(T.reservations)
      .select("stripe_session_id, stripe_payment_intent_id")
      .eq("lead_id", funnel.leadId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    transactionId =
      reservation?.stripe_session_id ?? reservation?.stripe_payment_intent_id ?? funnel.leadId;
  }

  trackConversion("deposit_paid", transactionId);
  return { leadId: funnel.leadId, transactionId };
}
