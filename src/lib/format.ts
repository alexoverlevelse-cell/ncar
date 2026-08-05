import { siteConfig } from "./site-config";

const numberFormatter = new Intl.NumberFormat("ru-RU");

export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

export function formatPrice(value: number): string {
  return `${numberFormatter.format(value)} ${siteConfig.currencyLabel}`;
}

export function formatMileage(value: number | null): string | null {
  return value == null ? null : `${numberFormatter.format(value)} км`;
}
