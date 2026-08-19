CREATE TABLE public.wws_testimonials (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  location text,
  quote text NOT NULL,
  photo_url text,
  puppy_name text,
  rating int NOT NULL DEFAULT 5,
  published boolean NOT NULL DEFAULT false,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.wws_testimonials TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.wws_testimonials TO authenticated;
GRANT ALL ON public.wws_testimonials TO service_role;

ALTER TABLE public.wws_testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published testimonials are public"
ON public.wws_testimonials FOR SELECT
TO anon, authenticated
USING (published = true);

CREATE POLICY "Admins can view all testimonials"
ON public.wws_testimonials FOR SELECT
TO authenticated
USING (public.wws_is_admin(auth.uid()));

CREATE POLICY "Admins can insert testimonials"
ON public.wws_testimonials FOR INSERT
TO authenticated
WITH CHECK (public.wws_is_admin(auth.uid()));

CREATE POLICY "Admins can update testimonials"
ON public.wws_testimonials FOR UPDATE
TO authenticated
USING (public.wws_is_admin(auth.uid()))
WITH CHECK (public.wws_is_admin(auth.uid()));

CREATE POLICY "Admins can delete testimonials"
ON public.wws_testimonials FOR DELETE
TO authenticated
USING (public.wws_is_admin(auth.uid()));

CREATE TRIGGER trg_wws_testimonials_updated_at
BEFORE UPDATE ON public.wws_testimonials
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_wws_testimonials_sort ON public.wws_testimonials(published, sort_order);