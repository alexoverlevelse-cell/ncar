import { CarCard } from "@/components/CarCard";
import { DemoNotice } from "@/components/DemoNotice";
import { PageHeader } from "@/components/PageHeader";
import { loadCars } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-dynamic";

export default async function CarsPage() {
  const { cars, source } = await loadCars();

  return (
    <main className="flex flex-1 flex-col">
      <PageHeader
        title="Автомобили"
        subtitle={`Проверенные авто в ${siteConfig.locationIn}`}
      />

      <div className="flex flex-col gap-3 px-5 pb-8">
        {source === "demo" && <DemoNotice />}

        {cars.length === 0 ? (
          <p className="text-sm text-muted">Пока нет автомобилей в продаже.</p>
        ) : (
          cars.map((car) => <CarCard key={car.id} car={car} />)
        )}
      </div>
    </main>
  );
}
