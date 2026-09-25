// Язык интерфейса. Выбор человек делает на входном экране и он хранится в
// cookie: серверные страницы читают её через getLang() в i18n-server.ts,
// клиентские — через useLang(). Так язык доступен везде без переноса
// всех страниц на клиент.

export type Lang = "uk" | "en";

export const LANG_COOKIE = "lang";

// Год: выбор языка не должен слетать между визитами.
export const LANG_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function normalizeLang(value: string | null | undefined): Lang {
  return value === "en" ? "en" : "uk";
}

// Текст, у которого есть версия на каждом языке.
export type Localized = { uk: string; en: string };

export function pick(value: Localized, lang: Lang): string {
  return value[lang];
}
