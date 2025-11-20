"use server";

import { cookies } from "next/headers";

export const ActionCookies = async (name: string, value: string) => {
    const cookieStore = await cookies();

    cookieStore.set(name, value, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
    });
}

export const ActionCookiesGet = async (name: string) => {
    const cookieStore = await cookies();
    return cookieStore.get(name)?.value;
}
