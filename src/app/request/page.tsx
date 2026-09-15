"use client";

import Link from "next/link";
import { FormEvent, Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";

type Field = { name: string; label: string; placeholder?: string };

const commonFields: Field[] = [
  { name: "name", label: "Ваше ім’я", placeholder: "Як до вас звертатися" },
  { name: "contact", label: "Телефон або Telegram", placeholder: "+45… або @username" },
  { name: "city", label: "Місто", placeholder: "Де ви знаходитесь" },
];
const foundFields: Field[] = [
  { name: "name", label: "Ім’я", placeholder: "Як до вас звертатися" },
  { name: "phone", label: "Телефон", placeholder: "+45…" },
  { name: "adLink", label: "Посилання на авто", placeholder: "https://…" },
];
const searchFields: Field[] = [
  { name: "budget", label: "Максимальний бюджет", placeholder: "DKK" },
  { name: "body", label: "Тип кузова", placeholder: "Хетчбек / універсал / седан / SUV / не знаю" },
  { name: "fuel", label: "Паливо", placeholder: "Бензин / дизель / Hybrid / Electric / не знаю" },
  { name: "transmission", label: "Коробка", placeholder: "Автомат / механіка / без різниці" },
  { name: "purpose", label: "Для чого потрібне авто?", placeholder: "Місто / траса / сім’я / робота / змішано" },
  { name: "annualMileage", label: "Приблизний річний пробіг", placeholder: "км на рік" },
  { name: "models", label: "Марки або моделі, які подобаються", placeholder: "Можна пропустити" },
  { name: "priority", label: "Що найважливіше?", placeholder: "Надійність / економічність / комфорт / простір…" },
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
  const fields = isFound ? foundFields : [...commonFields, ...(isSearch ? searchFields : [
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
        {fields.map((field) => (
          <label key={field.name} className="block">
            <span className="mb-2 block text-sm font-medium">{field.label}</span>
            <input name={field.name} placeholder={field.placeholder} required={field.name !== "models"} className="min-h-12 w-full rounded-xl border border-white/10 bg-surface px-4 text-sm outline-none placeholder:text-muted/55 focus:border-accent" />
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
