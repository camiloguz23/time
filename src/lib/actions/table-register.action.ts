"use server";

import { TimeRepository } from "@/repository";


export const tableRegisterAction = async ({userId}: {userId: string}) => {
  const respo = await TimeRepository.getTimeMonth({userId});

  return respo;
}