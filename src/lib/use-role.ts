"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "./telegram";

export type Role = "admin" | "publisher" | "viewer";

export interface MeUser {
  id: number;
  first_name: string;
}

// Спрашивает у сервера роль текущего пользователя Telegram.
// Пока ответ не пришёл — role === null (ничего лишнего не показываем).
export function useRole(): {
  role: Role | null;
  user: MeUser | null;
  loading: boolean;
} {
  const [role, setRole] = useState<Role | null>(null);
  const [user, setUser] = useState<MeUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    apiFetch("/api/me", { method: "POST" }).then((result) => {
      if (cancelled) return;
      if (result.ok) {
        const data = result.data as { role?: Role; user?: MeUser };
        setRole(data.role ?? "viewer");
        setUser(data.user ?? null);
      } else {
        setRole("viewer");
      }
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return { role, user, loading };
}
