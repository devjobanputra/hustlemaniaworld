import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('⚠️ Supabase environment variables are missing. Client initialization failed.');
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = createClient();
