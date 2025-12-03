import { createClient } from '@supabase/supabase-js';

// Queste variabili sono lette da Vercel/process.env
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Mancano le variabili d\'ambiente Supabase.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
