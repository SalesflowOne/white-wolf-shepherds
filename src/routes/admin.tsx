import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

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
  created_at: string | null;
  updated_at: string | null;
};

type Puppy = {
  id: string;
  name: string;
  status: string | null;
  reserved_by_lead_id: string | null;
  deposit_paid_at: string | null;
};

type Stats = {
  totalLeads: number;
  hotLeads: number;
  depositsPaid: number;
  revenue: number;
  puppiesAvailable: number;
};

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({
    meta: [{ title: "Admin Dashboard — White Wolf Shepherds" }],
  }),
});

function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  // Check stored auth
  useEffect(() => {
    const stored = sessionStorage.getItem("admin_auth");
    if (stored === "true") setAuthenticated(true);
  }, []);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    // Simple password check — in production use env var comparison on server
    // For client-side demo, we check against a known value or accept any non-empty password
    const adminPw = import.meta.env.VITE_ADMIN_PASSWORD || import.meta.env.ADMIN_PASSWORD || "whitewolf2026";
    if (password === adminPw) {
      setAuthenticated(true);
      sessionStorage.setItem("admin_auth", "true");
    } else {
      setLoginError(true);
    }
  }

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm rounded-2xl bg-card p-8 shadow-wolf">
          <h1 className="font-display text-2xl font-bold text-foreground">Admin Access</h1>
          <p className="mt-2 text-sm text-muted-foreground">Enter the admin password to continue.</p>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setLoginError(false); }}
            placeholder="Password"
            className="mt-6 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/20"
          />
          {loginError && (
            <p className="mt-2 text-sm text-red-600">Incorrect password.</p>
          )}
          <button
            type="submit"
            className="mt-4 w-full rounded-xl bg-accent py-3 text-sm font-bold uppercase tracking-wider text-accent-foreground transition-all hover:brightness-110"
          >
            Sign In
          </button>
        </form>
      </div>
    );
  }

  return <AdminDashboard />;
}

function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [puppies, setPuppies] = useState<Puppy[]>([]);
  const [stats, setStats] = useState<Stats>({ totalLeads: 0, hotLeads: 0, depositsPaid: 0, revenue: 0, puppiesAvailable: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [approveModal, setApproveModal] = useState<Lead | null>(null);
  const [leadNames, setLeadNames] = useState<Record<string, string>>({});

  const fetchData = useCallback(async () => {
    const [leadsRes, puppiesRes, reservationsRes] = await Promise.all([
      supabase.from("leads").select("*").order("score", { ascending: false }),
      supabase.from("puppies").select("id, name, status, reserved_by_lead_id, deposit_paid_at").order("priority_order", { ascending: true }),
      supabase.from("reservations").select("amount"),
    ]);

    const leadsData = (leadsRes.data ?? []) as Lead[];
    const puppiesData = (puppiesRes.data ?? []) as Puppy[];
    const reservationsData = reservationsRes.data ?? [];

    setLeads(leadsData);
    setPuppies(puppiesData);

    // Build lead name lookup for puppy cards
    const nameMap: Record<string, string> = {};
    leadsData.forEach((l) => { if (l.id && l.full_name) nameMap[l.id] = l.full_name; });
    setLeadNames(nameMap);

    setStats({
      totalLeads: leadsData.length,
      hotLeads: leadsData.filter((l) => (l.score ?? 0) >= 70).length,
      depositsPaid: leadsData.filter((l) => l.stage === "deposit_paid" || l.stage === "reserved").length,
      revenue: reservationsData.reduce((sum, r: { amount: number | null }) => sum + (r.amount ?? 0), 0),
      puppiesAvailable: puppiesData.filter((p) => p.status === "available").length,
    });

    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  async function updateLeadStage(leadId: string, stage: string) {
    const updates: Record<string, unknown> = { stage, updated_at: new Date().toISOString() };
    if (stage === "approved") {
      updates.approval_sent_at = new Date().toISOString();
    }

    await supabase.from("leads").update(updates).eq("id", leadId);
    await fetchData();

    if (stage === "approved") {
      const lead = leads.find((l) => l.id === leadId);
      if (lead) setApproveModal(lead);
    }
  }

  async function saveInternalNotes(leadId: string, notes: string) {
    await supabase.from("leads").update({ internal_notes: notes, updated_at: new Date().toISOString() }).eq("id", leadId);
  }

  // Get puppy name for a lead
  const getPuppyName = (puppyId: string | null) => {
    if (!puppyId) return "—";
    const p = puppies.find((pup) => pup.id === puppyId);
    return p?.name ?? "—";
  };

  const stageColors: Record<string, string> = {
    new_inquiry: "bg-gray-100 text-gray-700",
    application_submitted: "bg-blue-100 text-blue-700",
    qualified: "bg-teal-100 text-teal-700",
    approved: "bg-purple-100 text-purple-700",
    deposit_paid: "bg-green-100 text-green-700",
    reserved: "bg-green-200 text-green-800",
    waitlist: "bg-orange-100 text-orange-700",
    completed: "bg-slate-100 text-slate-700",
  };

  const stageLabel = (stage: string | null) => (stage ?? "new_inquiry").replace(/_/g, " ");

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h1 className="font-display text-xl font-bold text-foreground">
            White Wolf <span className="text-accent">Admin</span>
          </h1>
          <button
            onClick={() => { sessionStorage.removeItem("admin_auth"); window.location.reload(); }}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Sign Out
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Stats bar */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          <StatCard label="Total Leads" value={stats.totalLeads} />
          <StatCard label="Hot Leads" value={stats.hotLeads} accent />
          <StatCard label="Deposits Paid" value={stats.depositsPaid} />
          <StatCard label="Revenue" value={`$${stats.revenue.toLocaleString()}`} />
          <StatCard label="Puppies Available" value={`${stats.puppiesAvailable} / 9`} />
        </div>

        {/* Leads table */}
        <div className="mt-10">
          <h2 className="font-display text-lg font-bold text-foreground">Leads</h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-muted/50">
                <tr>
                  <th className="px-4 py-3 font-semibold text-muted-foreground">Name</th>
                  <th className="px-4 py-3 font-semibold text-muted-foreground">Email</th>
                  <th className="px-4 py-3 font-semibold text-muted-foreground">Phone</th>
                  <th className="px-4 py-3 font-semibold text-muted-foreground">Score</th>
                  <th className="px-4 py-3 font-semibold text-muted-foreground">Stage</th>
                  <th className="px-4 py-3 font-semibold text-muted-foreground">Puppy</th>
                  <th className="px-4 py-3 font-semibold text-muted-foreground">Timeline</th>
                  <th className="px-4 py-3 font-semibold text-muted-foreground">Applied</th>
                  <th className="px-4 py-3 font-semibold text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-8 text-center text-muted-foreground">
                      No leads yet. Applications will appear here.
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                      <td className="px-4 py-3 font-medium text-foreground">{lead.full_name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{lead.email}</td>
                      <td className="px-4 py-3 text-muted-foreground">{lead.phone}</td>
                      <td className="px-4 py-3">
                        <ScorePill score={lead.score ?? 0} />
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${stageColors[lead.stage ?? "new_inquiry"] ?? stageColors.new_inquiry}`}>
                          {stageLabel(lead.stage)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {getPuppyName(lead.preferred_puppy_id)}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground capitalize">
                        {lead.timeline?.replace(/_/g, " ") ?? "—"}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {lead.created_at ? new Date(lead.created_at).toLocaleDateString() : "—"}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <ActionBtn label="Qualify" onClick={() => updateLeadStage(lead.id, "qualified")} />
                          <ActionBtn label="Approve" onClick={() => updateLeadStage(lead.id, "approved")} color="purple" />
                          <ActionBtn label="Waitlist" onClick={() => updateLeadStage(lead.id, "waitlist")} color="orange" />
                          <ActionBtn label="View" onClick={() => setSelectedLead(lead)} color="slate" />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Puppies status grid */}
        <div className="mt-10">
          <h2 className="font-display text-lg font-bold text-foreground">Puppies Status</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {puppies.map((p) => (
              <div key={p.id} className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-base font-bold text-foreground">{p.name}</h3>
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
        </div>
      </div>

      {/* View Lead Slide-over */}
      {selectedLead && (
        <LeadSlideOver
          lead={selectedLead}
          puppyName={getPuppyName(selectedLead.preferred_puppy_id)}
          onClose={() => setSelectedLead(null)}
          onSaveNotes={saveInternalNotes}
        />
      )}

      {/* Approve Modal */}
      {approveModal && (
        <ApproveModal
          lead={approveModal}
          onClose={() => setApproveModal(null)}
        />
      )}
    </div>
  );
}

function StatCard({ label, value, accent }: { label: string; value: string | number; accent?: boolean }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className={`mt-2 font-display text-2xl font-bold ${accent ? "text-accent" : "text-foreground"}`}>
        {value}
      </p>
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
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${color}`}>
      {score >= 70 && <span>&#128293;</span>}
      {score}
    </span>
  );
}

function ActionBtn({ label, onClick, color }: { label: string; onClick: () => void; color?: string }) {
  const colors: Record<string, string> = {
    purple: "text-purple-600 hover:bg-purple-50",
    orange: "text-orange-600 hover:bg-orange-50",
    slate: "text-slate-600 hover:bg-slate-50",
  };

  return (
    <button
      onClick={onClick}
      className={`rounded-md px-2 py-1 text-xs font-semibold transition-colors ${
        colors[color ?? ""] ?? "text-accent hover:bg-accent/10"
      }`}
    >
      {label}
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
  onSaveNotes: (id: string, notes: string) => void;
}) {
  const [notes, setNotes] = useState(lead.internal_notes ?? "");

  const fields = [
    { label: "Full Name", value: lead.full_name },
    { label: "Email", value: lead.email },
    { label: "Phone", value: lead.phone },
    { label: "City", value: lead.city },
    { label: "State", value: lead.state },
    { label: "Preferred Sex", value: lead.preferred_sex },
    { label: "Preferred Puppy", value: puppyName },
    { label: "Timeline", value: lead.timeline?.replace(/_/g, " ") },
    { label: "Has Owned Large Dog", value: lead.has_owned_large_dog ? "Yes" : "No" },
    { label: "Has Fenced Yard", value: lead.has_fenced_yard ? "Yes" : "No" },
    { label: "Household Type", value: lead.household_type },
    { label: "Family Size", value: lead.family_size?.toString() },
    { label: "Children Ages", value: lead.children_ages },
    { label: "Other Pets", value: lead.other_pets },
    { label: "Ready for Reservation", value: lead.ready_for_deposit ? "Yes" : "No" },
    { label: "Source", value: lead.source },
    { label: "Score", value: lead.score?.toString() },
    { label: "Stage", value: lead.stage?.replace(/_/g, " ") },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative w-full max-w-lg overflow-y-auto bg-card shadow-wolf">
        <div className="sticky top-0 flex items-center justify-between border-b border-border bg-card px-6 py-4">
          <h2 className="font-display text-lg font-bold text-foreground">{lead.full_name}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-4">
          {fields.map((f) => (
            <div key={f.label}>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {f.label}
              </p>
              <p className="mt-1 text-sm text-foreground">{f.value || "—"}</p>
            </div>
          ))}

          {/* Reason for breed */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Why a White German Shepherd?
            </p>
            <p className="mt-1 text-sm text-foreground">{lead.reason_for_breed || "—"}</p>
          </div>

          {/* Additional notes from applicant */}
          {lead.additional_notes && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Additional Notes (from applicant)
              </p>
              <p className="mt-1 text-sm text-foreground">{lead.additional_notes}</p>
            </div>
          )}

          {/* Internal notes */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Internal Notes
            </p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onBlur={() => onSaveNotes(lead.id, notes)}
              rows={4}
              className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/20"
              placeholder="Add internal notes..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ApproveModal({ lead, onClose }: { lead: Lead; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const approvalUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/approved/${lead.approval_token}`;

  function copyLink() {
    navigator.clipboard.writeText(approvalUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl bg-card p-8 shadow-wolf">
        <h2 className="font-display text-lg font-bold text-foreground">Approval Link Ready</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Send this link to <strong>{lead.full_name}</strong> via email or SMS. It expires 48 hours after they receive it.
        </p>

        <div className="mt-4 flex items-center gap-2 rounded-lg border border-border bg-muted/50 p-3">
          <input
            readOnly
            value={approvalUrl}
            className="flex-1 bg-transparent text-xs text-foreground outline-none"
          />
          <button
            onClick={copyLink}
            className="shrink-0 rounded-md bg-accent px-3 py-1.5 text-xs font-bold text-accent-foreground transition-all hover:brightness-110"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-xl border border-border py-3 text-sm font-bold uppercase tracking-wider text-foreground transition-all hover:bg-muted"
        >
          Close
        </button>
      </div>
    </div>
  );
}
