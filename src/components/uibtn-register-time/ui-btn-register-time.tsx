"use client";

import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";
import style from "./btn-register-time.module.css";
import { differenceInMinutes } from "date-fns";
import { actionTime } from "./action-time";

interface Props {
  userId: string;
}

export function UiBtnRegisterTime({ userId }: Props) {
  const storage = useLocalStorage();

  const onRegisterTime = async () => {
    if (!storage.value) {
      storage.setStorage("time", `${new Date()}`);
      return;
    }
    const makeMinutes = differenceInMinutes(
      new Date(),
      new Date(storage.value)
    );
    const month = new Date().getMonth();
    const year = new Date().getFullYear();

    const isSaveDb = await actionTime({
      userId,
      minutes: makeMinutes,
      year,
      month,
    });

    if (!isSaveDb) {
      return;
    }
    storage.setStorage("time", "");
  };

  useEffect(() => {
    storage.getStorage("time");
  }, []);

  return (
    <Button className={style.btn_register_time} onClick={onRegisterTime}>
      {"Iniciar tiempo"}
    </Button>
  );
}

