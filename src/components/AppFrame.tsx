"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { GarageGlow, ScreenGlow } from "./ScreenGlow";
import { TapFeedback } from "./TapFeedback";
import { TelegramInit } from "./TelegramInit";

const FULLSCREEN_ROUTES = ["/", "/home"];

export function AppFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const fullscreen = FULLSCREEN_ROUTES.includes(pathname);

  return (
    <>
      <TelegramInit />
      <TapFeedback />
      {pathname !== "/home" && (
        <ScreenGlow variant={fullscreen ? "welcome" : "full"} />
      )}
      <div className="relative isolate mx-auto flex min-h-dvh w-full max-w-md flex-col">
        {pathname === "/home" && <GarageGlow />}
        {children}
      </div>
    </>
  );
}
