import "server-only";
import { createHmac } from "crypto";
import { supabaseAdmin } from "./supabase-admin";

interface TelegramUser {
  id: number;
  first_name: string;
  username?: string;
}

const botToken = process.env.TELEGRAM_BOT_TOKEN;

// Проверяет подпись initData по алгоритму Telegram и возвращает данные
// пользователя, если подпись верна. См.
// https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app
export function verifyTelegramInitData(initData: string): TelegramUser | null {
  if (!botToken) {
    throw new Error("Missing TELEGRAM_BOT_TOKEN env var");
  }

  const params = new URLSearchParams(initData);
  const hash = params.get("hash");
  if (!hash) return null;
  params.delete("hash");

  const dataCheckString = [...params.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");

  const secretKey = createHmac("sha256", "WebAppData").update(botToken).digest();
  const computedHash = createHmac("sha256", secretKey)
    .update(dataCheckString)
    .digest("hex");

  if (computedHash !== hash) return null;

  const userRaw = params.get("user");
  if (!userRaw) return null;

  return JSON.parse(userRaw) as TelegramUser;
}

// Проверяет, что telegram_id есть в allowed_publishers и активен там.
// Единственный источник правды по правам на публикацию — эта таблица,
// проверка идёт на сервере, а не по факту наличия кнопки в интерфейсе.
export async function isAllowedPublisher(telegramId: number): Promise<boolean> {
  const { data, error } = await supabaseAdmin
    .from("allowed_publishers")
    .select("is_active")
    .eq("telegram_id", telegramId)
    .maybeSingle();

  if (error || !data) return false;
  return data.is_active;
}
