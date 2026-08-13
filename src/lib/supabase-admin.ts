import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null | undefined;

// Серверный клиент с полным доступом к базе (обходит RLS).
// НИКОГДА не импортировать из клиентских компонентов.
// Возвращает null, если Supabase ещё не настроен — вызывающий код должен
// корректно сообщить, что запись пока недоступна.
export function getSupabaseAdmin(): SupabaseClient | null {
  if (cached !== undefined) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  cached = url && serviceRoleKey ? createClient(url, serviceRoleKey) : null;
  return cached;
}
