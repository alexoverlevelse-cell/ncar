// Данные компании. Контакты пока не подтверждены владельцем — оставлены
// пустыми, интерфейс корректно работает без них (см. TODO ниже).
export const siteConfig = {
  companyName: "NordCar",
  tagline: "Автомобили, которым можно доверять",
  location: "Дания",
  locationIn: "Дании", // предложный падеж: "автомобили в Дании"
  currencyLabel: "DKK",

  telegramContact: "", // TODO: https://t.me/username продавца
  phone: "", // TODO
  address: "", // TODO
  workingHours: "", // TODO
};

// Ссылка на диалог в Telegram с заранее подставленным текстом, чтобы продавец
// сразу видел, о какой машине или услуге речь (см. правило в CLAUDE.md).
export function buildTelegramLink(message: string): string | null {
  return buildContactLink(siteConfig.telegramContact, message);
}

// Контакт может быть задан как ссылка t.me, @username или телефон —
// приводим к рабочей ссылке. Текст подставляется только для Telegram.
export function buildContactLink(
  contact: string,
  message: string
): string | null {
  const value = contact.trim();
  if (!value) return null;

  if (value.startsWith("@")) {
    return `https://t.me/${value.slice(1)}?text=${encodeURIComponent(message)}`;
  }
  if (value.includes("t.me/")) {
    const url = value.startsWith("http") ? value : `https://${value}`;
    return `${url}?text=${encodeURIComponent(message)}`;
  }
  if (/^[+\d][\d\s()-]{4,}$/.test(value)) {
    return `tel:${value.replace(/\s/g, "")}`;
  }
  return value.startsWith("http") ? value : null;
}
