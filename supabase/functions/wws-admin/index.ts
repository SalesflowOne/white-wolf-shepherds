// Admin actions: approve placement (lock deposit) or deny + Stripe refund.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient, type SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@12";
import { z } from "https://esm.sh/zod@3.23.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function resolveVaultSecret(supabase: SupabaseClient, name: string): Promise<string | null> {
  const { data } = await supabase
    .schema("vault")
    .from("decrypted_secrets")
    .select("decrypted_secret")
    .eq("name", name)
    .maybeSingle();
  return data?.decrypted_secret ?? null;
}

async function resolveStripeKey(supabase: SupabaseClient): Promise<string> {
  return (
    Deno.env.get("STRIPE_SECRET_KEY") ??
    (await resolveVaultSecret(supabase, "STRIPE_SECRET_KEY")) ??
    (() => {
      throw new Error("STRIPE_SECRET_KEY is not configured");
    })()
  );
}

function adminClient(): SupabaseClient {
  return createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

async function requireAdmin(req: Request, admin: SupabaseClient): Promise<string> {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) throw new Error("Unauthorized");
  const token = authHeader.slice(7);
  const {
    data: { user },
    error,
  } = await admin.auth.getUser(token);
  if (error || !user) throw new Error("Unauthorized");

  const { data: profile } = await admin
    .from("wws_profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();
  if (profile?.role !== "admin") throw new Error("Forbidden");
  return user.id;
}

const leadIdSchema = z.object({ leadId: z.string().uuid() });
const denySchema = leadIdSchema.extend({ reason: z.string().optional() });

async function approvePlacement(admin: SupabaseClient, adminId: string, leadId: string) {
  const now = new Date().toISOString();

  const { data: lead } = await admin
    .from("wws_leads")
    .select("id, email")
    .eq("id", leadId)
    .single();
  if (!lead) throw new Error("Lead not found");

  await admin
    .from("wws_leads")
    .update({
      stage: "placement_approved",
      deposit_status: "locked",
      reviewed_at: now,
      reviewed_by: adminId,
      updated_at: now,
    })
    .eq("id", leadId);

  await admin.from("wws_reservations").update({ deposit_status: "locked" }).eq("lead_id", leadId);

  const { data: profile } = await admin
    .from("wws_profiles")
    .select("id")
    .eq("lead_id", leadId)
    .maybeSingle();
  if (profile?.id) {
    await admin
      .from("wws_profiles")
      .update({ role: "owner", updated_at: now })
      .eq("id", profile.id);
  }

  return { ok: true, stage: "placement_approved" };
}

async function denyAndRefund(
  admin: SupabaseClient,
  adminId: string,
  leadId: string,
  reason?: string,
) {
  const now = new Date().toISOString();
  const stripeKey = await resolveStripeKey(admin);
  const stripe = new Stripe(stripeKey, {
    apiVersion: "2023-10-16",
    httpClient: Stripe.createFetchHttpClient(),
  });

  const { data: reservation } = await admin
    .from("wws_reservations")
    .select("id, stripe_payment_intent_id, deposit_status")
    .eq("lead_id", leadId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  let refundId: string | null = null;
  if (reservation?.stripe_payment_intent_id && reservation.deposit_status !== "refunded") {
    const refund = await stripe.refunds.create({
      payment_intent: reservation.stripe_payment_intent_id,
    });
    refundId = refund.id;
    await admin
      .from("wws_reservations")
      .update({
        deposit_status: "refunded",
        refunded_at: now,
        stripe_refund_id: refund.id,
      })
      .eq("id", reservation.id);
  }

  await admin
    .from("wws_leads")
    .update({
      stage: "denied",
      deposit_status: "refunded",
      denial_reason: reason ?? null,
      reviewed_at: now,
      reviewed_by: adminId,
      updated_at: now,
    })
    .eq("id", leadId);

  return { ok: true, stage: "denied", refundId };
}

const bodySchema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("approvePlacement"), data: leadIdSchema }),
  z.object({ action: z.literal("denyAndRefund"), data: denySchema }),
]);

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const admin = adminClient();
    const adminId = await requireAdmin(req, admin);
    const json = await req.json();
    const parsed = bodySchema.parse(json);

    let result: unknown;
    if (parsed.action === "approvePlacement") {
      result = await approvePlacement(admin, adminId, parsed.data.leadId);
    } else {
      result = await denyAndRefund(admin, adminId, parsed.data.leadId, parsed.data.reason);
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const status = message === "Unauthorized" || message === "Forbidden" ? 403 : 400;
    return new Response(JSON.stringify({ error: message }), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
