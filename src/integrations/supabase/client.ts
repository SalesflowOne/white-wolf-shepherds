import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_PUBLIC_SUPABASE_URL ?? import.meta.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://ebjzdcnphkfpxfldnatm.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY ?? import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVianpkY25waGtmcHhmbGRuYXRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3NjcwMzIsImV4cCI6MjA4NzM0MzAzMn0.N-fK-ol2a4zMfMBfuSWLj5vbkdG4yF5Q87Tklrplgf8";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);