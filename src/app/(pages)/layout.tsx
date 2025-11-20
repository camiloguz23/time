import { SupabaseServer } from "@/lib/supabase/server-supabase";
import React, { use } from "react";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const supabase = use(SupabaseServer());
  const {
    data: { user },
  } = use(supabase.auth.getUser());
  if (!user?.id) {
    //redirect("/login");
  }
  return (
    <main className="mt-26">
      {/*<UiHeader userId={user?.id ?? ""} />*/}
      {children}
    </main>
  );
}
