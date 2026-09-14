import Link from "next/link";
import { ArrowLeftIcon, HomeIcon, TelegramIcon } from "./icons";

export function PageHeader({
  title,
  subtitle,
  backHref,
}: {
  title: string;
  subtitle?: string;
  // Нижней навигации в приложении нет, поэтому на внутренних экранах возврат
  // даёт эта стрелка. Без неё раздел становится тупиком.
  backHref?: string;
}) {
  return (
    <header className="px-5 pb-4 pt-6">
      {backHref && (
        <nav className="mb-4 flex items-center justify-between gap-3">
          <Link href={backHref} aria-label="Назад" className="inline-flex h-9 items-center gap-2 rounded-full border border-border px-3 text-xs text-muted">
            <ArrowLeftIcon className="h-4 w-4" /> Назад
          </Link>
          <div className="flex gap-2">
            <Link href="/home" aria-label="Головне меню" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted">
              <HomeIcon className="h-4 w-4" />
            </Link>
            <Link href="/contact" aria-label="Зв’язатися" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted">
              <TelegramIcon className="h-4 w-4" />
            </Link>
          </div>
        </nav>
      )}
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
    </header>
  );
}
