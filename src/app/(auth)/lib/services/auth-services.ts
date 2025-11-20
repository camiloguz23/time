import { SupabaseServer } from "@/lib/supabase/server-supabase";
import { Login, Register, StateInitTypeAuth } from "@/lib/types/auth.type";

export class AuthService {
  static async login(info: Login) {
    const supabaseDB = await SupabaseServer();

    const { error } = await supabaseDB.auth.signInWithPassword({
      email: info.email,
      password: info.password,
    });

    return {
      status: !error?.message,
      message: {
        email: "",
        password: "",
        messageDB: error?.message ?? "",
      },
    };
  }

  static async recoverPassword(email: string) {
    const supabaseDB = await SupabaseServer();

    const { error } = await supabaseDB.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/reset-password",
    });

    return {
      status: !error?.message,
      message: error?.message ?? "Se ha enviado un correo de recuperación",
    };
  }

  static async register(info: Register): Promise<StateInitTypeAuth> {
    const supabaseDB = await SupabaseServer();

    const { error } = await supabaseDB.auth.signUp({
      email: info.email,
      password: info.password,
      options: {
        emailRedirectTo: "http://localhost:3000",
      },
    });

    return {
      status: !error?.message,
      message: {
        email: "",
        password: "",
        messageDB: error?.message ?? "",
      },
      inputs:{
        email:"",
        password:"",
        confirmPassword:""
      }
    };
  }
}
