import { useCallback, useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import { supabase, T } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type LeadRow = {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  city: string | null;
  state: string | null;
  stage: string | null;
  source: string | null;
  preferred_sex: string | null;
  score: number | null;
  deposit_status: string | null;
  reason_for_breed: string | null;
  additional_notes: string | null;
  created_at: string | null;
};

type LegacyWaitlistRow = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  preferred_sex: string | null;
  message: string | null;
  status: string;
  created_at: string;
};

type ReservationRow = {
  id: string;
  amount: number | null;
  deposit_status: string | null;
  stripe_session_id: string | null;
  created_at: string | null;
  lead_id: string | null;
  puppy_id: string | null;
  lead?: { full_name: string | null; email: string | null } | null;
  puppy?: { name: string | null } | null;
};

const STAGE_LABELS: Record<string, string> = {
  new_inquiry: "New inquiry",
  waitlist: "Waitlist",
  match_call_booked: "Family Fit Call booked",
  application_complete: "Application complete",
  under_review: "Under review",
  placement_approved: "Approved",
  approved: "Approved",
  deposit_paid: "Deposit paid",
  reserved: "Reserved",
  denied: "Denied",
};

function exportCsv(filename: string, headers: string[], rows: string[][]) {
  const csv = [headers.join(","), ...rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(","))].join(
    "\n",
  );
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function SubmissionsPanel() {
  const [rows, setRows] = useState<LeadRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("all");
  const [selected, setSelected] = useState<LeadRow | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from(T.leads)
      .select(
        "id, full_name, email, phone, city, state, stage, source, preferred_sex, score, deposit_status, reason_for_breed, additional_notes, created_at",
      )
      .neq("stage", "waitlist")
      .order("created_at", { ascending: false });
    if (error) toast.error("Failed to load submissions");
    setRows((data ?? []) as LeadRow[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      const matchesStage = stageFilter === "all" || r.stage === stageFilter;
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        r.full_name?.toLowerCase().includes(q) ||
        r.email?.toLowerCase().includes(q) ||
        r.phone?.toLowerCase().includes(q) ||
        r.source?.toLowerCase().includes(q);
      return matchesStage && matchesSearch;
    });
  }, [rows, search, stageFilter]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, email, phone, source…"
          className="min-w-[220px] flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm"
        />
        <select
          value={stageFilter}
          onChange={(e) => setStageFilter(e.target.value)}
          className="rounded-lg border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="all">All stages</option>
          {Object.entries(STAGE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => void load()}
          className="rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-muted"
        >
          Refresh
        </button>
        <button
          type="button"
          onClick={() =>
            exportCsv(
              `wws-submissions-${format(new Date(), "yyyy-MM-dd")}.csv`,
              ["Name", "Email", "Phone", "Stage", "Source", "Score", "Submitted"],
              filtered.map((r) => [
                r.full_name ?? "",
                r.email ?? "",
                r.phone ?? "",
                r.stage ?? "",
                r.source ?? "",
                String(r.score ?? ""),
                r.created_at ? format(new Date(r.created_at), "yyyy-MM-dd") : "",
              ]),
            )
          }
          className="rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-accent-foreground"
        >
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-muted/50 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Stage</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Score</th>
              <th className="px-4 py-3">Submitted</th>
              <th className="px-4 py-3"> </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                  Loading submissions…
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                  No submissions match your filters.
                </td>
              </tr>
            ) : (
              filtered.map((r) => (
                <tr key={r.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium">{r.full_name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.email}</td>
                  <td className="px-4 py-3 capitalize">{r.stage?.replace(/_/g, " ") ?? "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.source ?? "—"}</td>
                  <td className="px-4 py-3">{r.score ?? "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {r.created_at ? format(new Date(r.created_at), "MMM d, yyyy") : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => setSelected(r)}
                      className="text-xs font-semibold text-accent hover:underline"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
          <div className="h-full w-full max-w-lg overflow-y-auto bg-card p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-xl font-bold">{selected.full_name}</h3>
                <p className="text-sm text-muted-foreground">{selected.email}</p>
              </div>
              <button type="button" onClick={() => setSelected(null)} className="text-sm text-muted-foreground">
                Close
              </button>
            </div>
            <dl className="mt-6 space-y-3 text-sm">
              {[
                ["Phone", selected.phone],
                ["Location", [selected.city, selected.state].filter(Boolean).join(", ") || "—"],
                ["Stage", selected.stage?.replace(/_/g, " ")],
                ["Source", selected.source],
                ["Preferred sex", selected.preferred_sex],
                ["Deposit", selected.deposit_status],
                ["Score", selected.score],
              ].map(([label, value]) => (
                <div key={String(label)} className="flex justify-between gap-4 border-b border-border pb-2">
                  <dt className="text-muted-foreground">{label}</dt>
                  <dd className="text-right font-medium capitalize">{value ?? "—"}</dd>
                </div>
              ))}
            </dl>
            {selected.reason_for_breed && (
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase text-muted-foreground">About their home</p>
                <p className="mt-2 text-sm leading-relaxed">{selected.reason_for_breed}</p>
              </div>
            )}
            {selected.additional_notes && (
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase text-muted-foreground">Notes</p>
                <p className="mt-2 text-sm leading-relaxed">{selected.additional_notes}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function WaitlistPanel() {
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [legacy, setLegacy] = useState<LegacyWaitlistRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const [{ data: leadRows }, { data: legacyRows }] = await Promise.all([
      supabase
        .from(T.leads)
        .select("id, full_name, email, phone, preferred_sex, additional_notes, created_at, stage, source")
        .eq("stage", "waitlist")
        .order("created_at", { ascending: false }),
      supabase
        .from("puppy_waitlist")
        .select("id, first_name, last_name, email, phone, preferred_sex, message, status, created_at")
        .order("created_at", { ascending: false }),
    ]);
    setLeads((leadRows ?? []) as LeadRow[]);
    setLegacy((legacyRows ?? []) as LegacyWaitlistRow[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function markLegacyContacted(id: string) {
    const { error } = await supabase.from("puppy_waitlist").update({ status: "contacted" }).eq("id", id);
    if (error) toast.error("Update failed");
    else {
      toast.success("Marked contacted");
      void load();
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => void load()}
          className="rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-muted"
        >
          Refresh
        </button>
      </div>

      <section>
        <h3 className="text-sm font-semibold text-foreground">Funnel waitlist ({leads.length})</h3>
        <p className="text-xs text-muted-foreground">From /apply?waitlist=true and the homepage form.</p>
        <div className="mt-3 overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted/50 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Preference</th>
                <th className="px-4 py-3">Joined</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-muted-foreground">
                    Loading…
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-muted-foreground">
                    No funnel waitlist entries yet.
                  </td>
                </tr>
              ) : (
                leads.map((r) => (
                  <tr key={r.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-medium">{r.full_name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.email}</td>
                    <td className="px-4 py-3 capitalize">{r.preferred_sex ?? "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {r.created_at ? format(new Date(r.created_at), "MMM d, yyyy") : "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-foreground">Legacy homepage waitlist ({legacy.length})</h3>
        <p className="text-xs text-muted-foreground">Older entries stored before the funnel consolidation.</p>
        <div className="mt-3 overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted/50 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Joined</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {legacy.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-muted-foreground">
                    No legacy entries.
                  </td>
                </tr>
              ) : (
                legacy.map((r) => (
                  <tr key={r.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-medium">
                      {r.first_name} {r.last_name}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{r.email}</td>
                    <td className="px-4 py-3 capitalize">{r.status}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {format(new Date(r.created_at), "MMM d, yyyy")}
                    </td>
                    <td className="px-4 py-3">
                      {r.status === "new" && (
                        <button
                          type="button"
                          onClick={() => void markLegacyContacted(r.id)}
                          className="text-xs font-semibold text-accent hover:underline"
                        >
                          Mark contacted
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function PaymentsPanel() {
  const [rows, setRows] = useState<ReservationRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from(T.reservations)
      .select(
        "id, amount, deposit_status, stripe_session_id, created_at, lead_id, puppy_id, lead:wws_leads(full_name, email), puppy:wws_puppies(name)",
      )
      .order("created_at", { ascending: false });
    if (error) toast.error("Failed to load payments");
    setRows((data ?? []) as ReservationRow[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => void load()}
          className="rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-muted"
        >
          Refresh
        </button>
      </div>
      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-muted/50 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Puppy</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Stripe session</th>
              <th className="px-4 py-3">Paid</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                  Loading payments…
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                  No reservation payments recorded yet. Successful Stripe checkouts appear here automatically.
                </td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr key={r.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <p className="font-medium">{r.lead?.full_name ?? "Unknown"}</p>
                    <p className="text-xs text-muted-foreground">{r.lead?.email}</p>
                  </td>
                  <td className="px-4 py-3">{r.puppy?.name ?? "—"}</td>
                  <td className="px-4 py-3">${r.amount ?? 500}</td>
                  <td className="px-4 py-3 capitalize">{r.deposit_status ?? "—"}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {r.stripe_session_id?.slice(0, 20) ?? "—"}…
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {r.created_at ? format(new Date(r.created_at), "MMM d, yyyy h:mm a") : "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/** Forms & flow admin — submissions, waitlist, and Stripe payments (mirrors gabrielhealth Enrollments). */
export default function FormsFlowAdminTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">Forms &amp; Flow</h2>
        <p className="text-sm text-muted-foreground">
          Review inquiry submissions, waitlist signups, and reservation payments in one place.
        </p>
      </div>
      <Tabs defaultValue="submissions" className="w-full">
        <TabsList>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
          <TabsTrigger value="waitlist">Waitlist</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>
        <TabsContent value="submissions" className="mt-4">
          <SubmissionsPanel />
        </TabsContent>
        <TabsContent value="waitlist" className="mt-4">
          <WaitlistPanel />
        </TabsContent>
        <TabsContent value="payments" className="mt-4">
          <PaymentsPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}
