import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type Testimonial = {
  id: string;
  name: string;
  location: string | null;
  quote: string;
  photo_url: string | null;
  puppy_name: string | null;
  rating: number | null;
  published: boolean;
  sort_order: number | null;
};

type Draft = Omit<Testimonial, "id">;

const EMPTY: Draft = {
  name: "",
  location: "",
  quote: "",
  photo_url: "",
  puppy_name: "",
  rating: 5,
  published: true,
  sort_order: 0,
};

const input =
  "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/30";

/** Admin CRUD for the testimonials rendered on the public homepage. */
export default function TestimonialsAdminTab() {
  const [rows, setRows] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    const { data, error: err } = await supabase
      .from("wws_testimonials")
      .select("*")
      .order("sort_order", { ascending: true });
    if (err) setError(err.message);
    setRows((data ?? []) as Testimonial[]);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function startNew() {
    setEditing(null);
    setDraft({ ...EMPTY, sort_order: rows.length });
  }

  function startEdit(row: Testimonial) {
    setEditing(row);
    const { id: _id, ...rest } = row;
    setDraft(rest);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!draft.name.trim() || draft.quote.trim().length < 10) {
      setError("Name and a quote of at least 10 characters are required.");
      return;
    }
    setSaving(true);
    const payload = {
      ...draft,
      name: draft.name.trim(),
      quote: draft.quote.trim(),
      location: draft.location?.trim() || null,
      photo_url: draft.photo_url?.trim() || null,
      puppy_name: draft.puppy_name?.trim() || null,
      rating: Number(draft.rating) || 5,
      sort_order: Number(draft.sort_order) || 0,
    };
    const { error: err } = editing
      ? await supabase.from("wws_testimonials").update(payload).eq("id", editing.id)
      : await supabase.from("wws_testimonials").insert(payload);
    setSaving(false);
    if (err) {
      setError(err.message);
      return;
    }
    setDraft(EMPTY);
    setEditing(null);
    load();
  }

  async function remove(row: Testimonial) {
    if (!confirm(`Delete the testimonial from ${row.name}?`)) return;
    const { error: err } = await supabase.from("wws_testimonials").delete().eq("id", row.id);
    if (err) setError(err.message);
    else load();
  }

  async function togglePublished(row: Testimonial) {
    const { error: err } = await supabase
      .from("wws_testimonials")
      .update({ published: !row.published })
      .eq("id", row.id);
    if (err) setError(err.message);
    else load();
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Testimonials</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Published testimonials replace the placeholder quotes on the homepage.
          </p>
        </div>
        <button
          onClick={startNew}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:brightness-110"
        >
          + New testimonial
        </button>
      </div>

      {error && (
        <p className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <form onSubmit={save} className="mt-6 rounded-2xl border border-border bg-card p-5">
        <p className="text-sm font-semibold text-foreground">
          {editing ? `Editing ${editing.name}` : "Add a testimonial"}
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <input
            className={input}
            placeholder="Family name *"
            value={draft.name}
            onChange={(e) => setDraft({ ...draft, name: e.target.value })}
          />
          <input
            className={input}
            placeholder="Location (e.g. Colorado)"
            value={draft.location ?? ""}
            onChange={(e) => setDraft({ ...draft, location: e.target.value })}
          />
          <input
            className={input}
            placeholder="Puppy name"
            value={draft.puppy_name ?? ""}
            onChange={(e) => setDraft({ ...draft, puppy_name: e.target.value })}
          />
          <input
            className={input}
            placeholder="Photo URL"
            value={draft.photo_url ?? ""}
            onChange={(e) => setDraft({ ...draft, photo_url: e.target.value })}
          />
          <input
            className={input}
            type="number"
            min={1}
            max={5}
            placeholder="Rating"
            value={draft.rating ?? 5}
            onChange={(e) => setDraft({ ...draft, rating: Number(e.target.value) })}
          />
          <input
            className={input}
            type="number"
            placeholder="Sort order"
            value={draft.sort_order ?? 0}
            onChange={(e) => setDraft({ ...draft, sort_order: Number(e.target.value) })}
          />
        </div>
        <textarea
          rows={3}
          className={`${input} mt-3`}
          placeholder="Quote *"
          value={draft.quote}
          onChange={(e) => setDraft({ ...draft, quote: e.target.value })}
        />
        <label className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={draft.published}
            onChange={(e) => setDraft({ ...draft, published: e.target.checked })}
          />
          Published on the website
        </label>
        <div className="mt-4 flex gap-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
          >
            {saving ? "Saving…" : editing ? "Save changes" : "Add testimonial"}
          </button>
          {editing && (
            <button
              type="button"
              onClick={() => {
                setEditing(null);
                setDraft(EMPTY);
              }}
              className="rounded-lg border border-border px-5 py-2 text-sm text-muted-foreground"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mt-8 space-y-3">
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : rows.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No testimonials yet — the homepage is showing placeholder quotes.
          </p>
        ) : (
          rows.map((row) => (
            <div
              key={row.id}
              className="flex flex-wrap items-start justify-between gap-4 rounded-xl border border-border bg-card p-4"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground">
                  {row.name}
                  {row.location ? ` · ${row.location}` : ""}
                  {row.published ? "" : " · draft"}
                </p>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">“{row.quote}”</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => togglePublished(row)}
                  className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground"
                >
                  {row.published ? "Unpublish" : "Publish"}
                </button>
                <button
                  onClick={() => startEdit(row)}
                  className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground"
                >
                  Edit
                </button>
                <button
                  onClick={() => remove(row)}
                  className="rounded-lg border border-destructive/40 px-3 py-1.5 text-xs font-semibold text-destructive"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
