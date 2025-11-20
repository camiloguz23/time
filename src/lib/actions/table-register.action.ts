"use server";

import { TimeRepository } from "@/repository";
import { revalidatePath } from "next/cache";

export const tableRegisterAction = async ({ userId }: { userId: string }) => {
  const respo = await TimeRepository.getTimeMonth({ userId });

  return respo;
};

export const addHoursAction = async ({
  userId,
  year,
  month,
  minutes,
}: {
  userId: string;
  year: number;
  month: number;
  minutes: number;
}) => {
  const respo = await TimeRepository.AddHours({ userId, year, month, minutes });
  if (respo.status === 201 || respo.status === 200 || respo.status === 204) {
    revalidatePath("/");
  }

  return respo;
};
