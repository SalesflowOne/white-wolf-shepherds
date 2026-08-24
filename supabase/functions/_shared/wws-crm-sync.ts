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
};

export type WwsCrmSyncInput = {
  wwsLead: WwsLeadRow;
  source?: string | null;
  stage?: string | null;
  notes?: string | null;
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
  const { first, last } = splitName(wwsLead.full_name);
  const displayName = wwsLead.full_name?.trim() || email;

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
      stage: input.stage ?? wwsLead.stage ?? "new_inquiry",
      score: wwsLead.score ?? 0,
      city: wwsLead.city ?? null,
      state: wwsLead.state ?? null,
      notes: input.notes ?? null,
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
