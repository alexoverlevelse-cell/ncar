import Link from "next/link";
import { notFound } from "next/navigation";
import { TelegramIcon } from "@/components/icons";
import { PageHeader } from "@/components/PageHeader";
import { buildTelegramLink } from "@/lib/site-config";
import { getService, inspectionChecks, selectionSteps, serviceCatalog } from "@/lib/service-catalog";

export function generateStaticParams() {
  return serviceCatalog.map(({ slug }) => ({ slug }));
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const requestHref = slug === "inspection" ? "/request?type=inspection" : `/request?type=${service.requestType}`;
  const telegramLink = buildTelegramLink(`Добрий день! Цікавить послуга «${service.title}».`);

  return (
    <main className="flex flex-1 flex-col pb-10">
      <PageHeader backHref="/services" title={`${service.icon} ${service.title}`} subtitle={service.summary} />
      <div className="space-y-6 px-5">
        <p className="text-[1.02rem] leading-relaxed text-muted">{service.lead}</p>

        {slug === "inspection" && (
          <section className="grid grid-cols-2 gap-3">
            <Link href="/request?type=found" className="rounded-2xl border border-white/10 bg-surface p-4">
              <h2 className="text-base font-bold leading-tight">🔗 Вже знайшли авто?</h2>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                Надішліть посилання на автомобіль для перевірки.
              </p>
            </Link>
            <Link href="/request?type=search" className="rounded-2xl border border-white/10 bg-surface p-4">
              <h2 className="text-base font-bold leading-tight">🎯 Потрібен підбір авто?</h2>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                Знайдемо варіант під ваш бюджет і побажання.
              </p>
            </Link>
          </section>
        )}

        {slug === "inspection" && (
          <>
            <aside className="rounded-2xl border border-[#F6C644]/35 bg-[#F6C644]/[0.08] p-4 text-sm leading-relaxed">
              <p className="font-bold text-[#F6C644]">ℹ️ Важлива інформація</p>
              <p className="mt-1 text-foreground/90">
                Детально про те, як проходить підбір і що входить у перевірку, розписано нижче.
                Натисніть «Розгорнути» у потрібному блоці.
              </p>
            </aside>

            <details className="rounded-2xl border border-white/10 bg-surface p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold">
                <span>Як проходить підбір — 7 кроків</span>
                <span className="shrink-0 rounded-lg border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs font-semibold text-[#F6C644]">Розгорнути</span>
              </summary>
              <div className="mt-5 space-y-5">
                {selectionSteps.map(([title, text], index) => (
                  <div key={title}>
                    <h3 className="font-bold">{index + 1}. {title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
                  </div>
                ))}
              </div>
            </details>

            <details className="rounded-2xl border border-white/10 bg-surface p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold">
                <span>Що перевіряється?</span>
                <span className="shrink-0 rounded-lg border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs font-semibold text-[#F6C644]">Розгорнути</span>
              </summary>
              <div className="mt-5 space-y-5">
                {inspectionChecks.map(([icon, title, text]) => (
                  <div key={title}>
                    <h3 className="font-semibold">{icon} {title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
                  </div>
                ))}
              </div>
            </details>
          </>
        )}

        {slug !== "inspection" && <section>
          <h2 className="text-xl font-bold">Що входить</h2>
          <ul className="mt-3 space-y-2.5">
            {service.items.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </section>}

        {slug === "inspection" && (
          <>
            <section>
              <h2 className="text-xl font-bold">Вартість перевірки</h2>
              <div className="mt-3 overflow-hidden rounded-2xl border border-white/10">
                {[
                  ["Бензин / Дизель до 50 000 DKK", "2 500 DKK"],
                  ["Бензин / Дизель від 50 000 DKK", "3 000 DKK"],
                  ["Electric / Hybrid", "3 500 DKK"],
                ].map(([category, price]) => (
                  <div key={category} className="flex items-center justify-between gap-4 border-b border-white/10 bg-surface px-4 py-3 last:border-b-0">
                    <span className="text-sm text-muted">{category}</span>
                    <strong className="shrink-0 text-accent">{price}</strong>
                  </div>
                ))}
              </div>
              <p className="mt-4 border-l-2 border-white/30 pl-4 text-sm leading-relaxed text-muted">
                <strong>Ціна вказана за перевірку одного автомобіля.</strong> Якщо після перевірки автомобіль не підходить і ви обираєте інший — його перевірка оплачується окремо за відповідним тарифом.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">Доїзд: 200 DKK за кожну фактичну годину дороги туди й назад. Повна вартість погоджується до виїзду.</p>
            </section>

          </>
        )}

        {slug !== "inspection" && (
          <section className="rounded-2xl border border-white/10 bg-surface p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-muted">Вартість</p>
            <p className="mt-2 font-bold leading-relaxed text-foreground">{service.price}</p>
          </section>
        )}

        <Link href={requestHref} className="flex min-h-14 items-center justify-center rounded-2xl bg-accent px-5 text-center font-bold text-white shadow-[0_10px_30px_rgba(182,66,70,0.2)]">
          {service.cta}
        </Link>

        {telegramLink && (
          <a
            href={telegramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-[#229ED9]/45 bg-[#229ED9]/10 px-5 text-center font-semibold text-foreground"
          >
            <TelegramIcon className="h-5 w-5 text-[#229ED9]" />
            Написати Олегу в Telegram
          </a>
        )}
      </div>
    </main>
  );
}
