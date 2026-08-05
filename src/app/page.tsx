import Link from "next/link";
import { CarCard } from "@/components/CarCard";
import { DemoNotice } from "@/components/DemoNotice";
import { ArrowRightIcon, ChevronRightIcon, TagIcon, WrenchIcon } from "@/components/icons";
import { Logo } from "@/components/Logo";
import { loadCars } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { cars, source } = await loadCars();
  const latest = cars.slice(0, 2);

  return (
    <main className="flex flex-1 flex-col">
      <section className="relative overflow-hidden px-5 pb-8 pt-6">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
        />
        <div className="relative">
          <Logo />
          <h1 className="mt-8 max-w-[16rem] text-[2rem] font-semibold leading-[1.15] tracking-tight">
            {siteConfig.tagline}
          </h1>
          <p className="mt-3 text-sm text-muted">
            Проверенные автомобили в {siteConfig.locationIn}
          </p>
          <Link
            href="/cars"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-medium text-black"
          >
            Смотреть автомобили
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="px-5">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="text-xl font-semibold">Новые поступления</h2>
          <Link href="/cars" className="flex items-center gap-1 text-sm text-accent">
            Все
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>

        {source === "demo" && <DemoNotice className="mt-3" />}

        {latest.length === 0 ? (
          <p className="mt-4 text-sm text-muted">Пока нет автомобилей в продаже.</p>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-3">
            {latest.map((car) => (
              <CarCard key={car.id} car={car} layout="tile" />
            ))}
          </div>
        )}
      </section>

      <section className="mt-4 grid grid-cols-2 gap-3 px-5 pb-8">
        <Link
          href="/contact"
          className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4"
        >
          <TagIcon className="h-6 w-6 shrink-0 text-accent" />
          <span className="flex-1 text-sm font-medium leading-snug">
            Продать автомобиль
          </span>
          <ChevronRightIcon className="h-4 w-4 shrink-0 text-muted" />
        </Link>
        <Link
          href="/services"
          className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4"
        >
          <WrenchIcon className="h-6 w-6 shrink-0 text-accent" />
          <span className="flex-1 text-sm font-medium leading-snug">Наши услуги</span>
          <ChevronRightIcon className="h-4 w-4 shrink-0 text-muted" />
        </Link>
      </section>
    </main>
  );
}
