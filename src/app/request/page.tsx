"use client";

import Link from "next/link";
import { FormEvent, Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLang } from "@/components/LangProvider";
import { PageHeader } from "@/components/PageHeader";
import { TelegramLink } from "@/components/TelegramLink";
import { dict } from "@/lib/dictionary";
import type { Lang, Localized } from "@/lib/i18n";
import { serviceCatalog } from "@/lib/service-catalog";
import { buildTelegramLink } from "@/lib/site-config";

type Field = {
  name: string;
  label: Localized;
  placeholder?: Localized;
  options?: Localized[];
  required?: boolean;
};

const commonFields: Field[] = [
  {
    name: "name",
    label: { uk: "Ваше ім’я", en: "Your name" },
    placeholder: { uk: "Як до вас звертатися", en: "What should I call you" },
  },
  {
    name: "contact",
    label: { uk: "Телефон або Telegram", en: "Phone or Telegram" },
    placeholder: { uk: "+45… або @username", en: "+45… or @username" },
  },
  {
    name: "city",
    label: { uk: "Місто", en: "City" },
    placeholder: { uk: "Де ви знаходитесь", en: "Where you are based" },
  },
];

const foundBaseFields: Field[] = [
  {
    name: "name",
    label: { uk: "Ім’я", en: "Name" },
    placeholder: { uk: "Як до вас звертатися", en: "What should I call you" },
  },
  {
    name: "phone",
    label: { uk: "Телефон", en: "Phone" },
    placeholder: { uk: "+45…", en: "+45…" },
  },
];

const foundLinkField: Field = {
  name: "adLink",
  label: { uk: "Посилання на авто", en: "Link to the car" },
  placeholder: { uk: "https://…", en: "https://…" },
};

const foundLocationField: Field = {
  name: "carLocation",
  label: { uk: "Де фізично знаходиться авто", en: "Where the car physically is" },
  placeholder: {
    uk: "Адреса, майданчик або як його знайти",
    en: "Address, forecourt or how to find it",
  },
};

const carField: Field = {
  name: "car",
  label: { uk: "Марка, модель і рік автомобіля", en: "Make, model and year" },
  placeholder: {
    uk: "Наприклад, Mercedes E220, 2019",
    en: "For example, Mercedes E220, 2019",
  },
};

const anyOption: Localized = { uk: "Без різниці", en: "No preference" };

const searchFields: Field[] = [
  {
    name: "budget",
    label: { uk: "Максимальний бюджет", en: "Maximum budget" },
    options: [
      { uk: "До 50 000 DKK", en: "Up to 50,000 DKK" },
      { uk: "50 000–75 000 DKK", en: "50,000–75,000 DKK" },
      { uk: "75 000–100 000 DKK", en: "75,000–100,000 DKK" },
      { uk: "100 000–150 000 DKK", en: "100,000–150,000 DKK" },
      { uk: "150 000–200 000 DKK", en: "150,000–200,000 DKK" },
      { uk: "Понад 200 000 DKK", en: "Over 200,000 DKK" },
    ],
  },
  {
    name: "body",
    label: { uk: "Тип кузова", en: "Body type" },
    options: [
      { uk: "Хетчбек", en: "Hatchback" },
      { uk: "Універсал", en: "Estate" },
      { uk: "Седан", en: "Saloon" },
      { uk: "SUV / кросовер", en: "SUV / crossover" },
      { uk: "Купе", en: "Coupe" },
      { uk: "Мінівен", en: "MPV" },
      anyOption,
    ],
  },
  {
    name: "fuel",
    label: { uk: "Паливо", en: "Fuel" },
    options: [
      { uk: "Бензин", en: "Petrol" },
      { uk: "Дизель", en: "Diesel" },
      { uk: "Гібрид", en: "Hybrid" },
      { uk: "Plug-in гібрид", en: "Plug-in hybrid" },
      { uk: "Електро", en: "Electric" },
      anyOption,
    ],
  },
  {
    name: "transmission",
    label: { uk: "Коробка передач", en: "Gearbox" },
    options: [
      { uk: "Автомат", en: "Automatic" },
      { uk: "Механіка", en: "Manual" },
      anyOption,
    ],
  },
  {
    name: "purpose",
    label: { uk: "Для чого потрібне авто?", en: "What do you need the car for?" },
    options: [
      { uk: "Місто", en: "City" },
      { uk: "Траса", en: "Motorway" },
      { uk: "Сім’я", en: "Family" },
      { uk: "Робота", en: "Work" },
      { uk: "Місто та траса", en: "City and motorway" },
      { uk: "Перше авто", en: "First car" },
    ],
  },
  {
    name: "annualMileage",
    label: { uk: "Річний пробіг", en: "Yearly mileage" },
    options: [
      { uk: "До 10 000 км", en: "Up to 10,000 km" },
      { uk: "10 000–20 000 км", en: "10,000–20,000 km" },
      { uk: "20 000–30 000 км", en: "20,000–30,000 km" },
      { uk: "Понад 30 000 км", en: "Over 30,000 km" },
      { uk: "Ще не знаю", en: "Not sure yet" },
    ],
  },
  {
    name: "models",
    label: { uk: "Марка, яка подобається", en: "A make you like" },
    required: false,
    options: [
      { uk: "Без переваг", en: "No preference" },
      { uk: "Volkswagen", en: "Volkswagen" },
      { uk: "Skoda", en: "Skoda" },
      { uk: "Toyota", en: "Toyota" },
      { uk: "Hyundai", en: "Hyundai" },
      { uk: "Peugeot", en: "Peugeot" },
      { uk: "Mercedes-Benz", en: "Mercedes-Benz" },
      { uk: "BMW", en: "BMW" },
      { uk: "Audi", en: "Audi" },
      {
        uk: "Інша марка — напишу в коментарі",
        en: "Another make — I'll say in the comment",
      },
    ],
  },
  {
    name: "priority",
    label: { uk: "Що найважливіше?", en: "What matters most?" },
    options: [
      { uk: "Надійність", en: "Reliability" },
      { uk: "Економічність", en: "Running costs" },
      { uk: "Комфорт", en: "Comfort" },
      { uk: "Простір для сім’ї", en: "Space for the family" },
      { uk: "Динаміка", en: "Performance" },
      { uk: "Низька ціна обслуговування", en: "Cheap servicing" },
    ],
  },
];

function serviceTitle(type: string, lang: Lang): string | undefined {
  return serviceCatalog.find((service) => service.requestType === type)?.title[lang];
}

function RequestContent() {
  const searchParams = useSearchParams();
  const lang = useLang();
  const t = dict(lang).request;
  const type = searchParams.get("type") ?? "inspection";
  const [preparedMessage, setPreparedMessage] = useState<string | null>(null);
  const [hasLink, setHasLink] = useState(true);

  if (type === "inspection") {
    return (
      <main className="flex flex-1 flex-col">
        <PageHeader backHref="/services/inspection" lang={lang} title={t.chooseTitle} subtitle={t.chooseSubtitle} />
        <div className="grid gap-4 px-5">
          <Link href="/request?type=found" className="rounded-2xl border border-white/10 bg-surface p-5">
            <span className="text-2xl">🔗</span><h2 className="mt-4 text-lg font-bold">{t.foundTitle}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{t.foundText}</p>
          </Link>
          <Link href="/request?type=search" className="rounded-2xl border border-white/10 bg-surface p-5">
            <span className="text-2xl">🎯</span><h2 className="mt-4 text-lg font-bold">{t.searchTitle}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{t.searchText}</p>
          </Link>
        </div>
      </main>
    );
  }

  const isFound = type === "found";
  const isSearch = type === "search";
  const title = isFound
    ? t.titleFound
    : isSearch
      ? t.titleSearch
      : serviceTitle(type, lang) ?? t.titleFallback;
  const fields = isFound
    ? [...foundBaseFields, hasLink ? foundLinkField : foundLocationField]
    : [...commonFields, ...(isSearch ? searchFields : [carField])];

  // Отдельной базы заявок нет — заявка уходит Олегу сообщением в Telegram,
  // поэтому ответы собираем в читаемый текст с подписями полей.
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const labels = new Map(fields.map((field) => [field.name, field.label[lang]]));
    labels.set("comment", t.comment);

    const answers = [...new FormData(event.currentTarget).entries()]
      .map(([name, value]) => [labels.get(name) ?? name, String(value).trim()] as const)
      .filter(([, value]) => value)
      .map(([label, value]) => `${label}: ${value}`);

    setPreparedMessage([`${t.messagePrefix} — ${title}`, ...answers].join("\n"));
  }

  if (preparedMessage) {
    const telegramLink = buildTelegramLink(preparedMessage);

    return (
      <main className="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#2f7a4d] text-3xl">✓</div>
        <h1 className="mt-5 text-2xl font-bold">{t.doneTitle}</h1>
        <p className="mt-2 max-w-xs text-muted">{t.doneText}</p>
        <pre className="mt-6 w-full max-w-sm whitespace-pre-wrap rounded-2xl border border-white/10 bg-surface p-4 text-left text-sm leading-relaxed text-muted">
          {preparedMessage}
        </pre>
        {telegramLink ? (
          <TelegramLink href={telegramLink} className="mt-6 w-full max-w-sm rounded-xl bg-accent px-6 py-3.5 font-semibold text-white">
            {t.send}
          </TelegramLink>
        ) : (
          <Link href="/contact" className="mt-6 w-full max-w-sm rounded-xl bg-accent px-6 py-3.5 font-semibold text-white">
            {dict(lang).common.contact}
          </Link>
        )}
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col pb-10">
      <PageHeader backHref={isFound || isSearch ? "/services/inspection" : "/services"} lang={lang} title={title} subtitle={t.formSubtitle} />
      <form onSubmit={prepare} className="space-y-4 px-5">
        {isFound && (
          <div className="grid grid-cols-2 gap-2 rounded-xl border border-white/10 bg-surface p-1">
            <button
              type="button"
              onClick={() => setHasLink(true)}
              className={`min-h-11 rounded-lg text-sm font-semibold transition ${hasLink ? "bg-accent text-white" : "text-muted"}`}
            >
              {t.hasLink}
            </button>
            <button
              type="button"
              onClick={() => setHasLink(false)}
              className={`min-h-11 rounded-lg text-sm font-semibold transition ${!hasLink ? "bg-accent text-white" : "text-muted"}`}
            >
              {t.noAd}
            </button>
          </div>
        )}
        {fields.map((field) => (
          <label key={field.name} className="block">
            <span className="mb-2 block text-sm font-medium">{field.label[lang]}</span>
            {field.options ? (
              <select
                name={field.name}
                defaultValue=""
                required={field.required ?? true}
                className="min-h-12 w-full rounded-xl border border-white/10 bg-surface px-4 text-sm outline-none focus:border-accent"
              >
                <option value="" disabled>{t.chooseOption}</option>
                {field.options.map((option) => (
                  <option key={option.uk} value={option[lang]}>{option[lang]}</option>
                ))}
              </select>
            ) : (
              <input name={field.name} placeholder={field.placeholder?.[lang]} required={field.required ?? true} className="min-h-12 w-full rounded-xl border border-white/10 bg-surface px-4 text-sm outline-none placeholder:text-muted/55 focus:border-accent" />
            )}
          </label>
        ))}
        {!isFound && (
          <label className="block">
            <span className="mb-2 block text-sm font-medium">{t.comment}</span>
            <textarea name="comment" rows={4} placeholder={t.commentPlaceholder} className="w-full resize-none rounded-xl border border-white/10 bg-surface p-4 text-sm outline-none placeholder:text-muted/55 focus:border-accent" />
          </label>
        )}
        <button className="min-h-14 w-full rounded-2xl bg-accent px-5 font-bold text-white">{t.submit}</button>
      </form>
    </main>
  );
}

export default function RequestPage() {
  return <Suspense><RequestContent /></Suspense>;
}
