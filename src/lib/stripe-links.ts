/** Helpers for Stripe Payment Link URLs (reservation deposit + balance). */

const RESERVATION_LINK =
  import.meta.env.VITE_PUBLIC_STRIPE_RESERVATION_LINK ??
  import.meta.env.NEXT_PUBLIC_STRIPE_RESERVATION_LINK ??
  "";

const BALANCE_LINK =
  import.meta.env.VITE_PUBLIC_STRIPE_BALANCE_LINK ??
  import.meta.env.NEXT_PUBLIC_STRIPE_BALANCE_LINK ??
  "";

export type ReservationLinkInput = {
  leadId?: string | null;
  email?: string | null;
  /** When set, prefer the puppy-specific payment link from admin. */
  puppyPaymentLink?: string | null;
};

/** Build a checkout URL with lead attribution for the Stripe webhook. */
export function reservationCheckoutUrl(input: ReservationLinkInput = {}): string {
  const base = input.puppyPaymentLink?.trim() || RESERVATION_LINK.trim();
  if (!base) return "#";

  try {
    const url = new URL(base);
    if (input.leadId) url.searchParams.set("client_reference_id", input.leadId);
    if (input.email) url.searchParams.set("prefilled_email", input.email.toLowerCase());
    return url.toString();
  } catch {
    return base;
  }
}

export function balanceCheckoutUrl(email?: string | null): string {
  const base = BALANCE_LINK.trim();
  if (!base) return "#";
  if (!email) return base;
  try {
    const url = new URL(base);
    url.searchParams.set("prefilled_email", email.toLowerCase());
    return url.toString();
  } catch {
    return base;
  }
}

export function hasReservationLink(): boolean {
  return Boolean(RESERVATION_LINK.trim());
}

export function hasBalanceLink(): boolean {
  return Boolean(BALANCE_LINK.trim());
}
