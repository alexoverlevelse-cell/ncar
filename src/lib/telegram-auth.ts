import "server-only";
import { createHmac, timingSafeEqual } from "crypto";
import { getSupabaseAdmin } from "./supabase-admin";

export interface TelegramUser {
  id: number;
  first_name: string;
  username?: string;
}

export type Role = "admin" | "publisher" | "viewer";

export interface AuthResult {
  user: TelegramUser;
  role: Role;
}

// initData считается протухшей через сутки — защита от повторного использования
// перехваченной строки.
const MAX_AUTH_AGE_SECONDS = 60 * 60 * 24;

// Проверяет подпись initData по алгоритму Telegram и возвращает данные
// пользователя, если подпись верна. См.
// https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app
export function verifyTelegramInitData(initData: string): TelegramUser | null {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  if (!botToken) throw new Error("Missing TELEGRAM_BOT_TOKEN env var");

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

  const expected = Buffer.from(computedHash, "hex");
  const received = Buffer.from(hash, "hex");
  if (expected.length !== received.length) return null;
  if (!timingSafeEqual(expected, received)) return null;

  const authDate = Number(params.get("auth_date"));
  if (!authDate) return null;
  if (Date.now() / 1000 - authDate > MAX_AUTH_AGE_SECONDS) return null;

  const userRaw = params.get("user");
  if (!userRaw) return null;

  try {
    return JSON.parse(userRaw) as TelegramUser;
  } catch {
    return null;
  }
}

// Админы задаются переменной окружения (работает даже до подключения базы)
// и/или флагом is_admin в allowed_publishers.
function adminIdsFromEnv(): number[] {
  return (process.env.ADMIN_TELEGRAM_IDS ?? "")
    .split(",")
    .map((id) => Number(id.trim()))
    .filter((id) => Number.isFinite(id) && id > 0);
}

export async function resolveRole(telegramId: number): Promise<Role> {
  if (adminIdsFromEnv().includes(telegramId)) return "admin";

  const supabase = getSupabaseAdmin();
  if (!supabase) return "viewer";

  const { data, error } = await supabase
    .from("allowed_publishers")
    .select("is_active, is_admin")
    .eq("telegram_id", telegramId)
    .maybeSingle();

  if (error || !data || !data.is_active) return "viewer";
  return data.is_admin ? "admin" : "publisher";
}

// Единая точка входа для API-роутов: проверяет подпись и определяет роль.
// Возвращает null, если подпись невалидна — роут должен ответить 401.
export async function authenticate(initData: string | null): Promise<AuthResult | null> {
  if (!initData) return null;
  const user = verifyTelegramInitData(initData);
  if (!user) return null;
  return { user, role: await resolveRole(user.id) };
}

export async function isAllowedPublisher(telegramId: number): Promise<boolean> {
  const role = await resolveRole(telegramId);
  return role === "admin" || role === "publisher";
}
