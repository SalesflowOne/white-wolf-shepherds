// GoHighLevel calendar API — free slots + book appointment.
// Resolves GHL_API_TOKEN from env or Supabase Vault (existing pit-* integration key).

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient, type SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://esm.sh/zod@3.23.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GHL_BASE = "https://services.leadconnectorhq.com";
const GHL_VERSION = "2021-07-28";

const FAMILY_FIT_CALENDAR = Deno.env.get("GHL_FAMILY_FIT_CALENDAR_ID") ?? "n5pSWKKDXVP80Wng70GI";
const VIDEO_CALL_CALENDAR = Deno.env.get("GHL_VIDEO_CALL_CALENDAR_ID") ?? "nZgAqy954cD6FPRbiMmM";
const GHL_LOCATION_ID = Deno.env.get("GHL_LOCATION_ID") ?? "5NAfvhQ3uPhKkODcgT78";

let cachedToken: string | null = null;

async function resolveVaultSecret(
  supabase: SupabaseClient,
  name: string,
): Promise<string | null> {
  const { data, error } = await supabase
    .schema("vault")
    .from("decrypted_secrets")
    .select("decrypted_secret")
    .eq("name", name)
    .maybeSingle();

  if (error || !data?.decrypted_secret) return null;
  return data.decrypted_secret;
}

async function resolveGhlToken(supabase: SupabaseClient): Promise<string> {
  if (cachedToken) return cachedToken;

  const fromEnv = Deno.env.get("GHL_API_TOKEN");
  if (fromEnv) {
    cachedToken = fromEnv;
    return fromEnv;
  }

  const fromVault = await resolveVaultSecret(supabase, "GHL_API_TOKEN");
  if (fromVault) {
    cachedToken = fromVault;
    return fromVault;
  }

  // Shared project vault: GHL Private Integration tokens are stored as pit-* keys.
  const { data: rows } = await supabase
    .schema("vault")
    .from("decrypted_secrets")
    .select("decrypted_secret")
    .like("name", "integration_api_key_%");

  for (const row of rows ?? []) {
    const secret = row.decrypted_secret;
    if (secret?.startsWith("pit-")) {
      cachedToken = secret;
      return secret;
    }
  }

  throw new Error("GHL_API_TOKEN is not configured");
}

function adminClient(): SupabaseClient {
  return createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

async function ghlFetch(supabase: SupabaseClient, path: string, init?: RequestInit) {
  const token = await resolveGhlToken(supabase);
  const res = await fetch(`${GHL_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Version: GHL_VERSION,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`GHL ${res.status}: ${text}`);
  return text ? JSON.parse(text) : {};
}

function calendarId(type: "family_fit" | "video_call"): string {
  return type === "family_fit" ? FAMILY_FIT_CALENDAR : VIDEO_CALL_CALENDAR;
}

const freeSlotsInput = z.object({
  calendarType: z.enum(["family_fit", "video_call"]),
  startDate: z.string(),
  endDate: z.string(),
});

const bookInput = z.object({
  leadId: z.string().uuid(),
  calendarType: z.enum(["family_fit", "video_call"]),
  slotStart: z.string(),
  slotEnd: z.string().optional(),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
});

async function handleFreeSlots(supabase: SupabaseClient, data: z.infer<typeof freeSlotsInput>) {
  const calId = calendarId(data.calendarType);
  const params = new URLSearchParams({
    startDate: data.startDate,
    endDate: data.endDate,
  });
  const result = await ghlFetch(supabase, `/calendars/${calId}/free-slots?${params}`);
  return { slots: result?.slots ?? result };
}

async function handleBook(supabase: SupabaseClient, data: z.infer<typeof bookInput>) {
  const calId = calendarId(data.calendarType);

  const body = {
    calendarId: calId,
    locationId: GHL_LOCATION_ID,
    contact: {
      name: data.name,
      email: data.email.toLowerCase(),
      phone: data.phone,
    },
    startTime: data.slotStart,
    endTime: data.slotEnd ?? data.slotStart,
    title: data.calendarType === "family_fit" ? "Family Fit Call" : "Meet the Puppies Call",
  };

  const result = await ghlFetch(supabase, "/calendars/events/appointments", {
    method: "POST",
    body: JSON.stringify(body),
  });

  const appointmentId = result?.id ?? result?.appointment?.id ?? null;
  const ghlContactId = result?.contactId ?? result?.contact?.id ?? null;

  await supabase.from("wws_appointments").insert({
    lead_id: data.leadId,
    ghl_appointment_id: appointmentId,
    calendar_type: data.calendarType,
    starts_at: data.slotStart,
    ends_at: data.slotEnd ?? data.slotStart,
    status: "scheduled",
  });

  const leadUpdates: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };
  if (ghlContactId) leadUpdates.ghl_contact_id = ghlContactId;

  if (data.calendarType === "family_fit") {
    leadUpdates.match_call_booked_at = data.slotStart;
    leadUpdates.stage = "match_call_booked";
  } else {
    leadUpdates.video_call_booked_at = data.slotStart;
  }

  await supabase.from("wws_leads").update(leadUpdates).eq("id", data.leadId);

  return { ok: true, appointmentId };
}

const bodySchema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("getFreeSlots"), data: freeSlotsInput }),
  z.object({ action: z.literal("bookAppointment"), data: bookInput }),
]);

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const supabase = adminClient();
    const json = await req.json();
    const parsed = bodySchema.parse(json);

    const result =
      parsed.action === "getFreeSlots"
        ? await handleFreeSlots(supabase, parsed.data)
        : await handleBook(supabase, parsed.data);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
