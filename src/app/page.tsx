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
    <main className="flex min-h-dvh flex-1 flex-col pb-[max(2.25rem,env(safe-area-inset-bottom))]">
      {/* Верхний блок: логотип и приветствие слева, портрет Олега справа —
          компоновка из макета 02. Портрет тянется на высоту левой колонки,
          поэтому описание под ним никогда не перекрывается. */}
      <div className="flex gap-2 pt-7 pl-6">
        <div className="flex min-h-[36vh] min-w-0 flex-1 flex-col">
          <Logo size="lg" />

          <h1 className="mt-9 text-[clamp(2.15rem,11vw,2.9rem)] font-extrabold leading-[1.04] tracking-tight">
            Вітаю,
            <br />я Олег.
          </h1>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element -- локальный статический ассет из public/ */}
        <img
          src="/brand/oleh-portrait.png"
          alt="Олег"
          className="pointer-events-none w-[46%] max-w-[220px] select-none self-stretch object-cover object-top"
        />
      </div>

      <p className="mt-6 px-6 text-[clamp(1.1rem,5.1vw,1.3rem)] leading-snug text-muted">
        Допоможу вам із вибором та перевіркою авто в Данії.
      </p>

      <ul className="mt-auto flex flex-col gap-8 px-6 pt-8">
        {features.map(({ Icon, title, description }) => (
          <li key={title} className="flex items-center gap-4">
            <Icon className="h-9 w-9 shrink-0 text-foreground" />
            <div className="min-w-0">
              <p className="text-[1.05rem] font-semibold leading-tight">
                {title}
              </p>
              <p className="mt-1 text-sm leading-tight text-muted">
                {description}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-col gap-2 px-6 pt-9">
        <Link
          href="/home"
          className="flex items-center justify-center gap-2.5 rounded-xl bg-accent py-4 text-base font-semibold text-foreground"
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
