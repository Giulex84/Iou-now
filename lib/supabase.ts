import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rzuqmabjuululhhnnhagh.supabase.co";
const supabaseAnonKey = "sb_publishable_VBZXwIi_8YCEYO8i1OZalA_FBJ6SE4S";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
