"use server";

import { TimeRepository } from "@/repository";

export const actionTime = async ({minutes,month,userId,year}: {
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

  console.log("resp", respo.status);
  return respo.status === 201 || respo.status === 200 || respo.status === 204;
};
