import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { supabase, T } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Lead = {
  id: string;
  full_name: string | null;
  email: string | null;
  approval_sent_at: string | null;
  created_at: string | null;
  preferred_puppy_id: string | null;
};

type PuppyInfo = {
  name: string;
  tier: string | null;
  priority_order: number | null;
};

export const Route = createFileRoute("/approved/$token")({
  component: ApprovedPage,
  head: () => ({
    meta: [{ title: "Your Reservation — White Wolf Shepherds" }],
  }),
});

function ApprovedPage() {
  const { token } = Route.useParams();
  const [lead, setLead] = useState<Lead | null>(null);
  const [puppy, setPuppy] = useState<PuppyInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);
  const [expired, setExpired] = useState(false);

  const stripeLink =
    typeof window !== "undefined"
      ? import.meta.env.VITE_PUBLIC_STRIPE_RESERVATION_LINK ||
        import.meta.env.NEXT_PUBLIC_STRIPE_RESERVATION_LINK ||
        "#"
      : "#";

  useEffect(() => {
    async function fetchLead() {
      const { data, error } = await supabase
        .from(T.leads)
        .select("id, full_name, email, approval_sent_at, created_at, preferred_puppy_id")
        .eq("approval_token", token)
        .single();

      if (error || !data) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setLead(data as Lead);

      // Fetch preferred puppy name if set
      if (data.preferred_puppy_id) {
        const { data: puppyData } = await supabase
          .from(T.puppies)
          .select("name, tier, priority_order")
          .eq("id", data.preferred_puppy_id)
          .single();
        if (puppyData) setPuppy(puppyData as PuppyInfo);
      }

      setLoading(false);
    }

    fetchLead();
  }, [token]);

  // Countdown timer
  useEffect(() => {
    if (!lead) return;

    const baseTime = lead.approval_sent_at || lead.created_at;
    if (!baseTime) return;

    const expiryTime = new Date(baseTime).getTime() + 48 * 60 * 60 * 1000;

    const tick = () => {
      const now = Date.now();
      const diff = expiryTime - now;

      if (diff <= 0) {
        setExpired(true);
        setTimeLeft(null);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ hours, minutes, seconds });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [lead]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex min-h-[60vh] items-center justify-center pt-20">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex min-h-[60vh] flex-col items-center justify-center pt-20 px-6">
          <div className="mx-auto max-w-md text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Invalid or Expired Link
            </h1>
            <p className="mt-4 text-muted-foreground">
              This reservation link is invalid or has expired. Please contact us if you believe this
              is an error.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const firstName = lead?.full_name?.split(" ")[0] || "there";

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="bg-gradient-frost pt-28 pb-20 lg:pt-36">
        <div className="mx-auto max-w-2xl px-6">
          {/* Header */}
          <div className="text-center">
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
              Congratulations, {firstName}!
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Your application has been approved.
            </p>
          </div>

          {/* Reservation summary */}
          <div className="mt-10 rounded-2xl bg-card p-8 shadow-card">
            <h2 className="font-display text-lg font-bold text-foreground">Reservation Summary</h2>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between border-b border-border pb-3">
                <span className="text-sm text-muted-foreground">Puppy</span>
                <span className="text-sm font-semibold text-foreground">
                  {puppy ? puppy.name : "Your preferred selection from the litter"}
                </span>
              </div>
              <div className="flex justify-between border-b border-border pb-3">
                <span className="text-sm text-muted-foreground">Reservation Fee</span>
                <span className="text-sm font-semibold text-foreground">$500</span>
              </div>
              <div className="flex justify-between border-b border-border pb-3">
                <span className="text-sm text-muted-foreground">Applied toward</span>
                <span className="text-sm font-semibold text-foreground">
                  Your total purchase price
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Pick position</span>
                <span className="text-sm font-semibold text-foreground">
                  Determined by reservation receipt order
                </span>
              </div>
            </div>
          </div>

          {/* Policy box */}
          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-800">
              Important Policy
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-amber-900">
              <li className="flex items-start gap-2">
                <span className="mt-1 shrink-0">&#8226;</span>
                This fee is non-refundable once paid
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 shrink-0">&#8226;</span>
                Applied in full toward your final purchase price
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 shrink-0">&#8226;</span>
                Your pick order position is set at the moment payment is received
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 shrink-0">&#8226;</span>
                This reservation link expires in 48 hours
              </li>
            </ul>
          </div>

          {/* Countdown timer */}
          {timeLeft && !expired && (
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">This link expires in</p>
              <div className="mt-2 flex items-center justify-center gap-2 font-mono text-2xl font-bold text-foreground">
                <span className="rounded-lg bg-card px-3 py-2 shadow-card">
                  {String(timeLeft.hours).padStart(2, "0")}
                </span>
                <span>:</span>
                <span className="rounded-lg bg-card px-3 py-2 shadow-card">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </span>
                <span>:</span>
                <span className="rounded-lg bg-card px-3 py-2 shadow-card">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-8">
            {expired ? (
              <div className="rounded-xl border border-border bg-muted p-6 text-center">
                <p className="font-semibold text-foreground">This reservation window has closed.</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Please contact us to request a new link.
                </p>
              </div>
            ) : (
              <a
                href={stripeLink}
                className="block w-full rounded-xl bg-accent py-4 text-center text-sm font-bold uppercase tracking-wider text-accent-foreground shadow-wolf transition-all hover:brightness-110"
              >
                Complete Your Reservation &mdash; Pay $500
              </a>
            )}
          </div>

          {/* Portal access */}
          <div className="mt-12 rounded-2xl border border-border bg-card p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Access your portal any time at{" "}
              <span className="font-semibold text-foreground">[site]/portal</span> using the email
              you applied with.
            </p>
            <Link
              to="/portal"
              className="mt-4 inline-block rounded-xl border border-border px-6 py-3 text-sm font-bold uppercase tracking-wider text-foreground transition-all hover:bg-muted"
            >
              Go to My Portal &rarr;
            </Link>
          </div>

          {/* What happens next */}
          <div className="mt-12">
            <h2 className="font-display text-xl font-bold text-foreground">What happens next</h2>
            <div className="mt-6 space-y-6">
              {[
                { num: 1, text: "Payment confirmation emailed to you instantly" },
                { num: 2, text: "Purchase contract sent within 24 hours" },
                { num: 3, text: "Weekly puppy photo and video updates begin immediately" },
                { num: 4, text: "Final balance due 1 week before your pickup date" },
              ].map(({ num, text }) => (
                <div key={num} className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                    {num}
                  </div>
                  <p className="pt-1 text-foreground">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
