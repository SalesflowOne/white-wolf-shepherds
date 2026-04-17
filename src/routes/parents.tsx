import { createFileRoute, Link } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/parents")({
  component: ParentsPage,
  head: () => ({
    meta: [
      { title: "Meet the Parents — White Wolf Shepherds" },
      { name: "description", content: "OFA certified, AKC registered dam and sire behind our White German Shepherd litter." },
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
            Every exceptional puppy starts with exceptional parents. Both our dam and sire are health-tested, temperament-evaluated, and AKC registered.
          </p>
        </div>
      </div>

      <div className="py-16">
        <div className="mx-auto max-w-5xl px-6">
          {/* Owner: replace placeholder content with actual parent profiles */}
          <div className="grid gap-12 md:grid-cols-2">
            {/* Dam */}
            <div className="rounded-2xl bg-card p-8 shadow-card">
              <div className="flex h-64 items-center justify-center rounded-xl bg-muted">
                <span className="font-display text-5xl text-muted-foreground/20">Mia</span>
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
                Temperament, health history, and lineage details coming soon. Our dam has passed all OFA health evaluations including hips, elbows, and cardiac.
              </p>
              <a href="#" className="mt-4 inline-block text-sm font-semibold text-accent transition-colors hover:text-accent/80">
                Health Test Results &rarr;
              </a>
            </div>

            {/* Sire */}
            <div className="rounded-2xl bg-card p-8 shadow-card">
              <div className="flex h-64 items-center justify-center rounded-xl bg-muted">
                <span className="font-display text-5xl text-muted-foreground/20">Haki</span>
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
                Temperament, health history, and lineage details coming soon. Our sire has passed all OFA health evaluations including hips, elbows, and cardiac.
              </p>
              <a href="#" className="mt-4 inline-block text-sm font-semibold text-accent transition-colors hover:text-accent/80">
                Health Test Results &rarr;
              </a>
            </div>
          </div>

          {/* CTA */}
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
