const GHL_URL = `${import.meta.env.VITE_SUPABASE_URL ?? import.meta.env.VITE_PUBLIC_SUPABASE_URL}/functions/v1/ghl-scheduling`;

async function callGhl<T>(action: string, data: unknown): Promise<T> {
  const res = await fetch(GHL_URL, {
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

export type CalendarType = "family_fit" | "video_call";

export function getFreeSlots(data: {
  calendarType: CalendarType;
  startDate: string;
  endDate: string;
}) {
  return callGhl<{ slots: Record<string, string[]> }>("getFreeSlots", data);
}

export function bookAppointment(data: {
  leadId: string;
  calendarType: CalendarType;
  slotStart: string;
  slotEnd?: string;
  name: string;
  email: string;
  phone: string;
}) {
  return callGhl<{ ok: true; appointmentId: string | null }>("bookAppointment", data);
}
