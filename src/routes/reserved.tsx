import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GhlCalendarEmbed from "@/components/GhlCalendarEmbed";
import { markVideoCallBooked } from "@/lib/wws-actions.functions";

const VIDEO_CALL_URL = import.meta.env.VITE_PUBLIC_GHL_VIDEO_CALL_URL as string | undefined;

type FunnelState = {
  leadId?: string;
  name?: string;
  email?: string;
  phone?: string;
};

export const Route = createFileRoute("/reserved")({
  component: ReservedPage,
  head: () => ({
    meta: [
      { title: "You're Reserved — White Wolf Shepherds" },
      {
        name: "description",
        content: "Your spot is reserved. Book your private puppy video call to meet the puppies.",
      },
    ],
  }),
});

function ReservedPage() {
  const [funnel, setFunnel] = useState<FunnelState>({});
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("wws_funnel");
      if (raw) setFunnel(JSON.parse(raw) as FunnelState);
    } catch {
      /* ignore */
    }
  }, []);

  async function handleBooked() {
    setBooked(true);
    if (funnel.leadId) {
      try {
        await markVideoCallBooked({ data: { leadId: funnel.leadId } });
      } catch {
        /* non-blocking */
      }
    }
    window.scrollTo(0, 0);
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="bg-gradient-frost pt-28 pb-20 lg:pt-36">
        <div className="mx-auto max-w-2xl px-6">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground lg:text-4xl">
              {funnel.name ? `You're in, ${funnel.name.split(" ")[0]}!` : "You're in!"}
            </h1>
            <p className="mt-3 text-muted-foreground">
              Your spot is reserved. There's one last step — let's get you on a private puppy video
              call to meet the puppies and find your match.
            </p>
          </div>

          <div className="mt-10 rounded-2xl bg-card p-8 shadow-card sm:p-10">
            {booked ? (
              <div className="space-y-6 text-center">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Your video call is booked 🐾
                </h2>
                <p className="text-muted-foreground">
                  We can't wait to introduce you to the puppies. You'll find all the details,
                  updates, and your reservation in your portal.
                </p>
                <Link
                  to="/portal/me"
                  className="inline-block rounded-xl bg-accent px-8 py-3 text-sm font-bold uppercase tracking-wider text-accent-foreground transition-all hover:brightness-110"
                >
                  Go to My Portal →
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                <h2 className="text-center font-display text-xl font-semibold text-foreground">
                  Book Your Private Puppy Video Call
                </h2>
                <GhlCalendarEmbed
                  src={VIDEO_CALL_URL}
                  prefill={{ name: funnel.name, email: funnel.email, phone: funnel.phone }}
                  onBooked={handleBooked}
                  continueLabel="I've booked my video call — continue →"
                />
                <p className="text-center text-xs text-muted-foreground">
                  Already booked? You can manage everything in your{" "}
                  <Link to="/portal/me" className="text-accent underline">
                    portal
                  </Link>
                  .
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
