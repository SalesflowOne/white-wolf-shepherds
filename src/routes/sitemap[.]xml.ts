import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { PUBLIC_ROUTES, SITE_URL } from "@/lib/site";

function urlEntry(loc: string, priority: string, changefreq: string) {
  return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = PUBLIC_ROUTES.map((path) =>
          urlEntry(`${SITE_URL}${path === "/" ? "" : path}`, path === "/" ? "1.0" : "0.8", "weekly"),
        );

        try {
          const url = process.env["SUPABASE_URL"] ?? process.env["VITE_SUPABASE_URL"];
          const key =
            process.env["SUPABASE_PUBLISHABLE_KEY"] ?? process.env["VITE_SUPABASE_PUBLISHABLE_KEY"];
          if (url && key) {
            const client = createClient(url, key, { auth: { persistSession: false } });
            const { data } = await client
              .from("wws_puppies")
              .select("slug,status")
              .not("slug", "is", null);
            for (const row of data ?? []) {
              // Parents live at /parents/<slug>; everyone else is a puppy detail page.
              const base = row.status === "parent" ? "/parents" : "/puppies";
              entries.push(urlEntry(`${SITE_URL}${base}/${row.slug}`, "0.7", "daily"));
            }

            const { data: blogRows } = await client
              .from("blog_posts")
              .select("slug")
              .eq("site_key", "wws")
              .eq("status", "published");
            for (const row of blogRows ?? []) {
              if (row.slug) entries.push(urlEntry(`${SITE_URL}/blog/${row.slug}`, "0.6", "weekly"));
            }
          }
        } catch {
          /* sitemap still valid without puppy detail pages */
        }

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
