import { PhoneIcon, TelegramIcon } from "@/components/icons";
import { PageHeader } from "@/components/PageHeader";
import { buildTelegramLink, siteConfig } from "@/lib/site-config";

export default function ContactPage() {
  const sellCarLink = buildTelegramLink(
    "Здравствуйте! Хочу выставить свой автомобиль на продажу."
  );
  const hasAnyContact = Boolean(siteConfig.telegramContact || siteConfig.phone);

  return (
    <main className="flex flex-1 flex-col">
      <PageHeader title="Продать автомобиль" />

      <section className="px-5">
        {/* Формы подачи объявления намеренно нет: условия согласуются лично
            с администрацией, публикует объявление сам владелец из списка
            доверенных (см. CLAUDE.md). */}
        <p className="text-sm leading-relaxed text-muted">
          Хотите выставить свой автомобиль? Свяжитесь с администрацией — расскажем
          об условиях и поможем подготовить объявление.
        </p>

        <div className="mt-4 flex flex-col gap-3">
          {sellCarLink ? (
            <a
              href={sellCarLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-accent py-3.5 font-medium text-black"
            >
              <TelegramIcon className="h-5 w-5" />
              Написать в Telegram
            </a>
          ) : (
            <p className="rounded-xl border border-dashed border-border px-4 py-3 text-sm text-muted">
              Контакт в Telegram ещё не указан.
            </p>
          )}

          {siteConfig.phone && (
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center justify-center gap-2 rounded-xl border border-border py-3.5 font-medium"
            >
              <PhoneIcon className="h-5 w-5" />
              Позвонить
            </a>
          )}
        </div>
      </section>

      <section className="mt-8 px-5 pb-8">
        <h2 className="text-xl font-semibold">Контакты</h2>

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
                <dt className="text-muted">Адрес</dt>
                <dd className="text-right">{siteConfig.address}</dd>
              </div>
            )}
            {siteConfig.workingHours && (
              <div className="flex justify-between gap-3">
                <dt className="text-muted">Часы работы</dt>
                <dd className="text-right">{siteConfig.workingHours}</dd>
              </div>
            )}
            <div className="flex justify-between gap-3">
              <dt className="text-muted">Регион</dt>
              <dd>{siteConfig.location}</dd>
            </div>
          </dl>
        ) : (
          <p className="mt-3 text-sm text-muted">
            Телефон, адрес и часы работы появятся здесь, как только владельцы их
            подтвердят.
          </p>
        )}
      </section>
    </main>
  );
}
