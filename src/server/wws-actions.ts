import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

const SERVER_URL =
  process.env.SUPABASE_URL ??
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  process.env.VITE_PUBLIC_SUPABASE_URL ??
  '';
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';
const ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.VITE_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.SUPABASE_PUBLISHABLE_KEY ??
  '';

// Service-role client used only inside server functions to perform
// privileged operations (createUser, writing leads/profiles before the
// user has a session, etc.). NEVER imported into client code.
function adminClient() {
  if (!SERVER_URL || !SERVICE_ROLE_KEY) {
    throw new Error(
      'SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set for server actions'
    );
  }
  return createClient(SERVER_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function anonServerClient() {
  if (!SERVER_URL || !ANON_KEY) {
    throw new Error('SUPABASE_URL and anon key required');
  }
  return createClient(SERVER_URL, ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

const applicationInput = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  preferredSex: z.enum(['male', 'female', 'either']),
  timeline: z.enum(['ready_now', '1_3_months', 'future']),
  hasOwnedLargeDog: z.boolean(),
  readyForDeposit: z.enum(['yes', 'no', 'info']),
  householdType: z.string().min(1),
  hasFencedYard: z.enum(['yes', 'no', 'in_progress']),
  familySize: z.number().int().min(1),
  childrenAges: z.string().optional().nullable(),
  otherPets: z.string().optional().nullable(),
  preferredPuppyId: z.string().uuid().optional().nullable(),
  reasonForBreed: z.string().min(50),
  additionalNotes: z.string().optional().nullable(),
  source: z.string().min(1),
  waitlist: z.boolean().optional(),
  referralCode: z.string().optional().nullable(),
});

function computeScore(i: z.infer<typeof applicationInput>): number {
  let s = 0;
  if (i.timeline === 'ready_now') s += 25;
  if (i.readyForDeposit === 'yes') s += 20;
  if (i.hasOwnedLargeDog) s += 15;
  if (i.hasFencedYard === 'yes') s += 10;
  if (i.preferredPuppyId) s += 8;
  if (i.reasonForBreed.trim().length > 100) s += 7;
  if (i.timeline === '1_3_months') s += 5;
  if (i.householdType === 'house') s += 5;
  if ((i.additionalNotes ?? '').trim().length > 50) s += 5;
  return s;
}

/**
 * Submits the application. Runs on the server so we can use the
 * service role to: (1) insert the lead, (2) create the auth user
 * via admin API, (3) link profile. Silent if the user already exists.
 */
export const submitApplication = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => applicationInput.parse(data))
  .handler(async ({ data }: { data: z.infer<typeof applicationInput> }) => {
    const admin = adminClient();

    // 1. INSERT lead
    const score = computeScore(data);
    const { data: lead, error: leadErr } = await admin
      .from('wws_leads')
      .insert({
        full_name: data.fullName,
        email: data.email.toLowerCase(),
        phone: data.phone,
        city: data.city,
        state: data.state,
        preferred_sex: data.preferredSex,
        preferred_puppy_id: data.preferredPuppyId || null,
        timeline: data.timeline,
        has_owned_large_dog: data.hasOwnedLargeDog,
        has_fenced_yard: data.hasFencedYard === 'yes',
        household_type: data.householdType,
        family_size: data.familySize,
        children_ages: data.childrenAges || null,
        other_pets: data.otherPets || null,
        reason_for_breed: data.reasonForBreed,
        additional_notes: data.additionalNotes || null,
        ready_for_deposit: data.readyForDeposit === 'yes',
        source: data.source,
        score,
        stage: data.waitlist ? 'waitlist' : 'new_inquiry',
      })
      .select('id, approval_token')
      .single();

    if (leadErr || !lead) {
      throw new Error(`Lead insert failed: ${leadErr?.message ?? 'unknown'}`);
    }

    // 2. Create auth user (idempotent — if user exists, reuse)
    let userId: string | null = null;
    const { data: created, error: createErr } =
      await admin.auth.admin.createUser({
        email: data.email.toLowerCase(),
        email_confirm: true,
        user_metadata: { full_name: data.fullName },
      });

    if (!createErr && created?.user) {
      userId = created.user.id;
    } else {
      // If user already exists, look them up.
      const { data: listed } = await admin.auth.admin.listUsers();
      const existing = listed?.users.find(
        (u) => u.email?.toLowerCase() === data.email.toLowerCase()
      );
      if (existing) userId = existing.id;
    }

    // 3. Upsert profile linking user -> lead
    if (userId) {
      await admin
        .from('wws_profiles')
        .upsert(
          {
            id: userId,
            role: 'applicant',
            lead_id: lead.id,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'id' }
        );
    }

    // 4. Referral attribution
    if (data.referralCode) {
      const { data: referrer } = await admin
        .from('wws_leads')
        .select('id')
        .eq('referral_code', data.referralCode)
        .maybeSingle();
      if (referrer?.id && referrer.id !== lead.id) {
        await admin
          .from('wws_leads')
          .update({ referred_by_lead_id: referrer.id })
          .eq('id', lead.id);
      }
    }

    return {
      leadId: lead.id,
      firstName: data.fullName.split(' ')[0],
    };
  });

/**
 * Returns the role + lead_id for the current authenticated user.
 * Uses service role because RLS on wws_profiles allows self-read but
 * some routes call this with an unknown user context.
 */
export const getProfileRole = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => z.object({ userId: z.string().uuid() }).parse(data))
  .handler(async ({ data }: { data: { userId: string } }) => {
    const admin = adminClient();
    const { data: profile } = await admin
      .from('wws_profiles')
      .select('id, role, lead_id')
      .eq('id', data.userId)
      .maybeSingle();
    return profile ?? null;
  });

// Suppress "imported but unused" for anonServerClient; reserved for future use.
void anonServerClient;
