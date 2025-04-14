import type { SupabaseClient, User } from '@supabase/supabase-js'
import { Database } from '../types/database.types';
import { SupabaseServer } from './server-supabase';

class SupabaseSingleton {
  private static instance: SupabaseSingleton | null = null
  private supabase!: SupabaseClient<Database> // asegúrate que se inicialice antes de usarla

  private constructor() {}

  public static async getInstance(): Promise<SupabaseSingleton> {
    if (!SupabaseSingleton.instance) {
      const singleton = new SupabaseSingleton()
      singleton.supabase = await SupabaseServer() // aquí inicializamos el cliente asíncrono
      SupabaseSingleton.instance = singleton
    }
    return SupabaseSingleton.instance
  }

  public getClient(): SupabaseClient<Database> {
    return this.supabase
  }

  public async getUser (): Promise<User | null> {
    const {
        data: { user },
      } = await this.supabase.auth.getUser()
    return user
  }
}

export const supabaseInstance = SupabaseSingleton.getInstance()