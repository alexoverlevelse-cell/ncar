"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ArrowRightIcon, CarIcon, DocumentIcon, PersonIcon, ShieldIcon } from "@/components/icons";
import { useRole } from "@/lib/use-role";

const features = [
  { Icon: CarIcon, title: "Авто для покупки", description: "Переглядайте автомобілі в наявності" },
  { Icon: DocumentIcon, title: "Послуги та ціни", description: "Дізнавайтеся вартість і що входить" },
  { Icon: PersonIcon, title: "Підбір під ваш запит", description: "Залишайте побажання та бюджет" },
];

export default function WelcomePage() {
  const { role, loading } = useRole();
  return (
    <main className="welcome-screen relative flex min-h-[100svh] flex-col overflow-x-hidden px-6 pb-[calc(env(safe-area-inset-bottom)+1.25rem)] pt-[calc(env(safe-area-inset-top)+1.5rem)]">
      <div className="relative min-h-[19rem]">
        <Logo size="md" className="relative z-10 w-[8.8rem]" />
        <div className="absolute -right-6 -top-4 h-[20.5rem] w-[16.5rem] max-w-[82vw] overflow-hidden">
          <img src="/brand/oleh-portrait.jpg" alt="Олег" className="h-full w-full select-none object-cover object-top" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--background)_0%,transparent_26%),linear-gradient(0deg,var(--background)_0%,transparent_35%)]" />
        </div>
        <h1 className="absolute bottom-2 left-0 z-10 text-[2.75rem] font-extrabold leading-[0.98] tracking-[-0.045em] [text-shadow:0_2px_18px_rgba(0,0,0,0.8)]">
          Вітаю,<br />я Олег.
        </h1>
      </div>
      <p className="relative z-10 mt-4 max-w-[19rem] text-[1.08rem] leading-[1.42] text-muted">
        Допоможу вам із вибором та перевіркою авто в Данії.
      </p>
      <ul className="relative z-10 mt-7 space-y-5">
        {features.map(({ Icon, title, description }) => (
          <li key={title} className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.025]">
              <Icon className="h-6 w-6 text-foreground" />
            </div>
            <div className="min-w-0">
              <p className="text-[1.02rem] font-bold leading-tight">{title}</p>
              <p className="mt-1 text-[0.88rem] leading-tight text-muted">{description}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="relative z-10 mt-auto pt-8">
        <Link href="/home" className="flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-accent px-5 text-[1.05rem] font-bold text-white shadow-[0_10px_30px_rgba(182,66,70,0.2)] active:scale-[0.99]">
          Продовжити <ArrowRightIcon className="h-5 w-5" />
        </Link>
        {!loading && role === "admin" && (
          <Link href="/admin" className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#2F7A4D] py-2.5 text-sm font-semibold text-white">
            <ShieldIcon className="h-4 w-4" /> Адмін-панель
          </Link>
        )}
      </div>
    </main>
  );
}
