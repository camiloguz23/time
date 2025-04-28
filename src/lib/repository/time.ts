import { SupabaseServer } from "../supabase/server-supabase";

export class TimeRepository {
  static async getTimeMonth({ userId }: { userId: string }) {
    const supabase = await SupabaseServer();

    const { data, error } = await supabase
      .from("register")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  static async addTime({
    userId,
    minutes,
    year,
    month,
  }: {
    userId: string;
    minutes: number;
    year: number;
    month: number;
  }) {
    const supabase = await SupabaseServer();

    const { data: monthDB } = await supabase
      .from("register")
      .select("*")
      .eq("user", userId)
      .eq("year", year)
      .eq("month", month)
      .single();

    if (monthDB?.minutes) {
      const updDate = await supabase
        .from("register")
        .update({
          minutes: monthDB.minutes + minutes,
        })
        .eq("id", monthDB.id);
      return updDate;
    } else {
      const insert = await supabase.from("register").insert({
        user: userId,
        minutes,
        year,
        month,
      });

      return insert;
    }
  }
}
