import { createServerFn } from "@tanstack/react-start";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";

// Service-role client used only inside server functions to perform
// privileged operations (createUser, writing leads/profiles before the
// user has a session, etc.). NEVER imported into client code.
// Env vars are read inside the function: on the Worker runtime, process.env
// is populated per-request, so module-scope reads return empty strings.
function adminClient(): SupabaseClient {
  const SERVER_URL =
    process.env.SUPABASE_URL ??
    process.env.NEXT_PUBLIC_SUPABASE_URL ??
    process.env.VITE_PUBLIC_SUPABASE_URL ??
    "";
  const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  if (!SERVER_URL || !SERVICE_ROLE_KEY) {
    throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set for server actions");
  }
  return createClient(SERVER_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function anonServerClient() {
  const SERVER_URL = process.env.SUPABASE_URL ?? "";
  const ANON_KEY =
    process.env.SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.VITE_PUBLIC_SUPABASE_ANON_KEY ??
    "";
  if (!SERVER_URL || !ANON_KEY) {
    throw new Error("SUPABASE_URL and anon key required");
  }
  return createClient(SERVER_URL, ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/**
 * Ensures an auth user exists for `email` (idempotent) and links it to the
 * lead via a wws_profiles row. Never downgrades an existing profile's role
 * (so a returning owner re-entering the funnel keeps owner access).
 */
async function ensureUserAndProfile(
  admin: SupabaseClient,
  email: string,
  fullName: string,
  leadId: string,
): Promise<string | null> {
  let userId: string | null = null;

  const { data: created, error: createErr } = await admin.auth.admin.createUser({
    email,
    email_confirm: true,
    user_metadata: { full_name: fullName },
  });

  if (!createErr && created?.user) {
    userId = created.user.id;
  } else {
    const { data: listed } = await admin.auth.admin.listUsers();
    const existing = listed?.users.find((u) => u.email?.toLowerCase() === email);
    if (existing) userId = existing.id;
  }

  if (userId) {
    const now = new Date().toISOString();
    const { data: existingProfile } = await admin
      .from("wws_profiles")
      .select("id")
      .eq("id", userId)
      .maybeSingle();

    if (existingProfile) {
      // Link to this lead but leave the role untouched.
      await admin
        .from("wws_profiles")
        .update({ lead_id: leadId, updated_at: now })
        .eq("id", userId);
    } else {
      await admin
        .from("wws_profiles")
        .insert({ id: userId, role: "applicant", lead_id: leadId, updated_at: now });
    }
  }

  return userId;
}

async function attributeReferral(
  admin: SupabaseClient,
  leadId: string,
  referralCode?: string | null,
) {
  if (!referralCode) return;
  const { data: referrer } = await admin
    .from("wws_leads")
    .select("id")
    .eq("referral_code", referralCode)
    .maybeSingle();
  if (referrer?.id && referrer.id !== leadId) {
    await admin.from("wws_leads").update({ referred_by_lead_id: referrer.id }).eq("id", leadId);
  }
}

/* ─────────────────────────────────────────────────────────────
 * Stage 1 — Contact capture (creates/updates the lead up front)
 * ───────────────────────────────────────────────────────────── */

const contactInput = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  source: z.string().optional().nullable(),
  referralCode: z.string().optional().nullable(),
  waitlist: z.boolean().optional(),
});

export const startLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactInput.parse(data))
  .handler(async ({ data }: { data: z.infer<typeof contactInput> }) => {
    const admin = adminClient();
    const email = data.email.toLowerCase();
    const now = new Date().toISOString();

    // Upsert by email without regressing an existing lead's stage.
    const { data: existing } = await admin
      .from("wws_leads")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    let leadId: string;
    if (existing?.id) {
      await admin
        .from("wws_leads")
        .update({
          full_name: data.fullName,
          phone: data.phone,
          city: data.city,
          state: data.state,
          source: data.source || undefined,
          updated_at: now,
        })
        .eq("id", existing.id);
      leadId = existing.id;
    } else {
      const { data: inserted, error } = await admin
        .from("wws_leads")
        .insert({
          full_name: data.fullName,
          email,
          phone: data.phone,
          city: data.city,
          state: data.state,
          source: data.source || null,
          stage: data.waitlist ? "waitlist" : "new_inquiry",
        })
        .select("id")
        .single();
      if (error || !inserted) {
        throw new Error(`Lead insert failed: ${error?.message ?? "unknown"}`);
      }
      leadId = inserted.id;
    }

    await ensureUserAndProfile(admin, email, data.fullName, leadId);
    await attributeReferral(admin, leadId, data.referralCode);

    return { leadId, firstName: data.fullName.split(" ")[0] };
  });

/* ─────────────────────────────────────────────────────────────
 * Stage 2 / 5 — Booking step markers
 * ───────────────────────────────────────────────────────────── */

const leadIdInput = z.object({ leadId: z.string().uuid() });

export const markMatchCallBooked = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadIdInput.parse(data))
  .handler(async ({ data }: { data: z.infer<typeof leadIdInput> }) => {
    const admin = adminClient();
    await admin
      .from("wws_leads")
      .update({
        match_call_booked_at: new Date().toISOString(),
        stage: "match_call_booked",
        updated_at: new Date().toISOString(),
      })
      .eq("id", data.leadId);
    return { ok: true };
  });

export const markVideoCallBooked = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadIdInput.parse(data))
  .handler(async ({ data }: { data: z.infer<typeof leadIdInput> }) => {
    const admin = adminClient();
    await admin
      .from("wws_leads")
      .update({
        video_call_booked_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", data.leadId);
    return { ok: true };
  });

/* ─────────────────────────────────────────────────────────────
 * Stage 3 — Full application details
 * ───────────────────────────────────────────────────────────── */

const detailsInput = z.object({
  leadId: z.string().uuid(),
  preferredSex: z.enum(["male", "female", "either"]),
  timeline: z.enum(["ready_now", "1_3_months", "future"]),
  hasOwnedLargeDog: z.boolean(),
  readyForDeposit: z.enum(["yes", "no", "info"]),
  householdType: z.string().min(1),
  hasFencedYard: z.enum(["yes", "no", "in_progress"]),
  familySize: z.number().int().min(1),
  childrenAges: z.string().optional().nullable(),
  otherPets: z.string().optional().nullable(),
  preferredPuppyId: z.string().uuid().optional().nullable(),
  reasonForBreed: z.string().min(50),
  additionalNotes: z.string().optional().nullable(),
  source: z.string().min(1),
});

function computeScore(i: z.infer<typeof detailsInput>): number {
  let s = 0;
  if (i.timeline === "ready_now") s += 25;
  if (i.readyForDeposit === "yes") s += 20;
  if (i.hasOwnedLargeDog) s += 15;
  if (i.hasFencedYard === "yes") s += 10;
  if (i.preferredPuppyId) s += 8;
  if (i.reasonForBreed.trim().length > 100) s += 7;
  if (i.timeline === "1_3_months") s += 5;
  if (i.householdType === "house") s += 5;
  if ((i.additionalNotes ?? "").trim().length > 50) s += 5;
  return s;
}

export const submitApplicationDetails = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => detailsInput.parse(data))
  .handler(async ({ data }: { data: z.infer<typeof detailsInput> }) => {
    const admin = adminClient();
    const score = computeScore(data);

    const { error } = await admin
      .from("wws_leads")
      .update({
        preferred_sex: data.preferredSex,
        preferred_puppy_id: data.preferredPuppyId || null,
        timeline: data.timeline,
        has_owned_large_dog: data.hasOwnedLargeDog,
        has_fenced_yard: data.hasFencedYard === "yes",
        household_type: data.householdType,
        family_size: data.familySize,
        children_ages: data.childrenAges || null,
        other_pets: data.otherPets || null,
        reason_for_breed: data.reasonForBreed,
        additional_notes: data.additionalNotes || null,
        ready_for_deposit: data.readyForDeposit === "yes",
        source: data.source,
        score,
        stage: "application_complete",
        updated_at: new Date().toISOString(),
      })
      .eq("id", data.leadId);

    if (error) {
      throw new Error(`Application update failed: ${error.message}`);
    }

    return { ok: true };
  });

/**
 * Returns the role + lead_id for the current authenticated user.
 * Uses service role because RLS on wws_profiles allows self-read but
 * some routes call this with an unknown user context.
 */
export const getProfileRole = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => z.object({ userId: z.string().uuid() }).parse(data))
  .handler(async ({ data }: { data: { userId: string } }) => {
    const admin = adminClient();
    const { data: profile } = await admin
      .from("wws_profiles")
      .select("id, role, lead_id")
      .eq("id", data.userId)
      .maybeSingle();
    return profile ?? null;
  });

// Suppress "imported but unused" for anonServerClient; reserved for future use.
void anonServerClient;
