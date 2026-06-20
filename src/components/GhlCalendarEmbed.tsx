import { useEffect, useRef } from "react";

// GoHighLevel ships a small script that auto-resizes embedded calendar
// iframes and posts booking events back to the parent window.
const GHL_EMBED_SCRIPT = "https://link.msgsndr.com/js/form_embed.js";

function ensureEmbedScript() {
  if (typeof document === "undefined") return;
  if (document.querySelector(`script[src="${GHL_EMBED_SCRIPT}"]`)) return;
  const s = document.createElement("script");
  s.src = GHL_EMBED_SCRIPT;
  s.async = true;
  document.body.appendChild(s);
}

export type GhlPrefill = { name?: string; email?: string; phone?: string };

function buildSrc(src: string, prefill?: GhlPrefill): string {
  if (!src) return src;
  try {
    const url = new URL(src);
    if (prefill?.name) {
      const parts = prefill.name.trim().split(/\s+/);
      url.searchParams.set("first_name", parts[0]);
      if (parts.length > 1) url.searchParams.set("last_name", parts.slice(1).join(" "));
    }
    if (prefill?.email) url.searchParams.set("email", prefill.email.toLowerCase());
    if (prefill?.phone) url.searchParams.set("phone", prefill.phone);
    return url.toString();
  } catch {
    return src;
  }
}

/**
 * Embeds a GoHighLevel booking calendar. Advancement is driven primarily by
 * the explicit "I've booked — continue" button (reliable across GHL config),
 * with a best-effort postMessage listener that auto-advances when GHL reports
 * a completed booking.
 */
export default function GhlCalendarEmbed({
  src,
  prefill,
  onBooked,
  continueLabel = "I've booked — continue →",
}: {
  src?: string;
  prefill?: GhlPrefill;
  onBooked: () => void;
  continueLabel?: string;
}) {
  const bookedRef = useRef(false);

  function advance() {
    if (bookedRef.current) return;
    bookedRef.current = true;
    onBooked();
  }

  useEffect(() => {
    ensureEmbedScript();

    function handleMessage(e: MessageEvent) {
      const origin = e.origin || "";
      if (!/leadconnectorhq|msgsndr|gohighlevel/i.test(origin)) return;
      const data = e.data;
      const text = typeof data === "string" ? data : JSON.stringify(data ?? "");
      if (/appointment|booking|booked|scheduled|success/i.test(text)) {
        advance();
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
    // onBooked is stable enough for our usage; advance() guards double-calls.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const continueBtn = (
    <button
      type="button"
      onClick={advance}
      className="mt-4 w-full rounded-xl border border-accent bg-accent/10 py-3 text-sm font-bold uppercase tracking-wider text-accent transition-all hover:bg-accent/20"
    >
      {continueLabel}
    </button>
  );

  if (!src) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-muted/40 p-6 text-center">
        <p className="text-sm text-muted-foreground">
          The booking calendar isn't configured yet. Add the GoHighLevel calendar URL to enable
          scheduling here.
        </p>
        {continueBtn}
      </div>
    );
  }

  return (
    <div>
      <iframe
        src={buildSrc(src, prefill)}
        title="Booking calendar"
        className="w-full rounded-xl border border-border bg-card"
        style={{ minHeight: 720 }}
        scrolling="no"
      />
      {continueBtn}
    </div>
  );
}
