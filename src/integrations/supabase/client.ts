import { createClient } from '@supabase/supabase-js';

// Read from either VITE_PUBLIC_* (native Vite) or NEXT_PUBLIC_* (spec alias).
// Falls back to known project URL/anon key so the client never crashes if
// env wiring is missed locally.
const SUPABASE_URL =
  import.meta.env.VITE_PUBLIC_SUPABASE_URL ??
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL ??
  import.meta.env.VITE_SUPABASE_URL ??
  'https://ebjzdcnphkfpxfldnatm.supabase.co';

const SUPABASE_ANON_KEY =
  import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY ??
  import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ??
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVianpkY25waGtmcHhmbGRuYXRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3NjcwMzIsImV4cCI6MjA4NzM0MzAzMn0.N-fK-ol2a4zMfMBfuSWLj5vbkdG4yF5Q87Tklrplgf8';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// Table names — all WWS tables are prefixed with `wws_` so they coexist
// with other apps sharing this Supabase project.
export const T = {
  puppies: 'wws_puppies',
  leads: 'wws_leads',
  reservations: 'wws_reservations',
  profiles: 'wws_profiles',
  portalUpdates: 'wws_portal_updates',
  messages: 'wws_messages',
  alumniPosts: 'wws_alumni_posts',
  dogProfiles: 'wws_dog_profiles',
  resources: 'wws_resources',
} as const;

export const STORAGE_BUCKET = 'wws-media';
