"use client";

import Link from "next/link";
import { FormEvent, Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";

type Field = { name: string; label: string; placeholder?: string; options?: string[]; required?: boolean };

const commonFields: Field[] = [
  { name: "name", label: "Ваше ім’я", placeholder: "Як до вас звертатися" },
  { name: "contact", label: "Телефон або Telegram", placeholder: "+45… або @username" },
  { name: "city", label: "Місто", placeholder: "Де ви знаходитесь" },
];
const foundBaseFields: Field[] = [
  { name: "name", label: "Ім’я", placeholder: "Як до вас звертатися" },
  { name: "phone", label: "Телефон", placeholder: "+45…" },
];
const foundLinkField: Field = { name: "adLink", label: "Посилання на авто", placeholder: "https://…" };
const foundLocationField: Field = {
  name: "carLocation",
  label: "Де фізично знаходиться авто",
  placeholder: "Адреса, майданчик або як його знайти",
};
const searchFields: Field[] = [
  { name: "budget", label: "Максимальний бюджет", options: ["До 50 000 DKK", "50 000–75 000 DKK", "75 000–100 000 DKK", "100 000–150 000 DKK", "150 000–200 000 DKK", "Понад 200 000 DKK"] },
  { name: "body", label: "Тип кузова", options: ["Хетчбек", "Універсал", "Седан", "SUV / кросовер", "Купе", "Мінівен", "Без різниці"] },
  { name: "fuel", label: "Паливо", options: ["Бензин", "Дизель", "Гібрид", "Plug-in гібрид", "Електро", "Без різниці"] },
  { name: "transmission", label: "Коробка передач", options: ["Автомат", "Механіка", "Без різниці"] },
  { name: "purpose", label: "Для чого потрібне авто?", options: ["Місто", "Траса", "Сім’я", "Робота", "Місто та траса", "Перше авто"] },
  { name: "annualMileage", label: "Річний пробіг", options: ["До 10 000 км", "10 000–20 000 км", "20 000–30 000 км", "Понад 30 000 км", "Ще не знаю"] },
  { name: "models", label: "Марка, яка подобається", required: false, options: ["Без переваг", "Volkswagen", "Skoda", "Toyota", "Hyundai", "Peugeot", "Mercedes-Benz", "BMW", "Audi", "Інша марка — напишу в коментарі"] },
  { name: "priority", label: "Що найважливіше?", options: ["Надійність", "Економічність", "Комфорт", "Простір для сім’ї", "Динаміка", "Низька ціна обслуговування"] },
];
const serviceTitles: Record<string, string> = {
  sale: "Продаж • Викуп • Обмін",
  keys: "Виготовлення автоключів",
  service: "Сервіс та обслуговування",
  detailing: "Хімчистка та підготовка авто",
};

function RequestContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") ?? "inspection";
  const [prepared, setPrepared] = useState(false);
  const [hasLink, setHasLink] = useState(true);

  if (type === "inspection") {
    return (
      <main className="flex flex-1 flex-col">
        <PageHeader backHref="/services/inspection" title="Заявка на підбір / перевірку" subtitle="Оберіть ваш сценарій" />
        <div className="grid gap-4 px-5">
          <Link href="/request?type=found" className="rounded-2xl border border-white/10 bg-surface p-5">
            <span className="text-2xl">🔗</span><h2 className="mt-4 text-lg font-bold">Я вже знайшов автомобіль</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">Надішліть оголошення. Олег проаналізує його, зв’яжеться з продавцем і проведе перевірку.</p>
          </Link>
          <Link href="/request?type=search" className="rounded-2xl border border-white/10 bg-surface p-5">
            <span className="text-2xl">🎯</span><h2 className="mt-4 text-lg font-bold">Мені потрібна допомога з пошуком</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">Опишіть бюджет і побажання. Олег проаналізує ринок і відбере сильні варіанти.</p>
          </Link>
        </div>
      </main>
    );
  }

  const isFound = type === "found";
  const isSearch = type === "search";
  const title = isFound ? "Перевірити знайдене авто" : isSearch ? "Підібрати автомобіль" : serviceTitles[type] ?? "Заявка";
  const fields = isFound
    ? [...foundBaseFields, hasLink ? foundLinkField : foundLocationField]
    : [...commonFields, ...(isSearch ? searchFields : [
    { name: "car", label: "Марка, модель і рік автомобіля", placeholder: "Наприклад, Mercedes E220, 2019" },
  ])];

  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPrepared(true);
  }

  if (prepared) {
    return (
      <main className="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#2f7a4d] text-3xl">✓</div>
        <h1 className="mt-5 text-2xl font-bold">Заявку підготовлено</h1>
        <p className="mt-2 max-w-xs text-muted">Перейдіть до контакту Oleh DK Auto, щоб передати заявку.</p>
        <Link href="/contact" className="mt-7 rounded-xl bg-accent px-6 py-3 font-semibold">Зв’язатися</Link>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col pb-10">
      <PageHeader backHref={isFound || isSearch ? "/services/inspection" : "/services"} title={title} subtitle="Заповніть дані для Oleh DK Auto" />
      <form onSubmit={prepare} className="space-y-4 px-5">
        {isFound && (
          <div className="grid grid-cols-2 gap-2 rounded-xl border border-white/10 bg-surface p-1">
            <button
              type="button"
              onClick={() => setHasLink(true)}
              className={`min-h-11 rounded-lg text-sm font-semibold transition ${hasLink ? "bg-accent text-white" : "text-muted"}`}
            >
              Є посилання
            </button>
            <button
              type="button"
              onClick={() => setHasLink(false)}
              className={`min-h-11 rounded-lg text-sm font-semibold transition ${!hasLink ? "bg-accent text-white" : "text-muted"}`}
            >
              Авто без оголошення
            </button>
          </div>
        )}
        {fields.map((field) => (
          <label key={field.name} className="block">
            <span className="mb-2 block text-sm font-medium">{field.label}</span>
            {field.options ? (
              <select
                name={field.name}
                defaultValue=""
                required={field.required ?? true}
                className="min-h-12 w-full rounded-xl border border-white/10 bg-surface px-4 text-sm outline-none focus:border-accent"
              >
                <option value="" disabled>Оберіть варіант</option>
                {field.options.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            ) : (
              <input name={field.name} placeholder={field.placeholder} required={field.required ?? true} className="min-h-12 w-full rounded-xl border border-white/10 bg-surface px-4 text-sm outline-none placeholder:text-muted/55 focus:border-accent" />
            )}
          </label>
        ))}
        {!isFound && (
          <label className="block">
            <span className="mb-2 block text-sm font-medium">Коментар</span>
            <textarea name="comment" rows={4} placeholder="Додаткова інформація або побажання" className="w-full resize-none rounded-xl border border-white/10 bg-surface p-4 text-sm outline-none placeholder:text-muted/55 focus:border-accent" />
          </label>
        )}
        <button className="min-h-14 w-full rounded-2xl bg-accent px-5 font-bold text-white">Підготувати заявку</button>
      </form>
    </main>
  );
}

export default function RequestPage() {
  return <Suspense><RequestContent /></Suspense>;
}
