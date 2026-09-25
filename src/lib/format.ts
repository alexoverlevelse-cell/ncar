import { dict } from "./dictionary";
import type { Lang } from "./i18n";
import { siteConfig } from "./site-config";

const numberFormatter = new Intl.NumberFormat("uk-UA");

export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

// Язык по умолчанию украинский: админка его не передаёт и остаётся украинской.
export function formatPrice(value: number, lang: Lang = "uk"): string {
  if (value <= 0) return dict(lang).format.priceOnRequest;
  return `${numberFormatter.format(value)} ${siteConfig.currencyLabel}`;
}

export function formatMileage(value: number | null, lang: Lang = "uk"): string | null {
  return value == null ? null : `${numberFormatter.format(value)} ${dict(lang).format.km}`;
}
