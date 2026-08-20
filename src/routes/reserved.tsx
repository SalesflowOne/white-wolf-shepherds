import { createFileRoute, Link } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/site";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NativeCalendarPicker from "@/components/NativeCalendarPicker";
import { confirmAndTrackDeposit } from "@/lib/deposit-tracking";
import { readFunnelState } from "@/lib/wws-funnel";
import { supabase, T } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reserved")({
  component: ReservedPage,
  validateSearch: (search: Record<string, unknown>) => ({
    session_id: typeof search.session_id === "string" ? search.session_id : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Meet the Puppies — White Wolf Shepherds" },
      {
        name: "description",
        content: "Book your private Meet the Puppies call after your placement application is approved.",
      },
      { property: "og:title", content: "Meet the Puppies — White Wolf Shepherds" },
      {
        property: "og:description",
        content: "Book your private Meet the Puppies call after your placement application is approved.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/reserved` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Meet the Puppies — White Wolf Shepherds" },
      {
        name: "twitter:description",
        content: "Book your private Meet the Puppies call after your placement application is approved.",
      },
      { name: "robots", content: "noindex,follow" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/reserved` }],
  }),
});

function ReservedPage() {
  const { session_id: stripeSessionId } = Route.useSearch();
  const funnel = readFunnelState();
  const [booked, setBooked] = useState(false);
  const [stage, setStage] = useState<string | null>(null);
  const [depositStatus, setDepositStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function checkStage() {
      if (!funnel?.leadId) {
        if (active) setLoading(false);
        return;
      }

      const { data } = await supabase
        .from(T.leads)
        .select("stage, deposit_status")
        .eq("id", funnel.leadId)
        .maybeSingle();

      if (!active) return;
      setStage(data?.stage ?? null);
      setDepositStatus(data?.deposit_status ?? null);

      if (data?.deposit_status === "paid") {
        await confirmAndTrackDeposit(stripeSessionId);
      }

      setLoading(false);
    }

    void checkStage();
    return () => {
      active = false;
    };
  }, [funnel?.leadId, stripeSessionId]);

  const canBook =
    stage === "placement_approved" ||
    stage === "approved" ||
    stage === "reserved" ||
    stage === "deposit_paid";

  const depositReceived = depositStatus === "paid";

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="bg-gradient-frost pt-28 pb-20 lg:pt-36">
        <div className="mx-auto max-w-2xl px-6">
          <div className="text-center">
            <h1 className="font-display text-3xl font-bold text-foreground lg:text-4xl">
              {funnel?.name ? `Welcome, ${funnel.name.split(" ")[0]}!` : "Meet the Puppies"}
            </h1>
            <p className="mt-3 text-muted-foreground">
              Book your private video call to meet the puppies and find your match.
            </p>
          </div>

          <div className="mt-10 rounded-2xl bg-card p-8 shadow-card sm:p-10">
            {loading ? (
              <p className="text-center text-muted-foreground">Loading...</p>
            ) : depositReceived && !canBook ? (
              <div className="space-y-4 text-center">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Deposit received — thank you
                </h2>
                <p className="text-muted-foreground">
                  Your $500 reservation is confirmed. We review every application personally and
                  will email you within one business day with next steps.
                </p>
                <Link
                  to="/portal/me"
                  className="inline-block rounded-xl bg-accent px-8 py-3 text-sm font-bold uppercase tracking-wider text-accent-foreground"
                >
                  Go to My Portal →
                </Link>
              </div>
            ) : !canBook ? (
              <div className="space-y-4 text-center">
                <p className="text-muted-foreground">
                  Your Meet the Puppies call unlocks after placement approval. If you've already
                  placed your deposit, we'll review your application within 24–48 hours.
                </p>
                <Link
                  to="/portal/me"
                  className="inline-block rounded-xl bg-accent px-8 py-3 text-sm font-bold uppercase tracking-wider text-accent-foreground"
                >
                  Go to My Portal →
                </Link>
              </div>
            ) : booked ? (
              <div className="space-y-6 text-center">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Your call is booked
                </h2>
                <p className="text-muted-foreground">
                  We can't wait to introduce you to the puppies. Check your portal for updates.
                </p>
                <Link
                  to="/portal/me"
                  className="inline-block rounded-xl bg-accent px-8 py-3 text-sm font-bold uppercase tracking-wider text-accent-foreground"
                >
                  Go to My Portal →
                </Link>
              </div>
            ) : funnel?.leadId ? (
              <NativeCalendarPicker
                calendarType="video_call"
                leadId={funnel.leadId}
                name={funnel.name}
                email={funnel.email}
                phone={funnel.phone}
                title="Meet the Puppies Call — pick a time"
                onBooked={() => {
                  setBooked(true);
                  window.scrollTo(0, 0);
                }}
              />
            ) : (
              <p className="text-center text-muted-foreground">
                Please{" "}
                <Link to="/get-started" className="text-accent underline">
                  start your application
                </Link>{" "}
                first.
              </p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
