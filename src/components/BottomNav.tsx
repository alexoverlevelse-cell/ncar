"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CarIcon, HomeIcon, PhoneIcon, WrenchIcon } from "./icons";

const items = [
  { href: "/", label: "Главная", Icon: HomeIcon },
  { href: "/cars", label: "Авто", Icon: CarIcon },
  { href: "/services", label: "Услуги", Icon: WrenchIcon },
  { href: "/contact", label: "Контакты", Icon: PhoneIcon },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-background/95 backdrop-blur">
      <ul className="mx-auto flex w-full max-w-md items-stretch pb-[env(safe-area-inset-bottom)]">
        {items.map(({ href, label, Icon }) => {
          const active =
            href === "/" ? pathname === "/" : pathname.startsWith(href);

          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex flex-col items-center gap-1 py-2.5 text-[11px] transition-colors ${
                  active ? "text-accent" : "text-muted"
                }`}
              >
                <Icon className="h-6 w-6" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
