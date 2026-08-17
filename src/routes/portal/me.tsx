import { formatDateOnly } from "@/lib/utils";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { supabase, T, STORAGE_BUCKET } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

type Role = "admin" | "applicant" | "owner" | "alumni";

type Profile = {
  id: string;
  role: Role;
  lead_id: string | null;
};

type Lead = {
  id: string;
  full_name: string | null;
  email: string | null;
  stage: string | null;
  preferred_puppy_id: string | null;
  pickup_date: string | null;
  signature_agreed_at: string | null;
  referral_code: string | null;
  portal_last_seen_at: string | null;
  created_at: string | null;
};

type Puppy = {
  id: string;
  name: string;
  slug: string;
  sex: string | null;
  dob: string | null;
  ready_date: string | null;
  status: string | null;
  tier: string | null;
  price: number | null;
  temperament_tags: string[] | null;
  personality_bio: string | null;
  ideal_home: string | null;
  image_url: string | null;
  deposit_paid_at: string | null;
  priority_order: number | null;
};

type PortalUpdate = {
  id: string;
  title: string | null;
  body: string | null;
  image_urls: string[] | null;
  video_url: string | null;
  milestone_tag: string | null;
  visibility: string | null;
  puppy_id: string | null;
  published_at: string | null;
};

type Message = {
  id: string;
  lead_id: string;
  sender: "breeder" | "owner";
  body: string;
  read_at: string | null;
  created_at: string;
};

type AlumniPost = {
  id: string;
  lead_id: string;
  puppy_id: string | null;
  caption: string | null;
  image_urls: string[] | null;
  milestone_tag: string | null;
  status: string;
  created_at: string;
};

type DogProfile = {
  id: string;
  lead_id: string;
  puppy_id: string | null;
  call_name: string;
  bio: string | null;
  weight_lbs: number | null;
  profile_photo_url: string | null;
  health_notes: string | null;
  titles_earned: string[] | null;
};

type Resource = {
  id: string;
  section: string;
  title: string;
  description: string | null;
  url: string | null;
  sort_order: number;
};

type TabKey =
  | "dashboard"
  | "my-puppy"
  | "my-dog"
  | "litter"
  | "messages"
  | "documents"
  | "updates"
  | "pack"
  | "resources"
  | "referrals"
  | "payments";

// ─────────────────────────────────────────────────────────────
// Route
// ─────────────────────────────────────────────────────────────

export const Route = createFileRoute("/portal/me")({
  component: PortalMe,
  head: () => ({
    meta: [{ title: "My Portal — White Wolf Shepherds" }],
  }),
});

function PortalMe() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [lead, setLead] = useState<Lead | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("dashboard");

  useEffect(() => {
    async function load() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        navigate({ to: "/portal" });
        return;
      }

      const { data: prof } = await supabase
        .from(T.profiles)
        .select("id, role, lead_id")
        .eq("id", session.user.id)
        .maybeSingle();

      if (!prof) {
        navigate({ to: "/portal" });
        return;
      }

      // Admins → admin dashboard
      if (prof.role === "admin") {
        navigate({ to: "/portal/admin" });
        return;
      }

      let resolvedProfile = prof as Profile;
      let resolvedLead: Lead | null = null;

      if (prof.lead_id) {
        const { data: ld } = await supabase
          .from(T.leads)
          .select(
            "id, full_name, email, stage, preferred_puppy_id, pickup_date, signature_agreed_at, referral_code, portal_last_seen_at, created_at",
          )
          .eq("id", prof.lead_id)
          .maybeSingle();
        if (ld) resolvedLead = ld as Lead;

        const earlyStages = ["new_inquiry", "match_call_booked", "application_complete"];
        if (prof.role === "applicant" && ld?.stage && earlyStages.includes(ld.stage)) {
          navigate({ to: "/portal/onboarding" });
          return;
        }

        // Upgrade owner → alumni if pickup_date is > 7 days ago
        if (
          prof.role === "owner" &&
          ld?.pickup_date &&
          Date.parse(ld.pickup_date) + 7 * 86400_000 < Date.now()
        ) {
          await supabase
            .from(T.profiles)
            .update({ role: "alumni", updated_at: new Date().toISOString() })
            .eq("id", session.user.id);
          resolvedProfile = { ...resolvedProfile, role: "alumni" };
        }

        // Update portal_last_seen_at
        await supabase
          .from(T.leads)
          .update({ portal_last_seen_at: new Date().toISOString() })
          .eq("id", ld?.id ?? prof.lead_id);
      }

      setProfile(resolvedProfile);
      setLead(resolvedLead);
      setLoading(false);
    }
    load();
  }, [navigate]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/" });
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

  if (!profile || !lead) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex min-h-[60vh] flex-col items-center justify-center pt-20 px-6 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground">
            Your application is being set up.
          </h1>
          <p className="mt-4 max-w-md text-muted-foreground">
            If you just applied, we're still wiring up your portal. Refresh in a moment, or contact
            us if this persists.
          </p>
          <button
            onClick={handleSignOut}
            className="mt-8 text-sm text-muted-foreground hover:text-foreground"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  const role = profile.role;
  const tabs = tabsForRole(role);

  // Ensure active tab is valid for this role
  const activeKey = tabs.find((t) => t.key === activeTab) ? activeTab : tabs[0].key;

  return (
    <div className="min-h-screen bg-background">
      {/* Top nav */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="font-display text-lg font-bold tracking-wide text-foreground">
            White Wolf <span className="text-accent">Shepherds</span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  activeKey === tab.key
                    ? "bg-accent/10 text-accent"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
          <button
            onClick={handleSignOut}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Sign out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 pb-28 md:pb-10">
        {activeKey === "dashboard" && <DashboardTab role={role} lead={lead} />}
        {activeKey === "my-puppy" && <MyPuppyTab lead={lead} />}
        {activeKey === "my-dog" && <MyDogTab lead={lead} />}
        {activeKey === "litter" && <LitterTab lead={lead} />}
        {activeKey === "messages" && <MessagesTab lead={lead} />}
        {activeKey === "documents" && <DocumentsTab role={role} lead={lead} setLead={setLead} />}
        {activeKey === "updates" && <UpdatesTab lead={lead} />}
        {activeKey === "pack" && <PackTab lead={lead} />}
        {activeKey === "resources" && <ResourcesTab />}
        {activeKey === "referrals" && <ReferralsTab lead={lead} />}
        {activeKey === "payments" && <PaymentsTab lead={lead} />}
      </main>

      {/* Mobile bottom tab bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-border bg-card md:hidden">
        {tabs.slice(0, 5).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-3 text-xs font-medium ${
              activeKey === tab.key ? "text-accent" : "text-muted-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

function tabsForRole(role: Role): { key: TabKey; label: string }[] {
  const base: { key: TabKey; label: string }[] = [
    { key: "dashboard", label: "Dashboard" },
    { key: "litter", label: "Litter" },
    { key: "messages", label: "Messages" },
    { key: "documents", label: "Documents" },
    { key: "updates", label: "Updates" },
  ];
  if (role === "owner") {
    return [
      { key: "dashboard", label: "Dashboard" },
      { key: "my-puppy", label: "My Puppy" },
      { key: "litter", label: "Litter" },
      { key: "messages", label: "Messages" },
      { key: "documents", label: "Documents" },
      { key: "updates", label: "Updates" },
      { key: "payments", label: "Payments" },
    ];
  }
  if (role === "alumni") {
    return [
      { key: "dashboard", label: "Dashboard" },
      { key: "my-dog", label: "My Dog" },
      { key: "litter", label: "Litter" },
      { key: "messages", label: "Messages" },
      { key: "documents", label: "Documents" },
      { key: "updates", label: "Updates" },
      { key: "pack", label: "Pack Family" },
      { key: "resources", label: "Resources" },
      { key: "referrals", label: "Referrals" },
      { key: "payments", label: "Payments" },
    ];
  }
  return base;
}

// ─────────────────────────────────────────────────────────────
// Dashboard Tab
// ─────────────────────────────────────────────────────────────

function DashboardTab({ role, lead }: { role: Role; lead: Lead }) {
  const [availableCount, setAvailableCount] = useState<number | null>(null);
  const [preferredPuppy, setPreferredPuppy] = useState<Puppy | null>(null);

  useEffect(() => {
    supabase
      .from(T.puppies)
      .select("*", { count: "exact", head: true })
      .eq("status", "available")
      .then(({ count }) => setAvailableCount(count ?? 0));

    if (lead.preferred_puppy_id) {
      supabase
        .from(T.puppies)
        .select("*")
        .eq("id", lead.preferred_puppy_id)
        .maybeSingle()
        .then(({ data }) => {
          if (data) setPreferredPuppy(data as Puppy);
        });
    }
  }, [lead.preferred_puppy_id]);

  const stages = [
    { key: "applied", label: "Applied" },
    { key: "review", label: "Under Review" },
    { key: "approved", label: "Approved" },
    { key: "reserved", label: "Reserved" },
    { key: "pickup", label: "Pickup" },
  ] as const;

  const currentStage = stageFromLead(lead.stage);
  const currentIdx = stages.findIndex((s) => s.key === currentStage);

  const copy = stageCopy(lead.stage);

  const daysUntilPickup = lead.pickup_date
    ? Math.ceil((Date.parse(lead.pickup_date) - Date.now()) / 86400_000)
    : null;

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">
          Welcome back, {lead.full_name?.split(" ")[0] ?? "friend"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Here's where your application stands right now.
        </p>
      </div>

      {/* Pipeline */}
      <div className="rounded-2xl bg-card p-6 shadow-card sm:p-8">
        <h2 className="font-display text-lg font-bold text-foreground">Your Journey</h2>
        <div className="mt-6 flex items-center gap-3 overflow-x-auto">
          {stages.map((s, i) => {
            const done = i < currentIdx;
            const active = i === currentIdx;
            return (
              <div
                key={s.key}
                className="flex flex-1 min-w-[120px] flex-col items-center text-center"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold ${
                    done
                      ? "bg-accent text-accent-foreground"
                      : active
                        ? "bg-accent/20 text-accent ring-2 ring-accent"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {done ? "✓" : i + 1}
                </div>
                <div
                  className={`mt-2 text-xs font-medium ${
                    done || active ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {s.label}
                </div>
                {i < stages.length - 1 && (
                  <div
                    className={`mt-5 hidden h-0.5 w-full -translate-y-5 ${
                      done ? "bg-accent" : "bg-muted"
                    } sm:block`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Stage copy */}
      <div className="rounded-2xl border border-accent/20 bg-accent/5 p-6">
        <h3 className="font-display text-base font-bold text-foreground">{copy.headline}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{copy.body}</p>
        {["new_inquiry", "match_call_booked", "application_complete"].includes(
          lead.stage ?? "",
        ) && (
          <Link
            to="/portal/onboarding"
            className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-xs font-bold uppercase tracking-wider text-accent-foreground"
          >
            Continue onboarding →
          </Link>
        )}
        {["placement_approved", "approved"].includes(lead.stage ?? "") && (
          <Link
            to="/reserved"
            className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-xs font-bold uppercase tracking-wider text-accent-foreground"
          >
            Book Meet the Puppies call →
          </Link>
        )}
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {role === "owner" || role === "alumni" ? (
          <>
            <StatCard
              label="Reservation"
              value={preferredPuppy?.deposit_paid_at ? "Paid ✓" : "Pending"}
            />
            <StatCard
              label="Pick Order"
              value={preferredPuppy ? `#${preferredPuppy.priority_order ?? "?"}` : "TBD"}
            />
            <StatCard
              label="Pickup"
              value={
                daysUntilPickup !== null && daysUntilPickup > 0
                  ? `${daysUntilPickup} days`
                  : daysUntilPickup !== null
                    ? "Ready!"
                    : "TBD"
              }
            />
          </>
        ) : (
          <>
            <StatCard
              label="Available Puppies"
              value={availableCount !== null ? `${availableCount} / 9` : "—"}
            />
            <StatCard
              label="Preferred Pick"
              value={preferredPuppy ? preferredPuppy.name : "No preference"}
            />
            <StatCard label="Timeline" value={formatTimeline(lead.stage)} />
          </>
        )}
      </div>

      <SupportTicketPanel leadId={lead.id} />
    </div>
  );
}

function SupportTicketPanel({ leadId }: { leadId: string }) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!subject.trim() || !body.trim()) return;
    setBusy(true);
    const { error } = await supabase.from(T.supportTickets).insert({
      lead_id: leadId,
      subject: subject.trim(),
      body: body.trim(),
    });
    setBusy(false);
    if (!error) {
      setSent(true);
      setSubject("");
      setBody("");
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h3 className="font-display text-base font-bold text-foreground">Need help?</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Send us a message and we'll get back to you within one business day.
      </p>
      {sent ? (
        <p className="mt-4 text-sm text-accent">Message sent — we'll be in touch soon.</p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
            required
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="How can we help?"
            rows={3}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
            required
          />
          <button
            type="submit"
            disabled={busy}
            className="rounded-lg bg-accent px-4 py-2 text-xs font-bold uppercase tracking-wider text-accent-foreground disabled:opacity-50"
          >
            {busy ? "Sending..." : "Send message"}
          </button>
        </form>
      )}
    </div>
  );
}

function stageFromLead(
  stage: string | null,
): "applied" | "review" | "approved" | "reserved" | "pickup" {
  switch (stage) {
    case "new_inquiry":
    case "match_call_booked":
    case "application_complete":
    case "application_submitted":
      return "applied";
    case "under_review":
    case "deposit_paid":
    case "qualified":
    case "video_call_scheduled":
      return "review";
    case "placement_approved":
    case "approved":
    case "deposit_pending":
      return "approved";
    case "reserved":
    case "final_payment_pending":
      return "reserved";
    case "completed":
      return "pickup";
    case "denied":
      return "applied";
    default:
      return "applied";
  }
}

function stageCopy(stage: string | null): { headline: string; body: string } {
  switch (stage) {
    case "match_call_booked":
      return {
        headline: "Family Fit Call booked",
        body: "Complete your application and deposit in your onboarding portal when you're ready.",
      };
    case "application_complete":
      return {
        headline: "Application received",
        body: "Place your $500 deposit to hold your spot. It's refundable if we aren't able to approve you for placement.",
      };
    case "under_review":
    case "deposit_paid":
      return {
        headline: "Under review",
        body: "Your deposit is received and your application is being reviewed personally. We'll email you within 24–48 hours with a decision.",
      };
    case "placement_approved":
    case "approved":
    case "deposit_pending":
      return {
        headline: "You're approved!",
        body: "Your deposit is locked in and adoption has begun. Book your Meet the Puppies call to choose your puppy.",
      };
    case "denied":
      return {
        headline: "Application update",
        body: "We weren't able to approve your application for this litter. Your deposit has been refunded. You're welcome to apply for a future litter.",
      };
    case "reserved":
    case "final_payment_pending":
      return {
        headline: "Your pick is secured.",
        body: "Your Reservation Fee is received and your pick position is locked. Weekly updates will begin shortly. Balance is due one week before pickup.",
      };
    case "waitlist":
      return {
        headline: "You're on the waitlist.",
        body: "We'll reach out as soon as a spot opens in this litter or when the next litter is planned. You'll always be first to know.",
      };
    case "completed":
      return {
        headline: "Welcome to the pack!",
        body: "Your puppy is home. Check the Resources and Pack tabs to share updates and connect with other White Wolf Shepherd families.",
      };
    default:
      return {
        headline: "We have your application.",
        body: "Every application is reviewed personally. You'll hear from us within 24–48 hours. Feel free to message us directly anytime.",
      };
  }
}

function formatTimeline(_stage: string | null): string {
  return "Spring 2026";
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 font-display text-2xl font-bold text-foreground">{value}</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// My Puppy Tab (Tier 2)
// ─────────────────────────────────────────────────────────────

function MyPuppyTab({ lead }: { lead: Lead }) {
  const [puppy, setPuppy] = useState<Puppy | null>(null);
  const [updates, setUpdates] = useState<PortalUpdate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!lead.preferred_puppy_id) {
        setLoading(false);
        return;
      }
      const [{ data: p }, { data: ups }] = await Promise.all([
        supabase.from(T.puppies).select("*").eq("id", lead.preferred_puppy_id).maybeSingle(),
        supabase
          .from(T.portalUpdates)
          .select("*")
          .or(`puppy_id.eq.${lead.preferred_puppy_id},visibility.eq.all_reserved`)
          .order("published_at", { ascending: false }),
      ]);
      if (p) setPuppy(p as Puppy);
      if (ups) setUpdates(ups as PortalUpdate[]);
      setLoading(false);
    }
    load();
  }, [lead.preferred_puppy_id]);

  if (loading)
    return <div className="animate-pulse text-muted-foreground">Loading your puppy...</div>;

  if (!puppy)
    return (
      <div className="rounded-2xl border border-dashed border-border p-10 text-center">
        <p className="text-muted-foreground">
          Your specific puppy assignment will appear here after your Reservation Fee is received.
        </p>
      </div>
    );

  const daysUntil = lead.pickup_date
    ? Math.max(0, Math.ceil((Date.parse(lead.pickup_date) - Date.now()) / 86400_000))
    : null;

  const checklistItems = [
    "Crate (large/giant for GSD)",
    "First vet appt booked within 72hrs",
    "Food ordered",
    "Collar + ID tag",
    "Puppy-proofed area of home",
    "Transition guide read",
    "Balance payment completed",
  ];

  return (
    <div className="space-y-10">
      <div className="overflow-hidden rounded-3xl bg-card shadow-wolf">
        {puppy.image_url ? (
          <img src={puppy.image_url} alt={puppy.name} className="h-72 w-full object-cover" />
        ) : (
          <div className="flex h-72 items-center justify-center bg-muted">
            <span className="font-display text-8xl font-bold text-muted-foreground/20">
              {puppy.name[0]}
            </span>
          </div>
        )}
        <div className="p-8">
          <h1 className="font-display text-4xl font-bold text-foreground">{puppy.name}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {puppy.sex === "male" ? "Male" : "Female"} · Born{" "}
            {puppy.dob ? formatDateOnly(puppy.dob) : "TBD"} · Ready{" "}
            {puppy.ready_date ? formatDateOnly(puppy.ready_date) : "TBD"}
          </p>
          {puppy.personality_bio && (
            <p className="mt-6 leading-relaxed text-foreground/80">{puppy.personality_bio}</p>
          )}
          {puppy.ideal_home && (
            <div className="mt-6">
              <h3 className="font-display text-base font-bold text-foreground">Ideal Home</h3>
              <p className="mt-2 text-muted-foreground">{puppy.ideal_home}</p>
            </div>
          )}
        </div>
      </div>

      {/* Pickup countdown */}
      <div className="rounded-2xl border border-accent/20 bg-accent/5 p-6 text-center">
        <p className="font-display text-2xl font-bold text-foreground">
          {daysUntil !== null && daysUntil > 0
            ? `${daysUntil} days until ${puppy.name} comes home`
            : daysUntil === 0
              ? `${puppy.name} is ready today!`
              : "Pickup date to be confirmed"}
        </p>
      </div>

      {/* Milestone timeline */}
      <div>
        <h2 className="font-display text-xl font-bold text-foreground">Milestones</h2>
        <div className="mt-6 space-y-4">
          {updates.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
              Milestone updates coming soon — we post weekly.
            </div>
          ) : (
            updates.map((u) => (
              <div key={u.id} className="flex gap-4 rounded-2xl bg-card p-5 shadow-card">
                {u.image_urls?.[0] && (
                  <img
                    src={u.image_urls[0]}
                    alt=""
                    className="h-20 w-20 shrink-0 rounded-xl object-cover"
                  />
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    {u.milestone_tag && (
                      <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
                        {u.milestone_tag}
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {u.published_at ? new Date(u.published_at).toLocaleDateString() : ""}
                    </span>
                  </div>
                  {u.title && (
                    <h3 className="mt-1 font-display text-base font-bold text-foreground">
                      {u.title}
                    </h3>
                  )}
                  {u.body && <p className="mt-1 text-sm text-muted-foreground">{u.body}</p>}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Health records (placeholders) */}
      <div>
        <h2 className="font-display text-xl font-bold text-foreground">Health Records</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {["First Vet Check", "First Deworming", "First Vaccine", "Microchip Registration"].map(
            (label) => (
              <div key={label} className="rounded-xl border border-border bg-card p-4">
                <p className="font-semibold text-foreground">{label}</p>
                <p className="mt-1 text-xs text-muted-foreground">Pending</p>
              </div>
            ),
          )}
        </div>
      </div>

      {/* Pickup checklist */}
      <details className="rounded-2xl bg-card p-6 shadow-card">
        <summary className="cursor-pointer font-display text-lg font-bold text-foreground">
          Pickup Checklist
        </summary>
        <ul className="mt-4 space-y-2">
          {checklistItems.map((item) => (
            <li key={item} className="flex items-center gap-3 text-sm text-foreground">
              <input type="checkbox" className="h-4 w-4 rounded border-border" />
              {item}
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// My Dog Tab (Tier 3)
// ─────────────────────────────────────────────────────────────

function MyDogTab({ lead }: { lead: Lead }) {
  const [dogProfile, setDogProfile] = useState<DogProfile | null>(null);
  const [puppy, setPuppy] = useState<Puppy | null>(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [callName, setCallName] = useState("");
  const [bio, setBio] = useState("");
  const [weight, setWeight] = useState<number | "">("");
  const [healthNotes, setHealthNotes] = useState("");
  const [titles, setTitles] = useState("");

  useEffect(() => {
    async function load() {
      const { data: dp } = await supabase
        .from(T.dogProfiles)
        .select("*")
        .eq("lead_id", lead.id)
        .maybeSingle();
      if (dp) {
        setDogProfile(dp as DogProfile);
        setCallName(dp.call_name);
        setBio(dp.bio ?? "");
        setWeight(dp.weight_lbs ?? "");
        setHealthNotes(dp.health_notes ?? "");
        setTitles((dp.titles_earned ?? []).join(", "));
      }
      if (lead.preferred_puppy_id) {
        const { data: p } = await supabase
          .from(T.puppies)
          .select("*")
          .eq("id", lead.preferred_puppy_id)
          .maybeSingle();
        if (p) setPuppy(p as Puppy);
      }
    }
    load();
  }, [lead.id, lead.preferred_puppy_id]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const row = {
      lead_id: lead.id,
      puppy_id: lead.preferred_puppy_id,
      call_name: callName.trim() || "My Dog",
      bio: bio.trim() || null,
      weight_lbs: typeof weight === "number" ? weight : null,
      health_notes: healthNotes.trim() || null,
      titles_earned: titles
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      updated_at: new Date().toISOString(),
    };
    if (dogProfile) {
      await supabase.from(T.dogProfiles).update(row).eq("id", dogProfile.id);
    } else {
      const { data } = await supabase.from(T.dogProfiles).insert(row).select("*").single();
      if (data) setDogProfile(data as DogProfile);
    }
    setSaving(false);
    setEditing(false);
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-foreground">My Dog</h1>
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="rounded-lg border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-muted"
          >
            Edit Profile
          </button>
        )}
      </div>

      {editing ? (
        <form onSubmit={handleSave} className="space-y-4 rounded-2xl bg-card p-6 shadow-card">
          <LabeledInput label="Call Name" value={callName} onChange={setCallName} />
          <LabeledTextarea label="Bio" value={bio} onChange={setBio} rows={4} />
          <LabeledInput
            label="Weight (lbs)"
            type="number"
            value={weight === "" ? "" : String(weight)}
            onChange={(v) => setWeight(v ? parseFloat(v) : "")}
          />
          <LabeledTextarea
            label="Health Notes"
            value={healthNotes}
            onChange={setHealthNotes}
            rows={3}
          />
          <LabeledInput
            label="Titles Earned (comma-separated)"
            value={titles}
            onChange={setTitles}
          />
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="rounded-lg border border-border px-4 py-2 text-sm font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-accent px-6 py-2 text-sm font-semibold text-accent-foreground disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      ) : (
        <div className="rounded-2xl bg-card p-8 shadow-card">
          <h2 className="font-display text-2xl font-bold text-foreground">
            {dogProfile?.call_name ?? puppy?.name ?? "Your Dog"}
          </h2>
          {dogProfile?.bio && (
            <p className="mt-4 leading-relaxed text-foreground/80">{dogProfile.bio}</p>
          )}
          {dogProfile?.weight_lbs && (
            <p className="mt-4 text-sm text-muted-foreground">
              Weight: {dogProfile.weight_lbs} lbs
            </p>
          )}
          {dogProfile?.titles_earned && dogProfile.titles_earned.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {dogProfile.titles_earned.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
          {dogProfile?.health_notes && (
            <div className="mt-6">
              <h3 className="font-display text-base font-bold text-foreground">Health Notes</h3>
              <p className="mt-1 text-muted-foreground">{dogProfile.health_notes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Litter Tab (read-only grid)
// ─────────────────────────────────────────────────────────────

function LitterTab({ lead }: { lead: Lead }) {
  const [puppies, setPuppies] = useState<Puppy[]>([]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from(T.puppies)
        .select("*")
        .order("priority_order", { ascending: true });
      if (data) setPuppies(data as Puppy[]);
    }
    load();

    const channel = supabase
      .channel("portal-litter")
      .on("postgres_changes", { event: "*", schema: "public", table: T.puppies }, () => load())
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-foreground">The Litter</h1>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {puppies.map((p) => {
          const preferred = p.id === lead.preferred_puppy_id;
          return (
            <div
              key={p.id}
              className={`overflow-hidden rounded-2xl bg-card shadow-card ${
                preferred ? "ring-2 ring-amber-400" : ""
              }`}
            >
              {p.image_url ? (
                <img src={p.image_url} alt={p.name} className="h-48 w-full object-cover" />
              ) : (
                <div className="flex h-48 items-center justify-center bg-muted">
                  <span className="font-display text-5xl font-bold text-muted-foreground/20">
                    {p.name[0]}
                  </span>
                </div>
              )}
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-bold text-foreground">{p.name}</h3>
                  <StatusBadge status={p.status} />
                </div>
                <p className="mt-1 text-xs text-muted-foreground capitalize">
                  {p.tier} · ${p.price?.toLocaleString()}
                </p>
                {preferred && (
                  <p className="mt-2 text-xs font-semibold text-amber-600">Your preferred pick</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string | null }) {
  const map: Record<string, string> = {
    available: "bg-green-100 text-green-700",
    pending: "bg-amber-100 text-amber-700",
    reserved: "bg-gray-200 text-gray-700",
    sold: "bg-gray-200 text-gray-700",
  };
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
        map[status ?? ""] ?? "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// Messages Tab
// ─────────────────────────────────────────────────────────────

function MessagesTab({ lead }: { lead: Lead }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  const fetchMessages = useCallback(async () => {
    const { data } = await supabase
      .from(T.messages)
      .select("*")
      .eq("lead_id", lead.id)
      .order("created_at", { ascending: true });
    if (data) setMessages(data as Message[]);
  }, [lead.id]);

  useEffect(() => {
    fetchMessages();
    const channel = supabase
      .channel(`msgs-${lead.id}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: T.messages, filter: `lead_id=eq.${lead.id}` },
        () => fetchMessages(),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [lead.id, fetchMessages]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });

    // Mark breeder messages as read
    const unread = messages.filter((m) => m.sender === "breeder" && !m.read_at).map((m) => m.id);
    if (unread.length > 0) {
      supabase
        .from(T.messages)
        .update({ read_at: new Date().toISOString() })
        .in("id", unread)
        .then(() => {});
    }
  }, [messages]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;
    setSending(true);
    await supabase
      .from(T.messages)
      .insert({ lead_id: lead.id, sender: "owner", body: body.trim() });
    setBody("");
    setSending(false);
    fetchMessages();
  }

  return (
    <div className="flex h-[70vh] flex-col rounded-2xl bg-card shadow-card">
      <div className="border-b border-border p-4">
        <h1 className="font-display text-xl font-bold text-foreground">Messages</h1>
        <p className="text-xs text-muted-foreground">Direct line to the breeder</p>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.length === 0 && (
          <p className="text-center text-sm text-muted-foreground">
            Start a conversation. We usually reply within a few hours.
          </p>
        )}
        {messages.map((m) => {
          const mine = m.sender === "owner";
          return (
            <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                  mine ? "bg-accent text-accent-foreground" : "bg-muted text-foreground"
                }`}
              >
                <p>{m.body}</p>
                <p
                  className={`mt-1 text-xs ${mine ? "text-accent-foreground/70" : "text-muted-foreground"}`}
                >
                  {new Date(m.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={endRef} />
      </div>

      <form onSubmit={handleSend} className="flex gap-2 border-t border-border p-4">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Type your message..."
          rows={2}
          className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm resize-none focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/20"
        />
        <button
          type="submit"
          disabled={sending || !body.trim()}
          className="rounded-lg bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Documents Tab
// ─────────────────────────────────────────────────────────────

function DocumentsTab({
  role,
  lead,
  setLead,
}: {
  role: Role;
  lead: Lead;
  setLead: (l: Lead) => void;
}) {
  const [agreed, setAgreed] = useState(!!lead.signature_agreed_at);
  const [signing, setSigning] = useState(false);

  const canSign =
    role === "owner" &&
    !lead.signature_agreed_at &&
    (lead.stage === "deposit_paid" || lead.stage === "reserved");

  async function handleSign() {
    if (!agreed) return;
    setSigning(true);
    const now = new Date().toISOString();
    await supabase
      .from(T.leads)
      .update({ signature_agreed_at: now, updated_at: now })
      .eq("id", lead.id);
    setLead({ ...lead, signature_agreed_at: now });
    setSigning(false);
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold text-foreground">Documents</h1>

      <div className="grid gap-4 sm:grid-cols-3">
        <DocLink href="/health-guarantee" label="Health Guarantee" />
        <DocLink href="/faq" label="FAQ" />
        <DocLink href="/process" label="Our Process" />
      </div>

      {canSign && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="font-display text-lg font-bold text-amber-900">Purchase Contract</h2>
          <p className="mt-2 text-sm text-amber-900/80">
            Please review and sign the purchase contract. This acknowledges the Reservation Fee
            terms, right of first refusal, and health guarantee clauses.
          </p>
          <label className="mt-4 flex items-start gap-2 text-sm text-amber-900">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1"
            />
            I have read and agree to the terms of the White Wolf Shepherds purchase contract.
          </label>
          <button
            onClick={handleSign}
            disabled={!agreed || signing}
            className="mt-4 rounded-lg bg-amber-700 px-5 py-2 text-sm font-semibold text-white disabled:opacity-50"
          >
            {signing ? "Signing..." : "Sign Contract"}
          </button>
        </div>
      )}

      {lead.signature_agreed_at && (
        <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
          <p className="font-semibold text-green-900">
            Contract signed on {new Date(lead.signature_agreed_at).toLocaleDateString()}.
          </p>
        </div>
      )}
    </div>
  );
}

function DocLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="block rounded-2xl border border-border bg-card p-5 shadow-card transition-all hover:shadow-wolf"
    >
      <h3 className="font-display text-base font-bold text-foreground">{label}</h3>
      <p className="mt-2 text-sm text-accent">View &rarr;</p>
    </a>
  );
}

// ─────────────────────────────────────────────────────────────
// Updates Tab
// ─────────────────────────────────────────────────────────────

function UpdatesTab({ lead }: { lead: Lead }) {
  const [updates, setUpdates] = useState<PortalUpdate[]>([]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from(T.portalUpdates)
        .select("*")
        .or(
          lead.preferred_puppy_id
            ? `visibility.eq.all_reserved,and(visibility.eq.specific_puppy,puppy_id.eq.${lead.preferred_puppy_id})`
            : `visibility.eq.all_reserved`,
        )
        .order("published_at", { ascending: false });
      if (data) setUpdates(data as PortalUpdate[]);
    }
    load();
  }, [lead.preferred_puppy_id]);

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-foreground">Updates</h1>
      {updates.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
          Updates coming soon — we post weekly.
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          {updates.map((u) => (
            <article key={u.id} className="rounded-2xl bg-card p-6 shadow-card">
              <div className="flex items-center gap-2">
                {u.milestone_tag && (
                  <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
                    {u.milestone_tag}
                  </span>
                )}
                <span className="text-xs text-muted-foreground">
                  {u.published_at ? new Date(u.published_at).toLocaleDateString() : ""}
                </span>
              </div>
              {u.title && (
                <h2 className="mt-2 font-display text-xl font-bold text-foreground">{u.title}</h2>
              )}
              {u.image_urls && u.image_urls.length > 0 && (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {u.image_urls.map((url, i) => (
                    <img key={i} src={url} alt="" className="h-48 w-full rounded-xl object-cover" />
                  ))}
                </div>
              )}
              {u.body && <p className="mt-4 whitespace-pre-wrap text-foreground/80">{u.body}</p>}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Pack Tab (alumni)
// ─────────────────────────────────────────────────────────────

function PackTab({ lead }: { lead: Lead }) {
  const [posts, setPosts] = useState<AlumniPost[]>([]);
  const [caption, setCaption] = useState("");
  const [milestone, setMilestone] = useState("");
  const [uploading, setUploading] = useState(false);
  const [pendingNotice, setPendingNotice] = useState(false);
  const [stats, setStats] = useState({ families: 0, dogs: 0 });
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from(T.alumniPosts)
        .select("*")
        .eq("status", "approved")
        .order("created_at", { ascending: false });
      if (data) setPosts(data as AlumniPost[]);

      const [{ count: fam }, { count: dogs }] = await Promise.all([
        supabase.from(T.profiles).select("*", { count: "exact", head: true }).eq("role", "alumni"),
        supabase.from(T.dogProfiles).select("*", { count: "exact", head: true }),
      ]);
      setStats({ families: fam ?? 0, dogs: dogs ?? 0 });
    }
    load();
  }, []);

  async function handleShare(e: React.FormEvent) {
    e.preventDefault();
    if (!caption.trim()) return;
    setUploading(true);

    const urls: string[] = [];
    const files = fileInputRef.current?.files;
    if (files && files.length > 0) {
      for (let i = 0; i < Math.min(files.length, 4); i++) {
        const f = files[i];
        const key = `alumni/${lead.id}/${Date.now()}_${i}_${f.name}`;
        const { error } = await supabase.storage.from(STORAGE_BUCKET).upload(key, f, {
          cacheControl: "3600",
        });
        if (!error) {
          const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(key);
          if (data?.publicUrl) urls.push(data.publicUrl);
        }
      }
    }

    await supabase.from(T.alumniPosts).insert({
      lead_id: lead.id,
      caption: caption.trim(),
      milestone_tag: milestone || null,
      image_urls: urls.length > 0 ? urls : null,
      status: "pending",
    });

    setCaption("");
    setMilestone("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    setUploading(false);
    setPendingNotice(true);
    setTimeout(() => setPendingNotice(false), 5000);
  }

  const milestones = [
    "First week home",
    "First vet visit",
    "6 months",
    "1 year",
    "Training milestone",
    "Adventure",
    "Family moment",
    "Other",
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">The Pack</h1>
        <p className="mt-1 text-muted-foreground">Share with other White Wolf Shepherd families.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <StatCard label="Families" value={String(stats.families)} />
        <StatCard label="Dogs" value={String(stats.dogs)} />
      </div>

      <form onSubmit={handleShare} className="space-y-3 rounded-2xl bg-card p-6 shadow-card">
        <h2 className="font-display text-lg font-bold text-foreground">Share an update</h2>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Share an update about your dog..."
          rows={3}
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/20"
        />
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          className="block w-full text-xs text-muted-foreground"
        />
        <select
          value={milestone}
          onChange={(e) => setMilestone(e.target.value)}
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="">Select milestone (optional)</option>
          {milestones.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={uploading || !caption.trim()}
          className="rounded-lg bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground disabled:opacity-50"
        >
          {uploading ? "Posting..." : "Share"}
        </button>
        {pendingNotice && (
          <p className="text-xs text-amber-700">
            Your post is pending review and will appear shortly.
          </p>
        )}
      </form>

      <div className="space-y-6">
        {posts.length === 0 ? (
          <p className="text-center text-muted-foreground">No posts yet. Be the first!</p>
        ) : (
          posts.map((p) => (
            <article key={p.id} className="rounded-2xl bg-card p-6 shadow-card">
              <div className="flex items-center gap-2">
                {p.milestone_tag && (
                  <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
                    {p.milestone_tag}
                  </span>
                )}
                <span className="text-xs text-muted-foreground">
                  {new Date(p.created_at).toLocaleDateString()}
                </span>
              </div>
              {p.caption && <p className="mt-3 text-foreground">{p.caption}</p>}
              {p.image_urls && p.image_urls.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {p.image_urls.map((url, i) => (
                    <img key={i} src={url} alt="" className="h-40 w-full rounded-lg object-cover" />
                  ))}
                </div>
              )}
            </article>
          ))
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Resources Tab (alumni)
// ─────────────────────────────────────────────────────────────

function ResourcesTab() {
  const [grouped, setGrouped] = useState<Record<string, Resource[]>>({});

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from(T.resources)
        .select("*")
        .order("sort_order", { ascending: true });
      if (data) {
        const map: Record<string, Resource[]> = {};
        for (const r of data as Resource[]) {
          if (!map[r.section]) map[r.section] = [];
          map[r.section].push(r);
        }
        setGrouped(map);
      }
    }
    load();
  }, []);

  const sections = Object.keys(grouped);

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-foreground">Resources</h1>
      {sections.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
          Resources coming soon.
        </div>
      ) : (
        <div className="mt-8 space-y-10">
          {sections.map((s) => (
            <section key={s}>
              <h2 className="font-display text-xl font-bold text-foreground capitalize">{s}</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {grouped[s].map((r) => (
                  <a
                    key={r.id}
                    href={r.url ?? "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl border border-border bg-card p-5 shadow-card transition-all hover:shadow-wolf"
                  >
                    <h3 className="font-display text-base font-bold text-foreground">{r.title}</h3>
                    {r.description && (
                      <p className="mt-2 text-sm text-muted-foreground">{r.description}</p>
                    )}
                    <p className="mt-2 text-xs font-semibold text-accent">Visit &rarr;</p>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Referrals Tab (alumni)
// ─────────────────────────────────────────────────────────────

function ReferralsTab({ lead }: { lead: Lead }) {
  const [copied, setCopied] = useState(false);
  const [referred, setReferred] = useState(0);
  const [converted, setConverted] = useState(0);

  const siteUrl = useMemo(
    () =>
      import.meta.env.VITE_PUBLIC_SITE_URL ??
      import.meta.env.NEXT_PUBLIC_SITE_URL ??
      (typeof window !== "undefined" ? window.location.origin : ""),
    [],
  );

  const link = `${siteUrl}/apply?ref=${lead.referral_code ?? ""}`;

  useEffect(() => {
    async function load() {
      const { data: refs } = await supabase
        .from(T.leads)
        .select("id, stage")
        .eq("referred_by_lead_id", lead.id);
      if (refs) {
        setReferred(refs.length);
        setConverted(
          refs.filter((r) => r.stage === "deposit_paid" || r.stage === "reserved").length,
        );
      }
    }
    load();
  }, [lead.id]);

  function copy() {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold text-foreground">Referrals</h1>
      <div className="rounded-2xl bg-card p-6 shadow-card">
        <p className="text-sm text-muted-foreground">Your unique referral link</p>
        <div className="mt-3 flex gap-2">
          <input
            readOnly
            value={link}
            className="flex-1 rounded-lg border border-border bg-muted/50 px-3 py-2 text-xs text-foreground"
          />
          <button
            onClick={copy}
            className="rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-base font-bold text-foreground">How it works</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Share your link with families who'd love a White Wolf Shepherd. When someone you refer
          reserves a puppy, you receive a thank-you credit toward your next litter or a gift bundle.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <StatCard label="Referred" value={String(referred)} />
        <StatCard label="Converted" value={String(converted)} />
      </div>

      <div className="flex gap-3">
        <button onClick={copy} className="rounded-lg border border-border px-4 py-2 text-sm">
          Copy
        </button>
        <a
          href={`sms:?&body=${encodeURIComponent(`Check out White Wolf Shepherds: ${link}`)}`}
          className="rounded-lg border border-border px-4 py-2 text-sm"
        >
          Text
        </a>
        <a
          href={`mailto:?subject=${encodeURIComponent("White Wolf Shepherds")}&body=${encodeURIComponent(link)}`}
          className="rounded-lg border border-border px-4 py-2 text-sm"
        >
          Email
        </a>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Payments Tab (owner+)
// ─────────────────────────────────────────────────────────────

function PaymentsTab({ lead }: { lead: Lead }) {
  const [puppy, setPuppy] = useState<Puppy | null>(null);
  const [reservation, setReservation] = useState<{
    amount: number | null;
    created_at: string | null;
  } | null>(null);

  useEffect(() => {
    async function load() {
      if (lead.preferred_puppy_id) {
        const { data: p } = await supabase
          .from(T.puppies)
          .select("*")
          .eq("id", lead.preferred_puppy_id)
          .maybeSingle();
        if (p) setPuppy(p as Puppy);
      }
      const { data: r } = await supabase
        .from(T.reservations)
        .select("amount, created_at")
        .eq("lead_id", lead.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (r) setReservation(r);
    }
    load();
  }, [lead.id, lead.preferred_puppy_id]);

  const balanceLink =
    import.meta.env.VITE_PUBLIC_STRIPE_BALANCE_LINK ??
    import.meta.env.NEXT_PUBLIC_STRIPE_BALANCE_LINK ??
    "#";

  const balance = puppy && puppy.price ? puppy.price - 500 : null;

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold text-foreground">Payments</h1>

      <div className="overflow-hidden rounded-2xl bg-card shadow-card">
        <div className="flex items-center justify-between border-b border-border p-4">
          <div>
            <p className="font-semibold text-foreground">Reservation Fee</p>
            <p className="text-xs text-muted-foreground">$500</p>
          </div>
          {reservation ? (
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              Paid{" "}
              {reservation.created_at ? new Date(reservation.created_at).toLocaleDateString() : ""}
            </span>
          ) : (
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
              Pending
            </span>
          )}
        </div>

        <div className="flex items-center justify-between p-4">
          <div>
            <p className="font-semibold text-foreground">Balance</p>
            <p className="text-xs text-muted-foreground">
              {balance !== null ? `$${balance.toLocaleString()}` : "—"} · Due 1 week before pickup
            </p>
          </div>
          {balance !== null && balanceLink !== "#" && (
            <a
              href={balanceLink}
              className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground"
            >
              Pay Balance
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Tiny inputs
// ─────────────────────────────────────────────────────────────

function LabeledInput({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-foreground">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/20"
      />
    </div>
  );
}

function LabeledTextarea({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-foreground">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/20"
      />
    </div>
  );
}
