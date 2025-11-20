"use server";

import { TimeRepository } from "@/repository";
import { revalidatePath } from "next/cache";

export const actionTime = async ({
  minutes,
  month,
  userId,
  year,
}: {
  userId: string;
  minutes: number;
  year: number;
  month: number;
}) => {
  const respo = await TimeRepository.addTime({
    userId,
    minutes,
    year,
    month,
  });

  if (respo.status === 201 || respo.status === 200 || respo.status === 204) {
    revalidatePath("/");
  }
  return respo.status === 201 || respo.status === 200 || respo.status === 204;
};
