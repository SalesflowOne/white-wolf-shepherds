import { createFileRoute, Link } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/process")({
  component: ProcessPage,
  head: () => ({
    meta: [
      { title: "Our Process — White Wolf Shepherds" },
      {
        name: "description",
        content:
          "How we raise our White German Shepherd puppies using Puppy Culture and ENS protocol.",
      },
    ],
  }),
});

const timeline = [
  {
    week: "Week 1–2",
    title: "Birth and Early Care",
    desc: "Puppies are born in our home under close supervision. We monitor weight, nursing, and temperature daily. Neonatal handling begins immediately.",
  },
  {
    week: "Week 3–4",
    title: "Eyes Open — Neurological Stimulation (ENS)",
    desc: "Early Neurological Stimulation exercises begin. Each puppy receives individual handling to build resilience, confidence, and stress tolerance from the earliest age.",
  },
  {
    week: "Week 5–6",
    title: "Socialization Begins",
    desc: "Puppies are introduced to new surfaces, sounds, people, and gentle play. Puppy Culture enrichment protocols are followed daily to build confident, well-adjusted dogs.",
  },
  {
    week: "Week 7",
    title: "Vet Check, Vaccines, Deworming",
    desc: "Each puppy receives a full veterinary examination, first round of vaccines, deworming, and microchipping. Health records are compiled and documented.",
  },
  {
    week: "Week 8",
    title: "Ready for Your Home",
    desc: "Puppies are temperament-evaluated and matched with approved families. Each puppy leaves with a complete health record, starter kit, and lifetime of breeder support.",
  },
];

const goHomeWith = [
  "Complete health record",
  "Age-appropriate vaccines",
  "Deworming certificate",
  "Full vet examination report",
  "Microchip registration",
  "AKC registration paperwork",
  "Premium starter food",
  "Scent blanket from the litter",
  "Puppy transition guide",
  "Lifetime breeder support",
];

function ProcessPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="bg-gradient-frost pt-28 pb-16 lg:pt-36">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Our Commitment
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold text-foreground lg:text-5xl">
            How We Raise Our Puppies
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Every puppy is raised in our home using Puppy Culture and Early Neurological Stimulation
            (ENS) protocols from day one.
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="relative space-y-0">
            {timeline.map((step, i) => (
              <div key={i} className="relative flex gap-6 pb-12 last:pb-0">
                {/* Line */}
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                    {i + 1}
                  </div>
                  {i < timeline.length - 1 && <div className="mt-2 h-full w-px bg-border" />}
                </div>
                {/* Content */}
                <div className="pt-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                    {step.week}
                  </p>
                  <h3 className="mt-1 font-display text-lg font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What comes home */}
      <div className="bg-gradient-frost py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-display text-2xl font-bold text-foreground">
            What Comes Home With Your Puppy
          </h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {goHomeWith.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-lg bg-card px-4 py-3 shadow-card"
              >
                <span className="text-accent">&#10003;</span>
                <span className="text-sm text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 text-center">
        <Link
          to="/get-started"
          className="rounded-xl bg-accent px-8 py-4 text-sm font-bold uppercase tracking-wider text-accent-foreground shadow-wolf transition-all hover:brightness-110"
        >
          Apply for This Litter
        </Link>
      </div>

      <Footer />
    </div>
  );
}
