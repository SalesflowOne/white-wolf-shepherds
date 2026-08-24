// Sync White Wolf Shepherds leads into the Salesflow CRM (public.leads + GHL).
import { type SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";

const GHL_BASE = "https://services.leadconnectorhq.com";
const GHL_VERSION = "2021-07-28";
const DEFAULT_PROGRAM = "White Wolf Shepherds";
const DEFAULT_LOCATION = "5NAfvhQ3uPhKkODcgT78";

export type WwsLeadRow = {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  city?: string | null;
  state?: string | null;
  stage?: string | null;
  source?: string | null;
  score?: number | null;
  salesflow_lead_id?: string | null;
  preferred_sex?: string | null;
  timeline?: string | null;
  has_owned_large_dog?: boolean | null;
  has_fenced_yard?: boolean | null;
  household_type?: string | null;
  family_size?: number | null;
  children_ages?: string | null;
  other_pets?: string | null;
  reason_for_breed?: string | null;
  additional_notes?: string | null;
  deposit_status?: string | null;
  match_call_booked_at?: string | null;
  video_call_booked_at?: string | null;
  utm_campaign?: string | null;
  created_at?: string | null;
};

export type WwsCrmSyncInput = {
  wwsLead: WwsLeadRow;
  source?: string | null;
  stage?: string | null;
  notes?: string | null;
  /** When true, re-sync even if salesflow_lead_id is already set. */
  force?: boolean;
};

export type WwsCrmSyncResult = {
  ok: boolean;
  salesflowLeadId?: string;
  ghlContactId?: string;
  error?: string;
};

let cachedGhlToken: string | null = null;

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

async function resolveGhlToken(supabase: SupabaseClient): Promise<string | null> {
  if (cachedGhlToken) return cachedGhlToken;

  const fromEnv = Deno.env.get("GHL_API_KEY") ?? Deno.env.get("GHL_API_TOKEN");
  if (fromEnv) {
    cachedGhlToken = fromEnv;
    return fromEnv;
  }

  const fromVault = await resolveVaultSecret(supabase, "GHL_API_TOKEN");
  if (fromVault) {
    cachedGhlToken = fromVault;
    return fromVault;
  }

  const { data: rows } = await supabase
    .schema("vault")
    .from("decrypted_secrets")
    .select("decrypted_secret")
    .like("name", "integration_api_key_%");

  for (const row of rows ?? []) {
    const secret = row.decrypted_secret;
    if (secret?.startsWith("pit-")) {
      cachedGhlToken = secret;
      return secret;
    }
  }

  return null;
}

async function upsertGhlContact(
  token: string,
  lead: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string | null;
    source: string;
    city?: string | null;
    state?: string | null;
  },
): Promise<string | null> {
  const locationId = Deno.env.get("GHL_LOCATION_ID") ?? DEFAULT_LOCATION;
  const body: Record<string, unknown> = {
    locationId,
    firstName: lead.firstName || undefined,
    lastName: lead.lastName || undefined,
    email: lead.email,
    phone: lead.phone || undefined,
    source: lead.source,
  };
  if (lead.city) body.city = lead.city;
  if (lead.state) body.state = lead.state;

  const res = await fetch(`${GHL_BASE}/contacts/upsert`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Version: GHL_VERSION,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  if (!res.ok) {
    console.error("WWS GHL contact upsert failed:", res.status, text);
    return null;
  }

  try {
    const data = JSON.parse(text);
    return data?.contact?.id ?? data?.id ?? null;
  } catch {
    return null;
  }
}

async function fireLeadWebhook(payload: Record<string, unknown>): Promise<void> {
  const url =
    Deno.env.get("WWS_SALESFLOW_WEBHOOK_URL") ??
    Deno.env.get("SALESFLOW_LEAD_CAPTURED_WEBHOOK_URL");
  if (!url) return;

  const secret = Deno.env.get("WWS_SALESFLOW_WEBHOOK_SECRET") ??
    Deno.env.get("SALESFLOW_WEBHOOK_SECRET");

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (secret) {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );
    const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(JSON.stringify(payload)));
    headers["X-Webhook-Signature"] = Array.from(new Uint8Array(sig))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  try {
    const resp = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });
    if (!resp.ok) {
      console.error("WWS Salesflow webhook failed:", resp.status, await resp.text());
    }
  } catch (err) {
    console.error("WWS Salesflow webhook error:", err);
  }
}

function splitName(fullName: string | null | undefined): { first: string; last: string } {
  const parts = (fullName ?? "").trim().split(/\s+/).filter(Boolean);
  return {
    first: parts[0] ?? "",
    last: parts.length > 1 ? parts.slice(1).join(" ") : "",
  };
}

function formatBool(value: boolean | null | undefined): string | null {
  if (value === null || value === undefined) return null;
  return value ? "Yes" : "No";
}

/** Compile WWS application + funnel fields into CRM notes. */
export function buildWwsLeadNotes(lead: WwsLeadRow, extraNotes?: string | null): string {
  const lines: string[] = [];
  const push = (label: string, value: string | number | null | undefined) => {
    if (value === null || value === undefined || value === "") return;
    lines.push(`${label}: ${value}`);
  };

  push("Stage", lead.stage);
  push("Source", lead.source ?? "white_wolf_shepherds");
  push("Score", lead.score ?? 0);
  push("Preferred sex", lead.preferred_sex);
  push("Timeline", lead.timeline);
  push("Owned large dog", formatBool(lead.has_owned_large_dog));
  push("Fenced yard", formatBool(lead.has_fenced_yard));
  push("Household", lead.household_type);
  push("Family size", lead.family_size);
  push("Children ages", lead.children_ages);
  push("Other pets", lead.other_pets);
  push("Deposit status", lead.deposit_status);
  push("Match call booked", lead.match_call_booked_at);
  push("Video call booked", lead.video_call_booked_at);
  push("UTM campaign", lead.utm_campaign);
  push("WWS lead ID", lead.id);
  if (lead.created_at) push("Created", lead.created_at);

  if (lead.reason_for_breed?.trim()) {
    lines.push("");
    lines.push("Reason for breed:");
    lines.push(lead.reason_for_breed.trim());
  }

  const notes = extraNotes?.trim() || lead.additional_notes?.trim();
  if (notes) {
    lines.push("");
    lines.push("Notes:");
    lines.push(notes);
  }

  return lines.join("\n");
}

export function buildWwsLeadMetadata(
  lead: WwsLeadRow,
  input: Pick<WwsCrmSyncInput, "source" | "stage" | "notes">,
): Record<string, unknown> {
  const { first, last } = splitName(lead.full_name);
  return {
    wws_lead_id: lead.id,
    first_name: first,
    last_name: last,
    full_name: lead.full_name,
    email: lead.email,
    phone: lead.phone,
    city: lead.city,
    state: lead.state,
    stage: input.stage ?? lead.stage ?? "new_inquiry",
    source: input.source ?? lead.source ?? "white_wolf_shepherds",
    score: lead.score ?? 0,
    preferred_sex: lead.preferred_sex,
    timeline: lead.timeline,
    has_owned_large_dog: lead.has_owned_large_dog,
    has_fenced_yard: lead.has_fenced_yard,
    household_type: lead.household_type,
    family_size: lead.family_size,
    children_ages: lead.children_ages,
    other_pets: lead.other_pets,
    reason_for_breed: lead.reason_for_breed,
    additional_notes: input.notes ?? lead.additional_notes,
    deposit_status: lead.deposit_status,
    match_call_booked_at: lead.match_call_booked_at,
    video_call_booked_at: lead.video_call_booked_at,
    utm_campaign: lead.utm_campaign,
    created_at: lead.created_at,
  };
}

/** Best-effort sync — never throws; logs errors and returns status. */
export async function syncWwsLeadToSalesflow(
  admin: SupabaseClient,
  input: WwsCrmSyncInput,
): Promise<WwsCrmSyncResult> {
  const { wwsLead } = input;
  const email = wwsLead.email?.trim().toLowerCase();
  if (!email) {
    return { ok: false, error: "email required" };
  }

  const program = Deno.env.get("WWS_SALESFLOW_PROGRAM") ?? DEFAULT_PROGRAM;
  const source = input.source ?? wwsLead.source ?? "white_wolf_shepherds";
  const stage = input.stage ?? wwsLead.stage ?? "new_inquiry";
  const notes = buildWwsLeadNotes(wwsLead, input.notes);
  const metadata = buildWwsLeadMetadata(wwsLead, input);
  const { first, last } = splitName(wwsLead.full_name);
  const displayName = wwsLead.full_name?.trim() || email;

  if (wwsLead.salesflow_lead_id && !input.force) {
    return { ok: true, salesflowLeadId: wwsLead.salesflow_lead_id };
  }

  try {
    const { data: salesflowLeadId, error: leadErr } = await admin.rpc("upsert_lead", {
      p_name: displayName,
      p_email: email,
      p_phone: wwsLead.phone?.trim() ?? "",
      p_program: program,
    });

    if (leadErr || !salesflowLeadId) {
      console.error("upsert_lead failed:", leadErr);
      return { ok: false, error: leadErr?.message ?? "upsert_lead failed" };
    }

    const leadPatch: Record<string, unknown> = { source };
    if (wwsLead.utm_campaign) leadPatch.utm_campaign = wwsLead.utm_campaign;
    await admin.from("leads").update(leadPatch).eq("id", salesflowLeadId);

    let ghlContactId: string | null = null;
    const token = await resolveGhlToken(admin);
    if (token) {
      ghlContactId = await upsertGhlContact(token, {
        firstName: first,
        lastName: last,
        email,
        phone: wwsLead.phone,
        source: "White Wolf Shepherds Website",
        city: wwsLead.city,
        state: wwsLead.state,
      });
    }

    const now = new Date().toISOString();
    const wwsPatch: Record<string, unknown> = {
      salesflow_lead_id: salesflowLeadId,
      salesflow_synced_at: now,
      updated_at: now,
    };
    if (ghlContactId) {
      wwsPatch.ghl_contact_id = ghlContactId;
    }

    await admin.from("wws_leads").update(wwsPatch).eq("id", wwsLead.id);

    if (ghlContactId) {
      await admin.from("leads").update({
        external_contact_id: ghlContactId,
        ghl_synced_at: now,
      }).eq("id", salesflowLeadId);
    }

    const webhookPayload = {
      contract_version: "2.0",
      event_type: "LEAD_CAPTURED",
      source: "white_wolf_shepherds",
      first_name: first,
      last_name: last,
      email,
      phone: wwsLead.phone ?? "",
      program,
      wws_lead_id: wwsLead.id,
      lead_id: salesflowLeadId,
      contact_id: ghlContactId,
      stage,
      score: wwsLead.score ?? 0,
      city: wwsLead.city ?? null,
      state: wwsLead.state ?? null,
      notes,
      metadata,
      timestamp: now,
    };
    await fireLeadWebhook(webhookPayload);

    return { ok: true, salesflowLeadId, ghlContactId: ghlContactId ?? undefined };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("syncWwsLeadToSalesflow error:", message);
    return { ok: false, error: message };
  }
}
