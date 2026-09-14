"use client";

import { TelegramIcon } from "./icons";
import { buildTelegramLink } from "@/lib/site-config";

// Плавающая кнопка связи вместо нижней навигации. Переходы на /cars и
// /services теперь идут через главное меню (/home), а не через панель.
export function ContactFab() {
  const href = buildTelegramLink("Добрий день! Маю запитання.");
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-20 flex items-center gap-2 rounded-full bg-[#229ED9] px-4 py-3 text-sm font-medium text-white shadow-lg shadow-black/30"
    >
      <TelegramIcon className="h-5 w-5" />
      Зв&rsquo;язок
    </a>
  );
}
