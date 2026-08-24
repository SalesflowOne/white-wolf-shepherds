-- Track Salesflow CRM linkage on WWS leads (shared Supabase project).
alter table public.wws_leads
  add column if not exists salesflow_lead_id uuid,
  add column if not exists salesflow_synced_at timestamptz;

create index if not exists wws_leads_salesflow_lead_id_idx
  on public.wws_leads (salesflow_lead_id)
  where salesflow_lead_id is not null;

comment on column public.wws_leads.salesflow_lead_id is
  'FK-style link to public.leads.id in the Salesflow CRM';
comment on column public.wws_leads.salesflow_synced_at is
  'Last successful sync timestamp to Salesflow CRM (leads + GHL)';
