import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cachedClient: SupabaseClient | null | undefined;

// Возвращает клиент для чтения публичных данных (anon key, ограничен RLS).
// Возвращает null, если Supabase ещё не настроен (нет .env.local) — вызывающий
// код должен показать состояние "недоступно", а не падать.
export function getSupabaseClient(): SupabaseClient | null {
  if (cachedClient !== undefined) return cachedClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  cachedClient = url && anonKey ? createClient(url, anonKey) : null;
  return cachedClient;
}
