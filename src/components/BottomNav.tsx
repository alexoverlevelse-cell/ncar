"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRole } from "@/lib/use-role";
import { CarIcon, HomeIcon, PhoneIcon, ShieldIcon, WrenchIcon } from "./icons";

// Интерфейс переходит на украинский (см. OlehDKreference); подписи навигации
// переведены как общая для всего приложения оболочка. Содержимое самих
// внутренних страниц (/cars, /services, /contact) пока не согласовано и не
// переведено — см. CLAUDE.md.
const baseItems = [
  { href: "/home", label: "Головна", Icon: HomeIcon },
  { href: "/cars", label: "Авто", Icon: CarIcon },
  { href: "/services", label: "Послуги", Icon: WrenchIcon },
  { href: "/contact", label: "Контакти", Icon: PhoneIcon },
];

const adminItem = { href: "/admin", label: "Адмін", Icon: ShieldIcon };

export function BottomNav() {
  const pathname = usePathname();
  const { role } = useRole();

  // Пункт админки виден только администраторам. Это удобство, а не защита:
  // права всё равно проверяются на сервере в API-роутах.
  const items = role === "admin" ? [...baseItems, adminItem] : baseItems;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-background/95 backdrop-blur">
      <ul className="mx-auto flex w-full max-w-md items-stretch pb-[env(safe-area-inset-bottom)]">
        {items.map(({ href, label, Icon }) => {
          const active = pathname.startsWith(href);

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
