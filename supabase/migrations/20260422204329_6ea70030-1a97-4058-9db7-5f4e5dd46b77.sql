-- Create superadmin user ceo@salesflow.one with password EvoluTion33##
-- and assign admin role in wws_profiles.

DO $$
DECLARE
  v_user_id uuid;
  v_email text := 'ceo@salesflow.one';
  v_password text := 'EvoluTion33##';
BEGIN
  -- Check if user already exists
  SELECT id INTO v_user_id FROM auth.users WHERE lower(email) = lower(v_email) LIMIT 1;

  IF v_user_id IS NULL THEN
    v_user_id := gen_random_uuid();
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      v_user_id,
      'authenticated',
      'authenticated',
      lower(v_email),
      crypt(v_password, gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{"full_name":"Salesflow CEO"}'::jsonb,
      now(),
      now(),
      '',
      '',
      '',
      ''
    );

    INSERT INTO auth.identities (
      id,
      user_id,
      identity_data,
      provider,
      provider_id,
      last_sign_in_at,
      created_at,
      updated_at
    ) VALUES (
      gen_random_uuid(),
      v_user_id,
      jsonb_build_object('sub', v_user_id::text, 'email', lower(v_email), 'email_verified', true),
      'email',
      v_user_id::text,
      now(),
      now(),
      now()
    );
  ELSE
    -- Update password for existing user
    UPDATE auth.users
    SET encrypted_password = crypt(v_password, gen_salt('bf')),
        email_confirmed_at = COALESCE(email_confirmed_at, now()),
        updated_at = now()
    WHERE id = v_user_id;
  END IF;

  -- Upsert wws_profiles row with admin role
  INSERT INTO public.wws_profiles (id, role, updated_at)
  VALUES (v_user_id, 'admin', now())
  ON CONFLICT (id) DO UPDATE SET role = 'admin', updated_at = now();
END $$;