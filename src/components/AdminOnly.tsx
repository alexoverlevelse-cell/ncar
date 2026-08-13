"use client";

import type { ReactNode } from "react";
import { useRole } from "@/lib/use-role";
import { PageHeader } from "./PageHeader";

// Прячет содержимое от неадминов. Это только удобство интерфейса —
// настоящая проверка прав живёт в API-роутах на сервере.
export function AdminOnly({ children }: { children: ReactNode }) {
  const { role, loading } = useRole();

  if (loading) {
    return (
      <main className="flex-1 px-5 py-6">
        <p className="text-sm text-muted">Проверяем доступ…</p>
      </main>
    );
  }

  if (role !== "admin") {
    return (
      <main className="flex-1 px-5 py-6">
        <PageHeader title="Нет доступа" />
        <p className="text-sm text-muted">
          Раздел доступен только администраторам.
        </p>
      </main>
    );
  }

  return <>{children}</>;
}
