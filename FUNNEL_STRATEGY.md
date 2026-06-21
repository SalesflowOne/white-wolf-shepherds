# White Wolf Shepherds — Funnel Strategy

## Public-facing funnel (portal-first)

1. **Contact** — `/apply` captures name, email, phone, city, state. Sends magic link to portal.
2. **Family Fit Call** — booked via native GHL calendar API in `/portal/onboarding`.
3. **Application** — completed in portal with autosave (`application_draft` on `wws_leads`).
4. **$500 deposit** — Stripe Payment Link; refundable if not approved for placement.
5. **Under review** — breeder reviews in admin CRM.
6. **Approve** → deposit locks, adoption begins, role becomes `owner`; **Deny** → Stripe refund.
7. **Meet the Puppies Call** — gated on `placement_approved`; native GHL booking on `/reserved`.
8. **Puppy matched → contract → balance → pickup → home**

## Deposit policy

- **Refundable** until admin approves placement (`deposit_status: paid`).
- **Non-refundable** after approval (`deposit_status: locked`).

## Architecture

- **Edge functions:** `wws-funnel` (contact, drafts, application), `ghl-scheduling` (slots + book), `wws-admin` (approve/deny/refund), `stripe-webhook` (deposit → `under_review`).
- **Portal auth:** passwordless magic link via Supabase Auth.
- **Onboarding:** `/portal/onboarding` — 3-step wizard after contact.

## Environment

- `GHL_API_TOKEN` — optional; falls back to existing GHL Private Integration key in Supabase Vault (`pit-*` integration key)
- `GHL_LOCATION_ID` — `5NAfvhQ3uPhKkODcgT78`
- `GHL_FAMILY_FIT_CALENDAR_ID` — `n5pSWKKDXVP80Wng70GI`
- `GHL_VIDEO_CALL_CALENDAR_ID` — `nZgAqy954cD6FPRbiMmM`
- `VITE_PUBLIC_STRIPE_RESERVATION_LINK` — generic $500 deposit link

## Pipeline stages (`wws_leads.stage`)

```
new_inquiry → match_call_booked → application_complete → under_review
  → placement_approved | denied
  → reserved → completed
```
