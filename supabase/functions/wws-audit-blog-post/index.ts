import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
  chatCompletion,
  corsHeaders,
  generateFeaturedImage,
  parseJsonFromModel,
  WWS_SITE_KEY,
} from "./_shared/wws-ai.ts";
import {
  AUDIT_SYSTEM,
  buildWwsImagePrompt,
  DEFAULT_IMAGE_PROMPT,
  REGENERATION_SYSTEM,
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
  if (error) return null;
  const { data } = sb.storage.from("temp-imports").getPublicUrl(filePath);
  return data?.publicUrl ?? null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { post_id, attempt = 1, max_retries = 2 } = await req.json();
    const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { data: post, error: fetchErr } = await sb
      .from("blog_posts")
      .select("*")
      .eq("id", post_id)
      .eq("site_key", WWS_SITE_KEY)
      .single();

    if (fetchErr || !post) throw new Error("Post not found");

    const rawAudit = await chatCompletion([
      { role: "system", content: AUDIT_SYSTEM },
      {
        role: "user",
        content: `Audit this blog post:\n\nTitle: ${post.title}\nFeatured Image: ${post.featured_image || "NONE"}\n\nContent:\n${post.content}`,
      },
    ]);

    let auditResult: Record<string, unknown>;
    try {
      auditResult = parseJsonFromModel(rawAudit);
    } catch {
      auditResult = {
        passed: false,
        issues: ["Failed to parse audit response"],
        authority_score: 0,
        word_count: 0,
        has_index: false,
        has_featured_image: false,
      };
    }

    if (!post.featured_image) {
      auditResult.passed = false;
      auditResult.has_featured_image = false;
      const issues = Array.isArray(auditResult.issues) ? [...auditResult.issues] : [];
      if (!issues.some((i) => String(i).toLowerCase().includes("featured image"))) {
        issues.push("Missing featured image");
      }
      auditResult.issues = issues;
    }

    const wordCount = Number(auditResult.word_count) || 0;
    const authorityScore = Number(auditResult.authority_score) || 0;
    if (!auditResult.passed && wordCount >= 850 && authorityScore >= 7 && post.featured_image) {
      auditResult.passed = true;
    }

    await sb.from("blog_audit_log").insert({
      post_id,
      audit_result: auditResult.passed ? "passed" : "failed",
      issues: auditResult.issues || [],
      word_count: wordCount,
      has_index: auditResult.has_index || false,
      authority_score: authorityScore,
      compliance_notes: auditResult.compliance_notes || "",
      attempt_number: attempt,
    });

    if (auditResult.passed) {
      await sb
        .from("blog_posts")
        .update({ status: "published", published_at: new Date().toISOString() })
        .eq("id", post_id);

      return new Response(JSON.stringify({ result: "passed", post_id }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!post.featured_image) {
      const slug = post.slug || post_id;
      const imgPrompt = buildWwsImagePrompt(String(auditResult.image_prompt || DEFAULT_IMAGE_PROMPT));
      const image = await generateFeaturedImage(imgPrompt);
      if (image) {
        const url = await uploadImage(sb, slug, image);
        if (url) {
          await sb.from("blog_posts").update({ featured_image: url }).eq("id", post_id);
          post.featured_image = url;
        }
      }
    }

    if (attempt < max_retries) {
      const rawRegen = await chatCompletion([
        { role: "system", content: REGENERATION_SYSTEM },
        {
          role: "user",
          content: `Rewrite this post fixing all issues.\n\nTitle: ${post.title}\n\nContent:\n${post.content}\n\nIssues:\n${(auditResult.issues as string[] | undefined)?.join("\n- ") || ""}\n\nInstructions:\n${auditResult.improvement_instructions || ""}`,
        },
      ]);

      try {
        const regen = parseJsonFromModel(rawRegen);
        await sb
          .from("blog_posts")
          .update({
            title: regen.title || post.title,
            subtitle: regen.subtitle || post.subtitle,
            content: regen.content || post.content,
            excerpt: regen.excerpt || post.excerpt,
            seo_title: regen.seo_title || post.seo_title,
            seo_description: regen.seo_description || post.seo_description,
            seo_keywords: Array.isArray(regen.seo_keywords) ? regen.seo_keywords : post.seo_keywords,
            tags: Array.isArray(regen.tags) ? regen.tags : post.tags,
            featured_image: post.featured_image,
          })
          .eq("id", post_id);

        await sb.from("blog_audit_log").insert({
          post_id,
          audit_result: "regenerated",
          issues: auditResult.issues || [],
          word_count: wordCount,
          has_index: auditResult.has_index || false,
          authority_score: authorityScore,
          compliance_notes: "Regenerated due to audit failure",
          attempt_number: attempt,
        });
      } catch {
        /* keep draft */
      }

      await fetch(`${SUPABASE_URL}/functions/v1/wws-audit-blog-post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        },
        body: JSON.stringify({ post_id, attempt: attempt + 1, max_retries }),
      }).catch(console.error);

      return new Response(JSON.stringify({ result: "regenerating", attempt, post_id }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ result: "failed_permanently", post_id, issues: auditResult.issues }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("wws-audit-blog-post error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
