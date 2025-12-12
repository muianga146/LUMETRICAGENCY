import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://juetbivsjekjrsmawcjv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1ZXRiaXZzamVranJzbWF3Y2p2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4Nzg2MTgsImV4cCI6MjA4MDQ1NDYxOH0.qQW2kbAGVsd3BoSbkYmmmh9XkfszdkhKJyIcjLNqtqE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);