-- =============================================================
-- White Wolf Shepherds — Complete Schema
-- All tables live in `public` with `wws_` prefix to coexist
-- cleanly with other apps sharing this Supabase project.
-- Idempotent: safe to re-run.
-- =============================================================

-- ─────────────────────────────────────────────────────────────
-- PUPPIES
-- ─────────────────────────────────────────────────────────────
create table if not exists public.wws_puppies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  sex text check (sex in ('male','female')),
  dob date,
  ready_date date,
  status text default 'available' check (status in ('available','pending','reserved','sold')),
  tier text check (tier in ('companion','preferred','premier')),
  price integer,
  temperament_tags text[],
  personality_bio text,
  ideal_home text,
  image_url text,
  gallery_urls text[],
  video_url text,
  collar_color text,
  stripe_payment_link text,
  priority_order integer,
  reserved_by_lead_id uuid,
  deposit_paid_at timestamptz,
  created_at timestamptz default now()
);

-- ─────────────────────────────────────────────────────────────
-- LEADS
-- ─────────────────────────────────────────────────────────────
create table if not exists public.wws_leads (
  id uuid primary key default gen_random_uuid(),
  full_name text,
  email text unique,
  phone text,
  city text,
  state text,
  preferred_sex text,
  preferred_puppy_id uuid references public.wws_puppies(id),
  timeline text check (timeline in ('ready_now','1_3_months','future')),
  has_owned_large_dog boolean,
  has_fenced_yard boolean,
  household_type text,
  family_size integer,
  children_ages text,
  other_pets text,
  reason_for_breed text,
  additional_notes text,
  ready_for_deposit boolean,
  source text,
  utm_campaign text,
  score integer default 0,
  stage text default 'new_inquiry',
  approval_token uuid unique default gen_random_uuid(),
  approval_sent_at timestamptz,
  deposit_link_sent_at timestamptz,
  internal_notes text,
  referred_by_lead_id uuid,
  referral_code text unique default substr(md5(random()::text), 1, 8),
  portal_last_seen_at timestamptz,
  pickup_date date,
  signature_agreed_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'wws_leads_referred_by_lead_id_fkey') then
    alter table public.wws_leads add constraint wws_leads_referred_by_lead_id_fkey
      foreign key (referred_by_lead_id) references public.wws_leads(id);
  end if;
  if not exists (select 1 from pg_constraint where conname = 'wws_puppies_reserved_by_lead_id_fkey') then
    alter table public.wws_puppies add constraint wws_puppies_reserved_by_lead_id_fkey
      foreign key (reserved_by_lead_id) references public.wws_leads(id);
  end if;
end $$;

-- ─────────────────────────────────────────────────────────────
-- RESERVATIONS
-- ─────────────────────────────────────────────────────────────
create table if not exists public.wws_reservations (
  id uuid primary key default gen_random_uuid(),
  puppy_id uuid references public.wws_puppies(id),
  lead_id uuid references public.wws_leads(id),
  amount integer,
  stripe_session_id text unique,
  stripe_payment_intent_id text,
  tier text,
  pick_order integer,
  contract_sent_at timestamptz,
  final_payment_due_at timestamptz,
  final_payment_paid_at timestamptz,
  pickup_date date,
  created_at timestamptz default now()
);

-- ─────────────────────────────────────────────────────────────
-- PROFILES (WWS-only, separate from existing public.profiles)
-- ─────────────────────────────────────────────────────────────
create table if not exists public.wws_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'applicant' check (role in ('admin','applicant','owner','alumni')),
  lead_id uuid references public.wws_leads(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ─────────────────────────────────────────────────────────────
-- PORTAL UPDATES (breeder posts)
-- ─────────────────────────────────────────────────────────────
create table if not exists public.wws_portal_updates (
  id uuid primary key default gen_random_uuid(),
  title text,
  body text,
  image_urls text[],
  video_url text,
  milestone_tag text,
  visibility text default 'all_reserved' check (visibility in ('all_reserved','specific_puppy','alumni_only')),
  puppy_id uuid references public.wws_puppies(id),
  published_at timestamptz default now(),
  created_at timestamptz default now()
);

-- ─────────────────────────────────────────────────────────────
-- MESSAGES (owner <-> breeder)
-- ─────────────────────────────────────────────────────────────
create table if not exists public.wws_messages (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.wws_leads(id) not null,
  sender text check (sender in ('breeder','owner')) not null,
  body text not null,
  read_at timestamptz,
  created_at timestamptz default now()
);

-- ─────────────────────────────────────────────────────────────
-- ALUMNI POSTS
-- ─────────────────────────────────────────────────────────────
create table if not exists public.wws_alumni_posts (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.wws_leads(id) not null,
  puppy_id uuid references public.wws_puppies(id),
  caption text,
  image_urls text[],
  video_url text,
  milestone_tag text,
  status text default 'pending' check (status in ('pending','approved','rejected')),
  approved_at timestamptz,
  created_at timestamptz default now()
);

-- ─────────────────────────────────────────────────────────────
-- DOG PROFILES
-- ─────────────────────────────────────────────────────────────
create table if not exists public.wws_dog_profiles (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.wws_leads(id) not null,
  puppy_id uuid references public.wws_puppies(id),
  call_name text not null,
  dob date,
  sex text,
  color_description text,
  weight_lbs numeric,
  bio text,
  profile_photo_url text,
  gallery_urls text[],
  health_notes text,
  titles_earned text[],
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ─────────────────────────────────────────────────────────────
-- RESOURCES
-- ─────────────────────────────────────────────────────────────
create table if not exists public.wws_resources (
  id uuid primary key default gen_random_uuid(),
  section text not null,
  title text not null,
  description text,
  url text,
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- ─────────────────────────────────────────────────────────────
-- RLS
-- ─────────────────────────────────────────────────────────────
alter table public.wws_puppies enable row level security;
alter table public.wws_leads enable row level security;
alter table public.wws_reservations enable row level security;
alter table public.wws_profiles enable row level security;
alter table public.wws_portal_updates enable row level security;
alter table public.wws_messages enable row level security;
alter table public.wws_alumni_posts enable row level security;
alter table public.wws_dog_profiles enable row level security;
alter table public.wws_resources enable row level security;

create or replace function public.wws_is_admin(uid uuid) returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (select 1 from public.wws_profiles where id = uid and role = 'admin')
$$;

-- PUPPIES
drop policy if exists "wws_public_read_puppies" on public.wws_puppies;
create policy "wws_public_read_puppies" on public.wws_puppies for select using (true);
drop policy if exists "wws_admin_manage_puppies" on public.wws_puppies;
create policy "wws_admin_manage_puppies" on public.wws_puppies for all to authenticated
  using (public.wws_is_admin(auth.uid())) with check (public.wws_is_admin(auth.uid()));

-- LEADS
drop policy if exists "wws_anyone_submit_app" on public.wws_leads;
create policy "wws_anyone_submit_app" on public.wws_leads for insert to anon, authenticated with check (true);
drop policy if exists "wws_own_lead_via_profile" on public.wws_leads;
create policy "wws_own_lead_via_profile" on public.wws_leads for select to authenticated
  using (id in (select lead_id from public.wws_profiles where id = auth.uid()) or public.wws_is_admin(auth.uid()));
drop policy if exists "wws_admin_manage_leads" on public.wws_leads;
create policy "wws_admin_manage_leads" on public.wws_leads for all to authenticated
  using (public.wws_is_admin(auth.uid())) with check (public.wws_is_admin(auth.uid()));
drop policy if exists "wws_read_lead_by_token" on public.wws_leads;
create policy "wws_read_lead_by_token" on public.wws_leads for select to anon, authenticated using (true);

-- RESERVATIONS
drop policy if exists "wws_owner_read_reservation" on public.wws_reservations;
create policy "wws_owner_read_reservation" on public.wws_reservations for select to authenticated
  using (lead_id in (select lead_id from public.wws_profiles where id = auth.uid()) or public.wws_is_admin(auth.uid()));
drop policy if exists "wws_admin_manage_reservations" on public.wws_reservations;
create policy "wws_admin_manage_reservations" on public.wws_reservations for all to authenticated
  using (public.wws_is_admin(auth.uid())) with check (public.wws_is_admin(auth.uid()));

-- PROFILES
drop policy if exists "wws_users_read_own_profile" on public.wws_profiles;
create policy "wws_users_read_own_profile" on public.wws_profiles for select to authenticated using (auth.uid() = id);
drop policy if exists "wws_admins_read_all_profiles" on public.wws_profiles;
create policy "wws_admins_read_all_profiles" on public.wws_profiles for select to authenticated using (public.wws_is_admin(auth.uid()));
drop policy if exists "wws_users_upsert_own_profile" on public.wws_profiles;
create policy "wws_users_upsert_own_profile" on public.wws_profiles for insert to authenticated with check (auth.uid() = id);
drop policy if exists "wws_users_update_own_profile" on public.wws_profiles;
create policy "wws_users_update_own_profile" on public.wws_profiles for update to authenticated using (auth.uid() = id);
drop policy if exists "wws_admin_manage_profiles" on public.wws_profiles;
create policy "wws_admin_manage_profiles" on public.wws_profiles for all to authenticated
  using (public.wws_is_admin(auth.uid())) with check (public.wws_is_admin(auth.uid()));

-- PORTAL UPDATES
drop policy if exists "wws_auth_read_updates" on public.wws_portal_updates;
create policy "wws_auth_read_updates" on public.wws_portal_updates for select to authenticated using (true);
drop policy if exists "wws_admin_insert_updates" on public.wws_portal_updates;
create policy "wws_admin_insert_updates" on public.wws_portal_updates for insert to authenticated with check (public.wws_is_admin(auth.uid()));
drop policy if exists "wws_admin_update_updates" on public.wws_portal_updates;
create policy "wws_admin_update_updates" on public.wws_portal_updates for update to authenticated using (public.wws_is_admin(auth.uid()));
drop policy if exists "wws_admin_delete_updates" on public.wws_portal_updates;
create policy "wws_admin_delete_updates" on public.wws_portal_updates for delete to authenticated using (public.wws_is_admin(auth.uid()));

-- MESSAGES
drop policy if exists "wws_owner_read_messages" on public.wws_messages;
create policy "wws_owner_read_messages" on public.wws_messages for select to authenticated
  using (lead_id in (select lead_id from public.wws_profiles where id = auth.uid()) or public.wws_is_admin(auth.uid()));
drop policy if exists "wws_owner_send_messages" on public.wws_messages;
create policy "wws_owner_send_messages" on public.wws_messages for insert to authenticated
  with check (lead_id in (select lead_id from public.wws_profiles where id = auth.uid()) or public.wws_is_admin(auth.uid()));
drop policy if exists "wws_mark_messages_read" on public.wws_messages;
create policy "wws_mark_messages_read" on public.wws_messages for update to authenticated
  using (lead_id in (select lead_id from public.wws_profiles where id = auth.uid()) or public.wws_is_admin(auth.uid()));

-- ALUMNI POSTS
drop policy if exists "wws_owner_insert_alumni" on public.wws_alumni_posts;
create policy "wws_owner_insert_alumni" on public.wws_alumni_posts for insert to authenticated
  with check (lead_id in (select lead_id from public.wws_profiles where id = auth.uid()));
drop policy if exists "wws_read_approved_alumni" on public.wws_alumni_posts;
create policy "wws_read_approved_alumni" on public.wws_alumni_posts for select to authenticated
  using (status = 'approved' or public.wws_is_admin(auth.uid()));
drop policy if exists "wws_admin_manage_alumni" on public.wws_alumni_posts;
create policy "wws_admin_manage_alumni" on public.wws_alumni_posts for update to authenticated using (public.wws_is_admin(auth.uid()));

-- DOG PROFILES
drop policy if exists "wws_owner_manage_dog_profile" on public.wws_dog_profiles;
create policy "wws_owner_manage_dog_profile" on public.wws_dog_profiles for all to authenticated
  using (lead_id in (select lead_id from public.wws_profiles where id = auth.uid()) or public.wws_is_admin(auth.uid()))
  with check (lead_id in (select lead_id from public.wws_profiles where id = auth.uid()) or public.wws_is_admin(auth.uid()));

-- RESOURCES
drop policy if exists "wws_auth_read_resources" on public.wws_resources;
create policy "wws_auth_read_resources" on public.wws_resources for select to authenticated using (true);
drop policy if exists "wws_admin_manage_resources" on public.wws_resources;
create policy "wws_admin_manage_resources" on public.wws_resources for all to authenticated
  using (public.wws_is_admin(auth.uid())) with check (public.wws_is_admin(auth.uid()));

-- ─────────────────────────────────────────────────────────────
-- SEED 9 PUPPIES
-- ─────────────────────────────────────────────────────────────
insert into public.wws_puppies (name, slug, sex, status, tier, price, priority_order, temperament_tags, personality_bio, ideal_home, collar_color) values
('Apollo','apollo','male','available','premier',4000,1, array['bold','confident','high-energy'],
 'Apollo is the natural leader of the litter — bold, curious, and always first to explore. Highly intelligent and responds exceptionally well to structured training.',
 'Active family or individual with large-breed experience. Needs space to run and a confident owner to channel his drive.', 'red'),
('Lala','luna','female','available','premier',4000,2, array['gentle','intuitive','affectionate'],
 'Lala is calm, deeply perceptive, and forms bonds quickly. She watches everything and misses nothing — a natural protector with a gentle soul.',
 'Family with children or a quieter home wanting a loyal, intuitive companion. Thrives with consistent routines.', 'pink'),
('Artemis','atlas','male','available','preferred',3250,3, array['playful','social','adaptable'],
 'Artemis is the social butterfly of the litter. He loves everyone, plays hard, and recovers fast. Incredibly adaptable to different environments.',
 'Almost any home — active families, couples, experienced first-time large-breed owners. Fenced yard strongly preferred.', 'blue'),
('Zoro','nova','male','available','preferred',3250,4, array['curious','smart','spirited'],
 'Zoro is sharp, fast-learning, and endlessly curious. He figured out the puppy puzzles first and has not slowed down since.',
 'Owner who wants to train and engage daily. Needs mental stimulation as much as physical exercise.', 'purple'),
('Zeus','zeus','male','available','preferred',3250,5, array['calm','steady','protective'],
 'Zeus has a quiet confidence that stands out. Steady under pressure, gentle with smaller animals, naturally watchful.',
 'Calm household that values a grounded protective presence. Excellent with children and other dogs.', 'green'),
('Stella','stella','female','available','preferred',3250,6, array['sweet','loyal','easy-going'],
 'Stella is pure heart — the most affectionate of the litter. Always close, always attentive, always happy to see you.',
 'Families or individuals wanting an emotionally connected companion. Great for first-time large-breed owners.', 'yellow'),
('Titan','titan','male','available','companion',2500,7, array['independent','athletic','driven'],
 'Titan is built to move. Athletic, focused, and independent-minded — the makings of an outstanding working or sport dog.',
 'Experienced handler who appreciates drive and independence. Would excel in sport, protection, or service work.', 'orange'),
('Aura','aurora','female','available','companion',2500,8, array['nurturing','calm','gentle'],
 'Aura is soft, nurturing, and completely unflappable — the puppy the others fall asleep on. A natural comfort presence.',
 'Families with young children or homes with elderly members. Natural therapy-dog temperament.', 'white'),
('Orion','orion','male','available','companion',2500,9, array['playful','goofy','lovable'],
 'Orion is pure joy — the clown of the litter. Always playing, always making everyone laugh, endlessly enthusiastic.',
 'Any home wanting a fun-loving lighthearted companion. Great with kids, other dogs, and anyone who loves to laugh.', 'black')
on conflict (slug) do nothing;

-- Realtime publication
do $$
begin
  begin alter publication supabase_realtime add table public.wws_puppies; exception when duplicate_object then null; end;
  begin alter publication supabase_realtime add table public.wws_messages; exception when duplicate_object then null; end;
  begin alter publication supabase_realtime add table public.wws_portal_updates; exception when duplicate_object then null; end;
end $$;
