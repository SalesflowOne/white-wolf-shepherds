// White Wolf Shepherds — Stripe reservation webhook
// Triggered by `checkout.session.completed` from Stripe.
// On a successful reservation payment:
//   1. Mark the puppy as reserved (status, deposit_paid_at, reserved_by_lead_id)
//   2. Advance the lead to stage='deposit_paid'
//   3. Flip the linked profile to role='owner'
//   4. Insert a reservations row
//   5. Telegram-notify the breeder

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@12'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
})

serve(async (req) => {
  const sig = req.headers.get('stripe-signature')!
  const body = await req.text()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      Deno.env.get('STRIPE_WEBHOOK_SECRET')!
    )
  } catch (err) {
    return new Response(`Webhook error: ${err}`, { status: 400 })
  }

  if (event.type !== 'checkout.session.completed') {
    return new Response(JSON.stringify({ received: true }))
  }

  const session = event.data.object as Stripe.Checkout.Session
  const { puppy_id, lead_id, tier, pick_order } = session.metadata ?? {}

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  // 1. Puppy → reserved
  if (puppy_id) {
    await supabase
      .from('wws_puppies')
      .update({
        status: 'reserved',
        deposit_paid_at: new Date().toISOString(),
        reserved_by_lead_id: lead_id ?? null,
      })
      .eq('id', puppy_id)
  }

  // 2. Lead → deposit_paid
  if (lead_id) {
    await supabase
      .from('wws_leads')
      .update({ stage: 'deposit_paid', updated_at: new Date().toISOString() })
      .eq('id', lead_id)

    // 3. Profile → owner
    await supabase
      .from('wws_profiles')
      .update({ role: 'owner', updated_at: new Date().toISOString() })
      .eq('lead_id', lead_id)
  }

  // 4. Reservation record
  await supabase.from('wws_reservations').insert({
    puppy_id: puppy_id ?? null,
    lead_id: lead_id ?? null,
    amount: Math.round((session.amount_total ?? 0) / 100),
    stripe_session_id: session.id,
    stripe_payment_intent_id: session.payment_intent as string,
    tier: tier ?? null,
    pick_order: pick_order ? parseInt(pick_order) : null,
  })

  // Fetch names + remaining for Telegram message
  const [{ data: puppy }, { data: lead }, { count: remaining }] = await Promise.all([
    puppy_id
      ? supabase.from('wws_puppies').select('name').eq('id', puppy_id).single()
      : Promise.resolve({ data: null }),
    lead_id
      ? supabase.from('wws_leads').select('full_name').eq('id', lead_id).single()
      : Promise.resolve({ data: null }),
    supabase
      .from('wws_puppies')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'available'),
  ])

  // 5. Telegram
  const botToken = Deno.env.get('TELEGRAM_BOT_TOKEN')
  const chatId = Deno.env.get('TELEGRAM_CHAT_ID')

  if (botToken && chatId) {
    const amt = Math.round((session.amount_total ?? 0) / 100)
    const text = [
      '🐾 <b>New Reservation</b>',
      `👤 ${lead?.full_name ?? 'Unknown'}`,
      `🐕 ${puppy?.name ?? puppy_id ?? 'Unknown puppy'}`,
      `💰 $${amt} | Tier: ${tier ?? 'N/A'}`,
      `🏆 Pick #${pick_order ?? 'N/A'}`,
      `📊 ${remaining ?? '?'} of 9 remaining`,
    ].join('\n')

    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
      }),
    })
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { 'Content-Type': 'application/json' },
  })
})
