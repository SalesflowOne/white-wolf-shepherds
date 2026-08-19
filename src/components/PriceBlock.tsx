import { INCLUDED, PRICING, formatUSD } from "@/lib/site";

/**
 * Shared price + deposit terms block. Numbers come from PRICING in
 * src/lib/site.ts so they change in exactly one place.
 */
export default function PriceBlock({
  price,
  variant = "full",
  className = "",
}: {
  price?: number | null;
  variant?: "full" | "inline";
  className?: string;
}) {
  const value = price ?? PRICING.price;

  if (variant === "inline") {
    return (
      <span className={`text-sm text-muted-foreground ${className}`}>
        <span className="font-display text-lg font-bold text-foreground">{formatUSD(value)}</span>{" "}
        · {formatUSD(PRICING.deposit)} deposit holds
      </span>
    );
  }

  return (
    <div className={`rounded-2xl border border-border bg-card p-6 ${className}`}>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-display text-3xl font-bold text-foreground">{formatUSD(value)}</span>
        <span className="text-sm text-muted-foreground">all-in puppy price</span>
      </div>
      <p className="mt-3 rounded-xl bg-accent/10 px-4 py-3 text-sm text-foreground">
        <strong className="font-semibold">{formatUSD(PRICING.deposit)} deposit.</strong>{" "}
        {PRICING.depositTerms}
      </p>
      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        What's included
      </p>
      <ul className="mt-3 space-y-2">
        {INCLUDED.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
            <svg aria-hidden="true" viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 fill-accent">
              <path d="M8.3 13.6 5 10.3l1.4-1.4 1.9 1.9 5-5L14.7 7z" />
            </svg>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
