import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ArrowRightIcon } from "@/components/icons";

// Главное меню — согласованный макет "03-главное-меню": ровно две
// карточки-раздела, без вложенных списков услуг и без предпросмотра машин
// (см. OlehDKreference/Шаблон Для кода/README_ДЛЯ_CLAUDE.md).
const sections = [
  {
    href: "/cars",
    photo: "/menu/cars-banner.jpg",
    title: "Авто в наявності",
    subtitle: "Переглянути автомобілі",
  },
  {
    href: "/services",
    photo: "/menu/services-banner.jpg",
    title: "Послуги",
    subtitle: "Підбір та перевірка авто",
  },
];

export default function MenuPage() {
  return (
    <main className="flex flex-1 flex-col px-6 pt-8 pb-10">
      <Logo variant="inline" className="justify-center" />

      <h1 className="mt-6 text-center text-[1.9rem] font-extrabold tracking-tight">
        Що вас цікавить?
      </h1>
      <p className="mt-1 text-center text-sm text-muted">Оберіть розділ</p>

      <div className="mt-8 flex flex-col gap-5">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="overflow-hidden rounded-2xl border border-border bg-surface"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- локальный статический ассет из public/, next/image здесь не даёт преимуществ */}
            <img
              src={section.photo}
              alt=""
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="flex items-center justify-between gap-3 p-4">
              <div>
                <p className="font-semibold">{section.title}</p>
                <p className="mt-0.5 text-sm text-muted">{section.subtitle}</p>
              </div>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-foreground/40">
                <ArrowRightIcon className="h-4 w-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
