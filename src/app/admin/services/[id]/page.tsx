"use client";

import { use, useEffect, useState } from "react";
import { AdminOnly } from "@/components/AdminOnly";
import { PageHeader } from "@/components/PageHeader";
import { ServiceForm } from "@/components/ServiceForm";
import { apiFetch } from "@/lib/telegram";
import type { Service } from "@/types/service";

export default function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [service, setService] = useState<Service | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "missing">("loading");

  useEffect(() => {
    apiFetch("/api/admin/data", { method: "POST" }).then((result) => {
      if (!result.ok) {
        setState("missing");
        return;
      }
      const { services } = result.data as { services: Service[] };
      const found = services.find((item) => item.id === id) ?? null;
      setService(found);
      setState(found ? "ready" : "missing");
    });
  }, [id]);

  return (
    <AdminOnly>
      <main className="flex flex-1 flex-col">
        <PageHeader title="Редактирование услуги" />
        <div className="px-5 pb-8">
          {state === "loading" && <p className="text-sm text-muted">Загружаем…</p>}
          {state === "missing" && (
            <p className="text-sm text-muted">Услуга не найдена.</p>
          )}
          {state === "ready" && service && <ServiceForm service={service} />}
        </div>
      </main>
    </AdminOnly>
  );
}
