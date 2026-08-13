"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ArrowRightIcon, ShieldIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";
import { useRole } from "@/lib/use-role";

// Экран запуска приложения. Кнопка «Админ-панель» появляется только у
// администраторов — роль подтверждает сервер по подписи Telegram.
export default function WelcomePage() {
  const { role, user, loading } = useRole();

  return (
    <main className="relative flex min-h-dvh flex-1 flex-col overflow-hidden px-6 pb-10 pt-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-accent/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="relative flex flex-1 flex-col">
        <Logo />

        <div className="mt-auto">
          <h1 className="text-[2.1rem] font-semibold leading-[1.15] tracking-tight">
            {user ? `Здравствуйте, ${user.first_name}!` : "Добро пожаловать"}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted">
            {siteConfig.tagline}. Машины в продаже и услуги для вашего авто
            в {siteConfig.locationIn} — в одном приложении.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3">
          <Link
            href="/home"
            className="flex items-center justify-center gap-2 rounded-xl bg-accent py-4 text-base font-medium text-black"
          >
            Продолжить
            <ArrowRightIcon className="h-4 w-4" />
          </Link>

          {/* Пока роль не пришла, кнопку не показываем — чтобы она не мигала
              у обычных пользователей. */}
          {!loading && role === "admin" && (
            <Link
              href="/admin"
              className="flex items-center justify-center gap-2 rounded-xl border border-border py-4 text-base font-medium text-foreground"
            >
              <ShieldIcon className="h-5 w-5 text-accent" />
              Админ-панель
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
