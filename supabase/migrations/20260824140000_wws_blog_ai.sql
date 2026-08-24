-- White Wolf Shepherds — self-writing blog (scoped to site_key = 'wws')

alter table public.blog_categories
  add column if not exists site_key text not null default 'ghi';

alter table public.blog_posts
  add column if not exists site_key text not null default 'ghi';

alter table public.auto_publish_settings
  add column if not exists site_key text not null default 'ghi';

create index if not exists blog_posts_site_key_idx on public.blog_posts (site_key);
create index if not exists blog_categories_site_key_idx on public.blog_categories (site_key);
create unique index if not exists blog_posts_site_slug_uidx on public.blog_posts (site_key, slug);
create unique index if not exists blog_categories_site_slug_uidx on public.blog_categories (site_key, slug);

insert into public.blog_categories (name, slug, description, site_key)
values
  ('Puppy Care', 'puppy-care', 'Raising and caring for German Shepherd puppies', 'wws'),
  ('Training & Behavior', 'training-behavior', 'Obedience, socialization, and temperament', 'wws'),
  ('Health & Genetics', 'health-genetics', 'Health testing, genetics, and veterinary care', 'wws'),
  ('Breeder Insights', 'breeder-insights', 'Ethical breeding practices and program standards', 'wws'),
  ('Life With a Shepherd', 'life-with-a-shepherd', 'Family fit, lifestyle, and owner stories', 'wws'),
  ('Adoption Process', 'adoption-process', 'How our application and placement process works', 'wws')
on conflict do nothing;

insert into public.auto_publish_settings (
  enabled,
  frequency,
  posts_per_cycle,
  preferred_days,
  preferred_hour,
  last_category_index,
  audit_enabled,
  max_retries,
  site_key
)
select false, 'weekly', 1, array[1, 3, 5], 14, -1, true, 2, 'wws'
where not exists (
  select 1 from public.auto_publish_settings where site_key = 'wws'
);

drop policy if exists wws_admin_manage_blog_posts on public.blog_posts;
create policy wws_admin_manage_blog_posts on public.blog_posts
  for all to authenticated
  using (
    site_key = 'wws'
    and exists (
      select 1 from public.wws_profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  )
  with check (
    site_key = 'wws'
    and exists (
      select 1 from public.wws_profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

drop policy if exists wws_admin_manage_blog_categories on public.blog_categories;
create policy wws_admin_manage_blog_categories on public.blog_categories
  for all to authenticated
  using (
    site_key = 'wws'
    and exists (
      select 1 from public.wws_profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  )
  with check (
    site_key = 'wws'
    and exists (
      select 1 from public.wws_profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

drop policy if exists wws_admin_manage_auto_publish on public.auto_publish_settings;
create policy wws_admin_manage_auto_publish on public.auto_publish_settings
  for all to authenticated
  using (
    site_key = 'wws'
    and exists (
      select 1 from public.wws_profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  )
  with check (
    site_key = 'wws'
    and exists (
      select 1 from public.wws_profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

drop policy if exists wws_admin_read_blog_audit_log on public.blog_audit_log;
create policy wws_admin_read_blog_audit_log on public.blog_audit_log
  for select to authenticated
  using (
    exists (
      select 1 from public.blog_posts bp
      join public.wws_profiles p on p.id = auth.uid() and p.role = 'admin'
      where bp.id = blog_audit_log.post_id and bp.site_key = 'wws'
    )
  );
