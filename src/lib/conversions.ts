/**
 * Google Ads conversion events for the White Wolf Shepherds funnel.
 *
 * Fires only on confirmed success paths (API callbacks), never on click handlers.
 * No-ops when gtag, the Ads ID, or a conversion label is missing.
 */

import { GOOGLE_ADS_ID } from "@/lib/analytics";

export type ConversionName =
  | "deposit_paid"
  | "application_submitted"
  | "waitlist_signup"
  | "contact_click";

const ADS_ID = GOOGLE_ADS_ID;

const LABELS: Record<ConversionName, string> = {
  deposit_paid: (import.meta.env.VITE_GADS_LABEL_DEPOSIT as string | undefined)?.trim() ?? "",
  application_submitted:
    (import.meta.env.VITE_GADS_LABEL_APPLICATION as string | undefined)?.trim() ?? "",
  waitlist_signup: (import.meta.env.VITE_GADS_LABEL_WAITLIST as string | undefined)?.trim() ?? "",
  contact_click: (import.meta.env.VITE_GADS_LABEL_CONTACT as string | undefined)?.trim() ?? "",
};

const VALUES: Record<ConversionName, number> = {
  deposit_paid: 2000,
  application_submitted: 400,
  waitlist_signup: 50,
  contact_click: 25,
};

const SESSION_PREFIX = "ww_gads_conv:";
const fired = new Set<string>();

function isDebugMode(): boolean {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("debug_conversions") === "1";
}

function dedupeKey(name: ConversionName, transactionId?: string): string {
  return transactionId ? `${name}:${transactionId}` : name;
}

function alreadyFired(key: string): boolean {
  if (fired.has(key)) return true;
  if (typeof window === "undefined") return false;
  try {
    const stored = sessionStorage.getItem(`${SESSION_PREFIX}${key}`);
    if (stored) {
      fired.add(key);
      return true;
    }
  } catch {
    /* sessionStorage unavailable */
  }
  return false;
}

function markFired(key: string): void {
  fired.add(key);
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(`${SESSION_PREFIX}${key}`, "1");
  } catch {
    /* sessionStorage unavailable */
  }
}

export function trackConversion(name: ConversionName, transactionId?: string): void {
  if (typeof window === "undefined") return;

  const label = LABELS[name];
  if (!ADS_ID || !label || typeof window.gtag !== "function") return;

  const key = dedupeKey(name, transactionId);
  if (alreadyFired(key)) return;

  const payload: Record<string, string | number> = {
    send_to: `${ADS_ID}/${label}`,
    value: VALUES[name],
    currency: "USD",
  };

  if (transactionId) payload.transaction_id = transactionId;

  markFired(key);
  window.gtag("event", "conversion", payload);

  if (isDebugMode() || import.meta.env.DEV) {
    console.info("[conversions]", name, payload);
  }
}

/** Stable id for waitlist rows when the database does not return an insert id. */
export async function emailHash(email: string): Promise<string> {
  const normalized = email.trim().toLowerCase();
  if (typeof crypto !== "undefined" && crypto.subtle) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(normalized));
    return Array.from(new Uint8Array(buf))
      .slice(0, 8)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }
  return normalized.replace(/[^a-z0-9]/g, "").slice(0, 16);
}
