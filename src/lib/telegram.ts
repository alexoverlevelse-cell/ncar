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
  showConfirm?: (message: string, callback: (confirmed: boolean) => void) => void;
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

export const INIT_DATA_HEADER = "x-telegram-init-data";

// Запрос к нашему API с подписанным initData. Сервер по нему проверяет права.
export async function apiFetch(
  path: string,
  options: { method?: string; body?: unknown } = {}
): Promise<{ ok: true; data: unknown } | { ok: false; error: string }> {
  const initData = getInitData();
  if (!initData) {
    return {
      ok: false,
      error: "Откройте приложение внутри Telegram — иначе вход не подтвердить",
    };
  }

  try {
    const response = await fetch(path, {
      method: options.method ?? "GET",
      headers: {
        [INIT_DATA_HEADER]: initData,
        ...(options.body !== undefined ? { "Content-Type": "application/json" } : {}),
      },
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const message =
        typeof data === "object" && data !== null && "error" in data
          ? String((data as { error: unknown }).error)
          : "Что-то пошло не так";
      return { ok: false, error: message };
    }

    return { ok: true, data };
  } catch {
    return { ok: false, error: "Нет связи с сервером" };
  }
}

// Подтверждение опасного действия: родное окно Telegram, если доступно.
export function confirmAction(message: string): Promise<boolean> {
  const webApp = getTelegramWebApp();
  if (webApp?.showConfirm) {
    return new Promise((resolve) => webApp.showConfirm!(message, resolve));
  }
  return Promise.resolve(window.confirm(message));
}
