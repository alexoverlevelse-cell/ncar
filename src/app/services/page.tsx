import Link from "next/link";
import { DemoNotice } from "@/components/DemoNotice";
import {
  ChevronRightIcon,
  MapPinIcon,
  TelegramIcon,
  WrenchIcon,
} from "@/components/icons";
import { PageHeader } from "@/components/PageHeader";
import { loadServices } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { buildContactLink, buildTelegramLink } from "@/lib/site-config";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const { services, source } = await loadServices();

  return (
    <main className="flex flex-1 flex-col">
      <PageHeader title="Услуги" subtitle="Записаться можно прямо в Telegram" />

      <div className="flex flex-col gap-3 px-5 pb-8">
        {source === "demo" && <DemoNotice />}

        {services.length === 0 ? (
          <p className="text-sm text-muted">Пока нет доступных услуг.</p>
        ) : (
          services.map((service) => {
            const message = `Здравствуйте! Интересует услуга «${service.title}».`;
            // У услуги может быть собственный контакт исполнителя — он важнее
            // общего контакта компании.
            const telegramLink = service.contact
              ? buildContactLink(service.contact, message)
              : buildTelegramLink(message);

            const card = (
              <>
                {service.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element -- фото из Supabase Storage, домен заранее не известен
                  <img
                    src={service.photo}
                    alt={service.title}
                    className="h-28 w-28 shrink-0 object-cover"
                  />
                ) : (
                  <div className="flex h-28 w-28 shrink-0 items-center justify-center bg-gradient-to-br from-surface-2 to-surface">
                    <WrenchIcon className="h-7 w-7 text-border" />
                  </div>
                )}
                <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5 py-3 pr-3">
                  <h2 className="font-medium leading-snug">{service.title}</h2>
                  {service.description && (
                    <p className="line-clamp-2 text-xs text-muted">
                      {service.description}
                    </p>
                  )}
                  {service.location && (
                    <p className="flex items-center gap-1 text-xs text-muted">
                      <MapPinIcon className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{service.location}</span>
                    </p>
                  )}
                  <p className="text-sm font-medium text-accent">
                    {service.price != null ? formatPrice(service.price) : "Цена по запросу"}
                  </p>
                </div>
                {telegramLink ? (
                  <TelegramIcon className="mr-3 h-5 w-5 shrink-0 self-center text-accent" />
                ) : (
                  <ChevronRightIcon className="mr-3 h-4 w-4 shrink-0 self-center text-muted" />
                )}
              </>
            );

            const className =
              "flex gap-3 overflow-hidden rounded-2xl border border-border bg-surface";

            return telegramLink ? (
              <a
                key={service.id}
                href={telegramLink}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
              >
                {card}
              </a>
            ) : (
              <Link key={service.id} href="/contact" className={className}>
                {card}
              </Link>
            );
          })
        )}
      </div>
    </main>
  );
}
