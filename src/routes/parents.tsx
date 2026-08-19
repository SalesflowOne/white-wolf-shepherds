import { createFileRoute, Link } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/parents")({
  component: ParentsPage,
  head: () => ({
    meta: [
      { title: "Meet the Parents — White Wolf Shepherds" },
      {
        name: "description",
        content:
          "Meet Mia and Haki, the White German Shepherd parents behind our White Wolf Shepherds litter.",
      },
    ],
  }),
});

function ParentsPage() {
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
            Every exceptional puppy starts with exceptional parents. Meet Mia and Haki, the heart of
            our White Wolf Shepherds family.
          </p>
        </div>
      </div>

      <div className="py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Dam */}
            <div className="rounded-2xl bg-card p-8 shadow-card">
              <div className="overflow-hidden rounded-xl bg-muted">
                <img
                  src="/parents/mia-profile.webp"
                  alt="Mia, our white German Shepherd dam"
                  width={640}
                  height={640}
                  loading="lazy"
                  className="h-64 w-full object-cover object-center"
                />
              </div>
              <h2 className="mt-6 font-display text-2xl font-bold text-foreground">
                Mia &mdash; Dam
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                  OFA Certified
                </span>
                <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                  AKC Registered
                </span>
              </div>
              <p className="mt-4 text-muted-foreground">
                Mia is graceful, affectionate, and attentive, with a sweet personality and elegant
                presence. She is playful, loving, and highly observant, with a calm demeanor that
                makes her easy to adore. Mia combines beauty, intelligence, and warmth, making her a
                wonderful dam and a true favorite of the pack.
              </p>
            </div>

            {/* Sire */}
            <div className="rounded-2xl bg-card p-8 shadow-card">
              <div className="overflow-hidden rounded-xl bg-muted">
                <img
                  src="/parents/haki-profile.webp"
                  alt="Haki, our white German Shepherd sire"
                  width={640}
                  height={640}
                  loading="lazy"
                  className="h-64 w-full object-cover object-center"
                />
              </div>
              <h2 className="mt-6 font-display text-2xl font-bold text-foreground">
                Haki &mdash; Sire
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                  OFA Certified
                </span>
                <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                  AKC Registered
                </span>
              </div>
              <p className="mt-4 text-muted-foreground">
                Haki is confident, intelligent, and loyal, with a strong presence and steady
                temperament. He is athletic, alert, and naturally protective while remaining deeply
                affectionate with his people. Haki carries himself with strength and confidence,
                making him a standout sire with both beauty and character.
              </p>
            </div>
          </div>

          <div className="mt-16">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Haki</p>
              <h2 className="mt-3 font-display text-3xl font-bold text-foreground">
                Golden Hour Portraits
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                A closer look at Haki&apos;s expression, structure, and signature white coat.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="overflow-hidden rounded-2xl bg-muted shadow-card sm:col-span-2 lg:col-span-2">
                <img
                  src="/parents/haki-golden-happy.webp"
                  alt="Haki relaxing in a beautiful park during golden hour"
                  width={500}
                  height={625}
                  loading="lazy"
                  className="h-80 w-full object-cover object-center transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="overflow-hidden rounded-2xl bg-muted shadow-card">
                <img
                  src="/parents/haki-golden-main.webp"
                  alt="Haki posing attentively in warm golden-hour light"
                  width={500}
                  height={625}
                  loading="lazy"
                  className="h-80 w-full object-cover object-center transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>

          <div className="mt-16">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Mia</p>
              <h2 className="mt-3 font-display text-3xl font-bold text-foreground">
                Grace in the Park
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                Mia&apos;s calm confidence and athletic structure come through naturally in motion
                and at rest.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="overflow-hidden rounded-2xl bg-muted shadow-card">
                <img
                  src="/parents/mia-profile.webp"
                  alt="Mia relaxing in warm golden-hour light"
                  width={640}
                  height={640}
                  loading="lazy"
                  className="h-80 w-full object-cover object-center transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="overflow-hidden rounded-2xl bg-muted shadow-card">
                <img
                  src="/parents/mia.jpg"
                  alt="Mia, our white German Shepherd dam"
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="h-80 w-full object-cover object-center transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/litter"
              className="rounded-xl bg-accent px-8 py-4 text-sm font-bold uppercase tracking-wider text-accent-foreground shadow-wolf transition-all hover:brightness-110"
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
