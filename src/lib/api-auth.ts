import "server-only";
import { NextResponse } from "next/server";
import {
  authenticate,
  isTelegramAuthConfigured,
  type AuthResult,
} from "./telegram-auth";
import { getSupabaseAdmin } from "./supabase-admin";
import type { SupabaseClient } from "@supabase/supabase-js";

// initData передаём заголовком, а не в теле — так один и тот же способ
// работает и для GET/DELETE, где тела нет.
export const INIT_DATA_HEADER = "x-telegram-init-data";

export async function readInitData(request: Request): Promise<string | null> {
  return request.headers.get(INIT_DATA_HEADER);
}

type Guard =
  | { ok: true; auth: AuthResult; supabase: SupabaseClient }
  | { ok: false; response: NextResponse };

// Общая проверка для всех роутов записи: подпись Telegram + роль + наличие базы.
export async function requireAdmin(request: Request): Promise<Guard> {
  if (!isTelegramAuthConfigured()) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "На сервері не задано TELEGRAM_BOT_TOKEN — підтвердити вхід нічим" },
        { status: 503 }
      ),
    };
  }

  const auth = await authenticate(await readInitData(request));

  if (!auth) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Не вдалося підтвердити вхід через Telegram" },
        { status: 401 }
      ),
    };
  }

  if (auth.role !== "admin") {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Недостатньо прав" },
        { status: 403 }
      ),
    };
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Базу даних не підключено — зберігати поки що нікуди" },
        { status: 503 }
      ),
    };
  }

  return { ok: true, auth, supabase };
}
