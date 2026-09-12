"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ArrowRightIcon, ShieldIcon } from "@/components/icons";
import { useRole } from "@/lib/use-role";

// Текст и порядок пунктов зафиксированы в согласованном макете
// "02-знакомство-в-приложении" (см. OlehDKreference/Шаблон Для кода/
// README_ДЛЯ_CLAUDE.md) — не менять без нового согласования.
const features = [
  {
    number: "01",
    title: "Авто для покупки",
    description: "Переглядайте автомобілі в наявності",
  },
  {
    number: "02",
    title: "Послуги та ціни",
    description: "Дізнавайтеся вартість і що входить",
  },
  {
    number: "03",
    title: "Підбір під ваш запит",
    description: "Залишайте побажання та бюджет",
  },
];

// Экран знакомства всередині Mini App — узгоджений варіант "без портрета".
// Портрет Олега (01-приветствие-с-Олегом.png) — це окремий асет для самого
// Telegram-бота (аватар/фото в чаті), а не частина цього екрана.
export default function WelcomePage() {
  const { role, loading } = useRole();

  return (
    <main className="flex min-h-dvh flex-1 flex-col px-6 pt-8 pb-[max(2.5rem,env(safe-area-inset-bottom))]">
      <Logo />

      <h1 className="mt-8 text-[2.4rem] font-extrabold leading-[1.05] tracking-tight">
        Вітаємо
        <br />в OLEH DK
      </h1>
      <p className="mt-3 text-base leading-relaxed text-muted">
        Авто та допомога з вибором в одному місці.
      </p>

      <ul className="mt-8 flex flex-col">
        {features.map((feature, index) => (
          <li
            key={feature.number}
            className={`flex gap-4 py-4 ${index > 0 ? "border-t border-border" : ""}`}
          >
            <span className="shrink-0 text-lg font-bold text-accent">
              {feature.number}
            </span>
            <div>
              <p className="font-semibold">{feature.title}</p>
              <p className="mt-0.5 text-sm text-muted">{feature.description}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-col gap-3 pt-8">
        <Link
          href="/home"
          className="flex items-center justify-center gap-2 rounded-xl bg-accent py-4 text-base font-medium text-foreground"
        >
          Продовжити
          <ArrowRightIcon className="h-4 w-4" />
        </Link>

        {/* Кнопки нет в макете — это функциональная необходимость для
            единственного администратора, не элемент утверждённого дизайна.
            Пока роль не пришла, кнопку не показываем, чтобы не мигала. */}
        {!loading && role === "admin" && (
          <Link
            href="/admin"
            className="flex items-center justify-center gap-1.5 py-2 text-sm text-muted"
          >
            <ShieldIcon className="h-4 w-4" />
            Адмін-панель
          </Link>
        )}
      </div>
    </main>
  );
}
