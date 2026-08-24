/**
 * WWS AI client — Vercel AI SDK via OWeb gateway (same priority as GHI admin chat).
 * 1. AI_GATEWAY_API_KEY → https://ai-gateway.vercel.sh/v1
 * 2. LOVABLE_API_KEY → https://ai.gateway.lovable.dev/v1
 */

export type WwsAiConfig = {
  apiKey: string;
  baseUrl: string;
  model: string;
  imageModel: string;
  provider: "vercel_ai_gateway" | "lovable_gateway";
};

const LOVABLE_GATEWAY = "https://ai.gateway.lovable.dev/v1";
const VERCEL_AI_GATEWAY = "https://ai-gateway.vercel.sh/v1";

export function resolveWwsAiConfig(): WwsAiConfig {
  const gatewayKey = Deno.env.get("AI_GATEWAY_API_KEY")?.trim() || "";
  const lovableKey = Deno.env.get("LOVABLE_API_KEY")?.trim() || "";
  const modelOverride = Deno.env.get("WWS_BLOG_MODEL")?.trim();

  if (gatewayKey) {
    return {
      apiKey: gatewayKey,
      baseUrl: (Deno.env.get("AI_GATEWAY_BASE_URL") || VERCEL_AI_GATEWAY).replace(/\/$/, ""),
      model: modelOverride || "openai/gpt-4o",
      imageModel: Deno.env.get("WWS_BLOG_IMAGE_MODEL") || "google/gemini-2.5-flash-image",
      provider: "vercel_ai_gateway",
    };
  }

  if (lovableKey) {
    return {
      apiKey: lovableKey,
      baseUrl: LOVABLE_GATEWAY,
      model: modelOverride || "google/gemini-3-flash-preview",
      imageModel: "google/gemini-2.5-flash-image",
      provider: "lovable_gateway",
    };
  }

  throw new Error(
    "No AI key configured. Set AI_GATEWAY_API_KEY (from OWeb) or LOVABLE_API_KEY on Supabase edge secrets.",
  );
}

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export async function chatCompletion(
  messages: ChatMessage[],
  maxTokens = 8192,
): Promise<string> {
  const config = resolveWwsAiConfig();
  const { generateText } = await import("npm:ai@4");
  const { createOpenAI } = await import("npm:@ai-sdk/openai@1");

  const openai = createOpenAI({
    apiKey: config.apiKey,
    baseURL: config.baseUrl,
  });

  const { text } = await generateText({
    model: openai(config.model),
    messages,
    maxTokens,
  });

  return text;
}

export function parseJsonFromModel(raw: string): Record<string, unknown> {
  const cleaned = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  return JSON.parse(cleaned) as Record<string, unknown>;
}

export async function generateFeaturedImage(
  prompt: string,
): Promise<{ base64: string; mime: string } | null> {
  const config = resolveWwsAiConfig();

  const response = await fetch(`${config.baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: config.imageModel,
      messages: [{ role: "user", content: prompt }],
      modalities: ["image", "text"],
    }),
  });

  if (!response.ok) {
    console.error("Image generation failed:", response.status, await response.text());
    return null;
  }

  const data = await response.json();
  const url = data.choices?.[0]?.message?.images?.[0]?.image_url?.url as string | undefined;
  if (!url?.startsWith("data:image")) return null;

  const [meta, base64] = url.split(",");
  const mime = meta.match(/data:(image\/\w+)/)?.[1] ?? "image/png";
  return { base64, mime };
}

export const WWS_SITE_KEY = "wws";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};
