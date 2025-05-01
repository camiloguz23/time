"use server";

import { SupabaseServer } from "@/lib/supabase/server-supabase";

export const logoutAction = async () => {
  const supabase = await SupabaseServer();
  await supabase.auth.signOut();
};
