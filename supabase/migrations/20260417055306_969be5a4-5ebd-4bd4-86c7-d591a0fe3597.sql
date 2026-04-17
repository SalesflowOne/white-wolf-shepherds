CREATE TABLE public.puppy_waitlist (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  preferred_sex text,
  message text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.puppy_waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can join the waitlist"
ON public.puppy_waitlist
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins can view waitlist"
ON public.puppy_waitlist
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update waitlist"
ON public.puppy_waitlist
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete waitlist"
ON public.puppy_waitlist
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_puppy_waitlist_updated_at
BEFORE UPDATE ON public.puppy_waitlist
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_puppy_waitlist_email ON public.puppy_waitlist(email);
CREATE INDEX idx_puppy_waitlist_created_at ON public.puppy_waitlist(created_at DESC);