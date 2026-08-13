"use client";

import { use, useEffect, useState } from "react";
import { AdminOnly } from "@/components/AdminOnly";
import { CarForm } from "@/components/CarForm";
import { PageHeader } from "@/components/PageHeader";
import { apiFetch } from "@/lib/telegram";
import type { Car } from "@/types/car";

export default function EditCarPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [car, setCar] = useState<Car | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "missing">("loading");

  useEffect(() => {
    apiFetch("/api/admin/data", { method: "POST" }).then((result) => {
      if (!result.ok) {
        setState("missing");
        return;
      }
      const { cars } = result.data as { cars: Car[] };
      const found = cars.find((item) => item.id === id) ?? null;
      setCar(found);
      setState(found ? "ready" : "missing");
    });
  }, [id]);

  return (
    <AdminOnly>
      <main className="flex flex-1 flex-col">
        <PageHeader title="Редактирование машины" />
        <div className="px-5 pb-8">
          {state === "loading" && <p className="text-sm text-muted">Загружаем…</p>}
          {state === "missing" && (
            <p className="text-sm text-muted">Машина не найдена.</p>
          )}
          {state === "ready" && car && <CarForm car={car} />}
        </div>
      </main>
    </AdminOnly>
  );
}
