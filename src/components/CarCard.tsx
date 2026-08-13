import Link from "next/link";
import { formatMileage, formatPrice } from "@/lib/format";
import { CAR_STATUS_LABELS, type Car } from "@/types/car";
import { CarPlaceholderIcon } from "./icons";

export function CarPhoto({ car, className = "" }: { car: Car; className?: string }) {
  const photo = car.photos?.[0];

  if (photo) {
    // eslint-disable-next-line @next/next/no-img-element -- фото приходят из Supabase Storage, домен заранее не известен
    return <img src={photo} alt={`${car.brand} ${car.model}`} className={`object-cover ${className}`} />;
  }

  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-surface-2 to-surface ${className}`}
    >
      <CarPlaceholderIcon className="h-10 w-20 text-border" />
    </div>
  );
}

export function CarCard({ car, layout = "row" }: { car: Car; layout?: "row" | "tile" }) {
  const details = [`${car.year}`, formatMileage(car.mileage), car.fuel_type]
    .filter(Boolean)
    .join(" · ");

  if (layout === "tile") {
    return (
      <Link
        href={`/cars/${car.id}`}
        className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface"
      >
        <CarPhoto car={car} className="aspect-[4/3] w-full" />
        <div className="flex flex-1 flex-col gap-1 p-3">
          <h3 className="text-sm font-medium leading-snug">
            {car.brand} {car.model}
          </h3>
          <p className="text-xs text-muted">{details}</p>
          <p className="mt-auto pt-2 text-base font-semibold text-accent">
            {formatPrice(car.price)}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/cars/${car.id}`}
      className="flex gap-3 overflow-hidden rounded-2xl border border-border bg-surface"
    >
      <CarPhoto car={car} className="h-28 w-32 shrink-0" />
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 py-3 pr-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="truncate font-medium">
            {car.brand} {car.model}
          </h3>
          {car.status !== "available" && (
            <span className="shrink-0 rounded-full bg-surface-2 px-2 py-0.5 text-[10px] text-muted">
              {CAR_STATUS_LABELS[car.status]}
            </span>
          )}
        </div>
        <p className="text-xs text-muted">{details}</p>
        <p className="text-lg font-semibold text-accent">{formatPrice(car.price)}</p>
      </div>
    </Link>
  );
}
