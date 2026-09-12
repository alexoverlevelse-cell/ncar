import { PhoneIcon, TelegramIcon } from "@/components/icons";
import { PageHeader } from "@/components/PageHeader";
import { buildTelegramLink, siteConfig } from "@/lib/site-config";

export default function ContactPage() {
  const sellCarLink = buildTelegramLink(
    "Добрий день! Хочу продати свій автомобіль через OLEH DK."
  );
  const hasAnyContact = Boolean(siteConfig.telegramContact || siteConfig.phone);

  return (
    <main className="flex flex-1 flex-col">
      <PageHeader title="Продати автомобіль" />

      <section className="px-5">
        {/* Формы подачи объявления намеренно нет: все условия и оценка
            автомобиля обсуждаются лично с Олегом (см. CLAUDE.md). */}
        <p className="text-sm leading-relaxed text-muted">
          Хочете продати свій автомобіль? Напишіть — обговоримо стан, оцінимо
          машину та домовимося про умови особисто.
        </p>

        <div className="mt-4 flex flex-col gap-3">
          {sellCarLink ? (
            <a
              href={sellCarLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-accent py-3.5 font-medium text-foreground"
            >
              <TelegramIcon className="h-5 w-5" />
              Написати в Telegram
            </a>
          ) : (
            <p className="rounded-xl border border-dashed border-border px-4 py-3 text-sm text-muted">
              Контакт у Telegram ще не вказано.
            </p>
          )}

          {siteConfig.phone && (
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center justify-center gap-2 rounded-xl border border-border py-3.5 font-medium"
            >
              <PhoneIcon className="h-5 w-5" />
              Зателефонувати
            </a>
          )}
        </div>
      </section>

      <section className="mt-8 px-5 pb-8">
        <h2 className="text-xl font-semibold">Контакти</h2>

        {hasAnyContact ? (
          <dl className="mt-3 flex flex-col gap-3 rounded-2xl border border-border bg-surface p-4 text-sm">
            {siteConfig.phone && (
              <div className="flex justify-between gap-3">
                <dt className="text-muted">Телефон</dt>
                <dd>{siteConfig.phone}</dd>
              </div>
            )}
            {siteConfig.address && (
              <div className="flex justify-between gap-3">
                <dt className="text-muted">Адреса</dt>
                <dd className="text-right">{siteConfig.address}</dd>
              </div>
            )}
            {siteConfig.workingHours && (
              <div className="flex justify-between gap-3">
                <dt className="text-muted">Години роботи</dt>
                <dd className="text-right">{siteConfig.workingHours}</dd>
              </div>
            )}
            <div className="flex justify-between gap-3">
              <dt className="text-muted">Регіон</dt>
              <dd>{siteConfig.location}</dd>
            </div>
          </dl>
        ) : (
          <p className="mt-3 text-sm text-muted">
            Телефон, адреса та години роботи з&rsquo;являться тут, щойно власники
            їх підтвердять.
          </p>
        )}
      </section>
    </main>
  );
}
