-- Add user_id column to link Supabase Auth users to their lead record
alter table leads add column if not exists user_id uuid unique references auth.users(id);

-- Allow authenticated users to read their own lead
create policy "Authenticated users can read own lead" on leads
  for select using (auth.uid() = user_id);

-- Allow authenticated users to update their own lead (for internal notes etc)
create policy "Authenticated users can update own lead" on leads
  for update using (auth.uid() = user_id);
