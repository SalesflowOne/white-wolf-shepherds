import { createFileRoute, Link } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/thank-you")({
  component: ThankYouPage,
  validateSearch: (search: Record<string, unknown>) => ({
    name: (search.name as string) || "there",
  }),
  head: () => ({
    meta: [{ title: "Thank You — White Wolf Shepherds" }],
  }),
});

function ThankYouPage() {
  const { name } = Route.useSearch();

  const cards = [
    {
      title: "Meet the Parents",
      desc: "Learn about the health-tested dam and sire behind this litter.",
      href: "/parents",
    },
    {
      title: "Our Process",
      desc: "See how we raise our puppies using Puppy Culture and ENS protocol.",
      href: "/process",
    },
    {
      title: "Health Guarantee",
      desc: "Every puppy comes with a comprehensive health guarantee.",
      href: "/health-guarantee",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="bg-gradient-frost pt-28 pb-20 lg:pt-36 lg:pb-28">
        <div className="mx-auto max-w-2xl px-6 text-center">
          {/* Success icon */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="font-display text-3xl font-bold text-foreground lg:text-4xl">
            Thank you, {name}!
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-lg text-muted-foreground">
            We received your application and will review it personally. You'll hear from us within 24–48 hours.
          </p>
        </div>
      </div>

      <div className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-center font-display text-xl font-bold text-foreground">
            While You Wait
          </h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {cards.map((card) => (
              <Link
                key={card.href}
                to={card.href}
                className="group rounded-2xl bg-card p-6 shadow-card transition-all hover:shadow-wolf"
              >
                <h3 className="font-display text-lg font-bold text-foreground group-hover:text-accent">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{card.desc}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-accent">
                  Read more &rarr;
                </span>
              </Link>
            ))}
          </div>

          {/* TODO: Add Calendly embed here for optional 10-min intro call */}
        </div>
      </div>

      <Footer />
    </div>
  );
}
