"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { PencilIcon, PlusIcon, TrashIcon } from "@/components/icons";
import { apiFetch, confirmAction } from "@/lib/telegram";
import { useRole } from "@/lib/use-role";
import { formatPrice } from "@/lib/format";
import { CAR_STATUSES, CAR_STATUS_LABELS, type Car, type CarStatus } from "@/types/car";
import {
  SERVICE_STATUSES,
  SERVICE_STATUS_LABELS,
  type Service,
  type ServiceStatus,
} from "@/types/service";

export default function AdminPage() {
  const { role, loading: roleLoading } = useRole();
  const [cars, setCars] = useState<Car[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const result = await apiFetch("/api/admin/data", { method: "POST" });
    if (result.ok) {
      const data = result.data as { cars: Car[]; services: Service[] };
      setCars(data.cars);
      setServices(data.services);
      setError(null);
    } else {
      setError(result.error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (role === "admin") load();
    else if (role !== null) setLoading(false);
  }, [role, load]);

  async function changeCarStatus(car: Car, status: CarStatus) {
    const previous = cars;
    setCars((list) => list.map((c) => (c.id === car.id ? { ...c, status } : c)));

    const result = await apiFetch(`/api/cars/${car.id}`, {
      method: "PATCH",
      body: { status },
    });
    if (!result.ok) {
      setCars(previous);
      setError(result.error);
    }
  }

  async function changeServiceStatus(service: Service, status: ServiceStatus) {
    const previous = services;
    setServices((list) =>
      list.map((s) => (s.id === service.id ? { ...s, status } : s))
    );

    const result = await apiFetch(`/api/services/${service.id}`, {
      method: "PATCH",
      body: { status },
    });
    if (!result.ok) {
      setServices(previous);
      setError(result.error);
    }
  }

  async function removeCar(car: Car) {
    const confirmed = await confirmAction(
      `Удалить ${car.brand} ${car.model}? Действие необратимо.`
    );
    if (!confirmed) return;

    const result = await apiFetch(`/api/cars/${car.id}`, { method: "DELETE" });
    if (result.ok) setCars((list) => list.filter((c) => c.id !== car.id));
    else setError(result.error);
  }

  async function removeService(service: Service) {
    const confirmed = await confirmAction(
      `Удалить услугу «${service.title}»? Действие необратимо.`
    );
    if (!confirmed) return;

    const result = await apiFetch(`/api/services/${service.id}`, { method: "DELETE" });
    if (result.ok) setServices((list) => list.filter((s) => s.id !== service.id));
    else setError(result.error);
  }

  if (roleLoading) {
    return (
      <main className="flex-1 px-5 py-6">
        <p className="text-sm text-muted">Проверяем доступ…</p>
      </main>
    );
  }

  if (role !== "admin") {
    return (
      <main className="flex-1 px-5 py-6">
        <PageHeader title="Админ-панель" />
        <p className="text-sm text-muted">
          Раздел доступен только администраторам. Откройте приложение из Telegram
          под учётной записью администратора.
        </p>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col">
      <PageHeader title="Админ-панель" subtitle="Управление машинами и услугами" />

      <div className="flex flex-col gap-6 px-5 pb-8">
        {error && (
          <p className="rounded-xl border border-red-900 bg-red-950/40 px-3 py-2 text-sm text-red-300">
            {error}
          </p>
        )}

        <section>
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Автомобили</h2>
            <Link
              href="/admin/cars/new"
              className="flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-sm font-medium text-black"
            >
              <PlusIcon className="h-4 w-4" />
              Добавить
            </Link>
          </div>

          {loading ? (
            <p className="mt-3 text-sm text-muted">Загружаем…</p>
          ) : cars.length === 0 ? (
            <p className="mt-3 text-sm text-muted">Пока ни одной машины.</p>
          ) : (
            <ul className="mt-3 flex flex-col gap-3">
              {cars.map((car) => (
                <li
                  key={car.id}
                  className="rounded-2xl border border-border bg-surface p-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate font-medium">
                        {car.brand} {car.model}
                      </p>
                      <p className="text-sm text-accent">{formatPrice(car.price)}</p>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <Link
                        href={`/admin/cars/${car.id}`}
                        aria-label="Редактировать"
                        className="rounded-lg border border-border p-2 text-muted"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeCar(car)}
                        aria-label="Удалить"
                        className="rounded-lg border border-border p-2 text-red-400"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <label className="mt-3 flex items-center gap-2 text-xs text-muted">
                    Статус
                    <select
                      value={car.status}
                      onChange={(event) =>
                        changeCarStatus(car, event.target.value as CarStatus)
                      }
                      className="flex-1 rounded-lg border border-border bg-surface-2 px-2 py-1.5 text-sm text-foreground"
                    >
                      {CAR_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {CAR_STATUS_LABELS[status]}
                        </option>
                      ))}
                    </select>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Услуги</h2>
            <Link
              href="/admin/services/new"
              className="flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-sm font-medium text-black"
            >
              <PlusIcon className="h-4 w-4" />
              Добавить
            </Link>
          </div>

          {loading ? (
            <p className="mt-3 text-sm text-muted">Загружаем…</p>
          ) : services.length === 0 ? (
            <p className="mt-3 text-sm text-muted">Пока ни одной услуги.</p>
          ) : (
            <ul className="mt-3 flex flex-col gap-3">
              {services.map((service) => (
                <li
                  key={service.id}
                  className="rounded-2xl border border-border bg-surface p-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate font-medium">{service.title}</p>
                      <p className="text-sm text-accent">
                        {service.price != null
                          ? formatPrice(service.price)
                          : "Цена по запросу"}
                      </p>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <Link
                        href={`/admin/services/${service.id}`}
                        aria-label="Редактировать"
                        className="rounded-lg border border-border p-2 text-muted"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeService(service)}
                        aria-label="Удалить"
                        className="rounded-lg border border-border p-2 text-red-400"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <label className="mt-3 flex items-center gap-2 text-xs text-muted">
                    Статус
                    <select
                      value={service.status}
                      onChange={(event) =>
                        changeServiceStatus(service, event.target.value as ServiceStatus)
                      }
                      className="flex-1 rounded-lg border border-border bg-surface-2 px-2 py-1.5 text-sm text-foreground"
                    >
                      {SERVICE_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {SERVICE_STATUS_LABELS[status]}
                        </option>
                      ))}
                    </select>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
