"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";
import { chooseLang } from "@/components/LangProvider";
import {
  CarIcon,
  DocumentIcon,
  FlagUkraineIcon,
  FlagUnitedKingdomIcon,
  PersonIcon,
  ShieldIcon,
} from "@/components/icons";
import { useRole } from "@/lib/use-role";

// Входной экран — единственное место, где текст идёт на обоих языках сразу:
// язык ещё не выбран, поэтому человек должен понять экран в любом случае.
const features = [
  { Icon: CarIcon, uk: "Авто для покупки", en: "Cars available to buy" },
  { Icon: DocumentIcon, uk: "Послуги та ціни", en: "Services and prices" },
  { Icon: PersonIcon, uk: "Підбір під ваш запит", en: "Sourcing to your request" },
];

export default function WelcomePage() {
  const { role, loading } = useRole();

  return (
    <main className="welcome-screen relative flex min-h-[100svh] flex-col overflow-x-hidden px-6 pb-[calc(env(safe-area-inset-bottom)+1.25rem)] pt-[calc(env(safe-area-inset-top)+1.5rem)]">
      <div className="relative min-h-[17rem]">
        <Logo size="md" className="relative z-10 w-[8.8rem]" />
        <div className="absolute -right-6 -top-4 h-[19rem] w-[15.5rem] max-w-[80vw] overflow-hidden">
          <img src="/brand/oleh-portrait.jpg" alt="Олег / Oleh" className="h-full w-full select-none object-cover object-top" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--background)_0%,transparent_26%),linear-gradient(0deg,var(--background)_0%,transparent_35%)]" />
        </div>
        <h1 className="absolute bottom-1 left-0 z-10 text-[clamp(2.05rem,9vw,2.5rem)] font-extrabold leading-[1.02] tracking-[-0.04em] [text-shadow:0_3px_22px_rgba(0,0,0,0.9)]">
          Вітаю, я Олег.<br />
          <span className="text-white/70">Hi, I&rsquo;m Oleh.</span>
        </h1>
      </div>

      <p className="relative z-10 mt-4 max-w-[20rem] text-[0.98rem] leading-[1.4] text-muted">
        Допоможу вам із вибором та перевіркою авто в Данії.<br />
        <span className="text-muted/75">I&rsquo;ll help you choose and inspect a car in Denmark.</span>
      </p>

      <ul className="relative z-10 mt-6 space-y-4">
        {features.map(({ Icon, uk, en }) => (
          <li key={uk} className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.025]">
              <Icon className="h-6 w-6 text-foreground" />
            </div>
            <div className="min-w-0">
              <p className="text-[1.02rem] font-bold leading-tight">{uk}</p>
              <p className="mt-0.5 text-[0.88rem] leading-tight text-muted">{en}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="relative z-10 mt-auto pt-8">
        <p className="mb-3 text-center text-[0.82rem] uppercase tracking-[0.14em] text-muted">
          Оберіть мову · Choose your language
        </p>
        <div className="grid gap-2.5">
          <button
            type="button"
            onClick={() => chooseLang("uk", "/home")}
            className="flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-accent px-5 text-[1.05rem] font-bold text-white shadow-[0_10px_30px_rgba(182,66,70,0.2)] active:scale-[0.99]"
          >
            <FlagUkraineIcon className="h-5 w-[1.9rem] shrink-0 rounded-[3px] shadow-[0_0_0_1px_rgba(255,255,255,0.25)]" />
            Продовжити українською
          </button>
          <button
            type="button"
            onClick={() => chooseLang("en", "/home")}
            className="flex min-h-14 items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/[0.04] px-5 text-[1.05rem] font-bold text-foreground active:scale-[0.99]"
          >
            <FlagUnitedKingdomIcon className="h-5 w-[1.9rem] shrink-0 rounded-[3px] shadow-[0_0_0_1px_rgba(255,255,255,0.25)]" />
            Continue in English
          </button>
        </div>

        {!loading && role === "admin" && (
          <Link href="/admin" className="mt-2.5 flex items-center justify-center gap-2 rounded-xl bg-[#2F7A4D] py-2.5 text-sm font-semibold text-white">
            <ShieldIcon className="h-4 w-4" /> Адмін-панель
          </Link>
        )}
      </div>
    </main>
  );
}
