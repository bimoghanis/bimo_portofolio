import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://YOUR-PROJECT-URL.supabase.co";
const supabaseKey = "YOUR-ANON-PUBLIC-KEY";
export const supabase = createClient(supabaseUrl, supabaseKey);
