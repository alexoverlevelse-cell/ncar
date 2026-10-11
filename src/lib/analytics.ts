"use client";
import { getInitData } from "./telegram";

export function track(event: string, label = "", target = "") {
  try {
    const initData = getInitData();
    if (!initData || location.pathname.startsWith("/admin")) return;
    let session = sessionStorage.getItem("analytics-session");
    if (!session) {
      session = crypto.randomUUID();
      sessionStorage.setItem("analytics-session", session);
    }
    void fetch("/api/analytics", {
      method: "POST", keepalive: true,
      headers: { "Content-Type": "application/json", "x-telegram-init-data": initData },
      body: JSON.stringify({ event, label, target, path: location.pathname, session }),
    }).catch(() => {});
  } catch { /* Analytics must never interrupt the application. */ }
}
