import "server-only";
import { NextResponse } from "next/server";

// Вебхук самого Telegram-бота (не Mini App). Отвечает на /start картинкой
// и короткой инструкцией по открытию Mini App.

const CAPTION = [
  "Як відкрити застосунок?",
  "",
  "1️⃣ Знайдіть кнопку меню внизу ліворуч.",
  "2️⃣ Натисніть «Відкрити».",
  "3️⃣ Оберіть авто або послугу.",
].join("\n");

function siteUrl(request: Request): string {
  // NEXT_PUBLIC_SITE_URL задаётся в проде; локально/в предпросмотре берём
  // адрес из самого запроса.
  return process.env.NEXT_PUBLIC_SITE_URL ?? new URL(request.url).origin;
}

async function sendStartPhoto(chatId: number, request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    console.error("Нет TELEGRAM_BOT_TOKEN — вебхук не может отвечать боту");
    return;
  }

  const photoUrl = `${siteUrl(request)}/bot/open-app-guide.png`;

  const response = await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      photo: photoUrl,
      caption: CAPTION,
    }),
  });

  if (!response.ok) {
    console.error("sendPhoto не удался:", await response.text().catch(() => ""));
  }
}

export async function POST(request: Request) {
  // Секрет проверяем, только если он задан — так вебхук можно подключить
  // и без него на первое время, но с ним безопаснее (см. setWebhook secret_token).
  const expectedSecret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (expectedSecret) {
    const receivedSecret = request.headers.get("x-telegram-bot-api-secret-token");
    if (receivedSecret !== expectedSecret) {
      return NextResponse.json({ error: "Bad secret" }, { status: 401 });
    }
  }

  let update: unknown;
  try {
    update = await request.json();
  } catch {
    return NextResponse.json({ ok: true }); // отвечаем 200, чтобы Telegram не долбил повторами
  }

  const message = (update as { message?: { text?: string; chat?: { id?: number } } })
    ?.message;
  const text = message?.text?.trim();
  const chatId = message?.chat?.id;

  if (chatId && text && text.startsWith("/start")) {
    // Не блокируем ответ Telegram ожиданием отправки — но и не теряем ошибку.
    await sendStartPhoto(chatId, request);
  }

  return NextResponse.json({ ok: true });
}
