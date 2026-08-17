import { formatDateOnly, parseDateOnly } from "@/lib/utils";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { supabase, T, STORAGE_BUCKET } from "@/integrations/supabase/client";
import { approvePlacement, denyAndRefund } from "@/lib/wws-admin";

export const Route = createFileRoute("/portal/admin")({
  component: AdminPage,
  head: () => ({
    meta: [{ title: "Admin — White Wolf Shepherds" }],
  }),
});

type Lead = {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  score: number | null;
  stage: string | null;
  preferred_puppy_id: string | null;
  preferred_sex: string | null;
  timeline: string | null;
  has_owned_large_dog: boolean | null;
  has_fenced_yard: boolean | null;
  household_type: string | null;
  family_size: number | null;
  children_ages: string | null;
  other_pets: string | null;
  reason_for_breed: string | null;
  additional_notes: string | null;
  ready_for_deposit: boolean | null;
  source: string | null;
  city: string | null;
  state: string | null;
  approval_token: string | null;
  approval_sent_at: string | null;
  internal_notes: string | null;
  referral_code: string | null;
  referred_by_lead_id: string | null;
  match_call_booked_at: string | null;
  video_call_booked_at: string | null;
  created_at: string | null;
  updated_at: string | null;
};

type Puppy = {
  id: string;
  name: string;
  slug: string | null;
  status: string | null;
  reserved_by_lead_id: string | null;
  deposit_paid_at: string | null;
  priority_order: number | null;
  litter_id: string | null;
};

type Litter = {
  id: string;
  name: string;
  slug: string;
  dam_name: string | null;
  sire_name: string | null;
  born_date: string | null;
  ready_date: string | null;
  expected_count: number | null;
  status: string;
  description: string | null;
  cover_image_url: string | null;
  priority_order: number;
};

type Reservation = {
  id: string;
  amount: number | null;
  puppy_id: string | null;
  lead_id: string | null;
  created_at: string | null;
};

type Message = {
  id: string;
  lead_id: string;
  sender: "breeder" | "owner";
  body: string;
  read_at: string | null;
  created_at: string;
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

type AlumniPost = {
  id: string;
  lead_id: string;
  caption: string | null;
  image_urls: string[] | null;
  milestone_tag: string | null;
  status: string;
  created_at: string;
};

type AdminTab =
  | "overview"
  | "leads"
  | "dogs"
  | "litters"
  | "alumni"
  | "messages"
  | "updates"
  | "referrals";

function AdminPage() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [tab, setTab] = useState<AdminTab>("overview");

  useEffect(() => {
    async function check() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        navigate({ to: "/portal" });
        return;
      }
      const { data: prof } = await supabase
        .from(T.profiles)
        .select("role")
        .eq("id", session.user.id)
        .maybeSingle();
      if (prof?.role !== "admin") {
        navigate({ to: "/portal/me" });
        return;
      }
      setIsAdmin(true);
      setChecking(false);
    }
    check();
  }, [navigate]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  }

  if (checking || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading admin...</div>
      </div>
    );
  }

  const tabs: AdminTab[] = [
    "overview",
    "leads",
    "dogs",
    "litters",
    "alumni",
    "messages",
    "updates",
    "referrals",
  ];
  const tabLabels: Record<AdminTab, string> = {
    overview: "Overview",
    leads: "Leads",
    dogs: "Dogs",
    litters: "Litters",
    alumni: "Pack Family",
    messages: "Messages",
    updates: "Updates",
    referrals: "Referrals",
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-border bg-card md:flex">
        <div className="border-b border-border px-6 py-5">
          <h1 className="font-display text-lg font-bold text-foreground">
            White Wolf <span className="text-accent">Admin</span>
          </h1>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                tab === t
                  ? "bg-accent/10 text-accent"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {tabLabels[t]}
            </button>
          ))}
        </nav>
        <div className="border-t border-border px-3 py-4">
          <button
            onClick={handleSignOut}
            className="w-full rounded-lg px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-md md:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <h1 className="font-display text-base font-bold text-foreground">
              White Wolf <span className="text-accent">Admin</span>
            </h1>
            <button
              onClick={handleSignOut}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Sign out
            </button>
          </div>
          <nav className="flex gap-1 overflow-x-auto px-3 pb-2">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  tab === t ? "bg-accent/10 text-accent" : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {tabLabels[t]}
              </button>
            ))}
          </nav>
        </header>

        <main className="flex-1 px-6 py-8">
          {tab === "overview" && <OverviewTab />}
          {tab === "leads" && <LeadsTab />}
          {tab === "dogs" && <DogsAdminTab />}
          {tab === "litters" && <LittersAdminTab />}
          {tab === "alumni" && <AlumniAdminTab />}
          {tab === "messages" && <AdminMessagesTab />}
          {tab === "updates" && <UpdatesAdminTab />}
          {tab === "referrals" && <ReferralsAdminTab />}
        </main>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Overview
// ─────────────────────────────────────────────────────────────

function OverviewTab() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    hot: 0,
    deposits: 0,
    revenue: 0,
    available: 0,
  });
  const [puppies, setPuppies] = useState<Puppy[]>([]);
  const [litters, setLitters] = useState<Litter[]>([]);
  const [leadNames, setLeadNames] = useState<Record<string, string>>({});
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    async function load() {
      const [{ data: leads }, { data: pups }, { data: reservations }, { data: lits }] =
        await Promise.all([
          supabase.from(T.leads).select("id, full_name, score, stage"),
          supabase
            .from(T.puppies)
            .select(
              "id, name, slug, status, reserved_by_lead_id, deposit_paid_at, priority_order, litter_id",
            )
            .order("priority_order"),
          supabase
            .from(T.reservations)
            .select("id, amount, puppy_id, lead_id, created_at")
            .order("created_at", { ascending: false }),
          supabase.from(T.litters).select("*").order("priority_order", { ascending: false }),
        ]);

      const leadsData = leads ?? [];
      const puppiesData = (pups ?? []) as Puppy[];
      const reservationsData = (reservations ?? []) as Reservation[];

      const names: Record<string, string> = {};
      leadsData.forEach((l) => {
        if (l.id && l.full_name) names[l.id] = l.full_name;
      });
      setLeadNames(names);
      setPuppies(puppiesData);
      setReservations(reservationsData);
      setLitters((lits ?? []) as Litter[]);

      setStats({
        totalLeads: leadsData.length,
        hot: leadsData.filter((l) => (l.score ?? 0) >= 70).length,
        deposits: leadsData.filter(
          (l) =>
            l.stage === "under_review" ||
            l.stage === "deposit_paid" ||
            l.stage === "placement_approved" ||
            l.stage === "reserved",
        ).length,
        revenue: reservationsData.reduce((sum, r) => sum + (r.amount ?? 0), 0),
        available: puppiesData.filter((p) => p.status === "available").length,
      });
    }
    load();
  }, []);

  // Group puppies by litter
  const grouped = litters.map((lit) => ({
    litter: lit,
    puppies: puppies.filter((p) => p.litter_id === lit.id),
  }));
  const orphans = puppies.filter((p) => !p.litter_id);

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        <StatBox label="Total Leads" value={stats.totalLeads} />
        <StatBox label="Hot (≥70)" value={stats.hot} accent />
        <StatBox label="Deposits" value={stats.deposits} />
        <StatBox label="Revenue" value={`$${stats.revenue.toLocaleString()}`} />
        <StatBox label="Available" value={`${stats.available} / 9`} />
      </div>

      <div className="space-y-8">
        <h2 className="font-display text-lg font-bold text-foreground">Puppies by Litter</h2>

        {grouped.length === 0 && orphans.length === 0 && (
          <p className="text-sm text-muted-foreground">No puppies yet.</p>
        )}

        {grouped.map(({ litter, puppies: pups }) => (
          <LitterGroup key={litter.id} litter={litter} puppies={pups} leadNames={leadNames} />
        ))}

        {orphans.length > 0 && (
          <div>
            <div className="mb-3 flex items-baseline justify-between">
              <h3 className="font-display text-base font-bold text-foreground">
                Unassigned puppies
              </h3>
              <p className="text-xs text-muted-foreground">
                Assign these to a litter from the Litters tab
              </p>
            </div>
            <PuppyGrid puppies={orphans} leadNames={leadNames} />
          </div>
        )}
      </div>

      <ReservationsPanel
        reservations={reservations}
        leadNames={leadNames}
        puppyNames={Object.fromEntries(puppies.map((p) => [p.id, p.name]))}
      />
    </div>
  );
}

function ReservationsPanel({
  reservations,
  leadNames,
  puppyNames,
}: {
  reservations: Reservation[];
  leadNames: Record<string, string>;
  puppyNames: Record<string, string>;
}) {
  if (reservations.length === 0) {
    return (
      <div>
        <h2 className="font-display text-lg font-bold text-foreground">Reservations</h2>
        <p className="mt-2 text-sm text-muted-foreground">No reservations yet.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-display text-lg font-bold text-foreground">Reservations</h2>
      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-muted/50">
            <tr>
              {["Lead", "Puppy", "Amount", "Date"].map((h) => (
                <th key={h} className="px-4 py-3 font-semibold text-muted-foreground">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reservations.map((r) => (
              <tr key={r.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                <td className="px-4 py-3 font-medium">
                  {r.lead_id ? (leadNames[r.lead_id] ?? r.lead_id) : "—"}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {r.puppy_id ? (
                    (puppyNames[r.puppy_id] ?? r.puppy_id)
                  ) : (
                    <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">
                      Spot in line
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {r.amount != null ? `$${r.amount.toLocaleString()}` : "—"}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {r.created_at ? new Date(r.created_at).toLocaleDateString() : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LitterGroup({
  litter,
  puppies: allPuppies,
  leadNames,
}: {
  litter: Litter;
  puppies: Puppy[];
  leadNames: Record<string, string>;
}) {
  const puppies = allPuppies.filter((p) => p.status !== "parent");
  const available = puppies.filter((p) => p.status === "available").length;
  const total = puppies.length || litter.expected_count || 0;

  return (
    <div className="rounded-2xl border border-border bg-card/40 p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h3 className="font-display text-lg font-bold text-foreground">{litter.name}</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {[
              litter.dam_name && litter.sire_name
                ? `${litter.dam_name} × ${litter.sire_name}`
                : null,
              litter.born_date ? `Born ${formatDateOnly(litter.born_date)}` : null,
              litter.ready_date
                ? `Ready ${formatDateOnly(litter.ready_date)}`
                : null,
            ]
              .filter(Boolean)
              .join(" · ") || "No details set"}
          </p>
        </div>
        <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
          {available} of {total} available
        </span>
      </div>
      {puppies.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">No puppies assigned yet.</p>
      ) : (
        <div className="mt-4">
          <PuppyGrid puppies={puppies} leadNames={leadNames} />
        </div>
      )}
    </div>
  );
}

function PuppyGrid({
  puppies,
  leadNames,
}: {
  puppies: Puppy[];
  leadNames: Record<string, string>;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {puppies.map((p) => (
        <div key={p.id} className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <h4 className="font-display text-base font-bold text-foreground">{p.name}</h4>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
                p.status === "available"
                  ? "bg-green-100 text-green-700"
                  : p.status === "pending"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-gray-100 text-gray-600"
              }`}
            >
              {p.status}
            </span>
          </div>
          {p.reserved_by_lead_id && (
            <p className="mt-2 text-xs text-muted-foreground">
              Reserved by: {leadNames[p.reserved_by_lead_id] ?? "Unknown"}
            </p>
          )}
          {p.deposit_paid_at && (
            <p className="mt-1 text-xs text-muted-foreground">
              Paid: {new Date(p.deposit_paid_at).toLocaleDateString()}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

function StatBox({
  label,
  value,
  accent,
}: {
  label: string;
  value: string | number;
  accent?: boolean;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p
        className={`mt-2 font-display text-2xl font-bold ${
          accent ? "text-accent" : "text-foreground"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Leads
// ─────────────────────────────────────────────────────────────

function LeadsTab() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [puppies, setPuppies] = useState<Puppy[]>([]);
  const [selected, setSelected] = useState<Lead | null>(null);
  const [approveModal, setApproveModal] = useState<Lead | null>(null);
  const [actionError, setActionError] = useState("");

  const fetchData = useCallback(async () => {
    const [{ data: leadsData }, { data: puppiesData }] = await Promise.all([
      supabase.from(T.leads).select("*").order("score", { ascending: false }),
      supabase
        .from(T.puppies)
        .select("id, name, slug, status, reserved_by_lead_id, deposit_paid_at, priority_order"),
    ]);
    setLeads((leadsData ?? []) as Lead[]);
    setPuppies((puppiesData ?? []) as Puppy[]);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function handleApprove(id: string) {
    setActionError("");
    try {
      await approvePlacement({ leadId: id });
      await fetchData();
      const l = leads.find((x) => x.id === id);
      if (l) setApproveModal(l);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Approve failed");
    }
  }

  async function handleDeny(id: string) {
    if (!confirm("Deny this applicant and refund their deposit?")) return;
    setActionError("");
    try {
      await denyAndRefund({ leadId: id });
      await fetchData();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Deny/refund failed");
    }
  }

  async function updateStage(id: string, stage: string) {
    const updates: Record<string, unknown> = { stage, updated_at: new Date().toISOString() };
    if (stage === "approved") updates.approval_sent_at = new Date().toISOString();
    await supabase.from(T.leads).update(updates).eq("id", id);
    await fetchData();
    if (stage === "approved") {
      const l = leads.find((x) => x.id === id);
      if (l) setApproveModal(l);
    }
  }

  async function saveNotes(id: string, notes: string) {
    await supabase
      .from(T.leads)
      .update({ internal_notes: notes, updated_at: new Date().toISOString() })
      .eq("id", id);
  }

  const puppyName = (id: string | null) =>
    id ? (puppies.find((p) => p.id === id)?.name ?? "—") : "—";

  return (
    <div>
      <h2 className="font-display text-lg font-bold text-foreground">Leads</h2>
      {actionError && <p className="mt-2 text-sm text-red-600">{actionError}</p>}
      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-muted/50">
            <tr>
              {[
                "Name",
                "Email",
                "Score",
                "Stage",
                "Family Fit",
                "Video Call",
                "Puppy",
                "Applied",
                "Actions",
              ].map((h) => (
                <th key={h} className="px-4 py-3 font-semibold text-muted-foreground">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-4 py-8 text-center text-muted-foreground">
                  No leads yet.
                </td>
              </tr>
            ) : (
              leads.map((l) => (
                <tr key={l.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium">{l.full_name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{l.email}</td>
                  <td className="px-4 py-3">
                    <ScorePill score={l.score ?? 0} />
                  </td>
                  <td className="px-4 py-3">
                    <StageBadge stage={l.stage} />
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    <FunnelTimestamp ts={l.match_call_booked_at} />
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    <FunnelTimestamp ts={l.video_call_booked_at} />
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {puppyName(l.preferred_puppy_id)}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {l.created_at ? new Date(l.created_at).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {l.stage === "under_review" && (
                        <>
                          <TinyBtn onClick={() => handleApprove(l.id)}>Approve</TinyBtn>
                          <TinyBtn onClick={() => handleDeny(l.id)}>Deny & Refund</TinyBtn>
                        </>
                      )}
                      <TinyBtn onClick={() => updateStage(l.id, "qualified")}>Qualify</TinyBtn>
                      <TinyBtn onClick={() => updateStage(l.id, "waitlist")}>Waitlist</TinyBtn>
                      <TinyBtn onClick={() => setSelected(l)}>View</TinyBtn>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <LeadSlideOver
          lead={selected}
          puppyName={puppyName(selected.preferred_puppy_id)}
          onClose={() => setSelected(null)}
          onSaveNotes={saveNotes}
        />
      )}
      {approveModal && <ApproveModal lead={approveModal} onClose={() => setApproveModal(null)} />}
    </div>
  );
}

function ScorePill({ score }: { score: number }) {
  const color =
    score >= 70
      ? "bg-green-100 text-green-700"
      : score >= 40
        ? "bg-amber-100 text-amber-700"
        : "bg-red-100 text-red-700";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${color}`}
    >
      {score >= 70 && <span>🔥</span>}
      {score}
    </span>
  );
}

function StageBadge({ stage }: { stage: string | null }) {
  const map: Record<string, string> = {
    new_inquiry: "bg-gray-100 text-gray-700",
    match_call_booked: "bg-sky-100 text-sky-700",
    application_complete: "bg-blue-100 text-blue-700",
    under_review: "bg-amber-100 text-amber-800",
    placement_approved: "bg-purple-100 text-purple-700",
    denied: "bg-red-100 text-red-700",
    application_submitted: "bg-blue-100 text-blue-700",
    qualified: "bg-teal-100 text-teal-700",
    approved: "bg-purple-100 text-purple-700",
    deposit_paid: "bg-green-100 text-green-700",
    reserved: "bg-green-200 text-green-800",
    waitlist: "bg-orange-100 text-orange-700",
    completed: "bg-slate-100 text-slate-700",
  };
  const s = stage ?? "new_inquiry";
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
        map[s] ?? map.new_inquiry
      }`}
    >
      {s.replace(/_/g, " ")}
    </span>
  );
}

function FunnelTimestamp({ ts }: { ts: string | null }) {
  if (!ts) return <span className="text-muted-foreground/50">—</span>;
  return (
    <span className="whitespace-nowrap text-xs" title={new Date(ts).toLocaleString()}>
      {new Date(ts).toLocaleDateString()}
    </span>
  );
}

function TinyBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="rounded-md px-2 py-1 text-xs font-semibold text-accent transition-colors hover:bg-accent/10"
    >
      {children}
    </button>
  );
}

function LeadSlideOver({
  lead,
  puppyName,
  onClose,
  onSaveNotes,
}: {
  lead: Lead;
  puppyName: string;
  onClose: () => void;
  onSaveNotes: (id: string, n: string) => void;
}) {
  const [notes, setNotes] = useState(lead.internal_notes ?? "");

  const fields: { label: string; value: string | null | undefined }[] = [
    { label: "Name", value: lead.full_name },
    { label: "Email", value: lead.email },
    { label: "Phone", value: lead.phone },
    { label: "City", value: lead.city },
    { label: "State", value: lead.state },
    { label: "Preferred Puppy", value: puppyName },
    { label: "Timeline", value: lead.timeline?.replace(/_/g, " ") },
    { label: "Owned large dog", value: lead.has_owned_large_dog ? "Yes" : "No" },
    { label: "Fenced yard", value: lead.has_fenced_yard ? "Yes" : "No" },
    { label: "Household", value: lead.household_type },
    { label: "Family size", value: lead.family_size?.toString() },
    { label: "Children ages", value: lead.children_ages },
    { label: "Other pets", value: lead.other_pets },
    { label: "Ready for reservation", value: lead.ready_for_deposit ? "Yes" : "No" },
    { label: "Source", value: lead.source },
    { label: "Referral code", value: lead.referral_code },
    {
      label: "Match call booked",
      value: lead.match_call_booked_at
        ? new Date(lead.match_call_booked_at).toLocaleString()
        : null,
    },
    {
      label: "Video call booked",
      value: lead.video_call_booked_at
        ? new Date(lead.video_call_booked_at).toLocaleString()
        : null,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative w-full max-w-lg overflow-y-auto bg-card shadow-wolf">
        <div className="sticky top-0 flex items-center justify-between border-b border-border bg-card px-6 py-4">
          <h2 className="font-display text-lg font-bold text-foreground">{lead.full_name}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            ✕
          </button>
        </div>
        <div className="space-y-4 p-6">
          {fields.map((f) => (
            <div key={f.label}>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {f.label}
              </p>
              <p className="mt-1 text-sm text-foreground">{f.value || "—"}</p>
            </div>
          ))}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Why this breed?
            </p>
            <p className="mt-1 text-sm text-foreground">{lead.reason_for_breed || "—"}</p>
          </div>
          {lead.additional_notes && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Applicant notes
              </p>
              <p className="mt-1 text-sm text-foreground">{lead.additional_notes}</p>
            </div>
          )}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Internal notes
            </p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onBlur={() => onSaveNotes(lead.id, notes)}
              rows={4}
              className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/20"
              placeholder="Private notes..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ApproveModal({ lead, onClose }: { lead: Lead; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl bg-card p-8 shadow-wolf">
        <h2 className="font-display text-lg font-bold text-foreground">Placement Approved</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          <strong>{lead.full_name}</strong> has been approved. Their deposit is now locked and they
          can book their Meet the Puppies call from their portal.
        </p>
        <button
          onClick={onClose}
          className="mt-6 w-full rounded-xl border border-border py-3 text-sm font-bold uppercase tracking-wider"
        >
          Close
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Admin Messages
// ─────────────────────────────────────────────────────────────

function AdminMessagesTab() {
  const [threads, setThreads] = useState<
    {
      lead: { id: string; full_name: string | null; email: string | null };
      unread: number;
      last: string;
    }[]
  >([]);
  const [selectedLead, setSelectedLead] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [reply, setReply] = useState("");

  const loadThreads = useCallback(async () => {
    const { data: msgs } = await supabase
      .from(T.messages)
      .select("*")
      .order("created_at", { ascending: false });
    if (!msgs) return;
    const perLead = new Map<string, { unread: number; last: string }>();
    for (const m of msgs as Message[]) {
      const cur = perLead.get(m.lead_id) ?? { unread: 0, last: m.created_at };
      if (m.sender === "owner" && !m.read_at) cur.unread++;
      if (Date.parse(m.created_at) > Date.parse(cur.last)) cur.last = m.created_at;
      perLead.set(m.lead_id, cur);
    }
    const leadIds = Array.from(perLead.keys());
    const { data: leadRows } =
      leadIds.length > 0
        ? await supabase.from(T.leads).select("id, full_name, email").in("id", leadIds)
        : { data: [] };
    const list = (leadRows ?? []).map((l) => ({
      lead: l,
      unread: perLead.get(l.id)?.unread ?? 0,
      last: perLead.get(l.id)?.last ?? "",
    }));
    list.sort((a, b) => Date.parse(b.last) - Date.parse(a.last));
    setThreads(list);
  }, []);

  const loadMessages = useCallback(async (leadId: string) => {
    const { data } = await supabase
      .from(T.messages)
      .select("*")
      .eq("lead_id", leadId)
      .order("created_at", { ascending: true });
    if (data) {
      setMessages(data as Message[]);
      const unread = (data as Message[]).filter((m) => m.sender === "owner" && !m.read_at);
      if (unread.length > 0) {
        await supabase
          .from(T.messages)
          .update({ read_at: new Date().toISOString() })
          .in(
            "id",
            unread.map((m) => m.id),
          );
      }
    }
  }, []);

  useEffect(() => {
    loadThreads();
  }, [loadThreads]);

  useEffect(() => {
    if (selectedLead) loadMessages(selectedLead);
  }, [selectedLead, loadMessages]);

  async function handleReply(e: React.FormEvent) {
    e.preventDefault();
    if (!reply.trim() || !selectedLead) return;
    await supabase
      .from(T.messages)
      .insert({ lead_id: selectedLead, sender: "breeder", body: reply.trim() });
    setReply("");
    loadMessages(selectedLead);
    loadThreads();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="rounded-2xl bg-card shadow-card">
        <h2 className="border-b border-border p-4 font-display text-lg font-bold">Threads</h2>
        <ul>
          {threads.length === 0 && (
            <li className="p-6 text-center text-sm text-muted-foreground">No messages yet.</li>
          )}
          {threads.map((t) => (
            <li key={t.lead.id}>
              <button
                onClick={() => setSelectedLead(t.lead.id)}
                className={`block w-full border-b border-border px-4 py-3 text-left transition-colors hover:bg-muted ${
                  selectedLead === t.lead.id ? "bg-accent/5" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">{t.lead.full_name}</span>
                  {t.unread > 0 && (
                    <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-bold text-accent-foreground">
                      {t.unread}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{t.lead.email}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:col-span-2">
        <div className="flex h-[70vh] flex-col rounded-2xl bg-card shadow-card">
          <div className="border-b border-border p-4">
            <h2 className="font-display text-lg font-bold">
              {selectedLead ? "Conversation" : "Pick a thread"}
            </h2>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m) => {
              const mine = m.sender === "breeder";
              return (
                <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                      mine ? "bg-accent text-accent-foreground" : "bg-muted text-foreground"
                    }`}
                  >
                    <p>{m.body}</p>
                    <p
                      className={`mt-1 text-xs ${
                        mine ? "text-accent-foreground/70" : "text-muted-foreground"
                      }`}
                    >
                      {new Date(m.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          {selectedLead && (
            <form onSubmit={handleReply} className="flex gap-2 border-t border-border p-4">
              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                rows={2}
                placeholder="Type a reply..."
                className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
              <button
                type="submit"
                className="rounded-lg bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground"
              >
                Send
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Portal Updates Admin
// ─────────────────────────────────────────────────────────────

function UpdatesAdminTab() {
  const [updates, setUpdates] = useState<PortalUpdate[]>([]);
  const [puppies, setPuppies] = useState<{ id: string; name: string }[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [milestoneTag, setMilestoneTag] = useState("");
  const [visibility, setVisibility] = useState<"all_reserved" | "specific_puppy" | "alumni_only">(
    "all_reserved",
  );
  const [puppyId, setPuppyId] = useState("");
  const [publishing, setPublishing] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const load = useCallback(async () => {
    const [{ data: u }, { data: p }] = await Promise.all([
      supabase.from(T.portalUpdates).select("*").order("published_at", { ascending: false }),
      supabase.from(T.puppies).select("id, name").order("priority_order"),
    ]);
    if (u) setUpdates(u as PortalUpdate[]);
    if (p) setPuppies(p);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handlePublish(e: React.FormEvent) {
    e.preventDefault();
    setPublishing(true);

    const urls: string[] = [];
    const files = fileRef.current?.files;
    if (files && files.length > 0) {
      for (let i = 0; i < Math.min(files.length, 4); i++) {
        const f = files[i];
        const key = `updates/${Date.now()}_${i}_${f.name}`;
        const { error } = await supabase.storage.from(STORAGE_BUCKET).upload(key, f);
        if (!error) {
          const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(key);
          if (data?.publicUrl) urls.push(data.publicUrl);
        }
      }
    }

    await supabase.from(T.portalUpdates).insert({
      title: title || null,
      body: body || null,
      image_urls: urls.length > 0 ? urls : null,
      video_url: videoUrl || null,
      milestone_tag: milestoneTag || null,
      visibility,
      puppy_id: visibility === "specific_puppy" ? puppyId || null : null,
    });

    setTitle("");
    setBody("");
    setVideoUrl("");
    setMilestoneTag("");
    setVisibility("all_reserved");
    setPuppyId("");
    if (fileRef.current) fileRef.current.value = "";
    setPublishing(false);
    setShowModal(false);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this update?")) return;
    await supabase.from(T.portalUpdates).delete().eq("id", id);
    load();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-foreground">Portal Updates</h2>
        <button
          onClick={() => setShowModal(true)}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground"
        >
          + New Update
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-muted/50">
            <tr>
              <th className="px-4 py-3 font-semibold text-muted-foreground">Title</th>
              <th className="px-4 py-3 font-semibold text-muted-foreground">Visibility</th>
              <th className="px-4 py-3 font-semibold text-muted-foreground">Date</th>
              <th className="px-4 py-3 font-semibold text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {updates.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                  No updates yet.
                </td>
              </tr>
            ) : (
              updates.map((u) => (
                <tr key={u.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-medium">{u.title || "(no title)"}</td>
                  <td className="px-4 py-3 text-muted-foreground capitalize">
                    {u.visibility?.replace(/_/g, " ")}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {u.published_at ? new Date(u.published_at).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <TinyBtn onClick={() => handleDelete(u.id)}>Delete</TinyBtn>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30" onClick={() => setShowModal(false)} />
          <form
            onSubmit={handlePublish}
            className="relative w-full max-w-lg rounded-2xl bg-card p-8 shadow-wolf"
          >
            <h2 className="font-display text-xl font-bold text-foreground">New Update</h2>
            <div className="mt-4 space-y-3">
              <LabeledInput label="Title" value={title} onChange={setTitle} />
              <LabeledTextarea label="Body" value={body} onChange={setBody} rows={4} />
              <div>
                <label className="mb-1 block text-sm font-medium">Images (up to 4)</label>
                <input ref={fileRef} type="file" multiple accept="image/*" />
              </div>
              <LabeledInput label="Video URL" value={videoUrl} onChange={setVideoUrl} />
              <LabeledInput label="Milestone Tag" value={milestoneTag} onChange={setMilestoneTag} />
              <div>
                <label className="mb-1 block text-sm font-medium">Visibility</label>
                <select
                  value={visibility}
                  onChange={(e) => setVisibility(e.target.value as typeof visibility)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="all_reserved">All reserved owners</option>
                  <option value="specific_puppy">Specific puppy</option>
                  <option value="alumni_only">Pack Family only</option>
                </select>
              </div>
              {visibility === "specific_puppy" && (
                <div>
                  <label className="mb-1 block text-sm font-medium">Puppy</label>
                  <select
                    value={puppyId}
                    onChange={(e) => setPuppyId(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Select...</option>
                    {puppies.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 rounded-lg border border-border px-4 py-2 text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={publishing}
                className="flex-1 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground disabled:opacity-50"
              >
                {publishing ? "Publishing..." : "Publish"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Alumni moderation
// ─────────────────────────────────────────────────────────────

function AlumniAdminTab() {
  const [sub, setSub] = useState<"pending" | "profiles">("pending");
  const [pending, setPending] = useState<AlumniPost[]>([]);
  const [profiles, setProfiles] = useState<
    {
      id: string;
      call_name: string;
      puppy_id: string | null;
      lead_id: string;
      profile_photo_url: string | null;
    }[]
  >([]);

  const load = useCallback(async () => {
    const [{ data: p }, { data: dogs }] = await Promise.all([
      supabase
        .from(T.alumniPosts)
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: false }),
      supabase
        .from(T.dogProfiles)
        .select("id, call_name, puppy_id, lead_id, profile_photo_url")
        .order("created_at", { ascending: false }),
    ]);
    if (p) setPending(p as AlumniPost[]);
    if (dogs) setProfiles(dogs);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function approve(id: string) {
    await supabase
      .from(T.alumniPosts)
      .update({ status: "approved", approved_at: new Date().toISOString() })
      .eq("id", id);
    load();
  }

  async function reject(id: string) {
    await supabase.from(T.alumniPosts).update({ status: "rejected" }).eq("id", id);
    load();
  }

  return (
    <div className="space-y-6">
      <h2 className="font-display text-lg font-bold text-foreground">Pack Family</h2>
      <div className="flex gap-2">
        <button
          onClick={() => setSub("pending")}
          className={`rounded-lg px-3 py-2 text-sm ${
            sub === "pending" ? "bg-accent text-accent-foreground" : "border border-border"
          }`}
        >
          Pending posts ({pending.length})
        </button>
        <button
          onClick={() => setSub("profiles")}
          className={`rounded-lg px-3 py-2 text-sm ${
            sub === "profiles" ? "bg-accent text-accent-foreground" : "border border-border"
          }`}
        >
          Dog profiles ({profiles.length})
        </button>
      </div>

      {sub === "pending" && (
        <div className="space-y-4">
          {pending.length === 0 ? (
            <p className="text-muted-foreground">Nothing awaiting review.</p>
          ) : (
            pending.map((p) => (
              <div key={p.id} className="rounded-2xl bg-card p-6 shadow-card">
                <p className="text-xs text-muted-foreground">
                  {new Date(p.created_at).toLocaleString()} · {p.milestone_tag}
                </p>
                <p className="mt-2 text-foreground">{p.caption}</p>
                {p.image_urls && p.image_urls.length > 0 && (
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {p.image_urls.map((u, i) => (
                      <img key={i} src={u} alt="" className="h-24 w-full rounded-lg object-cover" />
                    ))}
                  </div>
                )}
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => approve(p.id)}
                    className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => reject(p.id)}
                    className="rounded-lg border border-border px-4 py-2 text-sm"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {sub === "profiles" && (
        <div className="overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted/50">
              <tr>
                <th className="px-4 py-3 font-semibold text-muted-foreground">Call Name</th>
                <th className="px-4 py-3 font-semibold text-muted-foreground">Lead</th>
                <th className="px-4 py-3 font-semibold text-muted-foreground">Photo</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3">{p.call_name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.lead_id}</td>
                  <td className="px-4 py-3">
                    {p.profile_photo_url ? (
                      <img
                        src={p.profile_photo_url}
                        alt=""
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Referrals admin
// ─────────────────────────────────────────────────────────────

function ReferralsAdminTab() {
  const [rows, setRows] = useState<{ lead: Lead; referred: number; converted: number }[]>([]);

  useEffect(() => {
    async function load() {
      const { data: leads } = await supabase.from(T.leads).select("*");
      if (!leads) return;
      const typed = leads as Lead[];
      const byId = new Map<string, Lead>(typed.map((l) => [l.id, l]));

      const counts = new Map<string, { referred: number; converted: number }>();
      for (const l of typed) {
        if (l.referred_by_lead_id) {
          const cur = counts.get(l.referred_by_lead_id) ?? { referred: 0, converted: 0 };
          cur.referred++;
          if (l.stage === "deposit_paid" || l.stage === "reserved") cur.converted++;
          counts.set(l.referred_by_lead_id, cur);
        }
      }
      const result: { lead: Lead; referred: number; converted: number }[] = [];
      typed.forEach((l) => {
        const c = counts.get(l.id);
        if (c) result.push({ lead: l, ...c });
      });
      void byId;
      result.sort((a, b) => b.converted - a.converted);
      setRows(result);
    }
    load();
  }, []);

  return (
    <div>
      <h2 className="font-display text-lg font-bold text-foreground">Referrals</h2>
      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-muted/50">
            <tr>
              {["Name", "Referral code", "Referred", "Converted"].map((h) => (
                <th key={h} className="px-4 py-3 font-semibold text-muted-foreground">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                  No referrals yet.
                </td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr
                  key={r.lead.id}
                  className={`border-b border-border last:border-0 ${
                    r.converted > 0 ? "bg-green-50" : ""
                  }`}
                >
                  <td className="px-4 py-3 font-medium">{r.lead.full_name}</td>
                  <td className="px-4 py-3 font-mono text-xs">{r.lead.referral_code}</td>
                  <td className="px-4 py-3">{r.referred}</td>
                  <td className="px-4 py-3 font-bold">{r.converted}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Shared tiny inputs
function LabeledInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-foreground">{label}</label>
      <input
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

// ─────────────────────────────────────────────────────────────
// Litters
// ─────────────────────────────────────────────────────────────

const LITTER_STATUSES = ["upcoming", "available", "reserved", "past"] as const;

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ─────────────────────────────────────────────────────────────
// Dogs (master Dog Manager — every dog the kennel tracks)
// ─────────────────────────────────────────────────────────────

type DogRow = Puppy & {
  sex: string | null;
  dob: string | null;
  ready_date: string | null;
  image_url: string | null;
  gallery_urls: string[] | null;
  video_url: string | null;
  temperament_tags: string[] | null;
  tier: string | null;
  price: number | null;
  collar_color: string | null;
  personality_bio: string | null;
  ideal_home: string | null;
  stripe_payment_link: string | null;
};

const DOG_STATUSES = [
  "available",
  "pending",
  "reserved",
  "sold",
  "placed",
  "alumni",
  "parent",
  "retired",
] as const;

// Age category: an "Adult" is 1 year (365 days) or older. Puppies < 1 year.
// Returns null when DOB is unknown so we can render an "Unknown age" tag.
function getAgeCategory(dob: string | null): "puppy" | "adult" | null {
  if (!dob) return null;
  const birth = parseDateOnly(dob);
  if (!birth) return null;
  if (Number.isNaN(birth.getTime())) return null;
  const ageMs = Date.now() - birth.getTime();
  const oneYearMs = 365.25 * 24 * 60 * 60 * 1000;
  return ageMs >= oneYearMs ? "adult" : "puppy";
}

function ParentTag() {
  return (
    <span className="inline-flex items-center rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-secondary-foreground">
      Parent
    </span>
  );
}

function AgeTag({ dob }: { dob: string | null }) {
  const cat = getAgeCategory(dob);
  if (cat === "adult") {
    return (
      <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
        Adult
      </span>
    );
  }
  if (cat === "puppy") {
    return (
      <span className="inline-flex items-center rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent">
        Puppy
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
      Age unknown
    </span>
  );
}

function DogsAdminTab() {
  const [dogs, setDogs] = useState<DogRow[]>([]);
  const [litters, setLitters] = useState<Litter[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "litter" | "pack" | "parents" | "unassigned">("all");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<DogRow | null>(null);
  const [showNew, setShowNew] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const [{ data: pups }, { data: lits }] = await Promise.all([
      supabase
        .from(T.puppies)
        .select(
          "id, name, slug, status, reserved_by_lead_id, deposit_paid_at, priority_order, litter_id, sex, dob, ready_date, image_url, gallery_urls, video_url, temperament_tags, tier, price, collar_color, personality_bio, ideal_home, stripe_payment_link",
        )
        .order("name"),
      supabase.from(T.litters).select("*").order("priority_order", { ascending: false }),
    ]);
    setDogs((pups ?? []) as DogRow[]);
    setLitters((lits ?? []) as Litter[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function updateDog(id: string, patch: Partial<DogRow>) {
    const { error } = await supabase.from(T.puppies).update(patch).eq("id", id);
    if (error) {
      alert(`Error: ${error.message}`);
      return;
    }
    fetchData();
  }

  async function handleDelete(dog: DogRow) {
    if (!confirm(`Delete "${dog.name}"? This cannot be undone.`)) return;
    const { error } = await supabase.from(T.puppies).delete().eq("id", dog.id);
    if (error) {
      alert(`Error: ${error.message}`);
      return;
    }
    fetchData();
  }

  if (loading) return <div className="text-sm text-muted-foreground">Loading dogs…</div>;

  const litterMap: Record<string, Litter> = Object.fromEntries(litters.map((l) => [l.id, l]));
  const q = search.trim().toLowerCase();

  const filtered = dogs.filter((d) => {
    if (q && !d.name.toLowerCase().includes(q)) return false;
    if (filter === "litter") return !!d.litter_id;
    if (filter === "pack") return d.status === "placed" || d.status === "alumni";
    if (filter === "parents") return d.status === "parent";
    if (filter === "unassigned")
      return !d.litter_id && d.status !== "placed" && d.status !== "alumni";
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-bold text-foreground">Dogs</h2>
          <p className="text-sm text-muted-foreground">
            Every dog in the program. Assign to a litter, mark as placed (Pack Family), or keep
            unassigned.
          </p>
        </div>
        <button
          onClick={() => setShowNew(true)}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-bold text-accent-foreground transition-all hover:brightness-110"
        >
          + New Dog
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Search by name…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xs rounded-lg border border-input bg-background px-3 py-2 text-sm"
        />
        <div className="flex gap-1 rounded-lg border border-border bg-card p-1">
          {(["all", "litter", "pack", "parents", "unassigned"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold capitalize transition-colors ${
                filter === f
                  ? "bg-accent/10 text-accent"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f === "pack" ? "Pack Family" : f === "parents" ? "Parents only" : f}
            </button>
          ))}
        </div>
        <span className="text-xs text-muted-foreground">
          {filtered.length} of {dogs.length}
        </span>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground">No dogs match.</p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Sex</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Litter</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => {
                const lit = d.litter_id ? litterMap[d.litter_id] : null;
                return (
                  <tr key={d.id} className="border-t border-border">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {d.image_url ? (
                          <img
                            src={d.image_url}
                            alt={d.name}
                            className="h-9 w-9 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-9 w-9 rounded-full bg-muted" />
                        )}
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-foreground">{d.name}</p>
                            <AgeTag dob={d.dob} />
                            {d.status === "parent" && <ParentTag />}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {d.dob ? `Born ${formatDateOnly(d.dob)}` : "No DOB"}
                            {" · "}
                            {(d.gallery_urls?.length ?? 0) + (d.image_url ? 1 : 0)} photo
                            {(d.gallery_urls?.length ?? 0) + (d.image_url ? 1 : 0) === 1 ? "" : "s"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 capitalize text-muted-foreground">{d.sex ?? "—"}</td>
                    <td className="px-4 py-3">
                      <select
                        value={d.status ?? ""}
                        onChange={(e) => updateDog(d.id, { status: e.target.value })}
                        className="rounded-md border border-input bg-background px-2 py-1 text-xs"
                      >
                        {DOG_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={d.litter_id ?? ""}
                        onChange={(e) => updateDog(d.id, { litter_id: e.target.value || null })}
                        className="rounded-md border border-input bg-background px-2 py-1 text-xs"
                      >
                        <option value="">— None —</option>
                        {litters.map((l) => (
                          <option key={l.id} value={l.id}>
                            {l.name}
                          </option>
                        ))}
                      </select>
                      {lit && (
                        <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                          {lit.status}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditing(d)}
                          className="rounded-md border border-border px-2 py-1 text-xs font-semibold text-foreground hover:bg-muted"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(d)}
                          className="rounded-md border border-destructive/30 px-2 py-1 text-xs font-semibold text-destructive hover:bg-destructive/10"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {(showNew || editing) && (
        <DogFormModal
          dog={editing}
          litters={litters}
          existingSlugs={dogs.map((d) => d.slug ?? "").filter(Boolean)}
          onClose={() => {
            setShowNew(false);
            setEditing(null);
          }}
          onSaved={() => {
            setShowNew(false);
            setEditing(null);
            fetchData();
          }}
        />
      )}
    </div>
  );
}

function DogFormModal({
  dog,
  litters,
  existingSlugs,
  onClose,
  onSaved,
}: {
  dog: DogRow | null;
  litters: Litter[];
  existingSlugs: string[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEdit = !!dog;
  const [name, setName] = useState(dog?.name ?? "");
  const [slug, setSlug] = useState(dog?.slug ?? "");
  const [sex, setSex] = useState(dog?.sex ?? "");
  const [dob, setDob] = useState(dog?.dob ?? "");
  const [status, setStatus] = useState(dog?.status ?? "available");
  const [tier, setTier] = useState(dog?.tier ?? "");
  const [priceStr, setPriceStr] = useState(dog?.price != null ? String(dog.price) : "");
  const [collarColor, setCollarColor] = useState(dog?.collar_color ?? "");
  const [imageUrl, setImageUrl] = useState(dog?.image_url ?? "");
  const [bio, setBio] = useState(dog?.personality_bio ?? "");
  const [idealHome, setIdealHome] = useState(dog?.ideal_home ?? "");
  const [stripeLink, setStripeLink] = useState(dog?.stripe_payment_link ?? "");
  const [litterId, setLitterId] = useState<string>(dog?.litter_id ?? "");
  const [readyDate, setReadyDate] = useState(dog?.ready_date ?? "");
  const [videoUrl, setVideoUrl] = useState(dog?.video_url ?? "");
  const [tagsStr, setTagsStr] = useState((dog?.temperament_tags ?? []).join(", "));
  const [gallery, setGallery] = useState<string[]>(dog?.gallery_urls ?? []);
  const [priorityStr, setPriorityStr] = useState(
    dog?.priority_order != null ? String(dog.priority_order) : "0",
  );
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  async function uploadOne(file: File): Promise<string | null> {
    const ext = file.name.split(".").pop() ?? "jpg";
    const key = `dogs/${slugify(name || "dog")}-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 7)}.${ext}`;
    const { error } = await supabase.storage.from(STORAGE_BUCKET).upload(key, file);
    if (error) {
      alert(`Upload error: ${error.message}`);
      return null;
    }
    return supabase.storage.from(STORAGE_BUCKET).getPublicUrl(key).data.publicUrl;
  }

  async function handleImageUpload(file: File) {
    setUploading(true);
    const url = await uploadOne(file);
    if (url) setImageUrl(url);
    setUploading(false);
  }

  async function handleGalleryUpload(files: FileList) {
    setUploading(true);
    const uploaded: string[] = [];
    for (const f of Array.from(files)) {
      const url = await uploadOne(f);
      if (url) uploaded.push(url);
    }
    if (uploaded.length > 0) {
      setGallery((prev) => [...prev, ...uploaded]);
      if (!imageUrl) setImageUrl(uploaded[0]);
    }
    setUploading(false);
  }

  function removeFromGallery(url: string) {
    setGallery((prev) => prev.filter((u) => u !== url));
  }

  function moveInGallery(index: number, dir: -1 | 1) {
    setGallery((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  async function handleSave() {
    if (!name.trim()) {
      alert("Name is required");
      return;
    }
    let finalSlug = slug.trim() || slugify(name);
    if (!isEdit && existingSlugs.includes(finalSlug)) {
      finalSlug = `${finalSlug}-${Date.now().toString(36).slice(-4)}`;
    }
    const priceNum = priceStr.trim() ? Number(priceStr) : null;
    if (priceStr.trim() && Number.isNaN(priceNum)) {
      alert("Price must be a number");
      return;
    }
    const priorityNum = Number(priorityStr) || 0;

    const payload = {
      name: name.trim(),
      slug: finalSlug,
      sex: sex || null,
      dob: dob || null,
      ready_date: readyDate || null,
      status: status || "available",
      video_url: videoUrl.trim() || null,
      gallery_urls: gallery.length > 0 ? gallery : null,
      temperament_tags:
        tagsStr.trim().length > 0
          ? tagsStr
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          : null,
      tier: tier || null,
      price: priceNum,
      collar_color: collarColor.trim() || null,
      image_url: imageUrl.trim() || null,
      personality_bio: bio.trim() || null,
      ideal_home: idealHome.trim() || null,
      stripe_payment_link: stripeLink.trim() || null,
      litter_id: litterId || null,
      priority_order: priorityNum,
    };

    setSaving(true);
    const { error } = isEdit
      ? await supabase.from(T.puppies).update(payload).eq("id", dog!.id)
      : await supabase.from(T.puppies).insert(payload);
    setSaving(false);
    if (error) {
      alert(`Save error: ${error.message}`);
      return;
    }
    onSaved();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-background p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-display text-xl font-bold text-foreground">
            {isEdit ? `Edit ${dog!.name}` : "New Dog"}
          </h3>
          <button onClick={onClose} className="text-sm text-muted-foreground hover:text-foreground">
            ✕
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <LabeledInput label="Name *" value={name} onChange={setName} />
          <LabeledInput label="Slug (URL)" value={slug} onChange={setSlug} />
          <Field label="Sex">
            <select
              value={sex}
              onChange={(e) => setSex(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">—</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </Field>
          <Field label="Date of Birth">
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
            />
          </Field>
          <Field label="Ready / go-home date">
            <input
              type="date"
              value={readyDate}
              onChange={(e) => setReadyDate(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
            />
          </Field>
          <Field label="Status">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
            >
              {DOG_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Litter">
            <select
              value={litterId}
              onChange={(e) => setLitterId(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">— None —</option>
              {litters.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))}
            </select>
          </Field>
          <LabeledInput label="Tier" value={tier} onChange={setTier} />
          <LabeledInput label="Price (USD)" value={priceStr} onChange={setPriceStr} />
          <LabeledInput label="Collar color" value={collarColor} onChange={setCollarColor} />
          <LabeledInput label="Priority order" value={priorityStr} onChange={setPriorityStr} />
          <div className="sm:col-span-2">
            <LabeledInput label="Stripe payment link" value={stripeLink} onChange={setStripeLink} />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-foreground">
              Profile image (default photo)
            </label>
            <div className="flex items-center gap-3">
              {imageUrl ? (
                <img src={imageUrl} alt="" className="h-16 w-16 rounded-lg object-cover" />
              ) : (
                <div className="h-16 w-16 rounded-lg bg-muted" />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleImageUpload(f);
                }}
                className="text-xs"
              />
              {uploading && <span className="text-xs text-muted-foreground">Uploading…</span>}
            </div>
            <input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="or paste image URL"
              className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 text-xs"
            />
          </div>

          <div className="sm:col-span-2 rounded-xl border border-border p-4">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div>
                <label className="block text-sm font-medium text-foreground">Photo gallery</label>
                <p className="text-xs text-muted-foreground">
                  Upload multiple photos, reorder them, or set any one as the profile picture.
                </p>
              </div>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) handleGalleryUpload(files);
                  e.currentTarget.value = "";
                }}
                className="text-xs"
              />
            </div>

            {gallery.length === 0 ? (
              <p className="text-xs text-muted-foreground">No gallery photos yet.</p>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {gallery.map((u, i) => {
                  const isProfile = u === imageUrl;
                  return (
                    <div
                      key={`${u}-${i}`}
                      className={`overflow-hidden rounded-lg border ${
                        isProfile ? "border-accent ring-2 ring-accent/40" : "border-border"
                      }`}
                    >
                      <img src={u} alt="" className="h-24 w-full object-cover" />
                      <div className="flex items-center justify-between gap-1 p-1">
                        <button
                          type="button"
                          onClick={() => setImageUrl(u)}
                          disabled={isProfile}
                          className="rounded px-1.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent disabled:text-muted-foreground"
                        >
                          {isProfile ? "Profile" : "Set profile"}
                        </button>
                        <div className="flex items-center gap-0.5">
                          <button
                            type="button"
                            onClick={() => moveInGallery(i, -1)}
                            className="rounded px-1 text-xs text-muted-foreground hover:text-foreground"
                            aria-label="Move left"
                          >
                            ←
                          </button>
                          <button
                            type="button"
                            onClick={() => moveInGallery(i, 1)}
                            className="rounded px-1 text-xs text-muted-foreground hover:text-foreground"
                            aria-label="Move right"
                          >
                            →
                          </button>
                          <button
                            type="button"
                            onClick={() => removeFromGallery(u)}
                            className="rounded px-1 text-xs text-destructive"
                            aria-label="Remove photo"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {imageUrl && !gallery.includes(imageUrl) && (
              <button
                type="button"
                onClick={() => setGallery((prev) => [...prev, imageUrl])}
                className="mt-3 rounded-md border border-border px-2 py-1 text-xs font-semibold text-foreground hover:bg-muted"
              >
                + Add current profile image to gallery
              </button>
            )}
          </div>

          <div className="sm:col-span-2">
            <LabeledInput
              label="Temperament tags (comma separated)"
              value={tagsStr}
              onChange={setTagsStr}
            />
          </div>
          <div className="sm:col-span-2">
            <LabeledInput label="Video URL" value={videoUrl} onChange={setVideoUrl} />
          </div>
          <div className="sm:col-span-2">
            <LabeledTextarea label="Personality bio" value={bio} onChange={setBio} rows={3} />
          </div>
          <div className="sm:col-span-2">
            <LabeledTextarea
              label="Ideal home"
              value={idealHome}
              onChange={setIdealHome}
              rows={2}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving || uploading}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-bold text-accent-foreground transition-all hover:brightness-110 disabled:opacity-50"
          >
            {saving ? "Saving…" : isEdit ? "Save changes" : "Create dog"}
          </button>
        </div>
      </div>
    </div>
  );
}

function LittersAdminTab() {
  const [litters, setLitters] = useState<Litter[]>([]);
  const [puppies, setPuppies] = useState<Puppy[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Litter | null>(null);
  const [showNew, setShowNew] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const [{ data: lits }, { data: pups }] = await Promise.all([
      supabase.from(T.litters).select("*").order("priority_order", { ascending: false }),
      supabase
        .from(T.puppies)
        .select(
          "id, name, slug, status, reserved_by_lead_id, deposit_paid_at, priority_order, litter_id",
        )
        .order("priority_order"),
    ]);
    setLitters((lits ?? []) as Litter[]);
    setPuppies((pups ?? []) as Puppy[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function handleDelete(litter: Litter) {
    if (!confirm(`Delete litter "${litter.name}"? Puppies will become unassigned.`)) return;
    const { error } = await supabase.from(T.litters).delete().eq("id", litter.id);
    if (error) {
      alert(`Error: ${error.message}`);
      return;
    }
    fetchData();
  }

  async function assignPuppy(puppyId: string, litterId: string | null) {
    const { error } = await supabase
      .from(T.puppies)
      .update({ litter_id: litterId })
      .eq("id", puppyId);
    if (error) {
      alert(`Error: ${error.message}`);
      return;
    }
    fetchData();
  }

  if (loading) {
    return <div className="text-sm text-muted-foreground">Loading litters…</div>;
  }

  const orphans = puppies.filter((p) => !p.litter_id);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-lg font-bold text-foreground">Litters</h2>
          <p className="text-sm text-muted-foreground">
            Group puppies under their litter. Each litter shows on the public site.
          </p>
        </div>
        <button
          onClick={() => setShowNew(true)}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-bold text-accent-foreground transition-all hover:brightness-110"
        >
          + New Litter
        </button>
      </div>

      {litters.length === 0 && (
        <p className="text-sm text-muted-foreground">No litters yet. Create your first one.</p>
      )}

      <div className="space-y-4">
        {litters.map((lit) => {
          const litPups = puppies.filter(
            (p) => p.litter_id === lit.id && p.status !== "parent",
          );
          return (
            <div key={lit.id} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-lg font-bold text-foreground">{lit.name}</h3>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-semibold capitalize text-muted-foreground">
                      {lit.status}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {[
                      lit.dam_name && lit.sire_name ? `${lit.dam_name} × ${lit.sire_name}` : null,
                      lit.born_date ? `Born ${formatDateOnly(lit.born_date)}` : null,
                      lit.ready_date
                        ? `Ready ${formatDateOnly(lit.ready_date)}`
                        : null,
                      `${litPups.length}${lit.expected_count ? ` of ${lit.expected_count}` : ""} puppies`,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditing(lit)}
                    className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(lit)}
                    className="rounded-lg border border-destructive/30 px-3 py-1.5 text-xs font-semibold text-destructive hover:bg-destructive/10"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Puppies in this litter
                </p>
                {litPups.length === 0 ? (
                  <p className="text-sm text-muted-foreground">None assigned yet.</p>
                ) : (
                  <ul className="space-y-1">
                    {litPups.map((p) => (
                      <li
                        key={p.id}
                        className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2 text-sm"
                      >
                        <span className="font-medium text-foreground">{p.name}</span>
                        <button
                          onClick={() => assignPuppy(p.id, null)}
                          className="text-xs text-muted-foreground hover:text-destructive"
                        >
                          Unassign
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {orphans.length > 0 && (
        <div className="rounded-2xl border border-dashed border-border bg-card/40 p-5">
          <h3 className="font-display text-base font-bold text-foreground">Unassigned puppies</h3>
          <p className="mt-1 text-xs text-muted-foreground">Assign each puppy to a litter.</p>
          <ul className="mt-4 space-y-2">
            {orphans.map((p) => (
              <li
                key={p.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm"
              >
                <span className="font-medium text-foreground">{p.name}</span>
                <select
                  onChange={(e) => assignPuppy(p.id, e.target.value || null)}
                  defaultValue=""
                  className="rounded-md border border-input bg-background px-2 py-1 text-xs"
                >
                  <option value="">Assign to litter…</option>
                  {litters.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.name}
                    </option>
                  ))}
                </select>
              </li>
            ))}
          </ul>
        </div>
      )}

      {(showNew || editing) && (
        <LitterFormModal
          litter={editing}
          existingSlugs={litters.map((l) => l.slug)}
          onClose={() => {
            setShowNew(false);
            setEditing(null);
          }}
          onSaved={() => {
            setShowNew(false);
            setEditing(null);
            fetchData();
          }}
        />
      )}
    </div>
  );
}

function LitterFormModal({
  litter,
  existingSlugs,
  onClose,
  onSaved,
}: {
  litter: Litter | null;
  existingSlugs: string[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEdit = !!litter;
  const [name, setName] = useState(litter?.name ?? "");
  const [slug, setSlug] = useState(litter?.slug ?? "");
  const [damName, setDamName] = useState(litter?.dam_name ?? "");
  const [sireName, setSireName] = useState(litter?.sire_name ?? "");
  const [bornDate, setBornDate] = useState(litter?.born_date ?? "");
  const [readyDate, setReadyDate] = useState(litter?.ready_date ?? "");
  const [expectedCount, setExpectedCount] = useState<string>(
    litter?.expected_count?.toString() ?? "",
  );
  const [status, setStatus] = useState(litter?.status ?? "upcoming");
  const [description, setDescription] = useState(litter?.description ?? "");
  const [coverImageUrl, setCoverImageUrl] = useState(litter?.cover_image_url ?? "");
  const [priorityOrder, setPriorityOrder] = useState<string>(
    litter?.priority_order?.toString() ?? "0",
  );
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isEdit && name) setSlug(slugify(name));
  }, [name, isEdit]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !slug.trim()) {
      alert("Name and slug are required.");
      return;
    }
    if (!isEdit && existingSlugs.includes(slug.trim())) {
      alert("A litter with this slug already exists. Choose a different name.");
      return;
    }
    setSaving(true);
    const payload = {
      name: name.trim(),
      slug: slug.trim(),
      dam_name: damName.trim() || null,
      sire_name: sireName.trim() || null,
      born_date: bornDate || null,
      ready_date: readyDate || null,
      expected_count: expectedCount ? Number(expectedCount) : null,
      status,
      description: description.trim() || null,
      cover_image_url: coverImageUrl.trim() || null,
      priority_order: Number(priorityOrder) || 0,
    };
    const { error } = isEdit
      ? await supabase.from(T.litters).update(payload).eq("id", litter!.id)
      : await supabase.from(T.litters).insert(payload);
    setSaving(false);
    if (error) {
      alert(`Error: ${error.message}`);
      return;
    }
    onSaved();
  }

  const inputCls =
    "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/20";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-card p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-display text-xl font-bold text-foreground">
          {isEdit ? "Edit Litter" : "New Litter"}
        </h3>
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <Field label="Name *">
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Spring 2026"
              className={inputCls}
            />
          </Field>
          <Field label="Slug *">
            <input
              required
              value={slug}
              onChange={(e) => setSlug(slugify(e.target.value))}
              placeholder="spring-2026"
              className={inputCls}
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Dam (mother)">
              <input
                value={damName}
                onChange={(e) => setDamName(e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Sire (father)">
              <input
                value={sireName}
                onChange={(e) => setSireName(e.target.value)}
                className={inputCls}
              />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Born date">
              <input
                type="date"
                value={bornDate}
                onChange={(e) => setBornDate(e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Ready date">
              <input
                type="date"
                value={readyDate}
                onChange={(e) => setReadyDate(e.target.value)}
                className={inputCls}
              />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Expected count">
              <input
                type="number"
                min="0"
                value={expectedCount}
                onChange={(e) => setExpectedCount(e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Status">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className={inputCls}
              >
                {LITTER_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Sort order">
              <input
                type="number"
                value={priorityOrder}
                onChange={(e) => setPriorityOrder(e.target.value)}
                className={inputCls}
              />
            </Field>
          </div>
          <Field label="Cover image URL">
            <input
              value={coverImageUrl}
              onChange={(e) => setCoverImageUrl(e.target.value)}
              placeholder="https://…"
              className={inputCls}
            />
          </Field>
          <Field label="Description">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className={inputCls}
            />
          </Field>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-accent px-4 py-2 text-sm font-bold text-accent-foreground transition-all hover:brightness-110 disabled:opacity-60"
            >
              {saving ? "Saving…" : isEdit ? "Save changes" : "Create litter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
