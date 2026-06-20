# White Wolf Shepherds

Premium White German Shepherd breeder site + applicant/owner/alumni portal.

**Stack:** TanStack Start (React 19, file-based router) · Vite 7 · Tailwind v4 · Supabase (Auth + Realtime + Storage) · Stripe · Resend · Telegram · Cloudflare Workers

---

## Quick start

```bash
npm install
cp .env.local.example .env.local   # fill in secrets
npm run dev
```

The dev server runs on port 3000 by default.

---

## Env vars

Copy `.env.local` and fill in values.

| Var                                                                           | Where used                                               | Required |
| ----------------------------------------------------------------------------- | -------------------------------------------------------- | -------- |
| `NEXT_PUBLIC_SUPABASE_URL` / `VITE_PUBLIC_SUPABASE_URL`                       | Browser                                                  | ✅       |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` / `VITE_PUBLIC_SUPABASE_ANON_KEY`             | Browser                                                  | ✅       |
| `SUPABASE_SERVICE_ROLE_KEY`                                                   | Server functions (`/apply` submit, admin operations)     | ✅       |
| `STRIPE_SECRET_KEY`                                                           | Edge function (Vault fallback)                           | ✅       |
| `STRIPE_WEBHOOK_SECRET`                                                       | Edge function (Vault fallback)                           | ✅       |
| `STRIPE_WEBHOOK_ENDPOINT_ID`                                                  | Docs / ops reference (Stripe event destination)          | optional |
| `NEXT_PUBLIC_STRIPE_RESERVATION_LINK` / `VITE_PUBLIC_STRIPE_RESERVATION_LINK` | `/approved/[token]` CTA                                  | ✅       |
| `NEXT_PUBLIC_STRIPE_BALANCE_LINK` / `VITE_PUBLIC_STRIPE_BALANCE_LINK`         | Portal Payments tab                                      | optional |
| `TELEGRAM_BOT_TOKEN`                                                          | Edge function (notify on reservation)                    | optional |
| `TELEGRAM_CHAT_ID`                                                            | Edge function                                            | optional |
| `RESEND_API_KEY`                                                              | Transactional email (future)                             | optional |
| `ADMIN_PASSWORD`                                                              | Legacy `/admin` gate (now superseded by role-based auth) | optional |
| `NEXT_PUBLIC_SITE_URL` / `VITE_PUBLIC_SITE_URL`                               | Magic-link redirect, referral links                      | ✅       |

Every client-readable value is mirrored with both `NEXT_PUBLIC_*` (for spec parity) and `VITE_PUBLIC_*` (what Vite actually reads). The client prefers `VITE_PUBLIC_*`.

---

## Database

All White Wolf Shepherds tables live in the **`public` schema prefixed with `wws_`** so they coexist safely with other apps that share this Supabase project.

| App table        | Physical table              |
| ---------------- | --------------------------- |
| `puppies`        | `public.wws_puppies`        |
| `leads`          | `public.wws_leads`          |
| `reservations`   | `public.wws_reservations`   |
| `profiles`       | `public.wws_profiles`       |
| `portal_updates` | `public.wws_portal_updates` |
| `messages`       | `public.wws_messages`       |
| `alumni_posts`   | `public.wws_alumni_posts`   |
| `dog_profiles`   | `public.wws_dog_profiles`   |
| `resources`      | `public.wws_resources`      |

A lookup constant `T` is exported from `src/integrations/supabase/client.ts` — always use `supabase.from(T.puppies)` rather than hard-coding the prefix.

### Applying the schema

Migrations live in `supabase/migrations/`. The canonical WWS schema is in **`20260417100000_wws_schema_complete.sql`** (idempotent — safe to re-run).

```bash
# Link once
supabase link --project-ref ebjzdcnphkfpxfldnatm

# Push migrations
supabase db push
```

The schema has already been applied to the active project (`ebjzdcnphkfpxfldnatm`) via the Supabase MCP during initial build.

### Enabling Realtime

Realtime is already enabled for `wws_puppies`, `wws_messages`, and `wws_portal_updates` via the migration. If you need to toggle manually: **Supabase Dashboard → Database → Replication → `supabase_realtime` publication**.

---

## Auth & roles

Magic-link only (no passwords). Role progression is automatic:

```
applicant  →  owner            →  alumni
(submitted)  (Reservation Fee    (pickup_date > 7 days ago)
              received via
              Stripe webhook)
```

Role is stored on `wws_profiles.role` (`admin` | `applicant` | `owner` | `alumni`).
Route guards live inside each `/portal/*` route.

### Creating the first admin

1. **Supabase Dashboard → Auth → Users → Invite user**, enter your email, accept the invite email.
2. Find your user's UUID (Auth → Users → click your row).
3. Run in the SQL editor:

   ```sql
   insert into public.wws_profiles (id, role, lead_id)
   values ('<YOUR_USER_UUID>', 'admin', null)
   on conflict (id) do update set role = 'admin';
   ```

4. Sign in at `/portal` with your email → magic link → you land on `/portal/admin`.

---

## Stripe webhook

Already deployed as a Supabase edge function (`supabase/functions/stripe-webhook/index.ts`). Source matches the MCP-deployed version.

### Register it in Stripe

Configured endpoint (White Wolf Shepherds Stripe account):

- **Destination ID:** `ed_61Utrc0MIRUP2HFoG26UcXFXDQSQ90Q262yfHCUp6Mn2`
- **Name:** White Wolf Shepherds
- **URL:** `https://ebjzdcnphkfpxfldnatm.supabase.co/functions/v1/stripe-webhook`
- **Event:** `checkout.session.completed`
- **Signing secret env var:** `STRIPE_WEBHOOK_SECRET` (also stored in Supabase Vault)

To recreate manually:

1. In the **White Wolf Shepherds** Stripe account → **Developers → Webhooks / Event destinations → Add destination**.
2. Endpoint URL: `https://ebjzdcnphkfpxfldnatm.supabase.co/functions/v1/stripe-webhook`.
3. Events to listen for: `checkout.session.completed`.
4. Copy the signing secret and set it as `STRIPE_WEBHOOK_SECRET` (**Supabase Dashboard → Edge Functions → stripe-webhook → Manage secrets**, Supabase Vault, Vercel, and local `.env`).
5. Set `STRIPE_SECRET_KEY` from the **same** WWS Stripe account as a Supabase edge secret (or Vault entry `STRIPE_SECRET_KEY` — the function reads Vault when edge env is empty).
6. Optional: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`.

### Reservation product (WWS account)

Run after creating a secret key in the WWS Stripe dashboard:

```bash
STRIPE_SECRET_KEY=sk_live_... node scripts/setup-stripe-wws.mjs
```

This creates the $500 refundable reservation product + Payment Link (success URL → `/reserved`). Copy the printed URL into `VITE_PUBLIC_STRIPE_RESERVATION_LINK` on Vercel and redeploy.

**Current WWS account catalog (live):**

| Resource | ID / URL |
| -------- | -------- |
| Product | `prod_Ujy8PAKQX7fvtD` |
| Price ($500) | `price_1TkUBkQMFzbE9sOPliBAav1s` |
| Payment Link | `https://buy.stripe.com/28E3cx5VAc9zaMX8ROejK00` |
| Event destination | `ed_61Utrc0MIRUP2HFoG26UcXFXDQSQ90Q262yfHCUp6Mn2` |

### Required Stripe metadata on Checkout Sessions

The Stripe payment link must be created with these metadata keys so the webhook can correlate the payment back to the right puppy/lead:

```js
await stripe.checkout.sessions.create({
  metadata: {
    puppy_id: '<uuid>',
    lead_id:  '<uuid>',
    tier:     'premier' | 'preferred' | 'companion',
    pick_order: '1',
  },
  ...
})
```

If you're using hosted Stripe Payment Links, use `metadata` on the link itself and the session will inherit it.

### Redeploying

```bash
supabase functions deploy stripe-webhook --no-verify-jwt
```

(`--no-verify-jwt` is required — Stripe cannot send a Supabase JWT.)

---

## Storage

Uploads (portal updates, alumni photos, dog profile photos) go to the **`wws-media`** bucket. The bucket is public-read; writes are restricted to authenticated users on their own files. The bucket is created by the migration if missing.

---

## Route map

| Path                                                             | Notes                                                                    |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `/`                                                              | Marketing home — temperature-based CTA, live scarcity, mobile sticky bar |
| `/litter`                                                        | 9-card litter grid with Realtime badges                                  |
| `/puppies/[slug]`                                                | Individual puppy profile                                                 |
| `/apply`                                                         | 2-step application form (magic-link, no passwords)                       |
| `/thank-you`                                                     | Post-submit confirmation + portal link                                   |
| `/approved/[token]`                                              | Approved applicant reservation page with 48h countdown                   |
| `/portal`                                                        | Magic-link login page (also the landing for logged-in redirect)          |
| `/portal/me`                                                     | Unified portal — renders Tier 1/2/3 based on `profiles.role`             |
| `/portal/admin`                                                  | Admin dashboard (requires `role='admin'`)                                |
| `/portal/dashboard`                                              | Legacy → redirects to `/portal/me`                                       |
| `/admin`                                                         | Legacy → redirects to `/portal/admin`                                    |
| `/parents`, `/process`, `/health-guarantee`, `/faq`, `/waitlist` | Marketing stubs                                                          |

---

## Important code conventions

- **Always `supabase.from(T.xxx)`** — never hard-code `wws_` prefix.
- **Never import `src/server/wws-actions.ts` into a client-only module** — it depends on `SUPABASE_SERVICE_ROLE_KEY` and is only safe inside server functions.
- **Magic-link auth only** — don't add `signInWithPassword` or signup flows.
- **Realtime subscriptions** must be cleaned up on unmount (`supabase.removeChannel(...)`).
- **Copy rules** (see spec): use "Reservation Fee" not "Deposit"; never write "Contact Us" / "Learn More" / "Get Started".

---

## Commands

```bash
npm run dev       # vite dev server
npm run build     # production build (includes route tree regen)
npm run lint      # eslint
npm run format    # prettier
```
