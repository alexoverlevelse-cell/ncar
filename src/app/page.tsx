import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col px-4 py-8 max-w-md mx-auto w-full gap-8">
      <header className="flex flex-col items-center text-center gap-2">
        <h1 className="text-2xl font-semibold">{siteConfig.companyName}</h1>
        <p className="text-neutral-500">{siteConfig.tagline}</p>
      </header>

      <nav className="flex flex-col gap-3">
        <Link
          href="/cars"
          className="rounded-xl bg-neutral-900 text-white text-center py-3 font-medium"
        >
          Смотреть автомобили
        </Link>
        <Link
          href="/services"
          className="rounded-xl border border-neutral-300 text-center py-3 font-medium"
        >
          Наши услуги
        </Link>
      </nav>

      <section className="text-sm text-neutral-500 flex flex-col gap-1 border-t border-neutral-200 pt-4">
        <p>Связаться с нами:</p>
        {siteConfig.telegramContact ? (
          <a href={siteConfig.telegramContact} className="underline">
            Написать в Telegram
          </a>
        ) : (
          <p className="italic">Контакт для связи ещё не указан</p>
        )}
        {siteConfig.phone && <p>{siteConfig.phone}</p>}
        {siteConfig.address && <p>{siteConfig.address}</p>}
      </section>
    </main>
  );
}
