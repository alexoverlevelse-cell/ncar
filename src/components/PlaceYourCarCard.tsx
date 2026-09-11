import Link from "next/link";
import { buildTelegramLink } from "@/lib/site-config";
import { ChevronRightIcon, TagIcon } from "./icons";

// Промо-карточка в конце списка машин: приглашает продать своё авто и ведёт
// прямо в диалог с Олегом. Формы подачи объявления намеренно нет — условия
// и оценка обсуждаются лично (см. CLAUDE.md).
export function PlaceYourCarCard() {
  const link = buildTelegramLink(
    "Здравствуйте! Хочу продать своё авто через OlehDK."
  );

  const content = (
    <>
      <div className="flex h-28 w-28 shrink-0 items-center justify-center border-r border-dashed border-border bg-surface-2/40">
        <TagIcon className="h-8 w-8 text-accent" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 py-3 pr-3">
        <h3 className="font-medium leading-snug">Тут может быть твоё авто</h3>
        <p className="text-xs text-muted">
          Напишите — оценим автомобиль и обсудим продажу.
        </p>
        <span className="text-sm font-medium text-accent">Связаться</span>
      </div>
      <ChevronRightIcon className="mr-3 h-4 w-4 shrink-0 self-center text-muted" />
    </>
  );

  const className =
    "flex gap-3 overflow-hidden rounded-2xl border border-dashed border-border bg-surface/50";

  return link ? (
    <a href={link} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <Link href="/contact" className={className}>
      {content}
    </Link>
  );
}
