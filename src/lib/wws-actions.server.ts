import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";
import {
  contactInput,
  detailsInput,
  leadIdInput,
  profileRoleInput,
} from "./wws-actions.schemas";

function adminClient(): SupabaseClient {
  const serverUrl =
    process.env.SUPABASE_URL ??
    process.env.NEXT_PUBLIC_SUPABASE_URL ??
    process.env.VITE_PUBLIC_SUPABASE_URL ??
    "";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  if (!serverUrl || !serviceRoleKey) {
    throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set for server actions");
  }
  return createClient(serverUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

async function ensureUserAndProfile(
  admin: SupabaseClient,
  email: string,
  fullName: string,
  leadId: string,
): Promise<void> {
  let userId: string | null = null;
  const { data: created, error: createError } = await admin.auth.admin.createUser({
    email,
    email_confirm: true,
    user_metadata: { full_name: fullName },
  });

  if (!createError && created?.user) {
    userId = created.user.id;
  } else {
    const { data: listed } = await admin.auth.admin.listUsers();
    userId = listed?.users.find((user) => user.email?.toLowerCase() === email)?.id ?? null;
  }

  if (!userId) return;
  const now = new Date().toISOString();
  const { data: profile } = await admin
    .from("wws_profiles")
    .select("id")
    .eq("id", userId)
    .maybeSingle();

  if (profile) {
    await admin.from("wws_profiles").update({ lead_id: leadId, updated_at: now }).eq("id", userId);
    return;
  }
  await admin
    .from("wws_profiles")
    .insert({ id: userId, role: "applicant", lead_id: leadId, updated_at: now });
}

async function attributeReferral(admin: SupabaseClient, leadId: string, referralCode?: string | null) {
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

export async function startLeadHandler(data: z.infer<typeof contactInput>) {
  const admin = adminClient();
  const email = data.email.toLowerCase();
  const now = new Date().toISOString();
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
    if (error || !inserted) throw new Error(`Lead insert failed: ${error?.message ?? "unknown"}`);
    leadId = inserted.id;
  }

  await ensureUserAndProfile(admin, email, data.fullName, leadId);
  await attributeReferral(admin, leadId, data.referralCode);
  return { leadId, firstName: data.fullName.split(" ")[0] };
}

export async function markMatchCallBookedHandler(data: z.infer<typeof leadIdInput>) {
  const now = new Date().toISOString();
  await adminClient()
    .from("wws_leads")
    .update({ match_call_booked_at: now, stage: "match_call_booked", updated_at: now })
    .eq("id", data.leadId);
  return { ok: true };
}

export async function markVideoCallBookedHandler(data: z.infer<typeof leadIdInput>) {
  const now = new Date().toISOString();
  await adminClient()
    .from("wws_leads")
    .update({ video_call_booked_at: now, updated_at: now })
    .eq("id", data.leadId);
  return { ok: true };
}

function computeScore(data: z.infer<typeof detailsInput>): number {
  let score = 0;
  if (data.timeline === "ready_now") score += 25;
  if (data.readyForDeposit === "yes") score += 20;
  if (data.hasOwnedLargeDog) score += 15;
  if (data.hasFencedYard === "yes") score += 10;
  if (data.preferredPuppyId) score += 8;
  if (data.reasonForBreed.trim().length > 100) score += 7;
  if (data.timeline === "1_3_months") score += 5;
  if (data.householdType === "house") score += 5;
  if ((data.additionalNotes ?? "").trim().length > 50) score += 5;
  return score;
}

export async function submitApplicationDetailsHandler(data: z.infer<typeof detailsInput>) {
  const { error } = await adminClient()
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
      score: computeScore(data),
      stage: "application_complete",
      updated_at: new Date().toISOString(),
    })
    .eq("id", data.leadId);
  if (error) throw new Error(`Application update failed: ${error.message}`);
  return { ok: true };
}

export async function getProfileRoleHandler(data: z.infer<typeof profileRoleInput>) {
  const { data: profile } = await adminClient()
    .from("wws_profiles")
    .select("id, role, lead_id")
    .eq("id", data.userId)
    .maybeSingle();
  return profile ?? null;
}