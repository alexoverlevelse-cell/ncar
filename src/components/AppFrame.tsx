"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { BottomNav } from "./BottomNav";

// На приветственном экране нижней навигации нет — он занимает весь экран,
// а дальше пользователь попадает в приложение с навигацией.
const FULLSCREEN_ROUTES = ["/"];

export function AppFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const fullscreen = FULLSCREEN_ROUTES.includes(pathname);

  return (
    <>
      <div
        className={`mx-auto flex min-h-dvh w-full max-w-md flex-col ${
          fullscreen ? "" : "pb-[76px]"
        }`}
      >
        {children}
      </div>
      {!fullscreen && <BottomNav />}
    </>
  );
}
