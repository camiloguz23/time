"use server";

import { PasswordRecovery, StateInitTypeAuth } from "@/lib/types/auth.type";
import { AuthService } from "./services/auth-services";
import { redirect } from "next/navigation";
import { SupabaseServer } from "@/lib/supabase/server-supabase";

export const ActionRegister = async (
  stateOld: StateInitTypeAuth,
  data: FormData
): Promise<StateInitTypeAuth> => {
  const email = data.get("email")?.toString().trim() || "";
  const password = data.get("password")?.toString().trim() || "";
  const confirmPassword = data.get("confirmPassword")?.toString().trim() || "";

  // Validación de email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return {
      status: false,
      message: {
        email: "Email no válido",
        password: "",
        messageDB: "",
      },
      inputs: {
        email,
        password,
        confirmPassword,
      },
    };
  }

  // Validación de contraseña
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!password) {
    return {
      status: false,
      message: {
        email: "",
        password: "Contraseña es requerida",
        messageDB: "",
      },
      inputs: {
        email,
        password,
        confirmPassword,
      },
    };
  }

  // Validación de requisitos de contraseña
  if (!passwordRegex.test(password)) {
    return {
      status: false,
      message: {
        email: "",
        password:
          "La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, números y caracteres especiales (@$!%*?&)",
        messageDB: "",
      },
      inputs: {
        email,
        password,
        confirmPassword,
      },
    };
  }

  // Validación de confirmación de contraseña
  if (password !== confirmPassword) {
    return {
      status: false,
      message: {
        email: "",
        password: "",
        messageDB: "Las contraseñas no coinciden",
      },
      inputs: {
        email,
        password,
        confirmPassword,
      },
    };
  }

  const isRegister = await AuthService.register({
    email,
    password,
  });

  if (isRegister.status) {
    redirect("/");
  }

  return {
    ...isRegister,
    inputs: {
      email: isRegister.status ? "" : email,
      password: isRegister.status ? "" : password,
      confirmPassword: isRegister.status ? "" : confirmPassword,
    },
  };
};

export const ActionLogin = async (
  stateOld: StateInitTypeAuth,
  data: FormData
): Promise<StateInitTypeAuth> => {
  const email = data.get("email")?.toString().trim() || "";
  const password = data.get("password")?.toString().trim() || "";

  if (!email.includes("@") || !password) {
    return {
      status: false,
      message: {
        email: email.includes("@") ? "" : "Email is required",
        password: password ? "" : "Password is required",
        messageDB: "",
      },
      inputs: {
        email,
        password,
        confirmPassword: "",
      },
    };
  }

  const isLogin = await AuthService.login({
    email,
    password,
  });

  if (isLogin.status) {
    redirect("/");
  }

  return {
    ...isLogin,
    inputs: {
      email: isLogin.status ? "" : email,
      password: isLogin.status ? "" : password,
      confirmPassword: "",
    },
  };
};

export const ActionRecoverPassword = async ({ email }: PasswordRecovery) => {
  const isRecoverPassword = await AuthService.recoverPassword(email);
  return isRecoverPassword;
};

export const ActionResetPassword = async ({ code }: { code: string }) => {
  const supabase = await SupabaseServer();
  const { error } = await supabase.auth.updateUser({
    password: code,
  });

  return {
    status: !error?.message,
    message: error?.message ?? "",
  };
};
