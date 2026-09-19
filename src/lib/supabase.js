import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ AVISO: As variáveis de ambiente do Supabase não estão definidas no build.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');
