import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { extractBlogToc, renderBlogMarkdown } from "@/lib/blog-markdown";
import { WWS_BLOG_SITE_KEY, type BlogCategory, type BlogPostFull } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/blog/$slug")({
  component: BlogPostPage,
});

function BlogPostPage() {
  const { slug } = Route.useParams();
  const [post, setPost] = useState<BlogPostFull | null>(null);
  const [related, setRelated] = useState<BlogPostFull[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("site_key", WWS_BLOG_SITE_KEY)
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();

      if (data) {
        setPost(data as BlogPostFull);
        if (data.category_id) {
          const { data: rel } = await supabase
            .from("blog_posts")
            .select("id, title, subtitle, slug, excerpt, featured_image, published_at, category_id, author_name, author_role, tags, featured")
            .eq("site_key", WWS_BLOG_SITE_KEY)
            .eq("status", "published")
            .eq("category_id", data.category_id)
            .neq("id", data.id)
            .limit(3);
          setRelated((rel ?? []) as BlogPostFull[]);
        }
      }

      const { data: cats } = await supabase
        .from("blog_categories")
        .select("id, name, slug")
        .eq("site_key", WWS_BLOG_SITE_KEY);
      setCategories((cats ?? []) as BlogCategory[]);
      setLoading(false);
    }
    load();
  }, [slug]);

  const toc = useMemo(() => (post?.content ? extractBlogToc(post.content) : []), [post?.content]);
  const html = useMemo(() => (post?.content ? renderBlogMarkdown(post.content) : ""), [post?.content]);
  const categoryName = (id: string | null) => categories.find((c) => c.id === id)?.name ?? "";

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading article…</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <h1 className="font-display text-3xl font-bold">Article not found</h1>
          <Link to="/blog" className="mt-6 inline-block text-accent underline">
            Back to blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="border-b border-border bg-primary py-12 md:py-16">
          <div className="mx-auto max-w-3xl px-6">
            <Link to="/blog" className="text-sm text-primary-foreground/60 hover:text-primary-foreground">
              ← Back to blog
            </Link>
            {post.category_id && (
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-accent">
                {categoryName(post.category_id)}
              </p>
            )}
            <h1 className="mt-2 font-display text-3xl font-bold text-primary-foreground md:text-4xl">
              {post.title}
            </h1>
            {post.subtitle && (
              <p className="mt-3 text-lg text-primary-foreground/70">{post.subtitle}</p>
            )}
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-primary-foreground/60">
              <span>{post.author_name}</span>
              {post.published_at && (
                <span>
                  {new Date(post.published_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              )}
            </div>
          </div>
        </section>

        <article className="mx-auto max-w-3xl px-6 py-12">
          {post.featured_image && (
            <img
              src={post.featured_image}
              alt={post.title}
              className="mb-8 w-full rounded-xl object-cover shadow-md"
            />
          )}

          {toc.length > 0 && (
            <nav className="mb-8 rounded-xl border border-border bg-card p-5">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                In this article
              </p>
              <ul className="space-y-1">
                {toc.filter((h) => h.level === 2).map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className="text-sm text-muted-foreground hover:text-accent">
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div className="blog-content" dangerouslySetInnerHTML={{ __html: html }} />

          {post.tags && post.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2 border-t border-border pt-6">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-10 rounded-xl border border-accent/20 bg-accent/5 p-8 text-center">
            <h3 className="font-display text-xl font-bold">Interested in a White Wolf puppy?</h3>
            <p className="mt-2 text-muted-foreground">
              Tell us about your home and we&apos;ll help you find the right match from our current litter.
            </p>
            <Link
              to="/get-started"
              className="mt-4 inline-block rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground"
            >
              Start your application
            </Link>
          </div>
        </article>

        {related.length > 0 && (
          <section className="border-t border-border bg-muted/30 py-12">
            <div className="mx-auto max-w-7xl px-6">
              <h2 className="mb-6 font-display text-2xl font-bold">Related articles</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {related.map((rp) => (
                  <Link
                    key={rp.id}
                    to="/blog/$slug"
                    params={{ slug: rp.slug }}
                    className="rounded-xl border border-border bg-card p-4 hover:shadow-md"
                  >
                    <h3 className="font-display font-semibold hover:text-accent">{rp.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{rp.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
