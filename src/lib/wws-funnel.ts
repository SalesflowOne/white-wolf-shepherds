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
  phone: string;
  city: string;
  state: string;
  source?: string | null;
  referralCode?: string | null;
  waitlist?: boolean;
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
