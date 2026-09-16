"use client";

import { useEffect } from "react";
import { getTelegramWebApp } from "@/lib/telegram";

// Лёгкая вибрация при нажатии на любую кнопку или ссылку — так мини-апп
// ощущается как нативный экран Telegram, а не как веб-страница.
//
// Слушатель один на весь документ, поэтому разметку трогать не нужно и новые
// экраны получают отклик автоматически. pointerdown (а не click) — чтобы
// отклик совпадал с моментом касания.
const INTERACTIVE = 'a, button, summary, select, [role="button"]';

export function TapFeedback() {
  useEffect(() => {
    const haptic = getTelegramWebApp()?.HapticFeedback;
    if (!haptic?.impactOccurred) return;

    function handlePointerDown(event: PointerEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const element = target.closest(INTERACTIVE);
      if (!element) return;
      if (
        element.hasAttribute("disabled") ||
        element.getAttribute("aria-disabled") === "true"
      ) {
        return;
      }

      haptic!.impactOccurred!("light");
    }

    document.addEventListener("pointerdown", handlePointerDown, { passive: true });
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return null;
}
