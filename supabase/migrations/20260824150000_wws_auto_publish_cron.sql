-- Schedule WWS self-writing blog (offset from GHI auto-publish at 13:00 / 19:00 UTC)

select cron.schedule(
  'wws-auto-publish-morning',
  '0 14 * * *',
  $$
  select net.http_post(
    url := 'https://ebjzdcnphkfpxfldnatm.supabase.co/functions/v1/wws-auto-publish',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVianpkY25waGtmcHhmbGRuYXRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3NjcwMzIsImV4cCI6MjA4NzM0MzAzMn0.N-fK-ol2a4zMfMBfuSWLj5vbkdG4yF5Q87Tklrplgf8"}'::jsonb,
    body := '{}'::jsonb
  ) as request_id;
  $$
);

select cron.schedule(
  'wws-auto-publish-afternoon',
  '0 20 * * *',
  $$
  select net.http_post(
    url := 'https://ebjzdcnphkfpxfldnatm.supabase.co/functions/v1/wws-auto-publish',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVianpkY25waGtmcHhmbGRuYXRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3NjcwMzIsImV4cCI6MjA4NzM0MzAzMn0.N-fK-ol2a4zMfMBfuSWLj5vbkdG4yF5Q87Tklrplgf8"}'::jsonb,
    body := '{}'::jsonb
  ) as request_id;
  $$
);

-- Enable WWS auto-publish (audit gate stays on)
update public.auto_publish_settings
set enabled = true
where site_key = 'wws';
