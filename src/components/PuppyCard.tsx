import { Link } from "@tanstack/react-router";
import CollarBadge from "@/components/CollarBadge";
import SmartImage from "@/components/SmartImage";
import StatusBadge from "@/components/StatusBadge";
import { ageFrom } from "@/hooks/useParents";
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
  dob?: string | null;
  tier?: string | null;
  personality_bio?: string | null;
};

function tierLabel(tier: string | null | undefined): string | null {
  if (tier === "premier") return "Premier Selection";
  if (tier === "preferred") return "Preferred Pick";
  if (tier === "companion") return "Pet Companion";
  return null;
}

function normalizedStatus(status: string | null | undefined): string {
  return (status ?? "").toLowerCase();
}

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
  const status = normalizedStatus(puppy.status);
  const isAvailable = status === "available";
  const isPending = status === "pending";
  const isReserved = status === "reserved" || status === "sold" || status === "placed";
  const age = ageFrom(puppy.dob);
  const tier = tierLabel(puppy.tier);

  const alt = `${puppy.name}, a white German Shepherd puppy${
    puppy.collar_color ? ` wearing a ${puppy.collar_color} collar` : ""
  }`;

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-2xl bg-card shadow-card transition-all hover:shadow-wolf motion-reduce:transition-none ${
        isReserved ? "opacity-75" : ""
      }`}
    >
      <div className="relative overflow-hidden">
        {puppy.image_url ? (
          <SmartImage
            src={puppy.image_url}
            alt={alt}
            sizes={sizes}
            className={`aspect-[4/5] w-full object-cover object-center transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${
              isReserved ? "grayscale" : ""
            }`}
          />
        ) : (
          <div
            className={`flex aspect-[4/5] w-full items-center justify-center bg-muted ${
              isReserved ? "grayscale" : ""
            }`}
          >
            <span className="font-display text-3xl text-muted-foreground/30">{puppy.name}</span>
          </div>
        )}
        <StatusBadge status={puppy.status} className="absolute right-4 top-4" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-2xl font-bold text-card-foreground">{puppy.name}</h3>
          {puppy.sex && (
            <span className="shrink-0 rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold capitalize text-muted-foreground">
              {puppy.sex}
            </span>
          )}
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          {age && <span className="text-sm text-muted-foreground">{age}</span>}
          <CollarBadge color={puppy.collar_color} />
        </div>

        {tier && <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">{tier}</p>}

        {puppy.personality_bio && (
          <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{puppy.personality_bio}</p>
        )}

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
              className="rounded-xl border border-border py-3 text-center text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              View photos & details
            </Link>
          )}

          {isAvailable ? (
            <Link
              to="/get-started"
              search={{ puppy: puppy.id }}
              className="rounded-xl bg-accent py-3 text-center text-sm font-bold uppercase tracking-wider text-accent-foreground transition-all hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Reserve {puppy.name}
            </Link>
          ) : isPending ? (
            <span className="rounded-xl bg-amber-100 py-3 text-center text-sm font-bold uppercase tracking-wider text-amber-800">
              Application pending
            </span>
          ) : (
            <Link
              to="/get-started"
              search={{ puppy: puppy.id }}
              className="rounded-xl border border-border py-3 text-center text-sm font-semibold text-muted-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Ask about {puppy.name}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
