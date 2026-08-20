import { createFileRoute, Link } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/site";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/faq")({
  component: FAQPage,
  head: () => ({
    meta: [
      { title: "FAQ — White Wolf Shepherds" },
      {
        name: "description",
        content: "Answers about our White German Shepherd puppies, pricing, deposits, reservation process, health testing and travel options.",
      },
      { property: "og:title", content: "FAQ — White Wolf Shepherds" },
      {
        property: "og:description",
        content: "Answers about our White German Shepherd puppies, pricing, deposits, reservation process, health testing and travel options.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/faq` },
      { property: "og:image", content: `${SITE_URL}/puppies/litter/litter-park-group-05.webp` },
      { name: "twitter:image", content: `${SITE_URL}/puppies/litter/litter-park-group-05.webp` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "FAQ — White Wolf Shepherds" },
      {
        name: "twitter:description",
        content: "Answers about our White German Shepherd puppies, pricing, deposits, reservation process, health testing and travel options.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/faq` }],
  }),
});

const faqs = [
  {
    q: "Is the $500 Reservation Fee refundable?",
    a: "The Reservation Fee is non-refundable once paid. It is applied in full toward your total purchase price and secures your pick position in the litter.",
  },
  {
    q: "How is pick order determined?",
    a: "Pick order is determined by the order in which Reservation Fees are received. The first family to pay reserves first pick, the second family gets second pick, and so on.",
  },
  {
    q: "Can I choose a specific puppy or just a sex?",
    a: "You can indicate a preferred puppy on your application, but final selection happens in pick order. Higher-tier reservations get earlier picks. We also help match puppies to families based on temperament and lifestyle.",
  },
  {
    q: "What health testing have the parents had?",
    a: "Both parents are health tested for hips, elbows, and cardiac health. A full genetic panel has been completed. Visit our Parents page for detailed health test results.",
  },
  {
    q: "Do you ship puppies?",
    a: "We strongly prefer in-person pickup so we can meet your family and ensure a smooth transition. If you are unable to pick up locally, please contact us to discuss options.",
  },
  {
    q: "Can I visit or do a video call before reserving?",
    a: "We welcome video calls with approved applicants. In-person visits may be arranged closer to the pickup date. We share weekly photo and video updates with all reserved families.",
  },
  {
    q: "What is included in the purchase price?",
    a: "Your purchase price includes the puppy, complete health records, age-appropriate vaccines, deworming, microchip, AKC registration paperwork, premium starter food, scent blanket, puppy transition guide, and lifetime breeder support.",
  },
  {
    q: "What is your health guarantee?",
    a: "Every puppy comes with a comprehensive health guarantee covering genetic conditions. Our health-tested parents reduce the risk of hereditary issues. Visit our Health Guarantee page for full details.",
  },
  {
    q: "What if I am not approved?",
    a: "We review every application personally. If we feel a match is not right, we will let you know honestly and respectfully. Our goal is to place every puppy in the best possible home.",
  },
  {
    q: "What if my preferred puppy is reserved by someone else?",
    a: "If your preferred puppy has been reserved, we will work with you to match you with another puppy from the litter. If no suitable match is available, you may join our waitlist for a future litter.",
  },
  {
    q: "Are your dogs AKC registered?",
    a: "Yes, all of our dogs are AKC registered. Each puppy comes with full AKC registration paperwork.",
  },
  {
    q: "What is ENS / Puppy Culture?",
    a: "Early Neurological Stimulation (ENS) is a research-backed protocol that introduces mild stressors to newborn puppies to improve their resilience, confidence, and stress tolerance. Puppy Culture is a comprehensive socialization and enrichment program. We use both from day one.",
  },
  {
    q: "What food do you recommend?",
    a: "Each puppy goes home with a supply of the premium food they have been raised on, along with feeding guidelines. We are happy to discuss nutrition recommendations based on your puppy's specific needs.",
  },
  {
    q: "When can I pick up my puppy?",
    a: "Puppies are ready for their new homes at 8 weeks of age. We will coordinate a pickup date with you once the puppies are cleared by our veterinarian.",
  },
  {
    q: "Do you have a waitlist for future litters?",
    a: "Yes. If all puppies from the current litter are reserved, you can join our waitlist to be notified first about our next litter. Visit our Waitlist page to apply.",
  },
];

function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="bg-gradient-frost pt-28 pb-16 lg:pt-36">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Common Questions
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold text-foreground lg:text-5xl">
            Frequently Asked Questions
          </h1>
        </div>
      </div>

      <div className="py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-xl border border-border bg-card overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="pr-4 text-sm font-semibold text-foreground">{faq.q}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openIndex === i && (
                  <div className="border-t border-border px-6 py-5">
                    <p className="text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground">Still have questions?</p>
            <Link
              to="/get-started"
              className="mt-4 inline-block rounded-xl bg-accent px-8 py-4 text-sm font-bold uppercase tracking-wider text-accent-foreground shadow-wolf transition-all hover:brightness-110"
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
