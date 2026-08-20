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

/** URL-safe slug from a display name (puppies, litters, etc.). */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Pick a unique slug; keeps `currentSlug` reserved when editing the same record. */
export function uniqueSlug(baseName: string, takenSlugs: string[], currentSlug?: string | null): string {
  const base = slugify(baseName);
  if (!base) return `dog-${Date.now().toString(36).slice(-6)}`;

  const taken = new Set(takenSlugs.filter((s) => s && s !== currentSlug));
  if (!taken.has(base)) return base;

  let suffix = 2;
  while (taken.has(`${base}-${suffix}`)) suffix += 1;
  return `${base}-${suffix}`;
}

/** Replace a puppy's previous name in bio copy when the display name changes. */
export function syncPersonalityBioName(
  bio: string | null | undefined,
  previousName: string,
  nextName: string,
): string | null {
  const trimmedBio = bio?.trim();
  if (!trimmedBio || !previousName.trim() || previousName.trim() === nextName.trim()) {
    return trimmedBio || null;
  }

  const escaped = previousName.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return trimmedBio.replace(new RegExp(`\\b${escaped}\\b`, "g"), nextName.trim());
}
