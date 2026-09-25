import type { Lang } from "./i18n";

// Весь текст интерфейса в двух версиях. `en` типизирован как `typeof uk`,
// поэтому забыть перевести ключ не получится — TypeScript не соберёт проект.
//
// Админка сюда не входит: её видит только Олег, она остаётся украинской.

const uk = {
  meta: {
    tagline: "Підбір, перевірка та продаж автомобілів",
  },
  common: {
    back: "Назад",
    home: "Головне меню",
    contact: "Зв’язатися",
    writeToOleh: "Написати Олегу в Telegram",
  },
  home: {
    heading: "Що вас цікавить?",
    subtitle: "Оберіть розділ",
    carsTitle: "Авто в наявності",
    carsSubtitle: "Переглянути автомобілі",
    servicesTitle: "Послуги",
    servicesSubtitle: "Підбір • Перевірка • Продаж • Сервіс",
  },
  services: {
    title: "Послуги Oleh DK Auto 🇩🇰",
    subtitle: "Оберіть потрібний розділ 👇",
    contactCta: "Зв’язатися з Oleh DK Auto",
    whatIncluded: "Що входить",
    priceLabel: "Вартість",
    expand: "Розгорнути",
    importantTitle: "ℹ️ Важлива інформація",
    importantText:
      "Детально про те, як проходить підбір і що входить у перевірку, розписано нижче. Натисніть «Розгорнути» у потрібному блоці.",
    foundCarTitle: "🔗 Вже знайшли авто?",
    foundCarText: "Надішліть посилання на автомобіль для перевірки.",
    needSearchTitle: "🎯 Потрібен підбір авто?",
    needSearchText: "Знайдемо варіант під ваш бюджет і побажання.",
    stepsTitle: "Як проходить підбір — 7 кроків",
    checksTitle: "Що перевіряється?",
    inspectionPriceTitle: "Вартість перевірки",
    priceRows: [
      ["Бензин / Дизель до 50 000 DKK", "2 500 DKK"],
      ["Бензин / Дизель від 50 000 DKK", "3 000 DKK"],
      ["Electric / Hybrid", "3 500 DKK"],
    ] as [string, string][],
    priceNoteStrong: "Ціна вказана за перевірку одного автомобіля.",
    priceNote:
      "Якщо після перевірки автомобіль не підходить і ви обираєте інший — його перевірка оплачується окремо за відповідним тарифом.",
    travelNote:
      "Доїзд: 200 DKK за кожну фактичну годину дороги туди й назад. Повна вартість погоджується до виїзду.",
  },
  cars: {
    title: "Авто в наявності",
    subtitle: "Перевірені автомобілі в Данії",
    empty: "Поки немає автомобілів у продажу.",
    placeYourCarTitle: "Тут може бути твоє авто",
    placeYourCarText: "Напишіть — оцінимо автомобіль і обговоримо продаж.",
    demoNotice: "Демонстраційні дані — для прикладу, поки не підключено базу.",
    backToList: "Назад до списку",
    photosHint: "фото · гортайте",
    description: "Опис",
    contactSeller: "Зв’язатися з продавцем",
    specs: {
      year: "Рік",
      mileage: "Пробіг",
      fuel: "Паливо",
      transmission: "Коробка передач",
      body: "Кузов",
      color: "Колір",
    },
  },
  contact: {
    title: "Продати автомобіль",
    lead:
      "Хочете продати свій автомобіль? Напишіть — обговоримо стан, оцінимо машину та домовимося про умови особисто.",
    writeTelegram: "Написати в Telegram",
    noTelegram: "Контакт у Telegram ще не вказано.",
    call: "Зателефонувати",
    contactsTitle: "Контакти",
    phone: "Телефон",
    address: "Адреса",
    hours: "Години роботи",
    region: "Регіон",
    regionValue: "Данія",
    contactsEmpty:
      "Телефон, адреса та години роботи з’являться тут, щойно власники їх підтвердять.",
  },
  request: {
    chooseTitle: "Заявка на підбір / перевірку",
    chooseSubtitle: "Оберіть ваш сценарій",
    foundTitle: "Я вже знайшов автомобіль",
    foundText:
      "Надішліть оголошення. Олег проаналізує його, зв’яжеться з продавцем і проведе перевірку.",
    searchTitle: "Мені потрібна допомога з пошуком",
    searchText:
      "Опишіть бюджет і побажання. Олег проаналізує ринок і відбере сильні варіанти.",
    formSubtitle: "Заповніть дані для Oleh DK Auto",
    titleFound: "Перевірити знайдене авто",
    titleSearch: "Підібрати автомобіль",
    titleFallback: "Заявка",
    hasLink: "Є посилання",
    noAd: "Авто без оголошення",
    chooseOption: "Оберіть варіант",
    comment: "Коментар",
    commentPlaceholder: "Додаткова інформація або побажання",
    submit: "Підготувати заявку",
    doneTitle: "Заявку підготовлено",
    doneText: "Надішліть її Олегу — текст заявки вже підставлено в повідомлення.",
    send: "Надіслати в Telegram",
    messagePrefix: "Заявка",
  },
  status: {
    draft: "Чернетка",
    available: "В наявності",
    reserved: "Заброньовано",
    sold: "Продано",
    hidden: "Приховано",
  },
  format: {
    priceOnRequest: "Ціна за запитом",
    km: "км",
  },
};

const en: typeof uk = {
  meta: {
    tagline: "Car sourcing, inspection and sales",
  },
  common: {
    back: "Back",
    home: "Main menu",
    contact: "Get in touch",
    writeToOleh: "Message Oleh on Telegram",
  },
  home: {
    heading: "What are you looking for?",
    subtitle: "Choose a section",
    carsTitle: "Cars available",
    carsSubtitle: "Browse the cars",
    servicesTitle: "Services",
    servicesSubtitle: "Sourcing • Inspection • Sale • Service",
  },
  services: {
    title: "Oleh DK Auto services 🇩🇰",
    subtitle: "Choose a section 👇",
    contactCta: "Get in touch with Oleh DK Auto",
    whatIncluded: "What's included",
    priceLabel: "Price",
    expand: "Expand",
    importantTitle: "ℹ️ Important",
    importantText:
      "How the sourcing works and what the inspection covers is explained in detail below. Tap “Expand” on the section you need.",
    foundCarTitle: "🔗 Already found a car?",
    foundCarText: "Send the link to the car and I'll inspect it.",
    needSearchTitle: "🎯 Need help finding one?",
    needSearchText: "I'll find options within your budget and wishes.",
    stepsTitle: "How sourcing works — 7 steps",
    checksTitle: "What gets checked?",
    inspectionPriceTitle: "Inspection price",
    priceRows: [
      ["Petrol / Diesel under 50,000 DKK", "2,500 DKK"],
      ["Petrol / Diesel over 50,000 DKK", "3,000 DKK"],
      ["Electric / Hybrid", "3,500 DKK"],
    ] as [string, string][],
    priceNoteStrong: "The price covers the inspection of one car.",
    priceNote:
      "If the car turns out not to suit you and you pick another one, its inspection is paid separately at the matching rate.",
    travelNote:
      "Travel: 200 DKK per actual hour on the road there and back. The full price is agreed before the trip.",
  },
  cars: {
    title: "Cars available",
    subtitle: "Inspected cars in Denmark",
    empty: "No cars for sale at the moment.",
    placeYourCarTitle: "Your car could be here",
    placeYourCarText: "Message me — I'll value your car and we'll discuss the sale.",
    demoNotice: "Demo data — shown as an example until the database is connected.",
    backToList: "Back to the list",
    photosHint: "photos · swipe",
    description: "Description",
    contactSeller: "Contact the seller",
    specs: {
      year: "Year",
      mileage: "Mileage",
      fuel: "Fuel",
      transmission: "Gearbox",
      body: "Body type",
      color: "Colour",
    },
  },
  contact: {
    title: "Sell your car",
    lead:
      "Want to sell your car? Message me — we'll go through its condition, value it and agree the terms personally.",
    writeTelegram: "Message on Telegram",
    noTelegram: "No Telegram contact has been added yet.",
    call: "Call",
    contactsTitle: "Contacts",
    phone: "Phone",
    address: "Address",
    hours: "Opening hours",
    region: "Region",
    regionValue: "Denmark",
    contactsEmpty:
      "Phone, address and opening hours will appear here once the owner confirms them.",
  },
  request: {
    chooseTitle: "Sourcing / inspection request",
    chooseSubtitle: "Choose your situation",
    foundTitle: "I've already found a car",
    foundText:
      "Send the listing. Oleh will go through it, contact the seller and inspect the car.",
    searchTitle: "I need help finding one",
    searchText:
      "Describe your budget and wishes. Oleh will study the market and shortlist the strong options.",
    formSubtitle: "Fill in your details for Oleh DK Auto",
    titleFound: "Inspect a car you found",
    titleSearch: "Find me a car",
    titleFallback: "Request",
    hasLink: "I have a link",
    noAd: "Car without a listing",
    chooseOption: "Choose an option",
    comment: "Comment",
    commentPlaceholder: "Anything else you'd like to add",
    submit: "Prepare the request",
    doneTitle: "Your request is ready",
    doneText: "Send it to Oleh — the text is already filled into the message.",
    send: "Send on Telegram",
    messagePrefix: "Request",
  },
  status: {
    draft: "Draft",
    available: "Available",
    reserved: "Reserved",
    sold: "Sold",
    hidden: "Hidden",
  },
  format: {
    priceOnRequest: "Price on request",
    km: "km",
  },
};

export function dict(lang: Lang) {
  return lang === "en" ? en : uk;
}

// Характеристики машин Олег заполняет украинским текстом, и в базе они лежат
// как есть. Для английской версии подменяем известные значения, а всё
// незнакомое показываем как есть — лучше украинское слово, чем пустое место.
const CAR_VALUES_EN: Record<string, string> = {
  Бензин: "Petrol",
  Дизель: "Diesel",
  Гібрид: "Hybrid",
  "Plug-in гібрид": "Plug-in hybrid",
  Електро: "Electric",
  Автомат: "Automatic",
  Механіка: "Manual",
  Хетчбек: "Hatchback",
  Універсал: "Estate",
  Седан: "Saloon",
  "SUV / кросовер": "SUV / crossover",
  Купе: "Coupe",
  Мінівен: "MPV",
  Чорний: "Black",
  Білий: "White",
  Сірий: "Grey",
  Сріблястий: "Silver",
  Синій: "Blue",
  Червоний: "Red",
  Зелений: "Green",
};

export function carValue(value: string | null, lang: Lang): string | null {
  if (!value || lang !== "en") return value;
  return CAR_VALUES_EN[value] ?? value;
}
