"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ContactFab } from "./ContactFab";
import { ScreenGlow } from "./ScreenGlow";

// На приветственном экране плавающей кнопки связи нет — он занимает весь
// экран, а дальше пользователь попадает в приложение.
const FULLSCREEN_ROUTES = ["/"];

export function AppFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const fullscreen = FULLSCREEN_ROUTES.includes(pathname);

  return (
    <>
      <ScreenGlow variant={fullscreen ? "welcome" : "full"} />
      <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col">
        {children}
      </div>
      {!fullscreen && <ContactFab />}
    </>
  );
}
