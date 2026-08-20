#!/usr/bin/env node
/**
 * Create White Wolf Shepherds Stripe products + Payment Links
 * in the dedicated WWS Stripe account (not Salesflow One).
 *
 * Usage:
 *   STRIPE_SECRET_KEY=sk_live_... node scripts/setup-stripe-wws.mjs
 *
 * Optional:
 *   SUCCESS_URL=https://whitewolfshepherds.com/reserved
 *   BALANCE_SUCCESS_URL=https://whitewolfshepherds.com/portal/me
 */

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY?.trim();
const SUCCESS_URL = process.env.SUCCESS_URL?.trim() || "https://whitewolfshepherds.com/reserved";
const BALANCE_SUCCESS_URL =
  process.env.BALANCE_SUCCESS_URL?.trim() || "https://whitewolfshepherds.com/portal/me";

if (!STRIPE_SECRET_KEY) {
  console.error(
    "Missing STRIPE_SECRET_KEY. Create a secret key in the White Wolf Shepherds Stripe dashboard\n" +
      "(Developers → API keys) while switched into that account, then re-run.",
  );
  process.exit(1);
}

const SITE = "white-wolf-shepherds";

const OFFERS = [
  {
    envKey: "VITE_PUBLIC_STRIPE_RESERVATION_LINK",
    productName: "Refundable Reservation Deposit — White Wolf Shepherds",
    productDescription:
      "Fully refundable deposit that holds your spot in line for the current White Wolf Shepherds litter. Not tied to a specific puppy — you'll meet the puppies on your private video call.",
    metadata: { funnel: "generic_reservation", site: SITE },
    unitAmount: 50000,
    successUrl: SUCCESS_URL,
  },
  {
    envKey: "VITE_PUBLIC_STRIPE_BALANCE_LINK",
    productName: "Puppy Balance — White Wolf Shepherds",
    productDescription:
      "Remaining balance due before your puppy goes home. Reservation deposit is applied separately.",
    metadata: { funnel: "balance_payment", site: SITE },
    unitAmount: 150000,
    successUrl: BALANCE_SUCCESS_URL,
  },
];

async function stripe(path, { method = "GET", body } = {}) {
  const res = await fetch(`https://api.stripe.com/v1${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body ? new URLSearchParams(body).toString() : undefined,
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error?.message || res.statusText);
  }
  return json;
}

async function findExistingProduct(offer) {
  const search = await stripe(
    `/products/search?query=${encodeURIComponent(
      `metadata["site"]:"${SITE}" AND metadata["funnel"]:"${offer.metadata.funnel}"`,
    )}`,
  );
  const candidates = (search.data || []).filter((p) => p.name === offer.productName && p.active);
  return candidates[0] ?? null;
}

async function ensureProduct(offer) {
  const existing = await findExistingProduct(offer);
  if (existing) {
    console.log(`[${offer.metadata.funnel}] Reusing product ${existing.id}`);
    return existing;
  }

  const product = await stripe("/products", {
    method: "POST",
    body: {
      name: offer.productName,
      description: offer.productDescription,
      ...Object.fromEntries(
        Object.entries(offer.metadata).map(([k, v]) => [`metadata[${k}]`, v]),
      ),
    },
  });
  console.log(`[${offer.metadata.funnel}] Created product ${product.id}`);
  return product;
}

async function ensurePrice(productId, offer) {
  const prices = await stripe(`/prices?product=${productId}&active=true&limit=20`);
  const match = (prices.data || []).find(
    (p) => p.unit_amount === offer.unitAmount && p.currency === "usd" && !p.recurring,
  );
  if (match) {
    console.log(`[${offer.metadata.funnel}] Reusing price ${match.id}`);
    return match;
  }

  const price = await stripe("/prices", {
    method: "POST",
    body: {
      product: productId,
      currency: "usd",
      unit_amount: String(offer.unitAmount),
    },
  });
  console.log(`[${offer.metadata.funnel}] Created price ${price.id} ($${offer.unitAmount / 100})`);
  return price;
}

async function findExistingPaymentLink(priceId) {
  const links = await stripe("/payment_links?active=true&limit=20");
  for (const link of links.data || []) {
    const lineItems = await stripe(`/payment_links/${link.id}/line_items?limit=5`);
    const usesPrice = (lineItems.data || []).some((li) => li.price?.id === priceId);
    if (usesPrice) return link;
  }
  return null;
}

async function ensurePaymentLink(priceId, offer) {
  const existing = await findExistingPaymentLink(priceId);
  if (existing) {
    console.log(`[${offer.metadata.funnel}] Reusing payment link ${existing.url}`);
    return existing;
  }

  const link = await stripe("/payment_links", {
    method: "POST",
    body: {
      "line_items[0][price]": priceId,
      "line_items[0][quantity]": "1",
      "after_completion[type]": "redirect",
      "after_completion[redirect][url]": offer.successUrl,
      "phone_number_collection[enabled]": "true",
      submit_type: "pay",
      ...Object.fromEntries(
        Object.entries(offer.metadata).map(([k, v]) => [`metadata[${k}]`, v]),
      ),
    },
  });
  console.log(`[${offer.metadata.funnel}] Created payment link ${link.url}`);
  return link;
}

async function ensureOffer(offer) {
  const product = await ensureProduct(offer);
  const price = await ensurePrice(product.id, offer);
  const link = await ensurePaymentLink(price.id, offer);
  return { offer, link };
}

async function main() {
  const results = [];
  for (const offer of OFFERS) {
    results.push(await ensureOffer(offer));
  }

  console.log("\n--- Update deploy env ---");
  for (const { offer, link } of results) {
    console.log(`${offer.envKey}=${link.url}`);
  }
  console.log("\nVercel (production example):");
  for (const { offer, link } of results) {
    console.log(
      `  printf '%s' '${link.url}' | npx vercel env update ${offer.envKey} production`,
    );
  }
  console.log("\nAlso set STRIPE_SECRET_KEY on Vercel + Supabase edge secrets for stripe-webhook.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
