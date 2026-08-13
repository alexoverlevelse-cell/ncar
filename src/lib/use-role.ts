"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "./telegram";

export type Role = "admin" | "publisher" | "viewer";

// Спрашивает у сервера роль текущего пользователя Telegram.
// Пока ответ не пришёл — role === null (ничего лишнего не показываем).
export function useRole(): { role: Role | null; loading: boolean } {
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    apiFetch("/api/me", { method: "POST" }).then((result) => {
      if (cancelled) return;
      if (result.ok) {
        const data = result.data as { role?: Role };
        setRole(data.role ?? "viewer");
      } else {
        setRole("viewer");
      }
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return { role, loading };
}
