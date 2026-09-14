"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";
import {
  ArrowRightIcon,
  CarIcon,
  DocumentIcon,
  PersonIcon,
  ShieldIcon,
} from "@/components/icons";
import { useRole } from "@/lib/use-role";

// Тексты и порядок пунктов зафиксированы макетом "02-знакомство-в-приложении"
// (см. OlehDKreference/Шаблон Для кода/README_ДЛЯ_CLAUDE.md) — не менять без
// нового согласования. Других CTA и каталога на этом экране нет.
const features = [
  {
    Icon: CarIcon,
    title: "Авто для покупки",
    description: "Переглядайте автомобілі в наявності",
  },
  {
    Icon: DocumentIcon,
    title: "Послуги та ціни",
    description: "Дізнавайтеся вартість і що входить",
  },
  {
    Icon: PersonIcon,
    title: "Підбір під ваш запит",
    description: "Залишайте побажання та бюджет",
  },
];

export default function WelcomePage() {
  const { role, loading } = useRole();

  return (
    // h-dvh (а не min-h) + overflow-hidden — экран НЕ прокручивается: вся
    // вёрстка обязана уместиться в реальную высоту Telegram Mini App
    // viewport, иначе снизу обрежется кнопка и вылезет системная шапка
    // Telegram (страница начинает скроллиться как обычный сайт).
    <main className="flex h-dvh flex-col overflow-hidden pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
      {/* Логотип и приветствие слева, портрет Олега справа — обычным
          элементом в строке (не absolute), поэтому наложить его на текст
          физически невозможно ни при какой высоте экрана. */}
      <div className="flex items-start gap-3 px-5 pt-4">
        <div className="min-w-0 flex-1">
          <Logo size="md" />

          <h1 className="mt-[clamp(0.65rem,3vh,1.35rem)] text-[clamp(1.55rem,7.8vw,2.15rem)] font-extrabold leading-[1.05] tracking-tight">
            Вітаю,
            <br />я Олег.
          </h1>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element -- локальный статический ассет из public/ */}
        <img
          src="/brand/oleh-portrait.jpg"
          alt="Олег"
          className="h-[clamp(6rem,20vh,9rem)] w-auto shrink-0 select-none rounded-bl-xl rounded-tr-md object-cover"
          style={{ aspectRatio: "250 / 310" }}
        />
      </div>

      <p className="mt-[clamp(0.65rem,2.4vh,1.15rem)] px-5 text-[clamp(0.88rem,3.6vw,1.02rem)] leading-snug text-muted">
        Допоможу вам із вибором та перевіркою авто в Данії.
      </p>

      {/* flex-1 + justify-center: список занимает всё оставшееся место и
          центрируется в нём — сколько бы места ни осталось на конкретном
          экране, кнопка всегда остаётся внизу без scroll. */}
      <ul className="mt-[clamp(0.75rem,2.8vh,1.5rem)] flex min-h-0 flex-1 flex-col justify-center gap-[clamp(0.6rem,2.2vh,1.15rem)] overflow-hidden px-5">
        {features.map(({ Icon, title, description }) => (
          <li key={title} className="flex items-center gap-3">
            <Icon className="h-[clamp(1.5rem,5.5vh,1.9rem)] w-[clamp(1.5rem,5.5vh,1.9rem)] shrink-0 text-foreground" />
            <div className="min-w-0">
              <p className="text-[clamp(0.92rem,3.8vw,1rem)] font-semibold leading-tight">
                {title}
              </p>
              <p className="mt-0.5 text-[clamp(0.78rem,3.2vw,0.85rem)] leading-tight text-muted">
                {description}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="shrink-0 px-5 pb-[clamp(0.65rem,2vh,1.1rem)] pt-[clamp(0.5rem,1.6vh,0.85rem)]">
        <Link
          href="/home"
          className="flex items-center justify-center gap-2 rounded-xl bg-accent py-3.5 text-base font-semibold text-foreground"
        >
          Продовжити
          <ArrowRightIcon className="h-4.5 w-4.5" />
        </Link>

        {/* Кнопки нет в макете — это функциональная необходимость для
            единственного администратора, не элемент утверждённого дизайна.
            Пока роль не пришла, кнопку не показываем, чтобы не мигала. */}
        {!loading && role === "admin" && (
          <Link
            href="/admin"
            className="mt-1.5 flex items-center justify-center gap-2 rounded-xl bg-[#2F7A4D] py-2.5 text-sm font-semibold text-foreground"
          >
            <ShieldIcon className="h-4 w-4" />
            Адмін-панель
          </Link>
        )}
      </div>
    </main>
  );
}
