import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ArrowRightIcon, TelegramIcon } from "@/components/icons";
import { dict } from "@/lib/dictionary";
import { getLang } from "@/lib/i18n-server";

export default async function MenuPage() {
  const lang = await getLang();
  const t = dict(lang).home;

  const sections = [
    { href: "/cars", photo: "/menu/cars-mercedes.jpg", title: t.carsTitle, subtitle: t.carsSubtitle },
    { href: "/services", photo: "/menu/services-mercedes.jpg", title: t.servicesTitle, subtitle: t.servicesSubtitle },
  ];

  return (
    <main className="relative flex min-h-[100svh] flex-1 flex-col px-8 pb-[calc(env(safe-area-inset-bottom)+2rem)] pt-[calc(env(safe-area-inset-top)+4.8rem)]">
      <Logo size="md" className="mx-auto w-[10.5rem]" />
      <h1 className="mt-8 text-center text-[2rem] font-extrabold leading-tight tracking-[-0.035em]">{t.heading}</h1>
      <p className="mt-2 text-center text-[1.1rem] text-muted">{t.subtitle}</p>

      <div className="mt-8 flex flex-col gap-5">
        {sections.map((section) => (
          <Link key={section.href} href={section.href} className="group overflow-hidden rounded-[1.35rem] border border-white/20 bg-[#101111] shadow-[0_18px_45px_rgba(0,0,0,0.28)] active:scale-[0.995]">
            <img src={section.photo} alt="" className="aspect-[1.82] w-full object-cover" />
            <div className="flex min-h-[6.4rem] items-center justify-between gap-3 bg-[linear-gradient(110deg,#151616,#0d0e0e)] px-5 py-4">
              <div>
                <p className="text-[1.24rem] font-extrabold leading-tight">{section.title}</p>
                <p className="mt-1.5 text-[0.96rem] text-muted">{section.subtitle}</p>
              </div>
              <ArrowRightIcon className="h-7 w-7 shrink-0 text-white transition-transform group-active:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>

      <footer className="mt-7 flex flex-col items-center gap-3 pt-2">
        <div className="flex max-w-full items-center justify-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0b1016] shadow-[0_4px_12px_rgba(0,0,0,0.25)]" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7" stroke="#aab0b8" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 26V8l20 18V6M6 8l4-4 16 15M10 13l12 11" />
            </svg>
          </span>
          <p className="text-[clamp(10px,3.1vw,13px)] leading-5 whitespace-nowrap">
            <span className="font-medium text-[#b9bec5]">Developed by</span>{" "}<span className="font-bold text-white">NordConnection</span>
          </p>
        </div>

        <a
          href="https://t.me/ncfounder"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/20 bg-[#11171c]/80 px-5 text-xs text-white transition-colors hover:border-[#229ED9]/60 active:scale-[0.98]"
        >
          <TelegramIcon className="h-5 w-5 text-[#229ED9]" />
          <span className="font-medium tracking-[0.1em] text-[#b9bec5]">CONTACT</span>
          <span className="font-bold text-white">@ncfounder</span>
        </a>
      </footer>
    </main>
  );
}
