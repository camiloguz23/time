import { UiBtnRegisterTime } from "@/components/uibtn-register-time/ui-btn-register-time";
import { SupabaseServer } from "@/lib/supabase/server-supabase";
import { use } from "react";
import Styles from "./home.module.css";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { tableRegisterAction } from "@/lib/actions/table-register.action";
import { TimeHelperFormat } from "@/lib/helpers/time.helper";
import { redirect } from "next/navigation";
import { ActionCookies } from "@/lib/actions/cookies.action";

interface Props {
  searchParams: Promise<{ code: string | undefined }>;
}

export default function Home({ searchParams }: Props) {
  const supabase = use(SupabaseServer());
  const params = use(searchParams);
  const {
    data: { user },
  } = use(supabase.auth.getUser());

  if (params?.code) {
    ActionCookies("code", params.code);
    redirect("/reset-password?code=" + params.code);
  }

  const tableRegister = use(tableRegisterAction({ userId: user?.id ?? "" }));

  return (
    <main className={Styles.main_home}>
      <UiBtnRegisterTime userId={user?.id ?? ""} />
      <Table>
        <TableCaption>Horas registradas</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Mes</TableHead>
            <TableHead>Año</TableHead>
            <TableHead>Hora</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableRegister.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                {TimeHelperFormat.monthToName(item.month ?? 0)}
              </TableCell>
              <TableCell>{item.year}</TableCell>
              <TableCell>
                {TimeHelperFormat.minutesToHours(item.minutes ?? 0)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
