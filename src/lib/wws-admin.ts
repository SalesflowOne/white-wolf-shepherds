import { supabase } from "@/integrations/supabase/client";

const ADMIN_URL = `${import.meta.env.VITE_SUPABASE_URL ?? import.meta.env.VITE_PUBLIC_SUPABASE_URL}/functions/v1/wws-admin`;

async function callAdmin<T>(action: string, data: unknown): Promise<T> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) throw new Error("Not authenticated");

  const res = await fetch(ADMIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`,
    },
    body: JSON.stringify({ action, data }),
  });
  const json = (await res.json()) as { error?: string } & T;
  if (!res.ok) {
    throw new Error(json.error ?? `Request failed (${res.status})`);
  }
  return json;
}

export function approvePlacement(data: { leadId: string }) {
  return callAdmin<{ ok: true; stage: string }>("approvePlacement", data);
}

export function denyAndRefund(data: { leadId: string; reason?: string }) {
  return callAdmin<{ ok: true; stage: string; refundId: string | null }>("denyAndRefund", data);
}
