import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

// Validação de segurança para evitar o crash (HTTP 500) se as variáveis falharem no arranque do Worker
const safeUrl = (supabaseUrl && supabaseUrl.startsWith('http')) 
  ? supabaseUrl 
  : 'https://feirasefestas.supabase.co';

const safeKey = supabaseAnonKey || 'dummy-key-for-worker-boot';

export const supabase = createClient(safeUrl, safeKey, {
  auth: {
    persistSession: typeof window !== 'undefined', // Ativa persistência apenas no navegador
  }
});
