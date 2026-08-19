import { createFileRoute, Link } from "@tanstack/react-router";
import CollarBadge from "@/components/CollarBadge";
import { useEffect, useState } from "react";
import { supabase, T } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LitterAlbum from "@/components/LitterAlbum";
import MeetTheParents from "@/components/MeetTheParents";
import SmartImage from "@/components/SmartImage";
import TrustStrip from "@/components/TrustStrip";
import { SITE_URL } from "@/lib/site";
import { useCurrentLitter, formatLongDate } from "@/hooks/useParents";

type Puppy = {
  id: string;
  name: string;
  slug: string;
  sex: string | null;
  dob: string | null;
  ready_date: string | null;
  status: string | null;
  tier: string | null;
  price: number | null;
  temperament_tags: string[] | null;
  personality_bio: string | null;
  ideal_home: string | null;
  image_url: string | null;
  stripe_payment_link: string | null;
  priority_order: number | null;
  collar_color: string | null;
};

export const Route = createFileRoute("/litter")({
  component: LitterPage,
  head: () => ({
    meta: [
      { title: "Spring 2026 Litter — White Wolf Shepherds" },
      {
        name: "description",
        content:
          "Meet our Spring 2026 White German Shepherd litter. Health-tested parents, $2,000 all-in, $500 refundable deposit. Reserve your pick today.",
      },
      { property: "og:title", content: "Spring 2026 Litter — White Wolf Shepherds" },
      {
        property: "og:description",
        content:
          "Nine white German Shepherd puppies from health-tested parents. $2,000 all-in with a $500 refundable deposit.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/litter` },
      {
        property: "og:image",
        content: `${SITE_URL}/puppies/litter/litter-sunny-garden-02.webp`,
      },
      {
        name: "twitter:image",
        content: `${SITE_URL}/puppies/litter/litter-sunny-garden-02.webp`,
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/litter` }],
  }),
});

function LitterPage() {
  const [puppies, setPuppies] = useState<Puppy[]>([]);
  const [availableCount, setAvailableCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const litter = useCurrentLitter();
  const minPrice = puppies.reduce<number | null>(
    (min, p) => (p.price != null && (min === null || p.price < min) ? p.price : min),
    null,
  );

  useEffect(() => {
    localStorage.setItem("visited_litter", "true");

    async function fetchPuppies() {
      const { data, error } = await supabase
        .from(T.puppies)
        .select("*")
        .neq("status", "parent")
        .order("priority_order", { ascending: true });

      if (!error && data) {
        setPuppies(data as Puppy[]);
        setAvailableCount(data.filter((p: Puppy) => p.status === "available").length);
      }
      setLoading(false);
    }

    fetchPuppies();

    // Subscribe to realtime changes on puppies table
    const channel = supabase
      .channel("puppies-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: T.puppies }, () => {
        // Re-fetch on any change
        fetchPuppies();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* SECTION 1 — Hero */}
      <section className="bg-gradient-hero pt-28 pb-20 lg:pt-36 lg:pb-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-ice">
            Now Accepting Reservations
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight text-primary-foreground sm:text-5xl lg:text-6xl">
            Spring 2026 White German Shepherd Litter
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/70">
            {[
              litter?.born_date ? `Born ${formatLongDate(litter.born_date)}` : null,
              litter?.ready_date ? `Ready ${formatLongDate(litter.ready_date)}` : null,
              minPrice != null ? `Starting at $${minPrice.toLocaleString()}` : null,
            ]
              .filter(Boolean)
              .join(" \u00b7 ")}
          </p>

          {/* Live scarcity counter */}
          <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-6 py-3 text-primary-foreground">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
            </span>
            <span className="text-sm font-semibold">
              {loading
                ? "Loading..."
                : `${availableCount} of ${puppies.length} puppies available for reservation`}
            </span>
          </div>

          <div className="mt-8">
            <TrustStrip tone="dark" withLink={false} />
          </div>

          <div className="mt-10">
            <Link
              to="/get-started"
              className="rounded-xl bg-accent px-8 py-4 text-sm font-bold uppercase tracking-wider text-accent-foreground shadow-wolf transition-all hover:brightness-110"
            >
              Apply for This Litter
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Pricing Tiers */}
      <section className="bg-gradient-frost py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Reservation Tiers
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-foreground lg:text-4xl">
              Choose Your Selection Level
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Your tier determines your pick order. Earlier reservation = earlier pick of the
              litter.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {/* Companion */}
            <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
              <h3 className="font-display text-xl font-bold text-foreground">Pet Companion</h3>
              <div className="mt-4 font-display text-4xl font-bold text-foreground">
                ${(minPrice ?? 2000).toLocaleString()}
              </div>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-accent">&#10003;</span>
                  Last selection from the litter
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-accent">&#10003;</span>
                  Standard puppy package
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-accent">&#10003;</span>
                  Health guarantee included
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-accent">&#10003;</span>
                  Lifetime breeder support
                </li>
              </ul>
            </div>

            {/* Preferred — highlighted */}
            <div className="relative rounded-2xl border-2 border-accent bg-card p-8 shadow-wolf">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-bold uppercase tracking-wider text-accent-foreground">
                Most Popular
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">Preferred Pick</h3>
              <div className="mt-4 font-display text-4xl font-bold text-accent">$3,250</div>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-accent">&#10003;</span>
                  2nd&ndash;6th pick of the litter
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-accent">&#10003;</span>
                  Priority selection window
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-accent">&#10003;</span>
                  Health guarantee included
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-accent">&#10003;</span>
                  Lifetime breeder support
                </li>
              </ul>
            </div>

            {/* Premier */}
            <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
              <h3 className="font-display text-xl font-bold text-foreground">Premier Selection</h3>
              <div className="mt-4 font-display text-4xl font-bold text-foreground">$4,000</div>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-accent">&#10003;</span>
                  1st pick of the entire litter
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-accent">&#10003;</span>
                  1-hour Zoom training session
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-accent">&#10003;</span>
                  Premium starter kit
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-accent">&#10003;</span>
                  Health guarantee + lifetime support
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — Puppy Grid */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              The Litter
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-foreground lg:text-4xl">
              Meet Our Puppies
            </h2>
          </div>

          {loading ? (
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="animate-pulse rounded-2xl bg-muted p-6">
                  <div className="h-64 rounded-xl bg-muted-foreground/10" />
                  <div className="mt-4 h-6 w-2/3 rounded bg-muted-foreground/10" />
                  <div className="mt-2 h-4 w-1/3 rounded bg-muted-foreground/10" />
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {puppies.map((puppy) => (
                <PuppyCard key={puppy.id} puppy={puppy} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 3b — Litter Profile / Album */}
      <LitterAlbum maxPuppyShots={6} />

      {/* SECTION 4 — Parents Summary */}
      <section className="bg-gradient-frost py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <MeetTheParents
            eyebrow="The Parents"
            title="Champion Bloodlines"
            subtitle="This litter is the direct product of two health-tested, AKC-registered White Shepherds — proven structure, stable nerves, and that signature snow-white coat."
          />
        </div>
      </section>

      {/* SECTION 5 — Trust Bullets */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-foreground">
                  Health-Tested Parents
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  OFA certified hips, elbows, and cardiac. Full genetic panel completed.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-foreground">Family Raised</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Raised in our home using Puppy Culture and ENS neurological stimulation protocol.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-foreground">
                  Fully Documented
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Vet-checked, microchipped, vaccinated, and dewormed with complete health records.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — Urgency Module */}
      <section className="border-t border-b border-border bg-muted/50 py-12">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h3 className="font-display text-xl font-bold text-foreground">
            Reservation order determines pick selection.
          </h3>
          <p className="mt-2 text-lg text-muted-foreground">
            The family who reserves first gets first pick of the litter.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Reservation Fee is $500, applied in full toward your purchase price.
          </p>
        </div>
      </section>

      {/* SECTION 7 — Bottom CTA Band */}
      <section className="bg-gradient-hero py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-3xl font-bold text-primary-foreground lg:text-4xl">
            Ready to Apply?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/70">
            We review every application personally. If approved, you'll receive a private link to
            secure your reservation.
          </p>
          <div className="mt-10">
            <Link
              to="/get-started"
              className="rounded-xl bg-accent px-8 py-4 text-sm font-bold uppercase tracking-wider text-accent-foreground shadow-wolf transition-all hover:brightness-110"
            >
              Apply for This Litter &mdash; Takes 3 Minutes
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ── Puppy Card Component ── */
function PuppyCard({ puppy }: { puppy: Puppy }) {
  const isAvailable = puppy.status === "available";
  const isPending = puppy.status === "pending";
  const isReserved = puppy.status === "reserved" || puppy.status === "sold";

  const tierLabel =
    puppy.tier === "premier"
      ? "Premier Selection"
      : puppy.tier === "preferred"
        ? "Preferred Pick"
        : "Pet Companion";

  const sexColor = puppy.sex === "male" ? "bg-blue-100 text-blue-700" : "bg-rose-100 text-rose-700";
  const sexLabel = puppy.sex === "male" ? "Male" : "Female";

  return (
    <div
      className={`group overflow-hidden rounded-2xl bg-card shadow-card transition-all hover:shadow-wolf ${
        isReserved ? "opacity-75" : ""
      }`}
    >
      {/* Photo */}
      <div className="relative overflow-hidden">
        {puppy.image_url ? (
          <SmartImage
            src={puppy.image_url}
            alt={`${puppy.name}, a white German Shepherd puppy${
              puppy.collar_color ? ` wearing a ${puppy.collar_color} collar` : ""
            }`}
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw"
            className={`aspect-[4/5] w-full object-cover object-center transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none ${
              isReserved ? "grayscale" : ""
            }`}
          />
        ) : (
          <div
            className={`flex aspect-[4/5] w-full items-center justify-center bg-muted ${
              isReserved ? "grayscale" : ""
            }`}
          >
            <span className="font-display text-6xl font-bold text-muted-foreground/20">
              {puppy.name[0]}
            </span>
          </div>
        )}

        {/* Status badge */}
        <span
          className={`absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
            isAvailable
              ? "bg-green-500 text-white"
              : isPending
                ? "bg-amber-500 text-white"
                : "bg-gray-500 text-white"
          }`}
        >
          {isAvailable ? "Available" : isPending ? "Application Pending" : "Reserved"}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-2xl font-bold text-card-foreground">{puppy.name}</h3>
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${sexColor}`}>
            {sexLabel}
          </span>
        </div>
        {puppy.collar_color && (
          <div className="mt-2">
            <CollarBadge color={puppy.collar_color} />
          </div>
        )}

        {/* Temperament tags */}
        {puppy.temperament_tags && puppy.temperament_tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {puppy.temperament_tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Price + Tier */}
        <div className="mt-4 flex items-baseline justify-between">
          <span className="font-display text-xl font-bold text-foreground">
            ${puppy.price?.toLocaleString()}
          </span>
          <span className="text-xs text-muted-foreground">{tierLabel}</span>
        </div>

        {/* CTA */}
        <div className="mt-5 space-y-2">
          {isAvailable && (
            <>
              <a
                href={puppy.stripe_payment_link || "#"}
                className="block w-full rounded-xl bg-accent py-3 text-center text-sm font-bold uppercase tracking-wider text-accent-foreground transition-all hover:brightness-110"
              >
                Reserve {puppy.name} &mdash; $500
              </a>
              <Link
                to="/puppies/$slug"
                params={{ slug: puppy.slug }}
                className="block text-center text-sm font-semibold text-accent transition-colors hover:text-accent/80"
              >
                Meet {puppy.name} &rarr;
              </Link>
            </>
          )}
          {isPending && (
            <button
              disabled
              className="block w-full cursor-not-allowed rounded-xl bg-amber-100 py-3 text-center text-sm font-bold uppercase tracking-wider text-amber-700"
            >
              Application Pending
            </button>
          )}
          {isReserved && (
            <Link
              to="/waitlist"
              className="block w-full rounded-xl bg-muted py-3 text-center text-sm font-bold uppercase tracking-wider text-muted-foreground transition-all hover:bg-muted/80"
            >
              Join Waitlist
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
