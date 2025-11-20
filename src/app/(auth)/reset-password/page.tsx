import React, { use } from "react";
import { ResetPassword } from "./reset-password";
import { ActionCookiesGet } from "@/lib/actions/cookies.action";

interface Props {
  searchParams: Promise<{ code: string | undefined }>;
}

export default function Page({ searchParams }: Props) {
  const params = use(searchParams);
  const code = use(ActionCookiesGet("code"));
  return <ResetPassword code={params.code ?? code ?? ""} />;
}
