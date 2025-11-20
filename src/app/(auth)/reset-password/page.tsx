import React, { use } from 'react';
import { ResetPassword } from './reset-password';
import { ActionCookiesGet } from '@/lib/actions/cookies.action';

interface Props {
  searchParams: Promise<{ code: string | undefined }>;
}

export default function Page ({searchParams}: Props) {
  const params = use(searchParams);
  const code = use(ActionCookiesGet("code"));
   console.log("code",code);
   console.log("params",params);
  return (
    <ResetPassword code={params.code ?? code ?? ""} />
  );
};
