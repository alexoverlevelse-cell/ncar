import Link from "next/link";
import { getSupabaseClient } from "@/lib/supabase";
import { siteConfig } from "@/lib/site-config";
import type { Car, CarStatus } from "@/types/car";

// Список машин зависит от живых данных в Supabase — не кэшировать статически.
export const dynamic = "force-dynamic";

const statusLabels: Record<CarStatus, string> = {
  available: "В наличии",
  reserved: "Зарезервирован",
  sold: "Продан",
};

function formatNumber(value: number) {
  return new Intl.NumberFormat("ru-RU").format(value);
}

async function loadCars(): Promise<{
  cars: Car[] | null;
  configured: boolean;
  error: boolean;
}> {
  const supabase = getSupabaseClient();
  if (!supabase) return { cars: null, configured: false, error: false };

  const { data, error } = await supabase
    .from("cars")
    .select("id, brand, model, price, year, mileage, fuel_type, transmission, photos, status")
    .order("created_at", { ascending: false });

  if (error) return { cars: null, configured: true, error: true };
  return { cars: data as Car[], configured: true, error: false };
}

export default async function CarsPage() {
  const { cars, configured, error } = await loadCars();

  return (
    <main className="flex-1 px-4 py-6 max-w-md mx-auto w-full">
      <Link href="/" className="text-sm text-neutral-500">
        ← На главную
      </Link>
      <h1 className="text-2xl font-semibold mt-2 mb-4">Автомобили</h1>

      {!configured && (
        <p className="text-neutral-500">
          Показ автомобилей пока недоступен: не настроено подключение к базе данных.
        </p>
      )}

      {configured && error && (
        <p className="text-red-600">
          Не удалось загрузить список автомобилей. Попробуйте обновить страницу позже.
        </p>
      )}

      {configured && !error && cars && cars.length === 0 && (
        <p className="text-neutral-500">Пока нет автомобилей в продаже.</p>
      )}

      {configured && !error && cars && cars.length > 0 && (
        <ul className="flex flex-col gap-4">
          {cars.map((car) => (
            <li key={car.id}>
              <article className="rounded-xl border border-neutral-200 overflow-hidden">
                <div className="aspect-[4/3] bg-neutral-100 flex items-center justify-center text-neutral-400 text-sm">
                  {car.photos?.[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={car.photos[0]}
                      alt={`${car.brand} ${car.model}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>Фото скоро будет</span>
                  )}
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="font-medium">
                      {car.brand} {car.model}
                    </h2>
                    <span className="text-xs rounded-full px-2 py-0.5 bg-neutral-100 text-neutral-600 whitespace-nowrap">
                      {statusLabels[car.status]}
                    </span>
                  </div>
                  <p className="text-lg font-semibold mt-1">
                    {formatNumber(car.price)}
                    {siteConfig.currencyLabel ? ` ${siteConfig.currencyLabel}` : ""}
                  </p>
                  <p className="text-sm text-neutral-500 mt-1">
                    {car.year} г.
                    {car.mileage != null ? ` · ${formatNumber(car.mileage)} км` : ""}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
