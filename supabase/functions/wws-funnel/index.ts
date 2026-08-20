// White Wolf Shepherds — funnel server actions (contact, booking markers, application).
// Runs on Supabase Edge so SUPABASE_SERVICE_ROLE_KEY is available without Vercel env.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient, type SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://esm.sh/zod@3.23.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function adminClient(): SupabaseClient {
  const url = Deno.env.get("SUPABASE_URL")!;
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  if (!url || !key) {
    throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be configured");
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

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
    user_metadata: { full_name: fullName, first_name: fullName.split(" ")[0] },
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

const contactInput = z
  .object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    phone: z.string().optional().nullable(),
    city: z.string().min(1).optional().nullable(),
    state: z.string().min(1).optional().nullable(),
    source: z.string().optional().nullable(),
    referralCode: z.string().optional().nullable(),
    waitlist: z.boolean().optional(),
    preferredSex: z.enum(["male", "female", "either"]).optional().nullable(),
    message: z.string().optional().nullable(),
  })
  .superRefine((data, ctx) => {
    if (!data.waitlist && !(data.phone ?? "").trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Phone is required",
        path: ["phone"],
      });
    }
  });

const leadIdInput = z.object({ leadId: z.string().uuid() });

const draftInput = z.object({
  leadId: z.string().uuid(),
  draft: z.record(z.unknown()),
});

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

async function handleStartLead(data: z.infer<typeof contactInput>) {
  const admin = adminClient();
  const email = data.email.toLowerCase();
  const fullName = `${data.firstName.trim()} ${data.lastName.trim()}`.trim();
  const now = new Date().toISOString();

  const { data: existing } = await admin
    .from("wws_leads")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  const city = data.city?.trim() || null;
  const state = data.state?.trim() || null;
  const phone = data.phone?.trim() || null;
  const waitlistExtras = {
    preferred_sex: data.preferredSex ?? undefined,
    additional_notes: data.message?.trim() || undefined,
    stage: data.waitlist ? "waitlist" : undefined,
  };

  let leadId: string;
  if (existing?.id) {
    await admin
      .from("wws_leads")
      .update({
        full_name: fullName,
        phone,
        city,
        state,
        source: data.source || undefined,
        ...(data.waitlist ? { stage: "waitlist" as const } : {}),
        ...(data.preferredSex ? { preferred_sex: data.preferredSex } : {}),
        ...(data.message?.trim() ? { additional_notes: data.message.trim() } : {}),
        updated_at: now,
      })
      .eq("id", existing.id);
    leadId = existing.id;
  } else {
    const { data: inserted, error } = await admin
      .from("wws_leads")
      .insert({
        full_name: fullName,
        email,
        phone,
        city,
        state,
        source: data.source || null,
        stage: data.waitlist ? "waitlist" : "new_inquiry",
        preferred_sex: waitlistExtras.preferred_sex ?? null,
        additional_notes: waitlistExtras.additional_notes ?? null,
      })
      .select("id")
      .single();
    if (error || !inserted) {
      throw new Error(`Lead insert failed: ${error?.message ?? "unknown"}`);
    }
    leadId = inserted.id;
  }

  await ensureUserAndProfile(admin, email, fullName, leadId);
  await attributeReferral(admin, leadId, data.referralCode);

  return { leadId, firstName: data.firstName.trim() };
}

async function handleMarkMatchCallBooked(data: z.infer<typeof leadIdInput>) {
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
}

async function handleMarkVideoCallBooked(data: z.infer<typeof leadIdInput>) {
  const admin = adminClient();
  await admin
    .from("wws_leads")
    .update({
      video_call_booked_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", data.leadId);
  return { ok: true };
}

async function handleSaveApplicationDraft(data: z.infer<typeof draftInput>) {
  const admin = adminClient();
  const { error } = await admin
    .from("wws_leads")
    .update({
      application_draft: data.draft,
      updated_at: new Date().toISOString(),
    })
    .eq("id", data.leadId);
  if (error) throw new Error(`Draft save failed: ${error.message}`);
  return { ok: true };
}

async function handleSubmitApplicationDetails(data: z.infer<typeof detailsInput>) {
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
      application_draft: null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", data.leadId);

  if (error) throw new Error(`Application update failed: ${error.message}`);
  return { ok: true };
}

async function handleGetLeadProgress(data: z.infer<typeof leadIdInput>) {
  const admin = adminClient();
  const { data: lead, error } = await admin
    .from("wws_leads")
    .select(
      "id, stage, deposit_status, match_call_booked_at, video_call_booked_at, application_draft, full_name, email, phone",
    )
    .eq("id", data.leadId)
    .single();
  if (error || !lead) throw new Error("Lead not found");
  return { lead };
}

const bodySchema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("startLead"), data: contactInput }),
  z.object({ action: z.literal("markMatchCallBooked"), data: leadIdInput }),
  z.object({ action: z.literal("markVideoCallBooked"), data: leadIdInput }),
  z.object({ action: z.literal("saveApplicationDraft"), data: draftInput }),
  z.object({ action: z.literal("submitApplicationDetails"), data: detailsInput }),
  z.object({ action: z.literal("getLeadProgress"), data: leadIdInput }),
]);

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const json = await req.json();
    const parsed = bodySchema.parse(json);

    let result: unknown;
    switch (parsed.action) {
      case "startLead":
        result = await handleStartLead(parsed.data);
        break;
      case "markMatchCallBooked":
        result = await handleMarkMatchCallBooked(parsed.data);
        break;
      case "markVideoCallBooked":
        result = await handleMarkVideoCallBooked(parsed.data);
        break;
      case "saveApplicationDraft":
        result = await handleSaveApplicationDraft(parsed.data);
        break;
      case "submitApplicationDetails":
        result = await handleSubmitApplicationDetails(parsed.data);
        break;
      case "getLeadProgress":
        result = await handleGetLeadProgress(parsed.data);
        break;
    }

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
