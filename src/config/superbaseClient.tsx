import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl: string = 'https://wnbfcaofzldqhjojcbwr.supabase.co';
const supabaseKey: string = 'sb_publishable_e2Sy7irRH3Ai01dwDUSTEg_VtyM4QRh';

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export default supabase;