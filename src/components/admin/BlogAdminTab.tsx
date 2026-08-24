import { useCallback, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import {
  WWS_BLOG_SITE_KEY,
  slugifyBlogTitle,
  type BlogCategory,
  type BlogPostFull,
} from "@/lib/blog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type AutoSettings = {
  id: string;
  enabled: boolean;
  frequency: string;
  posts_per_cycle: number;
  preferred_days: number[];
  preferred_hour: number;
  last_published_at: string | null;
  audit_enabled: boolean;
  max_retries: number;
};

type AuditLog = {
  id: string;
  post_id: string;
  audit_result: string;
  issues: string[] | null;
  authority_score: number | null;
  word_count: number | null;
  attempt_number: number;
  created_at: string;
};

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function BlogAdminTab() {
  const [posts, setPosts] = useState<BlogPostFull[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [settings, setSettings] = useState<AutoSettings | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [triggering, setTriggering] = useState(false);
  const [view, setView] = useState<"list" | "editor" | "automation">("list");

  const [aiTopic, setAiTopic] = useState("");
  const [aiCategory, setAiCategory] = useState("");
  const [aiAgent, setAiAgent] = useState<"education_authority" | "enrollment_conversion">(
    "education_authority",
  );
  const [aiInstructions, setAiInstructions] = useState("");

  const [editing, setEditing] = useState<BlogPostFull | null>(null);
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    slug: "",
    content: "",
    excerpt: "",
    featured_image: "",
    category_id: "",
    seo_title: "",
    seo_description: "",
    tags: "",
    featured: false,
  });
  const [saving, setSaving] = useState(false);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    const [postsRes, catsRes, settingsRes] = await Promise.all([
      supabase
        .from("blog_posts")
        .select("*")
        .eq("site_key", WWS_BLOG_SITE_KEY)
        .order("created_at", { ascending: false }),
      supabase
        .from("blog_categories")
        .select("id, name, slug")
        .eq("site_key", WWS_BLOG_SITE_KEY)
        .order("name"),
      supabase
        .from("auto_publish_settings")
        .select("*")
        .eq("site_key", WWS_BLOG_SITE_KEY)
        .maybeSingle(),
    ]);

    setPosts((postsRes.data ?? []) as BlogPostFull[]);
    setCategories((catsRes.data ?? []) as BlogCategory[]);
    setSettings((settingsRes.data as AutoSettings | null) ?? null);

    const postIds = (postsRes.data ?? []).map((p) => p.id);
    if (postIds.length) {
      const { data: logs } = await supabase
        .from("blog_audit_log")
        .select("*")
        .in("post_id", postIds)
        .order("created_at", { ascending: false })
        .limit(15);
      setAuditLogs((logs ?? []) as AuditLog[]);
    } else {
      setAuditLogs([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  async function generateWithAi() {
    if (!aiTopic.trim()) {
      toast.error("Enter a topic first");
      return;
    }
    setGenerating(true);
    try {
      const catName = categories.find((c) => c.id === aiCategory)?.name ?? "";
      const { data, error } = await supabase.functions.invoke("wws-generate-blog-post", {
        body: {
          agent_type: aiAgent,
          topic: aiTopic,
          category: catName,
          additional_instructions: aiInstructions,
        },
      });
      if (error) throw error;
      setForm({
        title: String(data.title ?? aiTopic),
        subtitle: String(data.subtitle ?? ""),
        slug: slugifyBlogTitle(String(data.title ?? aiTopic)),
        content: String(data.content ?? ""),
        excerpt: String(data.excerpt ?? ""),
        featured_image: "",
        category_id: aiCategory,
        seo_title: String(data.seo_title ?? ""),
        seo_description: String(data.seo_description ?? ""),
        tags: Array.isArray(data.tags) ? data.tags.join(", ") : "",
        featured: false,
      });
      setEditing(null);
      setView("editor");
      toast.success("Draft generated — review before publishing");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Generation failed");
    } finally {
      setGenerating(false);
    }
  }

  function openEditor(post?: BlogPostFull) {
    if (post) {
      setEditing(post);
      setForm({
        title: post.title,
        subtitle: post.subtitle ?? "",
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt ?? "",
        featured_image: post.featured_image ?? "",
        category_id: post.category_id ?? "",
        seo_title: post.seo_title ?? "",
        seo_description: post.seo_description ?? "",
        tags: post.tags?.join(", ") ?? "",
        featured: post.featured,
      });
    } else {
      setEditing(null);
      setForm({
        title: "",
        subtitle: "",
        slug: "",
        content: "",
        excerpt: "",
        featured_image: "",
        category_id: "",
        seo_title: "",
        seo_description: "",
        tags: "",
        featured: false,
      });
    }
    setView("editor");
  }

  async function savePost(status: "draft" | "published") {
    if (!form.title.trim() || !form.content.trim()) {
      toast.error("Title and content are required");
      return;
    }
    setSaving(true);
    const slug = form.slug || slugifyBlogTitle(form.title);
    const payload = {
      title: form.title,
      subtitle: form.subtitle || null,
      slug,
      content: form.content,
      excerpt: form.excerpt || null,
      featured_image: form.featured_image || null,
      category_id: form.category_id || null,
      author_name: "White Wolf Editorial",
      author_role: "Shepherd Breeding & Care",
      agent_type: editing?.agent_type ?? aiAgent,
      status,
      published_at:
        status === "published"
          ? editing?.published_at ?? new Date().toISOString()
          : null,
      seo_title: form.seo_title || null,
      seo_description: form.seo_description || null,
      tags: form.tags
        ? form.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : null,
      featured: form.featured,
      site_key: WWS_BLOG_SITE_KEY,
    };

    try {
      if (editing) {
        const { error } = await supabase.from("blog_posts").update(payload).eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("blog_posts").insert(payload);
        if (error) throw error;
      }
      toast.success(status === "published" ? "Published" : "Saved as draft");
      setView("list");
      fetchAll();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function deletePost(id: string) {
    if (!confirm("Delete this post permanently?")) return;
    await supabase.from("blog_posts").delete().eq("id", id);
    toast.success("Post deleted");
    fetchAll();
  }

  async function updateSettings(partial: Partial<AutoSettings>) {
    if (!settings) return;
    const next = { ...settings, ...partial };
    setSettings(next);
    const { error } = await supabase
      .from("auto_publish_settings")
      .update(partial)
      .eq("id", settings.id);
    if (error) toast.error(error.message);
    else toast.success("Automation settings saved");
  }

  async function triggerAutoPublish() {
    setTriggering(true);
    try {
      const { data, error } = await supabase.functions.invoke("wws-auto-publish");
      if (error) throw error;
      toast.success(`Generated: ${data?.topic ?? "new post"}`);
      fetchAll();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Auto-publish failed");
    } finally {
      setTriggering(false);
    }
  }

  const categoryName = (id: string | null) => categories.find((c) => c.id === id)?.name ?? "—";

  if (view === "editor") {
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button onClick={() => setView("list")} className="text-sm text-muted-foreground hover:text-foreground">
            ← Back to posts
          </button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => savePost("draft")} disabled={saving}>
              Save draft
            </Button>
            <Button onClick={() => savePost("published")} disabled={saving}>
              Publish
            </Button>
          </div>
        </div>
        <Input
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value, slug: form.slug || slugifyBlogTitle(e.target.value) })
          }
          className="text-2xl font-display font-bold"
        />
        <Input
          placeholder="Subtitle"
          value={form.subtitle}
          onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
        />
        <Textarea
          placeholder="Markdown content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="min-h-[420px] font-mono text-sm"
        />
        <div className="grid gap-4 md:grid-cols-2">
          <Input placeholder="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
          <select
            value={form.category_id}
            onChange={(e) => setForm({ ...form, category_id: e.target.value })}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm"
          >
            <option value="">Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <Input
            placeholder="Featured image URL"
            value={form.featured_image}
            onChange={(e) => setForm({ ...form, featured_image: e.target.value })}
          />
          <Input
            placeholder="Tags (comma separated)"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
          />
          <Textarea
            placeholder="Excerpt"
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          />
          <div className="space-y-2">
            <Input
              placeholder="SEO title"
              value={form.seo_title}
              onChange={(e) => setForm({ ...form, seo_title: e.target.value })}
            />
            <Textarea
              placeholder="SEO description"
              value={form.seo_description}
              onChange={(e) => setForm({ ...form, seo_description: e.target.value })}
            />
          </div>
        </div>
      </div>
    );
  }

  if (view === "automation") {
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button onClick={() => setView("list")} className="text-sm text-muted-foreground hover:text-foreground">
            ← Back to posts
          </button>
          <Button onClick={triggerAutoPublish} disabled={triggering}>
            {triggering ? "Generating…" : "Publish now"}
          </Button>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg font-bold">Auto-publisher</h3>
              <p className="text-sm text-muted-foreground">
                AI writes, images, and audits posts on a schedule (via Supabase cron when enabled).
              </p>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={settings?.enabled ?? false}
                onChange={(e) => updateSettings({ enabled: e.target.checked })}
              />
              Enabled
            </label>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="text-sm">
              <span className="text-muted-foreground">Frequency</span>
              <select
                className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2"
                value={settings?.frequency ?? "weekly"}
                onChange={(e) => updateSettings({ frequency: e.target.value })}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>
            </label>
            <label className="flex items-end gap-2 text-sm pb-2">
              <input
                type="checkbox"
                checked={settings?.audit_enabled ?? true}
                onChange={(e) => updateSettings({ audit_enabled: e.target.checked })}
              />
              Compliance audit before publish
            </label>
          </div>
          {settings?.last_published_at && (
            <p className="mt-3 text-xs text-muted-foreground">
              Last auto-run: {new Date(settings.last_published_at).toLocaleString()}
            </p>
          )}
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-display text-lg font-bold">Recent audits</h3>
          {auditLogs.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">No audit logs yet.</p>
          ) : (
            <ul className="mt-4 space-y-2">
              {auditLogs.map((log) => (
                <li key={log.id} className="rounded-lg border border-border p-3 text-sm">
                  <span className="font-medium">{log.audit_result}</span>
                  <span className="ml-2 text-muted-foreground">
                    attempt {log.attempt_number}
                    {log.authority_score != null ? ` · score ${log.authority_score}/10` : ""}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-bold">Blog & AI Content</h2>
          <p className="text-sm text-muted-foreground">
            Self-writing blog powered by Vercel AI SDK (OWeb gateway).
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" asChild>
            <Link to="/blog" target="_blank">
              View blog
            </Link>
          </Button>
          <Button variant="outline" onClick={() => setView("automation")}>
            Automation
          </Button>
          <Button onClick={() => openEditor()}>New post</Button>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-display text-lg font-semibold">Generate with AI</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <select
            value={aiAgent}
            onChange={(e) => setAiAgent(e.target.value as typeof aiAgent)}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm"
          >
            <option value="education_authority">Education agent</option>
            <option value="enrollment_conversion">Placement agent</option>
          </select>
          <select
            value={aiCategory}
            onChange={(e) => setAiCategory(e.target.value)}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm"
          >
            <option value="">Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <Input
          className="mt-4"
          placeholder="Topic, e.g. Crate training a White German Shepherd puppy"
          value={aiTopic}
          onChange={(e) => setAiTopic(e.target.value)}
        />
        <Textarea
          className="mt-4 h-20"
          placeholder="Optional instructions"
          value={aiInstructions}
          onChange={(e) => setAiInstructions(e.target.value)}
        />
        <Button className="mt-4" onClick={generateWithAi} disabled={generating}>
          {generating ? "Generating…" : "Generate article"}
        </Button>
      </div>

      <div>
        <h3 className="mb-4 font-display text-lg font-semibold">All posts ({posts.length})</h3>
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : posts.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            No posts yet. Generate one above or trigger automation.
          </p>
        ) : (
          <div className="space-y-2">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-4"
              >
                <div>
                  <p className="font-medium">{post.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {categoryName(post.category_id)} · {post.status}
                    {post.published_at
                      ? ` · ${new Date(post.published_at).toLocaleDateString()}`
                      : ""}
                  </p>
                </div>
                <div className="flex gap-2">
                  {post.status === "published" && (
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/blog/$slug" params={{ slug: post.slug }} target="_blank">
                        View
                      </Link>
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => openEditor(post)}>
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => deletePost(post.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
