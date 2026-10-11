"use client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getInitData } from "@/lib/telegram";
import { track } from "@/lib/analytics";

export function AnalyticsTracker() {
  const path = usePathname();
  const search = useSearchParams().toString();
  useEffect(() => {
    let attempts = 0;
    let stopped = false;
    let timer: ReturnType<typeof setTimeout>;
    const record = async () => {
      if (!getInitData()) return false;
      if (!sessionStorage.getItem("analytics-visited")) {
        if (!await track("visit")) return false;
        sessionStorage.setItem("analytics-visited", "1");
      }
      if (stopped || path.startsWith("/admin")) return true;
      return track("page", document.querySelector("main h1, main h2")?.textContent?.trim() || path, search);
    };
    const attempt = async () => {
      let recorded = false;
      try { recorded = await record(); } catch { /* Storage may be unavailable. */ }
      if (!stopped && !recorded && ++attempts < 20) timer = setTimeout(attempt, 1000);
    };
    void attempt();
    return () => { stopped = true; clearTimeout(timer); };
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
