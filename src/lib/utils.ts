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

/** White Wolf Shepherds business timezone — always show times in Eastern. */
export const BREEDER_TIME_ZONE = "America/New_York";

const easternDateTimeOptions: Intl.DateTimeFormatOptions = {
  timeZone: BREEDER_TIME_ZONE,
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZoneName: "short",
};

const easternDateTimeTitleOptions: Intl.DateTimeFormatOptions = {
  timeZone: BREEDER_TIME_ZONE,
  dateStyle: "full",
  timeStyle: "long",
  timeZoneName: "short",
};

const easternDateOptions: Intl.DateTimeFormatOptions = {
  timeZone: BREEDER_TIME_ZONE,
  month: "short",
  day: "numeric",
  year: "numeric",
};

/** Format an instant in Eastern Time for display in admin/portal UI. */
export function formatEasternDateTime(
  ts: string | null | undefined,
): { label: string; title: string } | null {
  if (!ts) return null;
  const date = new Date(ts);
  if (Number.isNaN(date.getTime())) return null;
  return {
    label: date.toLocaleString("en-US", easternDateTimeOptions),
    title: date.toLocaleString("en-US", easternDateTimeTitleOptions),
  };
}

/** Format a date-only or instant value as an Eastern calendar date. */
export function formatEasternDate(ts: string | null | undefined): string | null {
  if (!ts) return null;
  const date = parseDateOnly(ts) ?? new Date(ts);
  if (Number.isNaN(date.getTime())) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(ts.trim())) {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
  return date.toLocaleDateString("en-US", easternDateOptions);
}

/** Shorthand for compact Eastern timestamps in tables. */
export function formatEasternDateTimeLabel(ts: string | null | undefined): string | null {
  return formatEasternDateTime(ts)?.label ?? null;
}

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
