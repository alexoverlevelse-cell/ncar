import Link from "next/link";
import { notFound } from "next/navigation";
import { CarPhoto } from "@/components/CarCard";
import { DemoNotice } from "@/components/DemoNotice";
import { ArrowLeftIcon, TelegramIcon } from "@/components/icons";
import { loadCar } from "@/lib/data";
import { formatMileage, formatPrice } from "@/lib/format";
import { buildTelegramLink } from "@/lib/site-config";
import { CarStatusBadge } from "@/components/CarStatusBadge";
import { TelegramLink } from "@/components/TelegramLink";

export const dynamic = "force-dynamic";

export default async function CarPage({ params }: PageProps<"/cars/[id]">) {
  const { id } = await params;
  const { car, source } = await loadCar(id);

  if (!car) notFound();

  const specs = [
    { label: "Рік", value: String(car.year) },
    { label: "Пробіг", value: formatMileage(car.mileage) },
    { label: "Паливо", value: car.fuel_type },
    { label: "Коробка передач", value: car.transmission },
    { label: "Кузов", value: car.body_type },
    { label: "Колір", value: car.color },
  ].filter((spec): spec is { label: string; value: string } => Boolean(spec.value));

  // В сообщение подставляем машину, чтобы продавец сразу понимал, о чём речь.
  const telegramLink = buildTelegramLink(
    `Добрий день! Цікавить ${car.brand} ${car.model} ${car.year} за ${formatPrice(car.price)}.`
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
                alt={`${car.brand} ${car.model}, фото ${index + 1}`}
                className="aspect-[4/3] w-full shrink-0 snap-center object-cover"
              />
            ))}
          </div>
        ) : (
          <CarPhoto car={car} className="aspect-[4/3] w-full" />
        )}
        <Link
          href="/cars"
          aria-label="Назад до списку"
          className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/70 backdrop-blur"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </Link>
        {car.photos.length > 1 && (
          <p className="pointer-events-none absolute bottom-3 right-4 rounded-full bg-background/75 px-2.5 py-1 text-xs font-semibold text-foreground backdrop-blur">
            {car.photos.length} фото · гортайте
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
              <CarStatusBadge status={car.status} className="mt-1.5" />
            )}
          </div>
          <p className="shrink-0 text-xl font-semibold text-[#F6C644]">
            {formatPrice(car.price)}
          </p>
        </div>

        {source === "demo" && <DemoNotice />}

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
            <h2 className="mb-2 font-semibold">Опис</h2>
            <p className="text-sm leading-relaxed text-muted">{car.description}</p>
          </section>
        )}

        {telegramLink ? (
          <TelegramLink
            href={telegramLink}
            className="flex items-center justify-center gap-2 rounded-xl bg-accent py-3.5 font-medium text-foreground"
          >
            <TelegramIcon className="h-5 w-5" />
            Зв&rsquo;язатися з продавцем
          </TelegramLink>
        ) : (
          <Link
            href="/contact"
            className="flex items-center justify-center gap-2 rounded-xl bg-accent py-3.5 font-medium text-foreground"
          >
            Зв&rsquo;язатися з продавцем
          </Link>
        )}

      </div>
    </main>
  );
}
