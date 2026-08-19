import { Link } from "@tanstack/react-router";
import CollarBadge from "@/components/CollarBadge";
import SmartImage from "@/components/SmartImage";
import StatusBadge from "@/components/StatusBadge";
import { PRICING, formatUSD } from "@/lib/site";

export type PuppyCardData = {
  id: string;
  name: string;
  slug: string | null;
  sex: string | null;
  status: string | null;
  image_url: string | null;
  collar_color: string | null;
  price?: number | null;
};

/**
 * The one puppy card used on the homepage, litter page and sibling strips.
 */
export default function PuppyCard({
  puppy,
  sizes,
}: {
  puppy: PuppyCardData;
  sizes?: string;
}) {
  const isAvailable = (puppy.status ?? "").toLowerCase() === "available";
  const alt = `${puppy.name}, a white German Shepherd puppy${
    puppy.collar_color ? ` wearing a ${puppy.collar_color} collar` : ""
  }`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-card shadow-card transition-all hover:shadow-wolf motion-reduce:transition-none">
      <div className="relative overflow-hidden">
        {puppy.image_url ? (
          <SmartImage
            src={puppy.image_url}
            alt={alt}
            sizes={sizes}
            className="aspect-[4/5] w-full object-cover object-center transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : (
          <div className="flex aspect-[4/5] w-full items-center justify-center bg-muted">
            <span className="font-display text-3xl text-muted-foreground/30">{puppy.name}</span>
          </div>
        )}
        <StatusBadge status={puppy.status} className="absolute right-4 top-4" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl font-bold text-card-foreground">{puppy.name}</h3>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {puppy.sex && (
            <span className="text-sm capitalize text-muted-foreground">{puppy.sex}</span>
          )}
          <CollarBadge color={puppy.collar_color} />
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          <span className="font-display text-lg font-bold text-foreground">
            {formatUSD(puppy.price ?? PRICING.price)}
          </span>{" "}
          · {formatUSD(PRICING.deposit)} deposit holds
        </p>

        <div className="mt-5 flex flex-col gap-2">
          {puppy.slug && (
            <Link
              to="/puppies/$slug"
              params={{ slug: puppy.slug }}
              className="rounded-xl bg-primary py-3 text-center text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              View {puppy.name}
            </Link>
          )}
          <Link
            to="/get-started"
            search={{ step: "home", puppy: puppy.slug ?? undefined }}
            className={`rounded-xl py-3 text-center text-sm font-bold uppercase tracking-wider transition-all hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              isAvailable
                ? "bg-accent text-accent-foreground"
                : "border border-border text-muted-foreground"
            }`}
          >
            {isAvailable ? `Reserve ${puppy.name}` : "Ask about this puppy"}
          </Link>
        </div>
      </div>
    </article>
  );
}
