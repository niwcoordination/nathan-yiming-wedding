import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl: string = 'https://wnbfcaofzldqhjojcbwr.supabase.co';
const supabaseKey: string = 'sb_publishable_e2Sy7irRH3Ai01dwDUSTEg_VtyM4QRh';

// Instead of a single static client, export a function that builds a fresh configuration on demand
export function getSupabaseClient(userHash?: string): SupabaseClient {
  return createClient(supabaseUrl, supabaseKey, {
    global: {
      // If a hash is provided, include it. If not (logged out), the headers object is empty.
      headers: userHash ? { 'x-user-id': userHash } : {},
    },
  });
}

// Keep this as a default fallback for areas of your app that don't require the RLS search headers
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);
export default supabase;
