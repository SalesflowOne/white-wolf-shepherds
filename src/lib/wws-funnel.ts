const FUNNEL_URL = `${import.meta.env.VITE_SUPABASE_URL ?? import.meta.env.VITE_PUBLIC_SUPABASE_URL}/functions/v1/wws-funnel`;

async function callFunnel<T>(action: string, data: unknown): Promise<T> {
  const res = await fetch(FUNNEL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, data }),
  });
  const json = (await res.json()) as { error?: string } & T;
  if (!res.ok) {
    throw new Error(json.error ?? `Request failed (${res.status})`);
  }
  return json;
}

export type StartLeadInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  city?: string | null;
  state?: string | null;
  source?: string | null;
  referralCode?: string | null;
  waitlist?: boolean;
  preferredSex?: "male" | "female" | "either" | null;
  message?: string | null;
};

export function startLead(data: StartLeadInput) {
  return callFunnel<{ leadId: string; firstName: string }>("startLead", data);
}

export function markMatchCallBooked(data: { leadId: string }) {
  return callFunnel<{ ok: true }>("markMatchCallBooked", data);
}

export function markVideoCallBooked(data: { leadId: string }) {
  return callFunnel<{ ok: true }>("markVideoCallBooked", data);
}

export function saveApplicationDraft(data: { leadId: string; draft: Record<string, unknown> }) {
  return callFunnel<{ ok: true }>("saveApplicationDraft", data);
}

export type LeadProgress = {
  id: string;
  stage: string | null;
  deposit_status: string | null;
  match_call_booked_at: string | null;
  video_call_booked_at: string | null;
  application_draft: Record<string, unknown> | null;
  full_name: string | null;
  email: string | null;
  phone: string | null;
};

export function getLeadProgress(data: { leadId: string }) {
  return callFunnel<{ lead: LeadProgress }>("getLeadProgress", data);
}

export type SubmitApplicationInput = {
  leadId: string;
  preferredSex: "male" | "female" | "either";
  timeline: "ready_now" | "1_3_months" | "future";
  hasOwnedLargeDog: boolean;
  readyForDeposit: "yes" | "no" | "info";
  householdType: string;
  hasFencedYard: "yes" | "no" | "in_progress";
  familySize: number;
  childrenAges?: string | null;
  otherPets?: string | null;
  preferredPuppyId?: string | null;
  reasonForBreed: string;
  additionalNotes?: string | null;
  source: string;
};

export function submitApplicationDetails(data: SubmitApplicationInput) {
  return callFunnel<{ ok: true }>("submitApplicationDetails", data);
}

export const FUNNEL_STORAGE_KEY = "wws_funnel";

export type FunnelStorage = {
  leadId: string;
  name: string;
  email: string;
  phone: string;
};

export function persistFunnelState(state: FunnelStorage) {
  try {
    localStorage.setItem(FUNNEL_STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

export function readFunnelState(): FunnelStorage | null {
  try {
    const raw = localStorage.getItem(FUNNEL_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as FunnelStorage) : null;
  } catch {
    return null;
  }
}
