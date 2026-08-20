import { createFileRoute, Link } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/health-guarantee")({
  component: HealthGuaranteePage,
  head: () => ({
    meta: [
      { title: "Health Guarantee — White Wolf Shepherds" },
      {
        name: "description",
        content:
          "Our written 1-year genetic health guarantee: what is covered, buyer responsibilities, parent health testing, and lifetime return commitment.",
      },
      { property: "og:title", content: "Health Guarantee — White Wolf Shepherds" },
      {
        property: "og:description",
        content:
          "Our written 1-year genetic health guarantee: what is covered, buyer responsibilities, parent health testing, and lifetime return commitment.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/health-guarantee` },
      { property: "og:image", content: `${SITE_URL}/dogs/haki/haki-golden-hour-05.webp` },
      { name: "twitter:image", content: `${SITE_URL}/dogs/haki/haki-golden-hour-05.webp` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Health Guarantee — White Wolf Shepherds" },
      {
        name: "twitter:description",
        content:
          "Our written 1-year genetic health guarantee: what is covered, buyer responsibilities, parent health testing, and lifetime return commitment.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/health-guarantee` }],
  }),
});

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl bg-card p-8 shadow-card print:shadow-none print:border print:border-border">
      <h2 className="font-display text-xl font-bold text-foreground">{title}</h2>
      <div className="mt-4 space-y-4 text-muted-foreground leading-relaxed">{children}</div>
    </section>
  );
}

function HealthGuaranteePage() {
  function handlePrint() {
    window.print();
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="bg-gradient-frost pt-28 pb-16 lg:pt-36 print:bg-white print:pt-8">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent print:text-foreground">
            Our Promise
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold text-foreground lg:text-5xl">
            Health Guarantee
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Every White Wolf Shepherd puppy is placed with a written 1-year genetic health guarantee.
            This page summarizes the terms so you and your veterinarian can review them before you
            commit.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 print:hidden">
            <button
              type="button"
              onClick={handlePrint}
              className="rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Print / Save as PDF
            </button>
            <Link
              to="/get-started"
              className="rounded-xl bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wider text-accent-foreground shadow-wolf transition-all hover:brightness-110"
            >
              Apply for This Litter
            </Link>
          </div>
        </div>
      </div>

      <div id="health-guarantee-document" className="py-16 print:py-8">
        <div className="mx-auto max-w-3xl space-y-8 px-6">
          <Section title="What is covered, and for how long">
            <p>
              White Wolf Shepherds provides a <strong className="text-foreground">1-year genetic health guarantee</strong>{" "}
              from the puppy&apos;s go-home date. During this period, if a licensed veterinarian
              diagnoses a condition that is substantially attributable to inherited genetics and
              materially affects the puppy&apos;s quality of life, the guarantee applies as described
              in the remedy section below.
            </p>
            <p>
              This guarantee covers hereditary or congenital conditions — not routine puppyhood
              illness, injury, or conditions that develop from environment, nutrition, or care after
              placement.
            </p>
          </Section>

          <Section title="What is not covered">
            <ul className="list-disc space-y-2 pl-5">
              <li>Injuries, accidents, or trauma after go-home</li>
              <li>Illness from exposure to unvaccinated dogs, parasites, or environmental hazards</li>
              <li>Conditions caused by neglect, improper diet, or failure to follow veterinary guidance</li>
              <li>Elective procedures, cosmetic issues, or normal breed variation</li>
              <li>Conditions diagnosed without supporting veterinary documentation</li>
              <li>Any puppy placed without adherence to the buyer responsibilities below</li>
            </ul>
          </Section>

          <Section title="Parent health testing">
            <p>
              Our breeding dogs are health-tested before being bred. Results for the dam and sire of
              your litter are available on request and summarized in your puppy packet at pickup.
            </p>
            <p className="rounded-lg border border-dashed border-border bg-muted/40 p-4 text-sm">
              <strong className="text-foreground">TODO(owner):</strong> List the specific panels
              completed on the parents (for example: hip and elbow evaluations, cardiac evaluation, DM,
              and any breed-specific genetic panels), including dates and result summaries.
            </p>
          </Section>

          <Section title="Buyer responsibilities (required to keep the guarantee valid)">
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Schedule a licensed veterinarian exam within{" "}
                <strong className="text-foreground">72 hours</strong> of pickup or delivery and
                retain the exam report
              </li>
              <li>Maintain age-appropriate vaccinations and deworming on your vet&apos;s schedule</li>
              <li>Feed a quality diet appropriate for a large-breed puppy</li>
              <li>
                Notify White Wolf Shepherds promptly if a serious health concern arises — before
                major treatment decisions when possible
              </li>
              <li>
                Provide veterinary records supporting any guarantee claim within{" "}
                <strong className="text-foreground">14 days</strong> of diagnosis
              </li>
            </ul>
            <p className="rounded-lg border border-dashed border-border bg-muted/40 p-4 text-sm">
              <strong className="text-foreground">TODO(owner):</strong> Confirm the exact vet-exam
              window (72 hours vs. another timeframe) and any additional requirements you want in
              the signed contract.
            </p>
          </Section>

          <Section title="Remedy if a covered condition is confirmed">
            <p>
              If a covered genetic condition is confirmed by veterinary documentation and the buyer
              has met all responsibilities above, White Wolf Shepherds will offer one of the
              following remedies, at the breeder&apos;s discretion:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Replacement puppy from a future litter, when available, of comparable quality</li>
              <li>
                Partial credit toward a future White Wolf Shepherds puppy, up to the original purchase
                price
              </li>
            </ul>
            <p className="rounded-lg border border-dashed border-border bg-muted/40 p-4 text-sm">
              <strong className="text-foreground">TODO(owner):</strong> Specify exact remedy terms
              (replacement vs. credit caps, whether veterinary costs are reimbursed, and any dollar
              limits) for the signed purchase contract.
            </p>
          </Section>

          <Section title="Right of first refusal / lifetime return commitment">
            <p>
              If you are ever unable to keep your dog — for any reason, at any age — contact White
              Wolf Shepherds first. We will always take our dogs back or help place them in an
              approved home. No White Wolf Shepherd will ever be surrendered to a shelter because
              you could not reach us.
            </p>
            <p>
              This commitment is separate from the 1-year genetic guarantee and does not expire.
            </p>
          </Section>

          <Section title="Documentation provided at pickup">
            <ul className="list-disc space-y-2 pl-5">
              <li>Written copy of this health guarantee</li>
              <li>Veterinary health certificate and exam summary</li>
              <li>Vaccination and deworming record with dates</li>
              <li>Microchip registration information</li>
              <li>
                Parent health testing summary{" "}
                <span className="text-sm">(full reports available on request)</span>
              </li>
              <li>Puppy care and feeding guidance</li>
            </ul>
          </Section>

          <p className="text-center text-xs text-muted-foreground print:text-foreground">
            White Wolf Shepherds · {SITE_URL.replace("https://", "")} · This summary supports our
            advertising claims; the signed purchase contract governs if any wording differs.
          </p>

          <div className="text-center print:hidden">
            <Link
              to="/get-started"
              className="rounded-xl bg-accent px-8 py-4 text-sm font-bold uppercase tracking-wider text-accent-foreground shadow-wolf transition-all hover:brightness-110"
            >
              Apply for This Litter
            </Link>
          </div>
        </div>
      </div>

      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}
