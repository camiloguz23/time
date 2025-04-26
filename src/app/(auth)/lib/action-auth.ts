"use server";

import { StateInitTypeAuth } from "@/lib/types/auth.type";
import { AuthService } from "./services/auth-services";

export const ActionRegister = async (stateOld: StateInitTypeAuth,data: FormData): Promise<StateInitTypeAuth> => {
    const email = data.get("email")?.toString().trim() || "";
    const password = data.get("password")?.toString().trim() || "";

    if (!email.includes("@") || !password) {
        return {
            status: false,
            message: {
                email: email.includes("@") ? "" : "Email is required",
                password: password ? "" : "Password is required",
                messageDB: ""
            }
        }
    }

    const isRegister = await AuthService.register({
        email,
        password
    })

    return isRegister
};


export const ActionLogin = async (stateOld: StateInitTypeAuth,data: FormData): Promise<StateInitTypeAuth> => {
    const email = data.get("email")?.toString().trim() || "";
    const password = data.get("password")?.toString().trim() || "";

    if (!email.includes("@") || !password) {
        return {
            status: false,
            message: {
                email: email.includes("@") ? "" : "Email is required",
                password: password ? "" : "Password is required",
                messageDB: ""
            }
        }
    }

    const isLogin = await AuthService.login({
        email,
        password
    })

    return isLogin
};