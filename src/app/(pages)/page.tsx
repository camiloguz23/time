import { UiBtnRegisterTime } from "@/components/uibtn-register-time/ui-btn-register-time";
import { SupabaseServer } from "@/lib/supabase/server-supabase";
import { use } from "react";
import Styles from "./home.module.css";

export default function Home() {
  const supabase = use(SupabaseServer());
  const {
    data: { user },
  } = use(supabase.auth.getUser());

  return (
    <main className={Styles.main_home}>
      <UiBtnRegisterTime userId={user?.id ?? ""} />
    </main>
  );
}
