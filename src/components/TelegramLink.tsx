"use client";

import type { MouseEvent, ReactNode } from "react";
import { openTelegramLink } from "@/lib/telegram";

// Ссылка на диалог с Олегом. Внутри Telegram переход отдаём родному методу
// (см. openTelegramLink), вне Telegram остаётся обычная ссылка в новой вкладке.
export function TelegramLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (openTelegramLink(href)) event.preventDefault();
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
