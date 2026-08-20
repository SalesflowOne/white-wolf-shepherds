import { createFileRoute, Link } from "@tanstack/react-router";
import CollarBadge from "@/components/CollarBadge";
import { useEffect, useState } from "react";
import { supabase, T } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LitterPhotoStrip from "@/components/LitterPhotoStrip";
import MeetTheParents from "@/components/MeetTheParents";
import { useCurrentLitter, useParents, formatLongDate, ageFrom } from "@/hooks/useParents";
import SmartImage from "@/components/SmartImage";
import TrustStrip from "@/components/TrustStrip";
import PriceBlock from "@/components/PriceBlock";
import { PRICING, SITE_URL, formatUSD } from "@/lib/site";
import { reservationCheckoutUrl } from "@/lib/stripe-links";

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
  gallery_urls: string[] | null;
  video_url: string | null;
  stripe_payment_link: string | null;
  collar_color: string | null;
  priority_order: number | null;
};

export const Route = createFileRoute("/puppies/$slug")({
  component: PuppyProfilePage,
  loader: async ({ params }) => {
    const { data } = await supabase
      .from(T.puppies)
      .select("name,sex,status,personality_bio,image_url,price")
      .eq("slug", params.slug)
      .maybeSingle();
    return { seo: (data as SeoPuppy | null) ?? null };
  },
  head: ({ params, loaderData }) => {
    const url = `${SITE_URL}/puppies/${params.slug}`;
    const p = loaderData?.seo;
    if (!p) {
      return {
        meta: [
          { title: "Puppy Unavailable — White Wolf Shepherds" },
          { name: "robots", content: "noindex" },
        ],
        links: [{ rel: "canonical", href: url }],
      };
    }
    const title = `${p.name} — White German Shepherd Puppy | White Wolf Shepherds`;
    const description =
      p.personality_bio?.slice(0, 155) ??
      `Meet ${p.name}, a health-tested white German Shepherd puppy. ${formatUSD(
        p.price ?? PRICING.price,
      )} all-in with a ${formatUSD(PRICING.deposit)} refundable deposit.`;
    const image = p.image_url ? `${SITE_URL}${p.image_url}` : null;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        ...(image
          ? [
              { property: "og:image", content: image },
              { name: "twitter:image", content: image },
            ]
          : []),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: p.name,
            description,
            ...(image ? { image } : {}),
            brand: { "@type": "Brand", name: "White Wolf Shepherds" },
            offers: {
              "@type": "Offer",
              price: p.price ?? PRICING.price,
              priceCurrency: PRICING.currency,
              url,
              availability:
                p.status === "available"
                  ? "https://schema.org/InStock"
                  : "https://schema.org/SoldOut",
            },
          }),
        },
      ],
    };
  },
});

type SeoPuppy = {
  name: string;
  sex: string | null;
  status: string | null;
  personality_bio: string | null;
  image_url: string | null;
  price: number | null;
};

function MetaItem({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-medium capitalize text-foreground">{value}</dd>
    </div>
  );
}

function PuppyProfilePage() {
  const { slug } = Route.useParams();
  const [puppy, setPuppy] = useState<Puppy | null>(null);
  const [siblings, setSiblings] = useState<Puppy[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const litter = useCurrentLitter();
  const { dam, sire } = useParents();

  useEffect(() => {
    async function fetchPuppy() {
      const { data, error } = await supabase.from(T.puppies).select("*").eq("slug", slug).single();

      if (error || !data) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setPuppy(data as Puppy);

      // Fetch available siblings
      const { data: sibs } = await supabase
        .from(T.puppies)
        .select("*")
        .eq("status", "available")
        .neq("id", data.id)
        .order("priority_order", { ascending: true })
        .limit(3);

      if (sibs) setSiblings(sibs as Puppy[]);
      setLoading(false);
    }

    fetchPuppy();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex min-h-[60vh] items-center justify-center pt-20">
          <div className="animate-pulse text-center">
            <div className="mx-auto h-8 w-48 rounded bg-muted" />
            <div className="mx-auto mt-4 h-4 w-32 rounded bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !puppy) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex min-h-[60vh] flex-col items-center justify-center pt-20">
          <h1 className="font-display text-4xl font-bold text-foreground">Puppy Not Found</h1>
          <p className="mt-4 text-muted-foreground">
            This puppy profile doesn't exist or may have been removed.
          </p>
          <Link
            to="/litter"
            className="mt-8 rounded-xl bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wider text-accent-foreground transition-all hover:brightness-110"
          >
            View Available Puppies
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const isAvailable = puppy.status === "available";
  const isPending = puppy.status === "pending";
  const isReserved = puppy.status === "reserved" || puppy.status === "sold";

  const tierLabel =
    puppy.tier === "premier"
      ? "Premier Selection"
      : puppy.tier === "preferred"
        ? "Preferred Pick"
        : "Pet Companion";

  const tierColor =
    puppy.tier === "premier"
      ? "bg-amber-100 text-amber-800"
      : puppy.tier === "preferred"
        ? "bg-slate-100 text-slate-700"
        : "bg-gray-100 text-gray-600";

  const sexColor = puppy.sex === "male" ? "bg-blue-100 text-blue-700" : "bg-rose-100 text-rose-700";
  const sexLabel = puppy.sex === "male" ? "Male" : "Female";

  // Dates fall back to the litter record so profiles never show gaps
  const dobValue = puppy.dob ?? litter?.born_date ?? null;
  const readyValue = puppy.ready_date ?? litter?.ready_date ?? null;
  const bornLabel = formatLongDate(dobValue);
  const ageLabel = ageFrom(dobValue);
  const readyLabel = formatLongDate(readyValue);

  // Parse video embed URL
  const videoEmbed = puppy.video_url ? getVideoEmbed(puppy.video_url) : null;

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      <Navbar />

      <div className="pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-6">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/litter" className="transition-colors hover:text-foreground">
              Current Litter
            </Link>
            <span>&rsaquo;</span>
            <span className="text-foreground">{puppy.name}</span>
          </nav>

          {/* Two-column layout */}
          <div className="grid gap-12 lg:grid-cols-2">
            {/* LEFT COLUMN — Photos + Video */}
            <div>
              {/* Primary photo */}
              {puppy.image_url ? (
                <div className="overflow-hidden rounded-2xl">
                  <SmartImage
                    src={puppy.image_url}
                    alt={`${puppy.name}, a white German Shepherd puppy${
                      puppy.collar_color ? ` wearing a ${puppy.collar_color} collar` : ""
                    }`}
                    priority
                    sizes="(min-width: 1024px) 600px, 92vw"
                    className={`aspect-[4/5] w-full object-cover object-center ${isReserved ? "grayscale" : ""}`}
                  />
                </div>
              ) : (
                <div
                  className={`flex aspect-[4/5] w-full items-center justify-center rounded-2xl bg-muted ${isReserved ? "grayscale" : ""}`}
                >
                  <span className="font-display text-8xl font-bold text-muted-foreground/20">
                    {puppy.name[0]}
                  </span>
                </div>
              )}

              {/* Gallery */}
              {puppy.gallery_urls && puppy.gallery_urls.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {puppy.gallery_urls.slice(0, 6).map((url, i) => (
                    <div key={i} className="overflow-hidden rounded-xl">
                      <SmartImage
                        src={url}
                        alt={`${puppy.name} photo ${i + 1}`}
                        sizes="(min-width: 1024px) 290px, 45vw"
                        className="aspect-[4/5] w-full object-cover object-center"
                      />
                    </div>
                  ))}
                </div>
              )}

              <LitterPhotoStrip puppyName={puppy.name} />

              {/* Video */}
              {videoEmbed && (
                <div className="mt-4 overflow-hidden rounded-xl">
                  <div className="aspect-video">
                    <iframe
                      src={videoEmbed}
                      className="h-full w-full"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN — Details */}
            <div>
              <h1 className="font-display text-4xl font-bold text-foreground lg:text-5xl">
                {puppy.name}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${sexColor}`}>
                  {sexLabel}
                </span>
                <CollarBadge color={puppy.collar_color} />
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${tierColor}`}
                >
                  {tierLabel}
                </span>
              </div>

              {/* Price + deposit terms */}
              <PriceBlock price={puppy.price} className="mt-6" />

              {/* Vitals / metadata */}
              <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 rounded-2xl border border-border bg-card/60 p-5">
                <MetaItem label="Date of Birth" value={bornLabel} />
                <MetaItem label="Age Today" value={ageLabel} />
                <MetaItem label="Go-Home Date" value={readyLabel} />
                <MetaItem label="Litter" value={litter?.name ?? null} />
                <MetaItem label="Collar" value={puppy.collar_color} />
                <MetaItem label="Sex" value={sexLabel} />
                <MetaItem label="Dam" value={dam?.name ?? null} />
                <MetaItem label="Sire" value={sire?.name ?? null} />
              </dl>

              <p className="mt-3 text-xs text-muted-foreground">
                Every puppy goes home vet-checked, dewormed, age-appropriately vaccinated,
                microchipped, and AKC-registerable — with a written health guarantee and lifetime
                breeder support.
              </p>

              {/* Temperament tags */}
              {puppy.temperament_tags && puppy.temperament_tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {puppy.temperament_tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Bio */}
              {puppy.personality_bio && (
                <div className="mt-8">
                  <p className="text-lg leading-relaxed text-foreground/80">
                    {puppy.personality_bio}
                  </p>
                </div>
              )}

              {/* Ideal home */}
              {puppy.ideal_home && (
                <div className="mt-6">
                  <h3 className="font-display text-lg font-bold text-foreground">Ideal Home</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{puppy.ideal_home}</p>
                </div>
              )}

              {/* Status-aware CTA */}
              <div className="mt-8">
                {isAvailable && (
                  <div>
                    {puppy.stripe_payment_link ? (
                      <a
                        href={reservationCheckoutUrl({
                          puppyPaymentLink: puppy.stripe_payment_link,
                        })}
                        className="block w-full rounded-xl bg-accent py-4 text-center text-sm font-bold uppercase tracking-wider text-accent-foreground shadow-wolf transition-all hover:brightness-110"
                      >
                        Reserve {puppy.name} &mdash; $500 Reservation Fee
                      </a>
                    ) : (
                      <Link
                        to="/get-started"
                        search={{ step: "puppy", puppy: puppy.slug ?? puppy.id }}
                        className="block w-full rounded-xl bg-accent py-4 text-center text-sm font-bold uppercase tracking-wider text-accent-foreground shadow-wolf transition-all hover:brightness-110"
                      >
                        Apply to Reserve {puppy.name} &mdash; $500 Deposit
                      </Link>
                    )}
                    <Link
                      to="/get-started"
                      search={{ step: "puppy", puppy: puppy.slug ?? puppy.id }}
                      className="mt-3 block text-center text-sm font-semibold text-accent hover:underline"
                    >
                      Prefer to apply first? Start the 2-minute application &rarr;
                    </Link>
                    <p className="mt-3 text-center text-xs text-muted-foreground">
                      {PRICING.depositTerms}
                    </p>
                    <div className="mt-5">
                      <TrustStrip />
                    </div>
                  </div>
                )}
                {isPending && (
                  <div>
                    <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-center">
                      <p className="text-sm font-semibold text-amber-800">
                        An application for {puppy.name} is under review.
                      </p>
                    </div>
                    <button
                      disabled
                      className="mt-3 block w-full cursor-not-allowed rounded-xl bg-amber-100 py-4 text-center text-sm font-bold uppercase tracking-wider text-amber-700"
                    >
                      Application Pending
                    </button>
                    <Link
                      to="/litter"
                      className="mt-3 block text-center text-sm font-semibold text-accent transition-colors hover:text-accent/80"
                    >
                      Apply for a different puppy &rarr;
                    </Link>
                  </div>
                )}
                {isReserved && (
                  <div>
                    <div className="rounded-xl border border-border bg-muted p-4 text-center">
                      <p className="text-sm font-semibold text-muted-foreground">
                        {puppy.name} has been reserved.
                      </p>
                    </div>
                    <Link
                      to="/litter"
                      className="mt-3 block w-full rounded-xl bg-accent py-4 text-center text-sm font-bold uppercase tracking-wider text-accent-foreground transition-all hover:brightness-110"
                    >
                      View Available Puppies &rarr;
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Available Siblings */}
          {siblings.length > 0 && (
            <section className="mt-20">
              <h2 className="font-display text-2xl font-bold text-foreground">
                Available Siblings
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {siblings.map((sib) => (
                  <Link
                    key={sib.id}
                    to="/puppies/$slug"
                    params={{ slug: sib.slug }}
                    className="group overflow-hidden rounded-2xl bg-card shadow-card transition-all hover:shadow-wolf"
                  >
                    {sib.image_url ? (
                      <SmartImage
                        src={sib.image_url}
                        alt={`${sib.name}, a white German Shepherd puppy`}
                        sizes="(min-width: 1024px) 340px, 45vw"
                        className="aspect-[4/5] w-full object-cover object-center transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                      />
                    ) : (
                      <div className="flex aspect-[4/5] w-full items-center justify-center bg-muted">
                        <span className="font-display text-4xl font-bold text-muted-foreground/20">
                          {sib.name[0]}
                        </span>
                      </div>
                    )}
                    <div className="p-5">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display text-lg font-bold text-card-foreground">
                          {sib.name}
                        </h3>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                            sib.sex === "male"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-rose-100 text-rose-700"
                          }`}
                        >
                          {sib.sex === "male" ? "Male" : "Female"}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="font-display text-lg font-bold text-foreground">
                          ${sib.price?.toLocaleString()}
                        </span>
                        <span className="text-sm font-semibold text-accent">
                          Meet {sib.name} &rarr;
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Meet the Parents — pulled live from the parent profiles */}
          <MeetTheParents
            className="mt-20"
            eyebrow="Behind This Litter"
            title="Meet the Parents"
            subtitle={`${puppy.name} comes from health-tested, AKC-registered White Shepherd parents — structure, temperament, and coat you can trace.`}
          />
        </div>
      </div>

      {isAvailable && (
        <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between gap-3 border-t border-border bg-card px-4 py-3 shadow-wolf lg:hidden">
          <div className="min-w-0">
            <p className="truncate font-display text-sm font-bold text-foreground">{puppy.name}</p>
            <p className="text-xs text-muted-foreground">
              {formatUSD(puppy.price ?? PRICING.price)} · {formatUSD(PRICING.deposit)} deposit
            </p>
          </div>
          <Link
            to="/get-started"
            search={{ step: "home", puppy: slug }}
            className="shrink-0 rounded-lg bg-accent px-5 py-3 text-xs font-bold uppercase tracking-wider text-accent-foreground"
          >
            Reserve
          </Link>
        </div>
      )}

      <Footer />
    </div>
  );
}

function getVideoEmbed(url: string): string | null {
  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;

  // Direct MP4 — return as-is for <video> tag (handled differently if needed)
  if (url.endsWith(".mp4")) return url;

  return url;
}
