// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://nqdtgjqxgjgtfdtpgvhn.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xZHRnanF4Z2pndGZkdHBndmhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzOTMxOTEsImV4cCI6MjA1Nzk2OTE5MX0.Hg6VrxdAoie9GdaBMmuTd4C3qOiDqhj11ZoKwSOzZoM";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);