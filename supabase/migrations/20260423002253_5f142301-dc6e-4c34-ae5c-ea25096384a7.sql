ALTER TABLE public.wws_puppies DROP CONSTRAINT IF EXISTS wws_puppies_status_check;
ALTER TABLE public.wws_puppies ADD CONSTRAINT wws_puppies_status_check
  CHECK (status = ANY (ARRAY['available','pending','reserved','sold','placed','alumni','parent','retired']));

INSERT INTO public.wws_puppies (name, slug, sex, status, litter_id) VALUES
  ('Haki', 'haki', 'male', 'parent', NULL),
  ('Mia', 'mia', 'female', 'parent', NULL);