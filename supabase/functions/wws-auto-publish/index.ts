import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
  chatCompletion,
  corsHeaders,
  generateFeaturedImage,
  parseJsonFromModel,
  WWS_SITE_KEY,
} from "./_shared/wws-ai.ts";
import {
  AUTO_PUBLISH_SYSTEM,
  buildWwsImagePrompt,
  DEFAULT_IMAGE_PROMPT,
  TOPIC_TEMPLATES,
} from "./_shared/wws-blog-prompts.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

async function uploadImage(
  sb: ReturnType<typeof createClient>,
  slug: string,
  image: { base64: string; mime: string },
): Promise<string | null> {
  const binaryStr = atob(image.base64);
  const bytes = new Uint8Array(binaryStr.length);
  for (let i = 0; i < binaryStr.length; i++) bytes[i] = binaryStr.charCodeAt(i);

  const filePath = `blog/wws/${slug}.png`;
  const { error } = await sb.storage.from("temp-imports").upload(filePath, bytes.buffer, {
    contentType: image.mime,
    upsert: true,
  });
  if (error) {
    console.error("Image upload error:", error);
    return null;
  }
  const { data } = sb.storage.from("temp-imports").getPublicUrl(filePath);
  return data?.publicUrl ?? null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const topicOverride =
      typeof body.topic === "string" && body.topic.trim() ? body.topic.trim() : null;
    const categoryOverride =
      typeof body.category === "string" && body.category.trim() ? body.category.trim() : null;

    const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { data: settings } = await sb
      .from("auto_publish_settings")
      .select("*")
      .eq("site_key", WWS_SITE_KEY)
      .maybeSingle();

    if (!settings?.enabled) {
      return new Response(JSON.stringify({ message: "WWS auto-publish is disabled" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: categories } = await sb
      .from("blog_categories")
      .select("*")
      .eq("site_key", WWS_SITE_KEY)
      .order("name");

    if (!categories?.length) throw new Error("No WWS blog categories found");

    const resolvedIndex = categoryOverride
      ? categories.findIndex((c) => c.name.toLowerCase() === categoryOverride.toLowerCase())
      : ((settings.last_category_index ?? -1) + 1) % categories.length;
    const catIndex =
      resolvedIndex >= 0
        ? resolvedIndex
        : ((settings.last_category_index ?? -1) + 1) % categories.length;
    const category = categories[catIndex];
    const templates = TOPIC_TEMPLATES[category.name] || TOPIC_TEMPLATES["Puppy Care"];
    const topic =
      topicOverride || templates[Math.floor(Math.random() * templates.length)];

    const raw = await chatCompletion([
      { role: "system", content: AUTO_PUBLISH_SYSTEM },
      {
        role: "user",
        content: `Write a blog post about: "${topic}"\nCategory: ${category.name}`,
      },
    ]);

    let parsed: Record<string, unknown>;
    try {
      parsed = parseJsonFromModel(raw);
    } catch {
      parsed = {
        title: topic,
        subtitle: "",
        excerpt: raw.slice(0, 160),
        content: raw,
        tags: [],
        seo_title: topic,
        seo_description: raw.slice(0, 160),
        seo_keywords: [],
        image_prompt: DEFAULT_IMAGE_PROMPT,
      };
    }

    const slug =
      String(parsed.title || topic)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") +
      "-" +
      Date.now().toString(36);

    const image = await generateFeaturedImage(
      buildWwsImagePrompt(String(parsed.image_prompt || DEFAULT_IMAGE_PROMPT)),
    );
    const imageUrl = image ? await uploadImage(sb, slug, image) : null;

    const { data: post, error: insertError } = await sb
      .from("blog_posts")
      .insert({
        title: parsed.title,
        subtitle: parsed.subtitle || null,
        slug,
        content: parsed.content || "",
        excerpt: parsed.excerpt || null,
        featured_image: imageUrl,
        category_id: category.id,
        author_name: "White Wolf Editorial",
        author_role: "Shepherd Breeding & Care",
        agent_type: "auto_publisher",
        status: settings.audit_enabled ? "draft" : "published",
        published_at: settings.audit_enabled ? null : new Date().toISOString(),
        seo_title: parsed.seo_title || null,
        seo_description: parsed.seo_description || null,
        seo_keywords: Array.isArray(parsed.seo_keywords) ? parsed.seo_keywords : null,
        tags: Array.isArray(parsed.tags) ? parsed.tags : null,
        featured: false,
        site_key: WWS_SITE_KEY,
      })
      .select()
      .single();

    if (insertError) throw insertError;

    await sb
      .from("auto_publish_settings")
      .update({
        last_category_index: catIndex,
        last_published_at: new Date().toISOString(),
      })
      .eq("id", settings.id);

    if (settings.audit_enabled && post) {
      await fetch(`${SUPABASE_URL}/functions/v1/wws-audit-blog-post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        },
        body: JSON.stringify({
          post_id: post.id,
          attempt: 1,
          max_retries: settings.max_retries,
        }),
      }).catch((err) => console.error("Failed to trigger audit:", err));
    }

    return new Response(
      JSON.stringify({
        success: true,
        post_id: post?.id,
        category: category.name,
        topic,
        has_image: !!imageUrl,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("wws-auto-publish error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
