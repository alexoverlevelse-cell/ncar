import type { Localized } from "./i18n";

export type ServiceSection = {
  slug: string;
  icon: string;
  title: Localized;
  summary: Localized;
  lead: Localized;
  items: Localized[];
  price: Localized;
  cta: Localized;
  requestType: string;
};

export const serviceCatalog: ServiceSection[] = [
  {
    slug: "inspection",
    icon: "🔍",
    title: {
      uk: "Підбір та перевірка авто",
      en: "Car sourcing and inspection",
    },
    summary: {
      uk: "Пошук • Діагностика • Купівля",
      en: "Search • Diagnostics • Purchase",
    },
    lead: {
      uk: "Допоможу знайти, перевірити та безпечно придбати автомобіль у Данії.",
      en: "I'll help you find, inspect and safely buy a car in Denmark.",
    },
    items: [
      {
        uk: "Допомога з вибором під бюджет і потреби",
        en: "Help choosing a car for your budget and needs",
      },
      {
        uk: "Аналіз ринку, ціни, оголошення, історії та документів",
        en: "Market, price, listing, history and paperwork analysis",
      },
      {
        uk: "Контакт із продавцем або дилером та особистий виїзд",
        en: "Contact with the seller or dealer and a visit in person",
      },
      {
        uk: "Комплексна фізична і комп’ютерна перевірка",
        en: "Full physical and computer diagnostics",
      },
      {
        uk: "Повноцінний тест-драйв, переговори та торг",
        en: "A proper test drive, negotiation and haggling",
      },
      {
        uk: "Допомога з фінансуванням, страхуванням, реєстрацією та Trade-in",
        en: "Help with financing, insurance, registration and trade-in",
      },
    ],
    price: { uk: "Від 2.500 DKK", en: "From 2,500 DKK" },
    cta: {
      uk: "Замовити підбір / перевірку",
      en: "Request sourcing / inspection",
    },
    requestType: "inspection",
  },
  {
    slug: "sale",
    icon: "💰",
    title: {
      uk: "Продаж • Викуп • Обмін",
      en: "Sale • Buy-out • Trade-in",
    },
    summary: {
      uk: "Продаж авто • Реклама • Trade-in",
      en: "Car sale • Advertising • Trade-in",
    },
    lead: {
      uk: "Допоможу оцінити, підготувати, прорекламувати, продати або обміняти автомобіль.",
      en: "I'll help you value, prepare, advertise, sell or trade in your car.",
    },
    items: [
      {
        uk: "Оцінка автомобіля та аналіз ринкової вартості",
        en: "Car valuation and market price analysis",
      },
      {
        uk: "Текст оголошення і розміщення на Bilbasen",
        en: "Listing copy and publication on Bilbasen",
      },
      {
        uk: "Реклама у Facebook, Instagram, TikTok і Telegram",
        en: "Advertising on Facebook, Instagram, TikTok and Telegram",
      },
      {
        uk: "Обробка повідомлень, дзвінків та переговори",
        en: "Handling messages, calls and negotiations",
      },
      {
        uk: "Викуп, обмін або Trade-in",
        en: "Buy-out, exchange or trade-in",
      },
      {
        uk: "Допомога з документами та переоформленням",
        en: "Help with paperwork and re-registration",
      },
    ],
    price: {
      uk: "800 DKK за підготовку та рекламу + 2.500 DKK після успішного продажу",
      en: "800 DKK for preparation and advertising + 2,500 DKK after a successful sale",
    },
    cta: {
      uk: "Хочу продати / обміняти авто",
      en: "I want to sell / trade in a car",
    },
    requestType: "sale",
  },
  {
    slug: "keys",
    icon: "🔑",
    title: { uk: "Виготовлення автоключів", en: "Car key cutting" },
    summary: {
      uk: "Дублікат • Новий ключ • Повна втрата",
      en: "Spare • New key • All keys lost",
    },
    lead: {
      uk: "Виготовлення та програмування автоключів для різних марок автомобілів.",
      en: "Cutting and programming car keys for a wide range of makes.",
    },
    items: [
      {
        uk: "Другий або запасний ключ, якщо один ключ залишився",
        en: "A second or spare key when you still have one",
      },
      {
        uk: "Допомога при повній втраті всіх ключів",
        en: "Help when all keys are lost",
      },
      {
        uk: "Відкриття закритого автомобіля",
        en: "Opening a locked car",
      },
      {
        uk: "Виготовлення нового ключа та програмування до автомобіля",
        en: "Cutting a new key and programming it to the car",
      },
    ],
    price: {
      uk: "Індивідуально після перевірки марки, моделі та року",
      en: "Quoted individually once the make, model and year are known",
    },
    cta: { uk: "Потрібен автоключ", en: "I need a car key" },
    requestType: "keys",
  },
  {
    slug: "service",
    icon: "🔧",
    title: { uk: "Сервіс та обслуговування", en: "Service and maintenance" },
    summary: {
      uk: "ТО • Масло • Шини • Syn",
      en: "Servicing • Oil • Tyres • Syn",
    },
    lead: {
      uk: "Планове обслуговування та підготовка автомобіля до техогляду в Данії.",
      en: "Scheduled maintenance and preparing your car for the Danish MOT (Syn).",
    },
    items: [
      { uk: "Планове ТО автомобіля", en: "Scheduled car servicing" },
      {
        uk: "Заміна моторного масла та фільтрів",
        en: "Engine oil and filter changes",
      },
      {
        uk: "Заміна шин та балансування коліс",
        en: "Tyre changes and wheel balancing",
      },
      {
        uk: "Перевірка автомобіля перед техоглядом (Syn)",
        en: "Pre-MOT check (Syn)",
      },
      {
        uk: "Підготовка автомобіля до проходження техогляду (Syn)",
        en: "Preparing the car to pass the MOT (Syn)",
      },
    ],
    price: {
      uk: "Індивідуально залежно від автомобіля та обсягу робіт",
      en: "Quoted individually depending on the car and the work involved",
    },
    cta: { uk: "Записатися на сервіс", en: "Book a service" },
    requestType: "service",
  },
  {
    slug: "detailing",
    icon: "✨",
    title: {
      uk: "Хімчистка та підготовка авто",
      en: "Valeting and car preparation",
    },
    summary: {
      uk: "Догляд • Підготовка до продажу",
      en: "Care • Preparation for sale",
    },
    lead: {
      uk: "Підготуємо автомобіль до комфортної експлуатації або вигідного продажу.",
      en: "We'll prepare your car for comfortable driving or a profitable sale.",
    },
    items: [
      { uk: "Хімчистка салону автомобіля", en: "Interior deep clean" },
      {
        uk: "Підготовка автомобіля до продажу",
        en: "Preparing the car for sale",
      },
      {
        uk: "За потреби технічна перевірка або базове обслуговування",
        en: "A technical check or basic servicing if needed",
      },
      {
        uk: "Допомога з визначенням ринкової ціни",
        en: "Help working out the market price",
      },
      {
        uk: "Підготовка оголошення і реклами через Oleh DK Auto",
        en: "Listing and advertising prepared through Oleh DK Auto",
      },
    ],
    price: {
      uk: "Індивідуально залежно від автомобіля та обсягу робіт",
      en: "Quoted individually depending on the car and the work involved",
    },
    cta: {
      uk: "Хімчистка / Підготовка авто",
      en: "Valeting / car preparation",
    },
    requestType: "detailing",
  },
];

export function getService(slug: string) {
  return serviceCatalog.find((service) => service.slug === slug);
}

export const inspectionChecks: [string, Localized, Localized][] = [
  [
    "💻",
    { uk: "Комп’ютерна діагностика", en: "Computer diagnostics" },
    {
      uk: "Електронні блоки, активні та збережені помилки, поточні параметри, системи безпеки та асистенти.",
      en: "Control units, active and stored fault codes, live parameters, safety systems and driver assists.",
    },
  ],
  [
    "🔧",
    { uk: "Двигун", en: "Engine" },
    {
      uk: "Робота на холодну і після прогріву, шуми, вібрації, витоки та доступні діагностичні параметри.",
      en: "Cold and warm running, noises, vibrations, leaks and the available diagnostic parameters.",
    },
  ],
  [
    "⛽",
    { uk: "Паливна система", en: "Fuel system" },
    {
      uk: "Робота впорскування, доступні корекції форсунок, параметри системи та відхилення.",
      en: "Injection behaviour, available injector corrections, system parameters and deviations.",
    },
  ],
  [
    "🌱",
    { uk: "DPF та екологічні системи", en: "DPF and emissions systems" },
    {
      uk: "Стан і заповнення DPF, регенерації, EGR та помилки очищення вихлопних газів.",
      en: "DPF condition and soot load, regenerations, EGR and exhaust after-treatment faults.",
    },
  ],
  [
    "⚙️",
    { uk: "Коробка передач і зчеплення", en: "Gearbox and clutch" },
    {
      uk: "Перемикання, ривки, затримки, робота під навантаженням та комп’ютерна діагностика.",
      en: "Shifting, jerks, delays, behaviour under load and computer diagnostics.",
    },
  ],
  [
    "⚡",
    { uk: "Electric / Hybrid", en: "Electric / Hybrid" },
    {
      uk: "SOH батареї, напруга, модулі, температури, баланс, помилки та рапорт її стану.",
      en: "Battery SOH, voltage, modules, temperatures, balance, faults and a condition report.",
    },
  ],
  [
    "🛞",
    { uk: "Ходова, гальма, колеса", en: "Suspension, brakes, wheels" },
    {
      uk: "Підвіска, рульове керування, гальма, ABS/ESP, шини та диски.",
      en: "Suspension, steering, brakes, ABS/ESP, tyres and wheels.",
    },
  ],
  [
    "🎨",
    { uk: "Кузов і фарба", en: "Body and paint" },
    {
      uk: "Товщиномір, сліди ремонту або ДТП, зазори, подряпини, корозія, скло та фари.",
      en: "Paint depth gauge, signs of repair or accidents, panel gaps, scratches, corrosion, glass and lights.",
    },
  ],
  [
    "💡",
    { uk: "Електроніка та комплектація", en: "Electronics and equipment" },
    {
      uk: "Освітлення, клімат, мультимедіа, камери, парктроніки та асистенти.",
      en: "Lighting, climate control, multimedia, cameras, parking sensors and assists.",
    },
  ],
  [
    "🚗",
    { uk: "Тест-драйв", en: "Test drive" },
    {
      uk: "Розгін, гальмування, підвіска, керування, вібрації та поведінка автомобіля на дорозі.",
      en: "Acceleration, braking, suspension, handling, vibrations and how the car behaves on the road.",
    },
  ],
];

export const selectionSteps: [Localized, Localized][] = [
  [
    { uk: "Визначаємо критерії", en: "We agree the criteria" },
    {
      uk: "Узгоджуємо бюджет, тип автомобіля, паливо, коробку передач, бажаний пробіг, комплектацію та інші важливі побажання.",
      en: "We agree the budget, car type, fuel, gearbox, target mileage, equipment and any other things that matter to you.",
    },
  ],
  [
    { uk: "Шукаю та відбираю варіанти", en: "I search and shortlist" },
    {
      uk: "Аналізую оголошення та ринок, відсіюю невідповідні й сумнівні варіанти та залишаю автомобілі, які відповідають вашим критеріям.",
      en: "I go through the listings and the market, filter out the unsuitable and dubious ones and keep the cars that match your criteria.",
    },
  ],
  [
    { uk: "Ви обираєте автомобіль", en: "You pick a car" },
    {
      uk: "Відібрані оголошення надсилаю вам у приватні повідомлення. Ви переглядаєте автомобілі та вирішуєте, який варіант варто перевіряти далі.",
      en: "I send the shortlisted listings to you in a private message. You look through them and decide which one is worth inspecting.",
    },
  ],
  [
    { uk: "Зв’язуюсь із продавцем", en: "I contact the seller" },
    {
      uk: "Після вибору конкретного автомобіля зв’язуюсь із продавцем або дилером, уточнюю інформацію та домовляюсь про огляд.",
      en: "Once you've chosen a specific car I contact the seller or dealer, check the details and arrange a viewing.",
    },
  ],
  [
    { uk: "Перевіряю автомобіль", en: "I inspect the car" },
    {
      uk: "Виїжджаю на місце та проводжу комплексну технічну й комп’ютерну перевірку, огляд кузова, ходової, електроніки та тест-драйв.",
      en: "I travel to the car and carry out a full technical and computer inspection, checking the body, suspension, electronics and taking it for a test drive.",
    },
  ],
  [
    { uk: "Ви отримуєте результат", en: "You get the results" },
    {
      uk: "Надсилаю фото, відео, результати діагностики, знайдені недоліки та пояснюю реальний стан автомобіля.",
      en: "I send photos, videos, the diagnostic results and every fault found, and explain the car's real condition.",
    },
  ],
  [
    { uk: "Переговори та покупка", en: "Negotiation and purchase" },
    {
      uk: "Якщо автомобіль вартий покупки, використовую знайдені недоліки як аргументи для торгу та допомагаю пройти наступні етапи придбання.",
      en: "If the car is worth buying, I use the faults found as leverage in the haggling and help you through the remaining steps of the purchase.",
    },
  ],
];
