"use client";

import { createContext, useContext, type ReactNode } from "react";
import { LANG_COOKIE, LANG_COOKIE_MAX_AGE, type Lang } from "@/lib/i18n";

// Язык приходит из cookie, прочитанной на сервере в layout.tsx. Через контекст
// его видят клиентские компоненты — и на сервере, и после гидратации значение
// одно и то же, поэтому разметка не расходится.
const LangContext = createContext<Lang>("uk");

export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

export function useLang(): Lang {
  return useContext(LangContext);
}

// Смена языка — полная перезагрузка: серверные страницы читают cookie только
// при новом запросе, обычный переход по роутеру отдал бы старый язык.
export function chooseLang(lang: Lang, nextPath: string) {
  document.cookie = `${LANG_COOKIE}=${lang}; path=/; max-age=${LANG_COOKIE_MAX_AGE}; samesite=lax`;
  window.location.assign(nextPath);
}
