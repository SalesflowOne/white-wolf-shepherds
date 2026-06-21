#!/usr/bin/env node
/**
 * Create the White Wolf Shepherds $500 refundable reservation product
 * in the dedicated WWS Stripe account (not Salesflow One).
 *
 * Usage:
 *   STRIPE_SECRET_KEY=sk_live_... node scripts/setup-stripe-wws.mjs
 *
 * Optional:
 *   SUCCESS_URL=https://whitewolfshepherds.com/reserved
 */

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY?.trim();
const SUCCESS_URL = process.env.SUCCESS_URL?.trim() || "https://whitewolfshepherds.com/reserved";

if (!STRIPE_SECRET_KEY) {
  console.error(
    "Missing STRIPE_SECRET_KEY. Create a secret key in the White Wolf Shepherds Stripe dashboard\n" +
      "(Developers → API keys) while switched into that account, then re-run.",
  );
  process.exit(1);
}

const PRODUCT_NAME = "Refundable Reservation Deposit — White Wolf Shepherds";
const PRODUCT_DESCRIPTION =
  "Fully refundable deposit that holds your spot in line for the current White Wolf Shepherds litter. Not tied to a specific puppy — you'll meet the puppies on your private video call.";
const PRODUCT_METADATA = {
  funnel: "generic_reservation",
  site: "white-wolf-shepherds",
};

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

async function findExistingProduct() {
  const search = await stripe(
    `/products/search?query=${encodeURIComponent('metadata["site"]:"white-wolf-shepherds" AND metadata["funnel"]:"generic_reservation"')}`,
  );
  const candidates = (search.data || []).filter((p) => p.name === PRODUCT_NAME && p.active);
  return candidates[0] ?? null;
}

async function ensureProduct() {
  const existing = await findExistingProduct();
  if (existing) {
    console.log(`Reusing product ${existing.id}`);
    return existing;
  }

  const product = await stripe("/products", {
    method: "POST",
    body: {
      name: PRODUCT_NAME,
      description: PRODUCT_DESCRIPTION,
      ...Object.fromEntries(
        Object.entries(PRODUCT_METADATA).map(([k, v]) => [`metadata[${k}]`, v]),
      ),
    },
  });
  console.log(`Created product ${product.id}`);
  return product;
}

async function ensurePrice(productId) {
  const prices = await stripe(`/prices?product=${productId}&active=true&limit=20`);
  const match = (prices.data || []).find(
    (p) => p.unit_amount === 50000 && p.currency === "usd" && !p.recurring,
  );
  if (match) {
    console.log(`Reusing price ${match.id}`);
    return match;
  }

  const price = await stripe("/prices", {
    method: "POST",
    body: {
      product: productId,
      currency: "usd",
      unit_amount: "50000",
    },
  });
  console.log(`Created price ${price.id} ($500)`);
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

async function ensurePaymentLink(priceId) {
  const existing = await findExistingPaymentLink(priceId);
  if (existing) {
    console.log(`Reusing payment link ${existing.url}`);
    return existing;
  }

  const link = await stripe("/payment_links", {
    method: "POST",
    body: {
      "line_items[0][price]": priceId,
      "line_items[0][quantity]": "1",
      "after_completion[type]": "redirect",
      "after_completion[redirect][url]": SUCCESS_URL,
      "phone_number_collection[enabled]": "true",
      submit_type: "pay",
      ...Object.fromEntries(
        Object.entries(PRODUCT_METADATA).map(([k, v]) => [`metadata[${k}]`, v]),
      ),
    },
  });
  console.log(`Created payment link ${link.url}`);
  return link;
}

async function main() {
  const product = await ensureProduct();
  const price = await ensurePrice(product.id);
  const link = await ensurePaymentLink(price.id);

  console.log("\n--- Update deploy env ---");
  console.log(`VITE_PUBLIC_STRIPE_RESERVATION_LINK=${link.url}`);
  console.log("\nVercel (all environments):");
  console.log(
    `  printf '%s' '${link.url}' | npx vercel env update VITE_PUBLIC_STRIPE_RESERVATION_LINK production`,
  );
  console.log("Also set STRIPE_SECRET_KEY on Vercel + Supabase edge secrets for stripe-webhook.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
