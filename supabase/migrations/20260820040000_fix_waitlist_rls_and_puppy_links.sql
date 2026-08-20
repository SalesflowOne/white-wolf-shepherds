-- Fix puppy_waitlist admin policies (legacy has_role → wws_is_admin).
-- Homepage waitlist now routes through wws-funnel; legacy rows remain readable here.

drop policy if exists "Anyone can join the waitlist" on public.puppy_waitlist;
create policy "Anyone can join the waitlist"
  on public.puppy_waitlist
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Admins can view waitlist" on public.puppy_waitlist;
create policy "Admins can view waitlist"
  on public.puppy_waitlist
  for select
  to authenticated
  using (public.wws_is_admin(auth.uid()));

drop policy if exists "Admins can update waitlist" on public.puppy_waitlist;
create policy "Admins can update waitlist"
  on public.puppy_waitlist
  for update
  to authenticated
  using (public.wws_is_admin(auth.uid()))
  with check (public.wws_is_admin(auth.uid()));

drop policy if exists "Admins can delete waitlist" on public.puppy_waitlist;
create policy "Admins can delete waitlist"
  on public.puppy_waitlist
  for delete
  to authenticated
  using (public.wws_is_admin(auth.uid()));
