import "server-only";
import { cookies } from "next/headers";
import { LANG_COOKIE, normalizeLang, type Lang } from "./i18n";

// Язык для серверных страниц. Отдельный файл, потому что next/headers нельзя
// импортировать в клиентские компоненты.
export async function getLang(): Promise<Lang> {
  const store = await cookies();
  return normalizeLang(store.get(LANG_COOKIE)?.value);
}
