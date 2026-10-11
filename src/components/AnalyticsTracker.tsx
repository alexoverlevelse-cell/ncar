"use client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getInitData } from "@/lib/telegram";
import { track } from "@/lib/analytics";

export function AnalyticsTracker() {
  const path = usePathname();
  const search = useSearchParams().toString();
  useEffect(() => {
    if (path.startsWith("/admin")) return;
    let attempts = 0;
    const record = () => {
      if (!getInitData()) return false;
      if (!sessionStorage.getItem("analytics-visited")) {
        track("visit");
        sessionStorage.setItem("analytics-visited", "1");
      }
      track("page", document.querySelector("main h1, main h2")?.textContent?.trim() || path, search);
      return true;
    };
    if (record()) return;
    const timer = setInterval(() => { if (record() || ++attempts >= 20) clearInterval(timer); }, 500);
    return () => clearInterval(timer);
  }, [path, search]);
  useEffect(() => {
    const clicked = (event: MouseEvent) => {
      const node = event.target instanceof Element ? event.target.closest("a,button,summary") : null;
      if (!node) return;
      const href = node.getAttribute("href") || "";
      // Never save prefilled Telegram messages or form contents.
      const target = href.split("?")[0];
      track(target.startsWith("https://t.me/") ? "contact" : "click",
        (node.getAttribute("aria-label") || node.textContent || "").trim().slice(0, 120), target);
    };
    document.addEventListener("click", clicked, true);
    return () => document.removeEventListener("click", clicked, true);
  }, []);
  return null;
}
