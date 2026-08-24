/** Shared blog constants for White Wolf Shepherds (scoped rows in shared Supabase tables). */
export const WWS_BLOG_SITE_KEY = "wws";

export type BlogPostListItem = {
  id: string;
  title: string;
  subtitle: string | null;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
  author_name: string;
  author_role: string | null;
  tags: string[] | null;
  featured: boolean;
  published_at: string | null;
  category_id: string | null;
  status?: string;
};

export type BlogPostFull = BlogPostListItem & {
  content: string;
  seo_title: string | null;
  seo_description: string | null;
  agent_type: string | null;
  seo_keywords: string[] | null;
  created_at?: string;
  updated_at?: string;
};

export type BlogCategory = {
  id: string;
  name: string;
  slug: string;
};

export function slugifyBlogTitle(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
