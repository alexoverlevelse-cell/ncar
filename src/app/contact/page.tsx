import { PhoneIcon, TelegramIcon } from "@/components/icons";
import { PageHeader } from "@/components/PageHeader";
import { TelegramLink } from "@/components/TelegramLink";
import { dict } from "@/lib/dictionary";
import { getLang } from "@/lib/i18n-server";
import { buildTelegramLink, siteConfig } from "@/lib/site-config";

export default async function ContactPage() {
  const lang = await getLang();
  const t = dict(lang).contact;
  const sellCarLink = buildTelegramLink(
    lang === "en"
      ? "Hello! I'd like to sell my car through OLEH DK."
      : "Добрий день! Хочу продати свій автомобіль через OLEH DK."
  );
  const hasAnyContact = Boolean(siteConfig.telegramContact || siteConfig.phone);

  return (
    <main className="flex flex-1 flex-col">
      <PageHeader backHref="/home" lang={lang} title={t.title} />

      <section className="px-5">
        {/* Формы подачи объявления намеренно нет: все условия и оценка
            автомобиля обсуждаются лично с Олегом (см. CLAUDE.md). */}
        <p className="text-sm leading-relaxed text-muted">
          {t.lead}
        </p>

        <div className="mt-4 flex flex-col gap-3">
          {sellCarLink ? (
            <TelegramLink
              href={sellCarLink}
              className="flex items-center justify-center gap-2 rounded-xl bg-accent py-3.5 font-medium text-foreground"
            >
              <TelegramIcon className="h-5 w-5" />
              {t.writeTelegram}
            </TelegramLink>
          ) : (
            <p className="rounded-xl border border-dashed border-border px-4 py-3 text-sm text-muted">
              {t.noTelegram}
            </p>
          )}

          {siteConfig.phone && (
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center justify-center gap-2 rounded-xl border border-border py-3.5 font-medium"
            >
              <PhoneIcon className="h-5 w-5" />
              {t.call}
            </a>
          )}
        </div>
      </section>

      <section className="mt-8 px-5 pb-8">
        <h2 className="text-xl font-semibold">{t.contactsTitle}</h2>

        {hasAnyContact ? (
          <dl className="mt-3 flex flex-col gap-3 rounded-2xl border border-border bg-surface p-4 text-sm">
            {siteConfig.phone && (
              <div className="flex justify-between gap-3">
                <dt className="text-muted">{t.phone}</dt>
                <dd>{siteConfig.phone}</dd>
              </div>
            )}
            {siteConfig.address && (
              <div className="flex justify-between gap-3">
                <dt className="text-muted">{t.address}</dt>
                <dd className="text-right">{siteConfig.address}</dd>
              </div>
            )}
            {siteConfig.workingHours && (
              <div className="flex justify-between gap-3">
                <dt className="text-muted">{t.hours}</dt>
                <dd className="text-right">{siteConfig.workingHours}</dd>
              </div>
            )}
            <div className="flex justify-between gap-3">
              <dt className="text-muted">{t.region}</dt>
              <dd>{t.regionValue}</dd>
            </div>
          </dl>
        ) : (
          <p className="mt-3 text-sm text-muted">
            {t.contactsEmpty}
          </p>
        )}
      </section>
    </main>
  );
}
