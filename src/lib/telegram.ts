"use client";

interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    user?: {
      id: number;
      first_name: string;
      username?: string;
    };
  };
  ready: () => void;
  expand: () => void;
}

declare global {
  interface Window {
    Telegram?: { WebApp: TelegramWebApp };
  }
}

// Возвращает объект Telegram WebApp, если страница открыта внутри Telegram,
// иначе null (например, при обычном открытии в браузере во время разработки).
export function getTelegramWebApp(): TelegramWebApp | null {
  if (typeof window === "undefined") return null;
  return window.Telegram?.WebApp ?? null;
}

// initData — подписанная ботом строка, которую нужно передавать на сервер
// для проверки (см. src/lib/telegram-auth.ts). Доверять initDataUnsafe на
// клиенте нельзя — она не проверена и может быть подделана.
export function getInitData(): string | null {
  return getTelegramWebApp()?.initData || null;
}
