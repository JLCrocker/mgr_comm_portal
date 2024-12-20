import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qmmrarukbpskrfyinvmp.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtbXJhcnVrYnBza3JmeWludm1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQzMjAxNTQsImV4cCI6MjA0OTg5NjE1NH0.ynWZjuHpISNtMp-W8yb7rP-ppdDtEAkFr4KJTcBlRQ0';
// const supabaseKey = import.meta.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// export const channel = supabase
//   .channel('table_db_changes')
//   .on(
//     'postgres_changes',
//     {
//       event: '*',
//       schema: 'public',
//       table: 'tasks',
//     },
//     (payload) => console.log('Change Received', payload)
//   )
//   .subscribe();

export default supabase;
