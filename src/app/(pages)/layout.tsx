import { SupabaseServer } from "@/lib/supabase/server-supabase";
import { redirect } from "next/navigation";
import React, { use } from "react";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const supabase = use(SupabaseServer());
  const {
    data: { user },
  } = use(supabase.auth.getUser());

  if (!user) {
    redirect("/login");
  }
  return <>{children}</>;
}
