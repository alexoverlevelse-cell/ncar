"use client";
import { getInitData } from "./telegram";

export async function track(event: string, label = "", target = ""): Promise<boolean> {
  try {
    const initData = getInitData();
    if (!initData || (location.pathname.startsWith("/admin") && event !== "visit")) return false;
    let session = sessionStorage.getItem("analytics-session");
    if (!session) {
      session = crypto.randomUUID();
      sessionStorage.setItem("analytics-session", session);
    }
    const response = await fetch("/api/analytics", {
      method: "POST", keepalive: true,
      headers: { "Content-Type": "application/json", "x-telegram-init-data": initData },
      body: JSON.stringify({ event, label, target, path: location.pathname, session }),
    });
    return response.ok;
  } catch { return false; }
}
