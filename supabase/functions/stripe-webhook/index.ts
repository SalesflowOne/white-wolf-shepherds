// White Wolf Shepherds — Stripe reservation webhook
// Triggered by `checkout.session.completed` from Stripe.
// On a successful reservation payment:
//   1. Mark the puppy as reserved when puppy_id is present
//   2. Advance the lead to stage='under_review' (refundable until admin approves)
//   3. Set deposit_status='paid' — do NOT flip to owner until placement approved
//   4. Insert a reservations row
//   5. Telegram-notify the breeder

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@12";

async function resolveVaultSecret(
  supabase: ReturnType<typeof createClient>,
  name: string,
): Promise<string | null> {
  const { data, error } = await supabase
    .schema("vault")
    .from("decrypted_secrets")
    .select("decrypted_secret")
    .eq("name", name)
    .maybeSingle();

  if (error || !data?.decrypted_secret) return null;
  return data.decrypted_secret;
}

async function resolveStripeSecretKey(supabase: ReturnType<typeof createClient>): Promise<string> {
  const fromEnv = Deno.env.get("STRIPE_SECRET_KEY");
  if (fromEnv) return fromEnv;

  const fromVault = await resolveVaultSecret(supabase, "STRIPE_SECRET_KEY");
  if (fromVault) return fromVault;

  throw new Error("STRIPE_SECRET_KEY is not configured");
}

async function resolveWebhookSecret(supabase: ReturnType<typeof createClient>): Promise<string> {
  const fromEnv = Deno.env.get("STRIPE_WEBHOOK_SECRET");
  if (fromEnv) return fromEnv;

  const fromVault = await resolveVaultSecret(supabase, "STRIPE_WEBHOOK_SECRET");
  if (fromVault) return fromVault;

  throw new Error("STRIPE_WEBHOOK_SECRET is not configured");
}

serve(async (req) => {
  const sig = req.headers.get("stripe-signature")!;
  const body = await req.text();

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  let event: Stripe.Event;
  try {
    const stripeSecretKey = await resolveStripeSecretKey(supabase);
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
      httpClient: Stripe.createFetchHttpClient(),
    });
    const webhookSecret = await resolveWebhookSecret(supabase);
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    return new Response(`Webhook error: ${err}`, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return new Response(JSON.stringify({ received: true }));
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const meta = session.metadata ?? {};
  const puppy_id = meta.puppy_id;
  // Per-puppy approvals set lead_id in metadata; the generic refundable
  // reservation link (hosted Payment Link) forwards it as client_reference_id.
  const lead_id = meta.lead_id ?? session.client_reference_id ?? undefined;
  const tier = meta.tier;
  const pick_order = meta.pick_order;

  // 1. Puppy → reserved
  if (puppy_id) {
    await supabase
      .from("wws_puppies")
      .update({
        status: "reserved",
        deposit_paid_at: new Date().toISOString(),
        reserved_by_lead_id: lead_id ?? null,
      })
      .eq("id", puppy_id);
  }

  // 2. Lead → under_review (deposit paid, awaiting breeder approval)
  if (lead_id) {
    await supabase
      .from("wws_leads")
      .update({
        stage: "under_review",
        deposit_status: "paid",
        updated_at: new Date().toISOString(),
      })
      .eq("id", lead_id);
  }

  // 3. Reservation record (refundable until placement approved)
  await supabase.from("wws_reservations").insert({
    puppy_id: puppy_id ?? null,
    lead_id: lead_id ?? null,
    amount: Math.round((session.amount_total ?? 0) / 100),
    stripe_session_id: session.id,
    stripe_payment_intent_id: session.payment_intent as string,
    tier: tier ?? null,
    pick_order: pick_order ? parseInt(pick_order) : null,
    deposit_status: "paid",
  });

  // Fetch names + remaining for Telegram message
  const [{ data: puppy }, { data: lead }, { count: remaining }] = await Promise.all([
    puppy_id
      ? supabase.from("wws_puppies").select("name").eq("id", puppy_id).single()
      : Promise.resolve({ data: null }),
    lead_id
      ? supabase.from("wws_leads").select("full_name").eq("id", lead_id).single()
      : Promise.resolve({ data: null }),
    supabase
      .from("wws_puppies")
      .select("*", { count: "exact", head: true })
      .eq("status", "available"),
  ]);

  // 5. Telegram
  const botToken = Deno.env.get("TELEGRAM_BOT_TOKEN");
  const chatId = Deno.env.get("TELEGRAM_CHAT_ID");

  if (botToken && chatId) {
    const amt = Math.round((session.amount_total ?? 0) / 100);
    const text = [
      "🐾 <b>New Deposit — Under Review</b>",
      `👤 ${lead?.full_name ?? "Unknown"}`,
      `🐕 ${puppy?.name ?? puppy_id ?? "Unknown puppy"}`,
      `💰 $${amt} | Tier: ${tier ?? "N/A"}`,
      `🏆 Pick #${pick_order ?? "N/A"}`,
      `📊 ${remaining ?? "?"} of 9 remaining`,
    ].join("\n");

    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
      }),
    });
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { "Content-Type": "application/json" },
  });
});
