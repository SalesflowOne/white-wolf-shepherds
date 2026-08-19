import { Link } from "@tanstack/react-router";
import { TRUST_POINTS } from "@/lib/site";

/**
 * Compact proof strip shown next to every conversion point.
 * Single source of truth: TRUST_POINTS in src/lib/site.ts.
 */
export default function TrustStrip({
  tone = "light",
  withLink = true,
}: {
  tone?: "light" | "dark";
  withLink?: boolean;
}) {
  const chip =
    tone === "dark"
      ? "border-primary-foreground/15 bg-primary-foreground/[0.06] text-primary-foreground/80"
      : "border-border bg-card text-muted-foreground";

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {TRUST_POINTS.map((p) => (
        <span
          key={p.label}
          title={p.detail}
          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${chip}`}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="h-3.5 w-3.5 fill-accent"
            focusable="false"
          >
            <path d="M8.3 13.6 5 10.3l1.4-1.4 1.9 1.9 5-5L14.7 7z" />
            <circle cx="10" cy="10" r="8.2" fill="none" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          {p.label}
        </span>
      ))}
      {withLink && (
        <Link
          to="/health-guarantee"
          className="text-xs font-semibold text-accent underline-offset-4 hover:underline"
        >
          See the full guarantee →
        </Link>
      )}
    </div>
  );
}
