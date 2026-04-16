import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@12'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
})

serve(async (req) => {
  const signature = req.headers.get('stripe-signature')!
  const body = await req.text()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
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

  // Update puppy → reserved
  await supabase
    .from('puppies')
    .update({
      status: 'reserved',
      deposit_paid_at: new Date().toISOString(),
      reserved_by_lead_id: lead_id ?? null,
    })
    .eq('id', puppy_id)

  // Update lead → deposit_paid
  if (lead_id) {
    await supabase
      .from('leads')
      .update({ stage: 'deposit_paid', updated_at: new Date().toISOString() })
      .eq('id', lead_id)
  }

  // Insert reservation record
  await supabase.from('reservations').insert({
    puppy_id,
    lead_id: lead_id ?? null,
    amount: Math.round((session.amount_total ?? 0) / 100),
    stripe_session_id: session.id,
    stripe_payment_intent_id: session.payment_intent as string,
    tier: tier ?? null,
    pick_order: pick_order ? parseInt(pick_order) : null,
  })

  // Fetch names for Telegram message
  const [{ data: puppy }, { data: lead }, { count: remaining }] = await Promise.all([
    supabase.from('puppies').select('name').eq('id', puppy_id).single(),
    lead_id
      ? supabase.from('leads').select('full_name').eq('id', lead_id).single()
      : Promise.resolve({ data: null }),
    supabase
      .from('puppies')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'available'),
  ])

  // Telegram notification
  const botToken = Deno.env.get('TELEGRAM_BOT_TOKEN')
  const chatId = Deno.env.get('TELEGRAM_CHAT_ID')

  if (botToken && chatId) {
    const amount = Math.round((session.amount_total ?? 0) / 100)
    const message = [
      '🐾 <b>New Reservation Paid</b>',
      '',
      `👤 <b>Family:</b> ${lead?.full_name ?? 'Unknown'}`,
      `🐕 <b>Puppy:</b> ${puppy?.name ?? puppy_id}`,
      `💰 <b>Amount:</b> $${amount}`,
      `📦 <b>Tier:</b> ${tier ?? 'N/A'}`,
      `🏆 <b>Pick:</b> #${pick_order ?? 'N/A'}`,
      '',
      `📊 <b>${remaining ?? '?'} of 9 puppies remaining</b>`,
    ].join('\n')

    await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML',
        }),
      }
    )
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { 'Content-Type': 'application/json' },
  })
})
