-- Adoption portal foundation: deposit policy, drafts, GHL appointments, support tickets.

alter table public.wws_leads
  add column if not exists deposit_status text default 'none'
    check (deposit_status in ('none', 'paid', 'locked', 'refunded')),
  add column if not exists ghl_contact_id text,
  add column if not exists application_draft jsonb,
  add column if not exists reviewed_at timestamptz,
  add column if not exists reviewed_by uuid references auth.users(id),
  add column if not exists denial_reason text;

alter table public.wws_reservations
  add column if not exists refunded_at timestamptz,
  add column if not exists stripe_refund_id text,
  add column if not exists deposit_status text default 'paid'
    check (deposit_status in ('paid', 'locked', 'refunded'));

create table if not exists public.wws_appointments (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.wws_leads(id) not null,
  ghl_appointment_id text,
  calendar_type text not null check (calendar_type in ('family_fit', 'video_call')),
  starts_at timestamptz not null,
  ends_at timestamptz,
  status text default 'scheduled'
    check (status in ('scheduled', 'cancelled', 'completed', 'no_show')),
  created_at timestamptz default now()
);

create table if not exists public.wws_support_tickets (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.wws_leads(id) not null,
  subject text not null,
  body text not null,
  status text default 'open'
    check (status in ('open', 'in_progress', 'resolved', 'closed')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists wws_appointments_lead_id_idx on public.wws_appointments (lead_id);
create index if not exists wws_support_tickets_lead_id_idx on public.wws_support_tickets (lead_id);

alter table public.wws_appointments enable row level security;
alter table public.wws_support_tickets enable row level security;

drop policy if exists "wws_own_appointments" on public.wws_appointments;
create policy "wws_own_appointments" on public.wws_appointments for select to authenticated
  using (lead_id in (select lead_id from public.wws_profiles where id = auth.uid()));

drop policy if exists "wws_admin_manage_appointments" on public.wws_appointments;
create policy "wws_admin_manage_appointments" on public.wws_appointments for all to authenticated
  using (exists (select 1 from public.wws_profiles where id = auth.uid() and role = 'admin'));

drop policy if exists "wws_own_tickets" on public.wws_support_tickets;
create policy "wws_own_tickets" on public.wws_support_tickets for all to authenticated
  using (lead_id in (select lead_id from public.wws_profiles where id = auth.uid()));

drop policy if exists "wws_admin_manage_tickets" on public.wws_support_tickets;
create policy "wws_admin_manage_tickets" on public.wws_support_tickets for all to authenticated
  using (exists (select 1 from public.wws_profiles where id = auth.uid() and role = 'admin'));
