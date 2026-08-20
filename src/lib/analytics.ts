import { supabase } from "@/integrations/supabase/client";

/**
 * Inquiry-funnel analytics.
 *
 * Every event is written twice:
 *  1. to `wws_analytics_events` (own funnel dashboard in the admin portal)
 *  2. to Google Analytics 4 via gtag, when a measurement ID is configured
 *
 * All calls are fire-and-forget: analytics must never block or break a form.
 */

export type FunnelEvent =
  | "form_view" // form scrolled/rendered into the page
  | "form_start" // visitor typed into the first field
  | "form_step" // funnel step advanced
  | "form_error" // validation or server error blocked the submit
  | "generate_lead"; // successful submission

export type FunnelForm = "waitlist_home" | "apply" | "get_started";

type EventProps = {
  form: FunnelForm;
  step?: string;
  leadId?: string | null;
  metadata?: Record<string, unknown>;
};

const SESSION_KEY = "ww_analytics_session";
const ATTRIBUTION_KEY = "ww_attribution";
const SEEN_PREFIX = "ww_evt:";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const measurementId = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY"] as
  | string
  | undefined;

const adsId = (import.meta.env.VITE_GOOGLE_ADS_ID as string | undefined)?.trim() ?? "";

let gtagLoaded = false;

/** Loads gtag.js once and configures GA4 + Google Ads when IDs are set. */
export function initAnalytics() {
  if (typeof window === "undefined") return;
  captureAttribution();

  const primaryId = measurementId ?? adsId;
  if (!primaryId) return;

  if (!gtagLoaded) {
    gtagLoaded = true;

    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${primaryId}`;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer!.push(args);
    };
    window.gtag("js", new Date());
  }

  if (measurementId) {
    window.gtag!("config", measurementId, { send_page_view: true });
  }

  if (adsId) {
    window.gtag!("config", adsId);
  }
}

/** Sends a SPA page_view to GA4 after client-side navigation. */
export function trackPageView(path: string) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "page_view", { page_path: path, page_location: window.location.href });
}

function sessionId(): string {
  if (typeof window === "undefined") return "ssr";
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

type Attribution = {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  referrer: string | null;
};

/** Stores first-touch UTM/referrer for the visit so conversions can be attributed. */
function captureAttribution(): Attribution {
  const empty: Attribution = {
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    referrer: null,
  };
  if (typeof window === "undefined") return empty;

  const stored = sessionStorage.getItem(ATTRIBUTION_KEY);
  if (stored) {
    try {
      return { ...empty, ...(JSON.parse(stored) as Attribution) };
    } catch {
      /* fall through and re-capture */
    }
  }

  const params = new URLSearchParams(window.location.search);
  const attribution: Attribution = {
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    referrer: document.referrer ? new URL(document.referrer).hostname : null,
  };
  sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution));
  return attribution;
}

/** Records a funnel event to the database and to GA4. Never throws. */
export function trackEvent(event: FunnelEvent, props: EventProps) {
  if (typeof window === "undefined") return;

  const attribution = captureAttribution();
  const payload = {
    event_name: event,
    form_id: props.form,
    step: props.step ?? null,
    page_path: window.location.pathname,
    session_id: sessionId(),
    lead_id: props.leadId ?? null,
    metadata: props.metadata ?? {},
    ...attribution,
  };

  void supabase
    .from("wws_analytics_events")
    .insert(payload)
    .then(({ error }) => {
      if (error && import.meta.env.DEV) console.warn("analytics insert failed", error.message);
    });

  window.gtag?.("event", event, {
    form_id: props.form,
    step: props.step,
    ...(event === "generate_lead" ? { currency: "USD", value: 1 } : {}),
    ...props.metadata,
  });
}

/** Fires an event at most once per browsing session (e.g. form_view, form_start). */
export function trackOnce(key: string, event: FunnelEvent, props: EventProps) {
  if (typeof window === "undefined") return;
  const k = `${SEEN_PREFIX}${key}`;
  if (sessionStorage.getItem(k)) return;
  sessionStorage.setItem(k, "1");
  trackEvent(event, props);
}
