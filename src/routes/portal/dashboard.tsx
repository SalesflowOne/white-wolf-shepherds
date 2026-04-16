import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Lead = {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  city: string | null;
  state: string | null;
  preferred_sex: string | null;
  preferred_puppy_id: string | null;
  timeline: string | null;
  stage: string | null;
  score: number | null;
  approval_token: string | null;
  approval_sent_at: string | null;
  created_at: string | null;
};

type PuppyInfo = {
  id: string;
  name: string;
  slug: string;
  sex: string | null;
  tier: string | null;
  price: number | null;
  status: string | null;
  image_url: string | null;
};

type Reservation = {
  id: string;
  puppy_id: string | null;
  amount: number | null;
  tier: string | null;
  pick_order: number | null;
  created_at: string | null;
};

export const Route = createFileRoute("/portal/dashboard")({
  component: PortalDashboard,
  head: () => ({
    meta: [{ title: "My Application — White Wolf Shepherds" }],
  }),
});

function PortalDashboard() {
  const navigate = useNavigate();
  const [lead, setLead] = useState<Lead | null>(null);
  const [puppy, setPuppy] = useState<PuppyInfo | null>(null);
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);
  const [noLead, setNoLead] = useState(false);

  useEffect(() => {
    async function loadData() {
      // Check auth
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate({ to: "/portal" });
        return;
      }

      // Fetch lead by user_id
      const { data: leadData, error: leadError } = await supabase
        .from("leads")
        .select("*")
        .eq("user_id", session.user.id)
        .single();

      if (leadError || !leadData) {
        setNoLead(true);
        setLoading(false);
        return;
      }

      setLead(leadData as Lead);

      // Fetch preferred puppy info
      if (leadData.preferred_puppy_id) {
        const { data: puppyData } = await supabase
          .from("puppies")
          .select("id, name, slug, sex, tier, price, status, image_url")
          .eq("id", leadData.preferred_puppy_id)
          .single();
        if (puppyData) setPuppy(puppyData as PuppyInfo);
      }

      // Fetch reservation if exists
      const { data: resData } = await supabase
        .from("reservations")
        .select("*")
        .eq("lead_id", leadData.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();
      if (resData) setReservation(resData as Reservation);

      setLoading(false);
    }

    loadData();
  }, [navigate]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/portal" });
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex min-h-[60vh] items-center justify-center pt-20">
          <div className="animate-pulse text-muted-foreground">Loading your portal...</div>
        </div>
      </div>
    );
  }

  if (noLead) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex min-h-[60vh] flex-col items-center justify-center pt-20 px-6">
          <h1 className="font-display text-2xl font-bold text-foreground">No Application Found</h1>
          <p className="mt-3 text-muted-foreground">
            We couldn't find an application linked to your account.
          </p>
          <Link
            to="/apply"
            className="mt-6 rounded-xl bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wider text-accent-foreground transition-all hover:brightness-110"
          >
            Submit an Application
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const firstName = lead?.full_name?.split(" ")[0] || "there";

  const stageInfo = getStageInfo(lead?.stage);

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="bg-gradient-frost pt-28 pb-8 lg:pt-36">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">
                Welcome back, {firstName}
              </h1>
              <p className="mt-1 text-muted-foreground">{lead?.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="py-10">
        <div className="mx-auto max-w-4xl px-6 space-y-8">

          {/* Application Status Card */}
          <div className="rounded-2xl bg-card p-8 shadow-card">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-display text-lg font-bold text-foreground">Application Status</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Submitted {lead?.created_at ? new Date(lead.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : ""}
                </p>
              </div>
              <span className={`rounded-full px-4 py-1.5 text-sm font-semibold ${stageInfo.color}`}>
                {stageInfo.label}
              </span>
            </div>

            {/* Status timeline */}
            <div className="mt-8">
              <StatusTimeline currentStage={lead?.stage ?? "new_inquiry"} />
            </div>

            {/* Stage-specific message */}
            <div className={`mt-6 rounded-xl p-4 ${stageInfo.bgColor}`}>
              <p className="text-sm text-foreground">{stageInfo.message}</p>
            </div>
          </div>

          {/* Preferred Puppy Card */}
          {puppy && (
            <div className="rounded-2xl bg-card p-8 shadow-card">
              <h2 className="font-display text-lg font-bold text-foreground">Your Preferred Puppy</h2>
              <div className="mt-4 flex items-center gap-6">
                {puppy.image_url ? (
                  <img
                    src={puppy.image_url}
                    alt={puppy.name}
                    className="h-24 w-24 rounded-xl object-cover"
                  />
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-muted">
                    <span className="font-display text-3xl text-muted-foreground/30">{puppy.name[0]}</span>
                  </div>
                )}
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground">{puppy.name}</h3>
                  <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${puppy.sex === "male" ? "bg-blue-100 text-blue-700" : "bg-rose-100 text-rose-700"}`}>
                      {puppy.sex === "male" ? "Male" : "Female"}
                    </span>
                    <span>{puppy.tier === "premier" ? "Premier Selection" : puppy.tier === "preferred" ? "Preferred Pick" : "Pet Companion"}</span>
                    <span>${puppy.price?.toLocaleString()}</span>
                  </div>
                  <span className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${puppy.status === "available" ? "bg-green-100 text-green-700" : puppy.status === "reserved" ? "bg-gray-100 text-gray-600" : "bg-amber-100 text-amber-700"}`}>
                    {puppy.status}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <Link
                  to="/puppies/$slug"
                  params={{ slug: puppy.slug }}
                  className="text-sm font-semibold text-accent transition-colors hover:text-accent/80"
                >
                  View full profile &rarr;
                </Link>
              </div>
            </div>
          )}

          {/* Reservation Card (if deposit paid) */}
          {reservation && (
            <div className="rounded-2xl border-2 border-green-200 bg-card p-8 shadow-card">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="font-display text-lg font-bold text-foreground">Reservation Confirmed</h2>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Amount Paid</p>
                  <p className="mt-1 font-display text-xl font-bold text-foreground">${reservation.amount?.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tier</p>
                  <p className="mt-1 font-display text-xl font-bold text-foreground capitalize">{reservation.tier ?? "—"}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Pick Order</p>
                  <p className="mt-1 font-display text-xl font-bold text-foreground">#{reservation.pick_order ?? "TBD"}</p>
                </div>
              </div>

              <p className="mt-6 text-sm text-muted-foreground">
                Reserved on {reservation.created_at ? new Date(reservation.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "—"}
              </p>
            </div>
          )}

          {/* Approval Link (if approved but not yet paid) */}
          {lead?.stage === "approved" && !reservation && (
            <div className="rounded-2xl border-2 border-purple-200 bg-card p-8 shadow-card">
              <h2 className="font-display text-lg font-bold text-foreground">You're Approved!</h2>
              <p className="mt-2 text-muted-foreground">
                Your application has been approved. Complete your $500 Reservation Fee to secure your pick position.
              </p>
              <Link
                to="/approved/$token"
                params={{ token: lead.approval_token ?? "" }}
                className="mt-4 inline-block rounded-xl bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wider text-accent-foreground transition-all hover:brightness-110"
              >
                Complete Your Reservation
              </Link>
            </div>
          )}

          {/* Application Details */}
          <div className="rounded-2xl bg-card p-8 shadow-card">
            <h2 className="font-display text-lg font-bold text-foreground">Your Application Details</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Detail label="Full Name" value={lead?.full_name} />
              <Detail label="Email" value={lead?.email} />
              <Detail label="Phone" value={lead?.phone} />
              <Detail label="Location" value={lead?.city && lead?.state ? `${lead.city}, ${lead.state}` : null} />
              <Detail label="Preferred Sex" value={lead?.preferred_sex} />
              <Detail label="Timeline" value={lead?.timeline?.replace(/_/g, " ")} />
            </div>
          </div>

          {/* Quick links */}
          <div className="grid gap-4 sm:grid-cols-3">
            <Link to="/litter" className="rounded-xl bg-card p-5 shadow-card transition-all hover:shadow-wolf">
              <h3 className="font-display text-sm font-bold text-foreground">View the Litter</h3>
              <p className="mt-1 text-xs text-muted-foreground">See all available puppies</p>
            </Link>
            <Link to="/process" className="rounded-xl bg-card p-5 shadow-card transition-all hover:shadow-wolf">
              <h3 className="font-display text-sm font-bold text-foreground">Our Process</h3>
              <p className="mt-1 text-xs text-muted-foreground">How we raise our puppies</p>
            </Link>
            <Link to="/faq" className="rounded-xl bg-card p-5 shadow-card transition-all hover:shadow-wolf">
              <h3 className="font-display text-sm font-bold text-foreground">FAQ</h3>
              <p className="mt-1 text-xs text-muted-foreground">Common questions answered</p>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm text-foreground capitalize">{value ?? "—"}</p>
    </div>
  );
}

function StatusTimeline({ currentStage }: { currentStage: string }) {
  const stages = [
    { key: "new_inquiry", label: "Submitted" },
    { key: "qualified", label: "Under Review" },
    { key: "approved", label: "Approved" },
    { key: "deposit_paid", label: "Reserved" },
  ];

  const stageOrder = ["new_inquiry", "qualified", "approved", "deposit_paid", "reserved", "completed"];
  const currentIdx = stageOrder.indexOf(currentStage);
  // Waitlist is a separate flow
  if (currentStage === "waitlist") {
    return (
      <div className="flex items-center gap-2 text-sm text-orange-700">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-orange-100 text-xs font-bold">W</span>
        You are on the waitlist. We will contact you when a spot opens.
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between">
      {stages.map((stage, i) => {
        const stageIdx = stageOrder.indexOf(stage.key);
        const isComplete = currentIdx >= stageIdx;
        const isCurrent = currentStage === stage.key || (currentStage === "reserved" && stage.key === "deposit_paid") || (currentStage === "completed" && stage.key === "deposit_paid");

        return (
          <div key={stage.key} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                  isComplete
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {isComplete ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span className={`mt-2 text-xs font-medium ${isCurrent ? "text-accent" : isComplete ? "text-foreground" : "text-muted-foreground"}`}>
                {stage.label}
              </span>
            </div>
            {i < stages.length - 1 && (
              <div className={`mx-2 h-0.5 flex-1 ${currentIdx > stageIdx ? "bg-accent" : "bg-muted"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function getStageInfo(stage: string | null | undefined): { label: string; color: string; bgColor: string; message: string } {
  switch (stage) {
    case "new_inquiry":
      return {
        label: "Application Submitted",
        color: "bg-blue-100 text-blue-700",
        bgColor: "bg-blue-50",
        message: "Your application has been received. We review every application personally and will be in touch within 24\u201348 hours.",
      };
    case "qualified":
      return {
        label: "Under Review",
        color: "bg-teal-100 text-teal-700",
        bgColor: "bg-teal-50",
        message: "Your application is being reviewed by our team. We are evaluating your fit for the litter and will reach out soon.",
      };
    case "approved":
      return {
        label: "Approved",
        color: "bg-purple-100 text-purple-700",
        bgColor: "bg-purple-50",
        message: "Congratulations! Your application has been approved. Complete your $500 Reservation Fee below to secure your pick position.",
      };
    case "deposit_paid":
    case "reserved":
      return {
        label: "Reserved",
        color: "bg-green-100 text-green-700",
        bgColor: "bg-green-50",
        message: "Your reservation is confirmed! You will receive weekly puppy photo and video updates. Your purchase contract will be sent within 24 hours.",
      };
    case "waitlist":
      return {
        label: "Waitlisted",
        color: "bg-orange-100 text-orange-700",
        bgColor: "bg-orange-50",
        message: "You are on our waitlist. We will contact you as soon as a spot opens up or when our next litter is planned.",
      };
    case "completed":
      return {
        label: "Completed",
        color: "bg-slate-100 text-slate-700",
        bgColor: "bg-slate-50",
        message: "Your puppy journey is complete. Thank you for being part of the White Wolf family!",
      };
    default:
      return {
        label: "Submitted",
        color: "bg-gray-100 text-gray-700",
        bgColor: "bg-gray-50",
        message: "Your application has been received. We will be in touch soon.",
      };
  }
}
