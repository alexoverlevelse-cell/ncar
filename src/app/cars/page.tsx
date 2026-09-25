import { CarCard } from "@/components/CarCard";
import { DemoNotice } from "@/components/DemoNotice";
import { PageHeader } from "@/components/PageHeader";
import { PlaceYourCarCard } from "@/components/PlaceYourCarCard";
import { loadCars } from "@/lib/data";
import { dict } from "@/lib/dictionary";
import { getLang } from "@/lib/i18n-server";

export const dynamic = "force-dynamic";

export default async function CarsPage() {
  const [{ cars, source }, lang] = await Promise.all([loadCars(), getLang()]);
  const t = dict(lang).cars;

  return (
    <main className="flex flex-1 flex-col">
      <PageHeader
        backHref="/home"
        lang={lang}
        title={t.title}
        subtitle={t.subtitle}
      />

      <div className="flex flex-col gap-3 px-5 pb-8">
        {source === "demo" && <DemoNotice lang={lang} />}

        {cars.length === 0 ? (
          <p className="text-sm text-muted">{t.empty}</p>
        ) : (
          cars.map((car) => <CarCard key={car.id} car={car} lang={lang} />)
        )}

        <PlaceYourCarCard lang={lang} />
      </div>
    </main>
  );
}
