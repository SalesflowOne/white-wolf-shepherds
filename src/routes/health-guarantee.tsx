import { createFileRoute, Link } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/health-guarantee")({
  component: HealthGuaranteePage,
  head: () => ({
    meta: [
      { title: "Health Guarantee — White Wolf Shepherds" },
      { name: "description", content: "Our comprehensive health guarantee for White German Shepherd puppies." },
    ],
  }),
});

function HealthGuaranteePage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="bg-gradient-frost pt-28 pb-16 lg:pt-36">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Our Promise
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold text-foreground lg:text-5xl">
            Health Guarantee
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            We stand behind the health of every puppy we place. Our guarantee reflects our confidence in our breeding program.
          </p>
        </div>
      </div>

      <div className="py-16">
        <div className="mx-auto max-w-3xl px-6 space-y-12">
          {/* Health Guarantee Card */}
          <div className="rounded-2xl border-2 border-accent/20 bg-card p-8 shadow-card">
            <h2 className="font-display text-xl font-bold text-foreground">
              Genetic Health Guarantee
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Every puppy comes with a comprehensive health guarantee covering genetic conditions. Our health-tested parents reduce the risk of hereditary issues, and we stand behind every puppy we place.
            </p>
            <p className="mt-4 text-sm text-muted-foreground italic">
              {/* Owner: add specific guarantee duration and terms here */}
              Specific terms, duration, and coverage details to be provided by the breeder.
            </p>
          </div>

          {/* Right of First Refusal */}
          <div className="rounded-2xl bg-card p-8 shadow-card">
            <h2 className="font-display text-xl font-bold text-foreground">
              Right of First Refusal
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              If you are ever unable to keep your dog — for any reason, at any age — we ask that you contact us first. We will always take our dogs back. No White Wolf Shepherd will ever end up in a shelter.
            </p>
          </div>

          {/* Vet Protocol */}
          <div className="rounded-2xl bg-card p-8 shadow-card">
            <h2 className="font-display text-xl font-bold text-foreground">
              Veterinary Protocol
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Every puppy receives a complete veterinary examination before placement, including age-appropriate vaccines, deworming, and microchipping. All health records are provided at pickup.
            </p>
            <p className="mt-4 text-sm text-muted-foreground italic">
              {/* Owner: add specific vet protocol details here */}
              Detailed vet protocol and vaccine schedule to be provided by the breeder.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              to="/apply"
              className="rounded-xl bg-accent px-8 py-4 text-sm font-bold uppercase tracking-wider text-accent-foreground shadow-wolf transition-all hover:brightness-110"
            >
              Apply for This Litter
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
