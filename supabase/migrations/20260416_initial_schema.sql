-- ============================================================
-- White Wolf Shepherds — Initial Schema
-- Run this in Supabase SQL Editor or via `supabase db push`
-- ============================================================

-- Puppies table
create table if not exists puppies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  sex text check (sex in ('male','female')),
  dob date,
  ready_date date,
  status text default 'available'
    check (status in ('available','pending','reserved','sold')),
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

-- Leads table
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  full_name text,
  email text unique,
  phone text,
  city text,
  state text,
  preferred_sex text,
  preferred_puppy_id uuid references puppies(id),
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
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Reservations table
create table if not exists reservations (
  id uuid primary key default gen_random_uuid(),
  puppy_id uuid references puppies(id),
  lead_id uuid references leads(id),
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

-- Add FK after both tables exist
do $$
begin
  if not exists (
    select 1 from information_schema.table_constraints
    where constraint_name = 'fk_reserved_by'
  ) then
    alter table puppies
      add constraint fk_reserved_by
      foreign key (reserved_by_lead_id)
      references leads(id);
  end if;
end $$;

-- Enable Row Level Security (allow public read for puppies, restricted for leads/reservations)
alter table puppies enable row level security;
alter table leads enable row level security;
alter table reservations enable row level security;

-- Puppies: anyone can read
create policy "Public can read puppies" on puppies
  for select using (true);

-- Leads: anyone can insert (application form), service role can do everything
create policy "Anyone can submit application" on leads
  for insert with check (true);

create policy "Anyone can read own lead by token" on leads
  for select using (true);

create policy "Service role manages leads" on leads
  for all using (auth.role() = 'service_role');

-- Reservations: service role only
create policy "Public can read reservations" on reservations
  for select using (true);

create policy "Service role manages reservations" on reservations
  for all using (auth.role() = 'service_role');

-- Seed 9 puppies
insert into puppies (name, slug, sex, status, tier, price, priority_order, temperament_tags, personality_bio, ideal_home, collar_color) values
('Apollo', 'apollo', 'male', 'available', 'premier', 4000, 1,
 array['bold','confident','high-energy'],
 'Apollo is the natural leader of the litter — bold, curious, and always first to explore. He is highly intelligent and responds exceptionally well to structured training.',
 'Apollo thrives with an active family or individual who has experience with large breeds. A home with space to run and a confident owner to channel his drive.',
 'red'),
('Luna', 'luna', 'female', 'available', 'premier', 4000, 2,
 array['gentle','intuitive','affectionate'],
 'Luna is calm, deeply perceptive, and forms bonds quickly. She watches everything and misses nothing — a natural protector with a gentle soul.',
 'Luna is ideal for a family with children or a quieter home that wants a loyal, intuitive companion. She does beautifully with consistent routines.',
 'pink'),
('Atlas', 'atlas', 'male', 'available', 'preferred', 3250, 3,
 array['playful','social','adaptable'],
 'Atlas is the social butterfly of the litter. He loves everyone, plays hard, and recovers fast. Incredibly adaptable to different environments.',
 'Atlas fits almost any home — active families, couples, or experienced first-time large-breed owners. Fenced yard strongly preferred.',
 'blue'),
('Nova', 'nova', 'female', 'available', 'preferred', 3250, 4,
 array['curious','smart','spirited'],
 'Nova is sharp, fast-learning, and endlessly curious. She figured out the puppy puzzles first and has not slowed down since.',
 'Nova needs mental stimulation as much as physical exercise. Best with an owner who wants to train and engage daily.',
 'purple'),
('Zeus', 'zeus', 'male', 'available', 'preferred', 3250, 5,
 array['calm','steady','protective'],
 'Zeus has a quiet confidence that stands out. He is steady under pressure, gentle with smaller animals, and naturally watchful.',
 'Zeus suits a calm household that values a grounded, protective presence. Excellent with children and other dogs.',
 'green'),
('Stella', 'stella', 'female', 'available', 'preferred', 3250, 6,
 array['sweet','loyal','easy-going'],
 'Stella is pure heart. She is the most affectionate of the litter — always close, always attentive, always happy to see you.',
 'Stella is perfect for families or individuals wanting an emotionally connected companion. She does wonderfully with first-time large-breed owners.',
 'yellow'),
('Titan', 'titan', 'male', 'available', 'companion', 2500, 7,
 array['independent','athletic','driven'],
 'Titan is built to move. Athletic, focused, and independent-minded, he has the makings of an outstanding working or sport dog.',
 'Titan is best with an experienced handler who appreciates drive and independence. He would excel in sport, protection, or service work.',
 'orange'),
('Aurora', 'aurora', 'female', 'available', 'companion', 2500, 8,
 array['nurturing','calm','gentle'],
 'Aurora is soft, nurturing, and completely unflappable. She is the puppy the others fall asleep on — a natural comfort presence.',
 'Aurora is wonderful for families with young children or homes with elderly members. She has a natural therapy-dog temperament.',
 'white'),
('Orion', 'orion', 'male', 'available', 'companion', 2500, 9,
 array['playful','goofy','lovable'],
 'Orion is pure joy. He is the clown of the litter — always playing, always making everyone laugh, endlessly enthusiastic about everything.',
 'Orion fits any home that wants a fun-loving, lighthearted companion. Great with kids, other dogs, and anyone who loves to laugh.',
 'black')
on conflict (slug) do nothing;
