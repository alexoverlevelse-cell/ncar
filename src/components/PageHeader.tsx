import Link from "next/link";
import { ArrowLeftIcon } from "./icons";

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
        <Link
          href={backHref}
          aria-label="Назад"
          className="mb-3 -ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted"
        >
          <ArrowLeftIcon className="h-4 w-4" />
        </Link>
      )}
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
    </header>
  );
}
