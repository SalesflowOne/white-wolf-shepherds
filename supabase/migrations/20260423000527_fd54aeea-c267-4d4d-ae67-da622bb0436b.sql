-- 1. Litters table
CREATE TABLE public.wws_litters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,                       -- e.g. "Spring 2026"
  slug text NOT NULL UNIQUE,                -- e.g. "spring-2026"
  dam_name text,
  sire_name text,
  born_date date,
  ready_date date,
  expected_count integer,                   -- announced litter size, e.g. 9
  status text NOT NULL DEFAULT 'upcoming',  -- upcoming | available | reserved | past
  description text,
  cover_image_url text,
  priority_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX wws_litters_status_idx ON public.wws_litters(status);
CREATE INDEX wws_litters_priority_idx ON public.wws_litters(priority_order);

-- 2. Add litter_id to puppies (nullable so existing rows survive)
ALTER TABLE public.wws_puppies
  ADD COLUMN litter_id uuid REFERENCES public.wws_litters(id) ON DELETE SET NULL;

CREATE INDEX wws_puppies_litter_idx ON public.wws_puppies(litter_id);

-- 3. Backfill: create the Spring 2026 litter and assign all existing puppies to it
INSERT INTO public.wws_litters (name, slug, dam_name, sire_name, born_date, ready_date, expected_count, status, priority_order)
VALUES ('Spring 2026', 'spring-2026', NULL, NULL, '2026-03-01', '2026-05-01', 9, 'available', 100)
ON CONFLICT (slug) DO NOTHING;

UPDATE public.wws_puppies
SET litter_id = (SELECT id FROM public.wws_litters WHERE slug = 'spring-2026')
WHERE litter_id IS NULL;

-- 4. RLS — match wws_puppies pattern: public read, admin-only write
ALTER TABLE public.wws_litters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Litters are viewable by everyone"
  ON public.wws_litters
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert litters"
  ON public.wws_litters
  FOR INSERT
  WITH CHECK (public.wws_is_admin(auth.uid()));

CREATE POLICY "Admins can update litters"
  ON public.wws_litters
  FOR UPDATE
  USING (public.wws_is_admin(auth.uid()));

CREATE POLICY "Admins can delete litters"
  ON public.wws_litters
  FOR DELETE
  USING (public.wws_is_admin(auth.uid()));

-- 5. updated_at trigger
CREATE TRIGGER wws_litters_set_updated_at
  BEFORE UPDATE ON public.wws_litters
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();