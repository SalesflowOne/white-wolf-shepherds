/**
 * Single source of truth for pricing, deposit terms, trust badges and the
 * canonical site URL. Change a number here and it changes everywhere.
 */

export const SITE_URL = "https://stellar-shepherd-sanctuary.lovable.app";

export const PRICING = {
  price: 2000,
  deposit: 500,
  currency: "USD",
  depositTerms:
    "Your deposit holds that specific puppy, is applied to the balance, and is fully refundable if your family isn't approved.",
} as const;

export function formatUSD(amount: number | null | undefined): string {
  if (amount === null || amount === undefined) return "—";
  return `$${amount.toLocaleString("en-US")}`;
}

/** What every White Wolf puppy goes home with. */
export const INCLUDED = [
  "Full veterinary exam & health certificate",
  "Age-appropriate vaccinations",
  "Deworming schedule completed",
  "Microchip registered in your name",
  "1-year genetic health guarantee",
  "Puppy pack: food, blanket, toy & records",
  "Transport & flight-nanny options",
] as const;

/** Compact proof points shown next to every CTA. */
export const TRUST_POINTS = [
  { label: "Vet checked", detail: "Exam & health certificate before go-home" },
  { label: "Vaccinated & dewormed", detail: "On schedule from week two" },
  { label: "Microchipped", detail: "Registered in your name" },
  { label: "1-year guarantee", detail: "Written genetic health guarantee" },
  { label: "Lifetime support", detail: "We're a text away, forever" },
] as const;

/** Public routes for sitemap + navigation consistency. */
export const PUBLIC_ROUTES = [
  "/",
  "/get-started",
  "/litter",
  "/pack-family",
  "/parents",
  "/process",
  "/health-guarantee",
  "/faq",
  "/waitlist",
] as const;
