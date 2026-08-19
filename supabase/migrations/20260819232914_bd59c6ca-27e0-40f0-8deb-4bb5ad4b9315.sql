CREATE TABLE public.wws_analytics_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name text NOT NULL,
  form_id text,
  step text,
  page_path text,
  session_id text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  lead_id uuid,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX wws_analytics_events_created_idx ON public.wws_analytics_events (created_at DESC);
CREATE INDEX wws_analytics_events_name_idx ON public.wws_analytics_events (event_name);
CREATE INDEX wws_analytics_events_session_idx ON public.wws_analytics_events (session_id);

GRANT INSERT ON public.wws_analytics_events TO anon;
GRANT SELECT, INSERT ON public.wws_analytics_events TO authenticated;
GRANT ALL ON public.wws_analytics_events TO service_role;

ALTER TABLE public.wws_analytics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can record an analytics event"
  ON public.wws_analytics_events FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can read analytics events"
  ON public.wws_analytics_events FOR SELECT
  TO authenticated
  USING (public.wws_is_admin(auth.uid()));