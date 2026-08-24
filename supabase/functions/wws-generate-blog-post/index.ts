import {
  chatCompletion,
  corsHeaders,
  parseJsonFromModel,
} from "./_shared/wws-ai.ts";
import { CONVERSION_SYSTEM, EDUCATION_SYSTEM } from "./_shared/wws-blog-prompts.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { agent_type, topic, category, additional_instructions } = await req.json();
    if (!topic?.trim()) throw new Error("topic is required");

    const systemPrompt =
      agent_type === "enrollment_conversion" ? CONVERSION_SYSTEM : EDUCATION_SYSTEM;

    const userPrompt = `Write a blog post about: "${topic}"
Category: ${category || "General"}
${additional_instructions ? `Additional instructions: ${additional_instructions}` : ""}

Return ONLY valid JSON, no markdown fences.`;

    const raw = await chatCompletion([
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ]);

    const parsed = parseJsonFromModel(raw);
    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("wws-generate-blog-post error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
