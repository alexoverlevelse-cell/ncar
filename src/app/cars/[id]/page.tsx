import Link from "next/link";
import { notFound } from "next/navigation";
import { CarPhoto } from "@/components/CarCard";
import { DemoNotice } from "@/components/DemoNotice";
import { ArrowLeftIcon, TelegramIcon } from "@/components/icons";
import { loadCar } from "@/lib/data";
import { formatMileage, formatPrice } from "@/lib/format";
import { buildTelegramLink } from "@/lib/site-config";
import { CAR_STATUS_LABELS } from "@/types/car";

export const dynamic = "force-dynamic";

export default async function CarPage({ params }: PageProps<"/cars/[id]">) {
  const { id } = await params;
  const { car, source } = await loadCar(id);

  if (!car) notFound();

  const specs = [
    { label: "Год", value: String(car.year) },
    { label: "Пробег", value: formatMileage(car.mileage) },
    { label: "Топливо", value: car.fuel_type },
    { label: "Коробка", value: car.transmission },
    { label: "Кузов", value: car.body_type },
    { label: "Цвет", value: car.color },
  ].filter((spec): spec is { label: string; value: string } => Boolean(spec.value));

  // В сообщение подставляем машину, чтобы продавец сразу понимал, о чём речь.
  const telegramLink = buildTelegramLink(
    `Здравствуйте! Интересует ${car.brand} ${car.model} ${car.year} за ${formatPrice(car.price)}.`
  );

  return (
    <main className="flex flex-1 flex-col">
      <div className="relative">
        <CarPhoto car={car} className="aspect-[4/3] w-full" />
        <Link
          href="/cars"
          aria-label="Назад к списку"
          className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/70 backdrop-blur"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </Link>
      </div>

      <div className="flex flex-col gap-5 px-5 py-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              {car.brand} {car.model}
            </h1>
            {car.status !== "available" && (
              <span className="mt-1 inline-block rounded-full bg-surface-2 px-2.5 py-0.5 text-xs text-muted">
                {CAR_STATUS_LABELS[car.status]}
              </span>
            )}
          </div>
          <p className="shrink-0 text-xl font-semibold text-accent">
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
            <h2 className="mb-2 font-semibold">Описание</h2>
            <p className="text-sm leading-relaxed text-muted">{car.description}</p>
          </section>
        )}

        {telegramLink ? (
          <a
            href={telegramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-accent py-3.5 font-medium text-black"
          >
            <TelegramIcon className="h-5 w-5" />
            Связаться с продавцом
          </a>
        ) : (
          <Link
            href="/contact"
            className="flex items-center justify-center gap-2 rounded-xl bg-accent py-3.5 font-medium text-black"
          >
            Связаться с продавцом
          </Link>
        )}
      </div>
    </main>
  );
}
