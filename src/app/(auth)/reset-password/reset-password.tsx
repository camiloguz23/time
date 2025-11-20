"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { SupabaseClient } from "@/lib/supabase/client-supabase";

interface Props {
  code: string;
}

export function ResetPassword({ code }: Props) {
  const [sessionReady, setSessionReady] = useState(false);
  const [password, setPassword] = useState("");
  useEffect(() => {
    const supabase = SupabaseClient();
    if (!code) {
      return;
    }

    supabase.auth
      .verifyOtp({
        type: "recovery",
        token: code,
        email: "jeysonkmguzman@gmail.com",
      })
      .then(({ error }) => {
        if (!error) {
          setSessionReady(true);
        }
      });
  }, [code]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = SupabaseClient();
    const { error } = await supabase.auth.updateUser({
      password: password,
    });
    if (!error) {
      setPassword("");
    }
  };
  return (
    <div className="flex items-center justify-center h-screen flex-col gap-4">
      <div className="flex flex-col gap-4 w-[300px]">
        <h1>Restablecer contraseña</h1>
        {sessionReady && (
          <Input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingrese nuevo password"
          />
        )}
        <Button onClick={handleSubmit} variant="default">
          Restablecer contraseña
        </Button>
      </div>
    </div>
  );
}
