"use client";

import { useEffect } from "react";
import { getTelegramWebApp } from "@/lib/telegram";

// Telegram держит мини-апп под заглушкой, пока приложение не сообщит ready().
// expand() разворачивает окно на всю доступную высоту — без него апп остаётся
// в половину экрана и нижние кнопки уходят за край.
export function TelegramInit() {
  useEffect(() => {
    const webApp = getTelegramWebApp();
    if (!webApp) return;

    webApp.ready();
    webApp.expand();
  }, []);

  return null;
}
