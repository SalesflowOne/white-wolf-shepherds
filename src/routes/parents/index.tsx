import { createFileRoute, Link } from "@tanstack/react-router";
import SmartImage from "@/components/SmartImage";
import { SITE_URL } from "@/lib/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MeetTheParents from "@/components/MeetTheParents";
import { useParents } from "@/hooks/useParents";

export const Route = createFileRoute("/parents/")({
  component: ParentsPage,
  head: () => ({
    meta: [
      { title: "Meet the Parents — White Wolf Shepherds" },
      {
        name: "description",
        content: "Meet the health-tested, AKC-registered White German Shepherd parents behind every White Wolf Shepherds litter.",
      },
      { property: "og:title", content: "Meet the Parents — White Wolf Shepherds" },
      {
        property: "og:description",
        content: "Meet the health-tested, AKC-registered White German Shepherd parents behind every White Wolf Shepherds litter.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/parents` },
      { property: "og:image", content: `${SITE_URL}/dogs/mia/mia-pro-pose-01.webp` },
      { name: "twitter:image", content: `${SITE_URL}/dogs/mia/mia-pro-pose-01.webp` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Meet the Parents — White Wolf Shepherds" },
      {
        name: "twitter:description",
        content: "Meet the health-tested, AKC-registered White German Shepherd parents behind every White Wolf Shepherds litter.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/parents` }],
  }),
});

function ParentsPage() {
  const { parents } = useParents();

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="bg-gradient-frost pt-28 pb-16 lg:pt-36">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            The Foundation
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold text-foreground lg:text-5xl">
            Meet the Parents
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Great puppies are never an accident. Every White Wolf Shepherd puppy inherits
            temperament, structure, and coat directly from the two dogs below — health tested, AKC
            registered, and raised in our home.
          </p>
        </div>
      </div>

      <div className="py-16">
        <div className="mx-auto max-w-5xl px-6">
          <MeetTheParents eyebrow={null} title={null} subtitle={null} showCta={false} />

          {parents.map((p) => {
            const gallery = p.gallery_urls ?? [];
            if (gallery.length === 0) return null;
            return (
              <div key={p.id} className="mt-16">
                <div className="text-center">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                    {p.name}
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-bold text-foreground">
                    Up Close With {p.name}
                  </h2>
                  <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                    Expression, structure, and that signature white coat — exactly what carries into
                    the litter.
                  </p>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {gallery.slice(0, 6).map((url, i) => (
                    <div key={url + i} className="overflow-hidden rounded-2xl bg-muted shadow-card">
                      <SmartImage
                        src={url}
                        alt={`${p.name}, White German Shepherd — photo ${i + 1}`}
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="aspect-[4/5] w-full object-cover object-center transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          <div className="mt-16 text-center">
            <h2 className="font-display text-2xl font-bold text-foreground">
              This bloodline places fast.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Litters from Haki and Mia are typically fully reserved before go-home week. Claim your
              pick position while the litter is still open.
            </p>
            <Link
              to="/litter"
              className="mt-6 inline-block rounded-xl bg-accent px-8 py-4 text-sm font-bold uppercase tracking-wider text-accent-foreground shadow-wolf transition-all hover:brightness-110"
            >
              View the Current Litter
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
