INSERT INTO public.wws_profiles (id, role)
VALUES ('94c3e97e-417c-4fa7-9727-c82e7da26274', 'admin')
ON CONFLICT (id) DO UPDATE SET role = 'admin', updated_at = now();