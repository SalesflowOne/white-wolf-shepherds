# White Wolf Shepherds — Lead Funnel Strategy

This document preserves the strategy and decisions behind the lead funnel, the
current implementation status, and the remaining work to take it fully live.

## The funnel

A 5-step flow designed to build human trust _before_ the energy-intensive video
call, while keeping the front door light for volume:

1. **Contact Info** — captured first; creates the lead immediately so drop-offs stay reachable.
2. **Puppy Match Call** — booked via a GoHighLevel calendar embed. (Public name: "Puppy Match Call"; internally a qualification call.)
3. **Full Application** — the remaining qualification questions, with scoring.
4. **$500 Refundable Reservation Deposit** — a generic Stripe link that holds a spot in line. **Not tied to any single puppy.** Opens **immediately** after the application (no admin approval gate).
5. **Private Puppy Video Call** — booked via a second GoHighLevel calendar embed, after the deposit. This is the emotional close where the family meets the puppies.

## CTAs

Two calls-to-action, one funnel:

- **Primary button:** "Meet the Puppies" — emotional, high-click.
- **Secondary link (quieter):** "Start Your Puppy Match" — for intentional buyers who already understand there's a process.

Microcopy under the hero CTAs:

> Start with your contact info and a short Puppy Match Call, then complete your
> application, place a $500 fully-refundable deposit to hold your spot, and meet
> the puppies on a private video call.

## Key decisions & rationale

- **Match Call sits right after contact capture** (before the application), so a human
  builds trust before asking for a serious application. The application landing _after_
  the call keeps the front door light and lifts appointment volume.
- **Deposit is refundable and spot-holding, not puppy-specific.** Because nobody is
  committing to a specific puppy sight-unseen, it's fair to collect the deposit _before_
  the video call — which protects the breeder's most expensive step while keeping the
  puppy-video as the closing moment.
- **No admin approval gate.** Anyone who completes the application can place the refundable
  deposit immediately (the live Match Call already served as the human filter). Maximizes
  momentum.

## Implemented (in this repo)

- `/apply` is now a **4-stage on-site wizard**: Contact → Match Call (GHL) → Application → Deposit (`src/routes/apply.tsx`).
- `/reserved` page hosts the **video-call booking** after the Stripe deposit returns (`src/routes/reserved.tsx`).
- Reusable **`GhlCalendarEmbed`** component for both calendar steps (`src/components/GhlCalendarEmbed.tsx`).
- Hero + mobile CTAs updated (`src/components/HeroSection.tsx`, `src/components/MobileStickyBar.tsx`).
- Granular **server actions** that never downgrade a returning owner's role
  (`startLead`, `submitApplicationDetails`, `markMatchCallBooked`, `markVideoCallBooked` in `src/lib/wws-actions.functions.ts`).
- **Stripe webhook** attributes the generic deposit via `client_reference_id`
  (`supabase/functions/stripe-webhook/index.ts`).
- **Migration** adding `match_call_booked_at` / `video_call_booked_at` to `wws_leads`
  (`supabase/migrations/20260620000000_funnel_tracking.sql`, already applied to the DB).

The code degrades gracefully until the external services are configured: calendar steps show a
placeholder + "continue" button when the GHL URL is unset, and the deposit button is inert when
the Stripe link is unset.

## Remaining work to go live (next session)

### New env vars (browser-readable, `VITE_PUBLIC_*`)

- `VITE_PUBLIC_GHL_MATCH_CALL_URL` — GoHighLevel calendar embed URL for the Puppy Match Call.
- `VITE_PUBLIC_GHL_VIDEO_CALL_URL` — GoHighLevel calendar embed URL for the private puppy video call.
- `VITE_PUBLIC_STRIPE_RESERVATION_LINK` — generic $500 refundable Stripe Payment Link.

### Existing secrets that must be set in the deploy environment (Vercel/Cloudflare)

- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (required for the server actions to write leads),
  `VITE_PUBLIC_SUPABASE_URL`, `VITE_PUBLIC_SUPABASE_ANON_KEY`.
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_WEBHOOK_ENDPOINT_ID` (Stripe event destination `ed_61Utrc0MIRUP2HFoG26UcXFXDQSQ90Q262yfHCUp6Mn2` → Supabase `stripe-webhook`). Optional: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`.

### Tasks

1. Create the two GoHighLevel calendars; copy their embed URLs into the GHL env vars.
2. Create a generic **$500 refundable** Stripe Payment Link; set its **success URL to `https://<site>/reserved`** (Payment Links forward `client_reference_id` automatically, which the code appends).
3. Set all env vars in the deploy environment and local `.env` / `.dev.vars`.
4. Redeploy the edge function (the `client_reference_id` change): `supabase functions deploy stripe-webhook --no-verify-jwt`.
5. End-to-end test in **Stripe test mode**: walk Contact → Match Call → Application → Deposit → `/reserved` video call; confirm the `wws_leads` row advances (`new_inquiry` → `match_call_booked` → `application_complete` → `deposit_paid`) and `match_call_booked_at` / `video_call_booked_at` populate, and that a `wws_reservations` row is created with `puppy_id` null.
6. _Optional:_ surface `match_call_booked_at` / `video_call_booked_at` and puppy-less reservations in the admin dashboard (`src/routes/portal/admin.tsx`).

## Copy-paste prompt for the next session

> Finish wiring up the White Wolf Shepherds lead funnel that's already built on `main`
> (see `FUNNEL_STRATEGY.md`). The funnel code, `/reserved` page, `GhlCalendarEmbed`,
> server actions, and DB migration are done — I just need the external services connected
> and verified end-to-end.
>
> 1. Set these browser env vars (in Vercel + local `.env`): `VITE_PUBLIC_GHL_MATCH_CALL_URL`
>    and `VITE_PUBLIC_GHL_VIDEO_CALL_URL` (my two GoHighLevel calendar embed URLs), and
>    `VITE_PUBLIC_STRIPE_RESERVATION_LINK` (my generic $500 refundable Stripe Payment Link).
>    I'll paste the actual values when you ask.
> 2. Confirm the server secrets are present in the deploy env: `SUPABASE_URL`,
>    `SUPABASE_SERVICE_ROLE_KEY`, `VITE_PUBLIC_SUPABASE_URL`, `VITE_PUBLIC_SUPABASE_ANON_KEY`,
>    `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` (optional `TELEGRAM_BOT_TOKEN`/`TELEGRAM_CHAT_ID`).
> 3. Make sure my Stripe reservation Payment Link's success URL points to `https://<site>/reserved`.
> 4. Redeploy the `stripe-webhook` edge function so the `client_reference_id` attribution change ships.
> 5. Run the full funnel in Stripe test mode and verify the `wws_leads` stage progression and the
>    `wws_reservations` row (with `puppy_id` null), then report what you see.
> 6. Optionally, add the new funnel timestamps and puppy-less reservations to the admin dashboard.
