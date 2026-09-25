import Link from "next/link";
import { dict } from "@/lib/dictionary";
import type { Lang } from "@/lib/i18n";
import { ArrowLeftIcon, HomeIcon, TelegramIcon } from "./icons";

export function PageHeader({
  title,
  subtitle,
  backHref,
  // Язык по умолчанию украинский: админка его не передаёт и остаётся украинской.
  lang = "uk",
}: {
  title: string;
  subtitle?: string;
  // Нижней навигации в приложении нет, поэтому на внутренних экранах возврат
  // даёт эта стрелка. Без неё раздел становится тупиком.
  backHref?: string;
  lang?: Lang;
}) {
  const t = dict(lang).common;

  return (
    <header className="px-5 pb-4 pt-6">
      {backHref && (
        <nav className="mb-4 flex items-center justify-between gap-3">
          <Link href={backHref} aria-label={t.back} className="inline-flex h-11 items-center gap-2 rounded-full border border-white/50 bg-white/5 px-4 text-sm font-bold text-white">
            <ArrowLeftIcon className="h-4 w-4" /> {t.back}
          </Link>
          <div className="flex gap-2">
            <Link href="/home" aria-label={t.home} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#B64246] bg-[#B64246] text-white shadow-[0_6px_16px_rgba(182,66,70,0.35)]">
              <HomeIcon className="h-4 w-4" />
            </Link>
            <Link href="/contact" aria-label={t.contact} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#229ED9] bg-[#229ED9] text-white shadow-[0_6px_16px_rgba(34,158,217,0.32)]">
              <TelegramIcon className="h-4 w-4" />
            </Link>
          </div>
        </nav>
      )}
      <h1 className="text-2xl font-bold tracking-tight text-white">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
    </header>
  );
}
