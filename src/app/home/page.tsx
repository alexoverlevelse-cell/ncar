import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ArrowRightIcon, TelegramIcon } from "@/components/icons";

const sections = [
  { href: "/cars", photo: "/menu/cars-mercedes.jpg", title: "Авто в наявності", subtitle: "Переглянути автомобілі" },
  { href: "/services", photo: "/menu/services-mercedes.jpg", title: "Послуги", subtitle: "Підбір • Перевірка • Продаж • Сервіс" },
];

export default function MenuPage() {
  return (
    <main className="relative flex min-h-[100svh] flex-1 flex-col px-8 pb-[calc(env(safe-area-inset-bottom)+2rem)] pt-[calc(env(safe-area-inset-top)+4.8rem)]">
      <Logo size="md" className="mx-auto w-[10.5rem]" />
      <h1 className="mt-8 text-center text-[2rem] font-extrabold leading-tight tracking-[-0.035em]">Що вас цікавить?</h1>
      <p className="mt-2 text-center text-[1.1rem] text-muted">Оберіть розділ</p>

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

      <footer className="mt-10 flex flex-col items-center border-t border-white/10 pt-7">
        <div className="flex items-center gap-3">
          <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-[#101419] shadow-[0_8px_22px_rgba(0,0,0,0.35)]" aria-hidden="true">
            <span className="text-xl font-light tracking-[-0.18em] text-white">N</span>
          </span>
          <p className="text-[0.95rem] font-semibold text-muted">
            Developed by <span className="font-extrabold text-white">NordConnection</span>
          </p>
        </div>

        <a
          href="https://t.me/ncfounder"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border border-[#229ED9]/45 bg-[#229ED9]/10 px-6 text-sm font-bold tracking-[0.08em] text-white active:scale-[0.98]"
        >
          <TelegramIcon className="h-5 w-5 text-[#229ED9]" />
          <span className="text-muted">CONTACT</span>
          <span className="tracking-normal text-white">@ncfounder</span>
        </a>
      </footer>
    </main>
  );
}
