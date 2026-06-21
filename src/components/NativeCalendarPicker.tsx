import { useCallback, useEffect, useMemo, useState } from "react";
import { format, parseISO, startOfDay } from "date-fns";
import { bookAppointment, getFreeSlots, type CalendarType } from "@/lib/ghl-scheduling";

type NativeCalendarPickerProps = {
  calendarType: CalendarType;
  leadId: string;
  name: string;
  email: string;
  phone: string;
  onBooked: () => void;
  title?: string;
};

function flattenSlots(slots: unknown): string[] {
  if (!slots || typeof slots !== "object") return [];
  const raw =
    (slots as { slots?: Record<string, unknown> }).slots ?? (slots as Record<string, unknown>);
  const out: string[] = [];

  for (const [date, value] of Object.entries(raw)) {
    const times = Array.isArray(value)
      ? value
      : value && typeof value === "object" && Array.isArray((value as { slots?: string[] }).slots)
        ? (value as { slots: string[] }).slots
        : [];

    for (const time of times) {
      if (typeof time !== "string") continue;
      out.push(time.includes("T") ? time : `${date}T${time}`);
    }
  }

  return out.sort();
}

export default function NativeCalendarPicker({
  calendarType,
  leadId,
  name,
  email,
  phone,
  onBooked,
  title = "Pick a time",
}: NativeCalendarPickerProps) {
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState("");
  const [slots, setSlots] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  const range = useMemo(() => {
    const start = startOfDay(new Date());
    const end = new Date(start);
    end.setDate(end.getDate() + 14);
    return {
      startDate: format(start, "yyyy-MM-dd"),
      endDate: format(end, "yyyy-MM-dd"),
    };
  }, []);

  const loadSlots = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { slots: raw } = await getFreeSlots({
        calendarType,
        startDate: range.startDate,
        endDate: range.endDate,
      });
      const flat = flattenSlots(raw ?? {});
      setSlots(flat);
      if (flat.length === 0)
        setError("No open times in the next two weeks. Please check back soon.");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Could not load times";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [calendarType, range.endDate, range.startDate]);

  useEffect(() => {
    loadSlots();
  }, [loadSlots]);

  async function handleBook() {
    if (!selected) return;
    setBooking(true);
    setError("");
    try {
      await bookAppointment({
        leadId,
        calendarType,
        slotStart: selected,
        name,
        email,
        phone,
      });
      onBooked();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Booking failed";
      setError(msg);
    } finally {
      setBooking(false);
    }
  }

  const grouped = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const iso of slots) {
      const date = iso.slice(0, 10);
      const time = iso.includes("T") ? (iso.split("T")[1]?.slice(0, 5) ?? iso) : iso;
      const list = map.get(date) ?? [];
      list.push(time);
      map.set(date, list);
    }
    return [...map.entries()];
  }, [slots]);

  return (
    <div className="space-y-4">
      <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>

      {loading && <p className="text-sm text-muted-foreground">Loading available times...</p>}

      {error && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          {error}
        </div>
      )}

      {!loading && grouped.length > 0 && (
        <div className="max-h-80 space-y-4 overflow-y-auto pr-1">
          {grouped.map(([date, times]) => (
            <div key={date}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {format(parseISO(date), "EEEE, MMM d")}
              </p>
              <div className="flex flex-wrap gap-2">
                {times.map((time) => {
                  const iso =
                    slots.find((s) => s.startsWith(date) && s.includes(`T${time.slice(0, 5)}`)) ??
                    `${date}T${time}`;
                  const active = selected === iso;
                  return (
                    <button
                      key={iso}
                      type="button"
                      onClick={() => setSelected(iso)}
                      className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
                        active
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-border hover:bg-muted"
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={handleBook}
        disabled={!selected || booking}
        className="w-full rounded-xl bg-accent py-3 text-sm font-bold uppercase tracking-wider text-accent-foreground transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {booking ? "Booking..." : "Confirm this time →"}
      </button>
    </div>
  );
}
