# Google Ads conversion tracking — White Wolf Shepherds

Event-based conversions for the `/get-started` paid-traffic funnel. Conversions fire only on **confirmed success paths** (API/database verification), never on button clicks.

## Environment variables

Set these in `.env` (local) and in your hosting provider (production):

| Variable | Example | Purpose |
|----------|---------|---------|
| `VITE_GOOGLE_ADS_ID` | `AW-1234567890` | Google Ads account ID |
| `VITE_GADS_LABEL_DEPOSIT` | `AbCdEfGhIjKlMnOpQr` | Conversion label for `deposit_paid` |
| `VITE_GADS_LABEL_APPLICATION` | `…` | Conversion label for `application_submitted` |
| `VITE_GADS_LABEL_WAITLIST` | `…` | Conversion label for `waitlist_signup` |
| `VITE_GADS_LABEL_CONTACT` | `…` | Conversion label for `contact_click` |

When `VITE_GOOGLE_ADS_ID` or a label is empty, `trackConversion()` no-ops silently (no console noise in production).

GA4 (optional, separate) continues to use `VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY`. The global `gtag.js` loader in `src/lib/analytics.ts` configures both IDs when present.

## Conversion events

| Event | Value (USD) | `transaction_id` | Fires when | File / function |
|-------|-------------|------------------|------------|-----------------|
| `application_submitted` | 400 | Lead UUID | `/get-started` form succeeds (`startLead` API) | `src/routes/get-started.tsx` → `handleSubmit` |
| `application_submitted` | 400 | Lead UUID | `/apply` (non-waitlist) succeeds | `src/routes/apply.tsx` → `handleSubmit` |
| `deposit_paid` | 2000 | Stripe session or payment intent id | Stripe return: lead `deposit_status === 'paid'` verified via Supabase | `src/routes/reserved.tsx` → `confirmAndTrackDeposit()` in `src/lib/deposit-tracking.ts` |
| `waitlist_signup` | 50 | Row id or email hash | Homepage waitlist insert succeeds | `src/components/ContactSection.tsx` → `handleSubmit` |
| `waitlist_signup` | 50 | Lead UUID | `/apply?waitlist=true` succeeds | `src/routes/apply.tsx` → `handleSubmit` |
| `contact_click` | 25 | — | User activates a `tel:` or `mailto:` link | `src/lib/contact-tracking.ts` (delegated listener in `src/routes/__root.tsx`) |

### Idempotency

`src/lib/conversions.ts` deduplicates by conversion name + `transaction_id` using an in-memory `Set` and `sessionStorage` keys prefixed with `ww_gads_conv:`. Safe under React StrictMode double-mount and page refresh on success screens.

### Debug mode

Append `?debug_conversions=1` to any URL to log each fired conversion and its payload to the browser console (also logs in `import.meta.env.DEV`).

Example:

```
https://whitewolfshepherds.com/get-started?debug_conversions=1
```

## Verification with Google Tag Assistant

1. Install the [Google Tag Assistant Chrome extension](https://tagassistant.google.com/).
2. Set real values for `VITE_GOOGLE_ADS_ID` and the four label env vars; redeploy.
3. Open the site with `?debug_conversions=1` and walk each funnel path:
   - Submit `/get-started` → expect `application_submitted` in console and Tag Assistant.
   - Submit homepage waitlist → expect `waitlist_signup`.
   - Complete a test Stripe deposit (sandbox) → land on `/reserved` → expect `deposit_paid` after DB shows `deposit_status: paid`.
   - Click a footer `tel:` or `mailto:` link (after `CONTACT` is configured in `src/lib/site.ts`) → expect `contact_click`.
4. In Google Ads → **Goals → Conversions → Summary**, confirm events appear (may take up to 24 hours for production reporting; Tag Assistant shows real-time tag fires).

## Implementation files

- `src/lib/conversions.ts` — typed `trackConversion()` helper
- `src/lib/analytics.ts` — shared `gtag.js` loader (GA4 + Ads)
- `src/lib/deposit-tracking.ts` — post-payment DB verification
- `src/lib/contact-tracking.ts` — delegated tel/mailto tracking
