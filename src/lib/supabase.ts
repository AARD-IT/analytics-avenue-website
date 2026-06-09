import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export async function signInWithPassword(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signOutUser() {
  return supabase.auth.signOut();
}

export async function getSession() {
  return supabase.auth.getSession();
}

export async function getUser() {
  return supabase.auth.getUser();
}
