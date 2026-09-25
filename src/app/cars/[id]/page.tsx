import Link from "next/link";
import { notFound } from "next/navigation";
import { CarPhoto } from "@/components/CarCard";
import { DemoNotice } from "@/components/DemoNotice";
import { ArrowLeftIcon, TelegramIcon } from "@/components/icons";
import { loadCar } from "@/lib/data";
import { carValue, dict } from "@/lib/dictionary";
import { getLang } from "@/lib/i18n-server";
import { formatMileage, formatPrice } from "@/lib/format";
import { buildTelegramLink } from "@/lib/site-config";
import { CarStatusBadge } from "@/components/CarStatusBadge";
import { TelegramLink } from "@/components/TelegramLink";

export const dynamic = "force-dynamic";

export default async function CarPage({ params }: PageProps<"/cars/[id]">) {
  const { id } = await params;
  const [{ car, source }, lang] = await Promise.all([loadCar(id), getLang()]);

  if (!car) notFound();

  const t = dict(lang).cars;

  const specs = [
    { label: t.specs.year, value: String(car.year) },
    { label: t.specs.mileage, value: formatMileage(car.mileage, lang) },
    { label: t.specs.fuel, value: carValue(car.fuel_type, lang) },
    { label: t.specs.transmission, value: carValue(car.transmission, lang) },
    { label: t.specs.body, value: carValue(car.body_type, lang) },
    { label: t.specs.color, value: carValue(car.color, lang) },
  ].filter((spec): spec is { label: string; value: string } => Boolean(spec.value));

  // В сообщение подставляем машину, чтобы продавец сразу понимал, о чём речь.
  const telegramLink = buildTelegramLink(
    lang === "en"
      ? `Hello! I'm interested in the ${car.brand} ${car.model} ${car.year} at ${formatPrice(car.price, lang)}.`
      : `Добрий день! Цікавить ${car.brand} ${car.model} ${car.year} за ${formatPrice(car.price, lang)}.`
  );

  return (
    <main className="flex flex-1 flex-col">
      <div className="relative">
        {car.photos.length > 1 ? (
          <div className="flex snap-x snap-mandatory overflow-x-auto">
            {car.photos.map((photo, index) => (
              // eslint-disable-next-line @next/next/no-img-element -- фото приходять із Supabase Storage
              <img
                key={photo}
                src={photo}
                alt={`${car.brand} ${car.model}, photo ${index + 1}`}
                className="aspect-[4/3] w-full shrink-0 snap-center object-cover"
              />
            ))}
          </div>
        ) : (
          <CarPhoto car={car} className="aspect-[4/3] w-full" />
        )}
        <Link
          href="/cars"
          aria-label={t.backToList}
          className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/70 backdrop-blur"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </Link>
        {car.photos.length > 1 && (
          <p className="pointer-events-none absolute bottom-3 right-4 rounded-full bg-background/75 px-2.5 py-1 text-xs font-semibold text-foreground backdrop-blur">
            {car.photos.length} {t.photosHint}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-5 px-5 py-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              {car.brand} {car.model}
            </h1>
            {car.status !== "available" && (
              <CarStatusBadge status={car.status} lang={lang} className="mt-1.5" />
            )}
          </div>
          <p className="shrink-0 text-xl font-semibold text-[#F6C644]">
            {formatPrice(car.price, lang)}
          </p>
        </div>

        {source === "demo" && <DemoNotice lang={lang} />}

        <ul className="grid grid-cols-2 gap-3">
          {specs.map((spec) => (
            <li key={spec.label} className="rounded-xl border border-border bg-surface p-3">
              <p className="text-xs text-muted">{spec.label}</p>
              <p className="mt-0.5 font-medium">{spec.value}</p>
            </li>
          ))}
        </ul>

        {car.description && (
          <section>
            <h2 className="mb-2 font-semibold">{t.description}</h2>
            <p className="text-sm leading-relaxed text-muted">{car.description}</p>
          </section>
        )}

        {telegramLink ? (
          <TelegramLink
            href={telegramLink}
            className="flex items-center justify-center gap-2 rounded-xl bg-accent py-3.5 font-medium text-foreground"
          >
            <TelegramIcon className="h-5 w-5" />
            {t.contactSeller}
          </TelegramLink>
        ) : (
          <Link
            href="/contact"
            className="flex items-center justify-center gap-2 rounded-xl bg-accent py-3.5 font-medium text-foreground"
          >
            {t.contactSeller}
          </Link>
        )}

      </div>
    </main>
  );
}
