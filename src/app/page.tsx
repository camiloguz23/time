import { SupabaseServer } from "@/lib/supabase/server-supabase";
import { redirect } from "next/navigation";
import { use } from "react";

export default function Home() {
  const supabase = use(SupabaseServer())
  const { data: { user } } = use(supabase.auth.getUser())

  if (!user) {
    redirect("/login");
  }
  return <></>;
}
