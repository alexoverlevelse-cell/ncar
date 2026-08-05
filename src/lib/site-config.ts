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
  if (!siteConfig.telegramContact) return null;
  return `${siteConfig.telegramContact}?text=${encodeURIComponent(message)}`;
}
