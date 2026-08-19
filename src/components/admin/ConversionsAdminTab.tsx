import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type EventRow = {
  id: string;
  event_name: string;
  form_id: string | null;
  step: string | null;
  page_path: string | null;
  session_id: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  created_at: string;
};

const RANGES = [
  { label: "Last 7 days", days: 7 },
  { label: "Last 30 days", days: 30 },
  { label: "Last 90 days", days: 90 },
] as const;

const FORM_LABELS: Record<string, string> = {
  waitlist_home: "Homepage waitlist",
  apply: "Apply form",
  get_started: "Get Started funnel",
};

function pct(part: number, whole: number) {
  if (!whole) return "0%";
  return `${((part / whole) * 100).toFixed(1)}%`;
}

/** Conversion reporting for the inquiry forms: funnel, per-form rates and traffic sources. */
export default function ConversionsAdminTab() {
  const [rows, setRows] = useState<EventRow[]>([]);
  const [days, setDays] = useState<number>(30);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const since = new Date(Date.now() - days * 86400000).toISOString();
      const { data, error: err } = await supabase
        .from("wws_analytics_events")
        .select("*")
        .gte("created_at", since)
        .order("created_at", { ascending: false })
        .limit(5000);
      if (cancelled) return;
      if (err) setError(err.message);
      else setError(null);
      setRows((data ?? []) as EventRow[]);
      setLoading(false);
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [days]);

  const stats = useMemo(() => {
    const uniq = (list: EventRow[]) => new Set(list.map((r) => r.session_id ?? r.id)).size;
    const byEvent = (name: string) => rows.filter((r) => r.event_name === name);

    const views = uniq(byEvent("form_view"));
    const starts = uniq(byEvent("form_start"));
    const leads = uniq(byEvent("generate_lead"));
    const errors = byEvent("form_error").length;

    const forms = Object.keys(FORM_LABELS).map((form) => {
      const f = rows.filter((r) => r.form_id === form);
      const v = uniq(f.filter((r) => r.event_name === "form_view"));
      const s = uniq(f.filter((r) => r.event_name === "form_start"));
      const l = uniq(f.filter((r) => r.event_name === "generate_lead"));
      return { form, views: v, starts: s, leads: l };
    });

    const sourceMap = new Map<string, { visits: number; leads: number }>();
    for (const r of rows) {
      const key = r.utm_source ?? r.referrer ?? "direct";
      const entry = sourceMap.get(key) ?? { visits: 0, leads: 0 };
      if (r.event_name === "form_view") entry.visits += 1;
      if (r.event_name === "generate_lead") entry.leads += 1;
      sourceMap.set(key, entry);
    }
    const sources = [...sourceMap.entries()]
      .map(([source, v]) => ({ source, ...v }))
      .sort((a, b) => b.leads - a.leads || b.visits - a.visits)
      .slice(0, 10);

    return { views, starts, leads, errors, forms, sources };
  }, [rows]);

  const funnel = [
    { label: "Saw a form", value: stats.views, base: stats.views },
    { label: "Started filling it in", value: stats.starts, base: stats.views },
    { label: "Submitted an inquiry", value: stats.leads, base: stats.views },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Conversions</h2>
          <p className="text-sm text-muted-foreground">
            How many visitors see, start, and complete an inquiry form.
          </p>
        </div>
        <div className="flex gap-1 rounded-lg border border-border p-1">
          {RANGES.map((r) => (
            <button
              key={r.days}
              onClick={() => setDays(r.days)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                days === r.days
                  ? "bg-accent/10 text-accent"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </p>
      )}
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading conversion data…</p>
      ) : rows.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          No form activity recorded in this period yet.
        </p>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Form viewers", value: stats.views },
              { label: "Form starts", value: stats.starts },
              { label: "Inquiries submitted", value: stats.leads },
              { label: "View → inquiry rate", value: pct(stats.leads, stats.views) },
            ].map((c) => (
              <div key={c.label} className="rounded-xl border border-border bg-card p-5">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{c.label}</p>
                <p className="mt-2 font-display text-3xl font-bold text-foreground">{c.value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="text-sm font-semibold text-foreground">Inquiry funnel</h3>
            <div className="mt-4 space-y-3">
              {funnel.map((f) => (
                <div key={f.label}>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{f.label}</span>
                    <span className="font-medium text-foreground">
                      {f.value} · {pct(f.value, f.base)}
                    </span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: f.base ? `${(f.value / f.base) * 100}%` : "0%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              {stats.errors} submission {stats.errors === 1 ? "attempt was" : "attempts were"}{" "}
              blocked by a validation or server error in this period.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              <h3 className="border-b border-border px-6 py-4 text-sm font-semibold text-foreground">
                By form
              </h3>
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="px-6 py-3">Form</th>
                    <th className="px-3 py-3">Views</th>
                    <th className="px-3 py-3">Starts</th>
                    <th className="px-3 py-3">Inquiries</th>
                    <th className="px-6 py-3">Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.forms.map((f) => (
                    <tr key={f.form} className="border-t border-border">
                      <td className="px-6 py-3 font-medium text-foreground">
                        {FORM_LABELS[f.form] ?? f.form}
                      </td>
                      <td className="px-3 py-3 text-muted-foreground">{f.views}</td>
                      <td className="px-3 py-3 text-muted-foreground">{f.starts}</td>
                      <td className="px-3 py-3 text-muted-foreground">{f.leads}</td>
                      <td className="px-6 py-3 font-medium text-foreground">
                        {pct(f.leads, f.views)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="overflow-hidden rounded-xl border border-border bg-card">
              <h3 className="border-b border-border px-6 py-4 text-sm font-semibold text-foreground">
                Top traffic sources
              </h3>
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="px-6 py-3">Source</th>
                    <th className="px-3 py-3">Form views</th>
                    <th className="px-6 py-3">Inquiries</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.sources.map((s) => (
                    <tr key={s.source} className="border-t border-border">
                      <td className="px-6 py-3 font-medium text-foreground">{s.source}</td>
                      <td className="px-3 py-3 text-muted-foreground">{s.visits}</td>
                      <td className="px-6 py-3 text-muted-foreground">{s.leads}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
