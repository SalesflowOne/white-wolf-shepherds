import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { WWS_BLOG_SITE_KEY, type BlogCategory, type BlogPostListItem } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/blog/")({
  component: BlogIndexPage,
  head: () => ({
    meta: [
      { title: "Shepherd Blog — White Wolf Shepherds" },
      {
        name: "description",
        content:
          "Expert guides on White German Shepherd puppies, training, health, and our ethical breeding program.",
      },
      { property: "og:title", content: "Shepherd Blog — White Wolf Shepherds" },
      { property: "og:url", content: `${SITE_URL}/blog` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/blog` }],
  }),
});

function BlogIndexPage() {
  const [posts, setPosts] = useState<BlogPostListItem[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const [postsRes, catsRes] = await Promise.all([
        supabase
          .from("blog_posts")
          .select(
            "id, title, subtitle, slug, excerpt, featured_image, author_name, author_role, tags, featured, published_at, category_id",
          )
          .eq("site_key", WWS_BLOG_SITE_KEY)
          .eq("status", "published")
          .order("published_at", { ascending: false }),
        supabase
          .from("blog_categories")
          .select("id, name, slug")
          .eq("site_key", WWS_BLOG_SITE_KEY)
          .order("name"),
      ]);
      setPosts((postsRes.data ?? []) as BlogPostListItem[]);
      setCategories((catsRes.data ?? []) as BlogCategory[]);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    let result = posts;
    if (activeCategory) result = result.filter((p) => p.category_id === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt?.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q)),
      );
    }
    return result;
  }, [posts, activeCategory, search]);

  const featuredPost = posts.find((p) => p.featured);
  const categoryName = (id: string | null) => categories.find((c) => c.id === id)?.name ?? "";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="border-b border-border bg-primary py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">Knowledge Hub</p>
            <h1 className="mt-3 font-display text-3xl font-bold text-primary-foreground md:text-5xl">
              White Wolf Shepherd Blog
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/70">
              Puppy care, training, health, and breeder insights for families considering a White German Shepherd.
            </p>
            <div className="mx-auto mt-8 max-w-md">
              <input
                type="search"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-primary-foreground/20 bg-background/95 px-4 py-2.5 text-sm"
              />
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-muted/30">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-6 py-4">
            <button
              onClick={() => setActiveCategory(null)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium ${
                !activeCategory ? "bg-accent text-accent-foreground" : "bg-background text-muted-foreground"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium ${
                  activeCategory === cat.id
                    ? "bg-accent text-accent-foreground"
                    : "bg-background text-muted-foreground"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-6 py-12">
          {loading ? (
            <p className="text-muted-foreground">Loading articles…</p>
          ) : filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border py-16 text-center">
              <h2 className="font-display text-2xl font-semibold">No articles yet</h2>
              <p className="mt-2 text-muted-foreground">
                Our AI content engine is warming up — check back soon.
              </p>
              <Link to="/get-started" className="mt-6 inline-block text-accent underline">
                Start your application →
              </Link>
            </div>
          ) : (
            <>
              {featuredPost && !activeCategory && !search && (
                <Link
                  to="/blog/$slug"
                  params={{ slug: featuredPost.slug }}
                  className="group mb-12 block overflow-hidden rounded-xl border border-border bg-card shadow-sm hover:shadow-md"
                >
                  <div className="grid md:grid-cols-2">
                    {featuredPost.featured_image && (
                      <img
                        src={featuredPost.featured_image}
                        alt={featuredPost.title}
                        className="aspect-video w-full object-cover md:aspect-auto md:min-h-[280px]"
                      />
                    )}
                    <div className="flex flex-col justify-center p-8">
                      <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">
                        Featured
                      </span>
                      <h2 className="font-display text-2xl font-bold">{featuredPost.title}</h2>
                      <p className="mt-3 text-sm text-muted-foreground">{featuredPost.excerpt}</p>
                      <span className="mt-4 text-sm font-medium text-accent group-hover:underline">
                        Read article →
                      </span>
                    </div>
                  </div>
                </Link>
              )}

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filtered
                  .filter((p) => !(featuredPost && p.id === featuredPost.id && !activeCategory && !search))
                  .map((post) => (
                    <Link
                      key={post.id}
                      to="/blog/$slug"
                      params={{ slug: post.slug }}
                      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm hover:shadow-md"
                    >
                      {post.featured_image && (
                        <img
                          src={post.featured_image}
                          alt={post.title}
                          className="aspect-video w-full object-cover transition-transform group-hover:scale-[1.02]"
                        />
                      )}
                      <div className="flex flex-1 flex-col p-5">
                        {post.category_id && (
                          <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">
                            {categoryName(post.category_id)}
                          </span>
                        )}
                        <h3 className="font-display text-lg font-semibold group-hover:text-accent">
                          {post.title}
                        </h3>
                        <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-3">
                          {post.excerpt}
                        </p>
                        <p className="mt-4 text-xs text-muted-foreground">
                          {post.published_at
                            ? new Date(post.published_at).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                            : "Draft"}
                        </p>
                      </div>
                    </Link>
                  ))}
              </div>
            </>
          )}
        </div>

        <section className="border-t border-border bg-primary py-16">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="font-display text-2xl font-bold text-primary-foreground">
              Ready to meet our litter?
            </h2>
            <p className="mt-3 text-primary-foreground/70">
              Start with a quick application — we&apos;ll guide you through fit, calls, and placement.
            </p>
            <Link
              to="/get-started"
              className="mt-6 inline-block rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground"
            >
              Let&apos;s Get Started
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
