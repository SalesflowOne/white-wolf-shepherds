import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Parse a date-only value ("YYYY-MM-DD") as a LOCAL date.
 * `new Date("2024-08-05")` is parsed as UTC midnight, which renders as the
 * previous day for anyone west of UTC. This avoids that off-by-one.
 */
export function parseDateOnly(value: string | null | undefined): Date | null {
  if (!value) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  const d = m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Format a date-only value without timezone shifting. */
export function formatDateOnly(
  value: string | null | undefined,
  options?: Intl.DateTimeFormatOptions,
  locale?: string,
): string | null {
  const d = parseDateOnly(value);
  return d ? d.toLocaleDateString(locale, options) : null;
}
