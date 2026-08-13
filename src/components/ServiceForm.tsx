"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Field, Select, SubmitBar, TextArea, TextInput } from "./Field";
import { PhotoUploader } from "./PhotoUploader";
import { apiFetch } from "@/lib/telegram";
import {
  SERVICE_STATUSES,
  SERVICE_STATUS_LABELS,
  type Service,
} from "@/types/service";

export function ServiceForm({ service }: { service?: Service }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: service?.title ?? "",
    description: service?.description ?? "",
    price: service?.price != null ? String(service.price) : "",
    duration: service?.duration ?? "",
    photo: service?.photo ?? "",
    contact: service?.contact ?? "",
    location: service?.location ?? "",
    status: service?.status ?? "active",
  });

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError(null);

    // Пустая цена — это "по запросу", а не ноль.
    const body = { ...form, price: form.price === "" ? null : form.price };

    const result = service
      ? await apiFetch(`/api/services/${service.id}`, { method: "PATCH", body })
      : await apiFetch("/api/services", { method: "POST", body });

    setSaving(false);

    if (result.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError(result.error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <p className="rounded-xl border border-red-900 bg-red-950/40 px-3 py-2 text-sm text-red-300">
          {error}
        </p>
      )}

      <Field label="Название">
        <TextInput
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          placeholder="Химчистка авто"
          required
        />
      </Field>

      <Field label="Описание">
        <TextArea
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          placeholder="Что входит в услугу"
        />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Цена, DKK" hint="Пусто — «по запросу»">
          <TextInput
            value={form.price}
            onChange={(e) => update("price", e.target.value)}
            inputMode="numeric"
            placeholder="—"
          />
        </Field>
        <Field label="Длительность">
          <TextInput
            value={form.duration}
            onChange={(e) => update("duration", e.target.value)}
            placeholder="2–3 часа"
          />
        </Field>
      </div>

      <Field label="Контакт" hint="Ссылка t.me или телефон исполнителя">
        <TextInput
          value={form.contact}
          onChange={(e) => update("contact", e.target.value)}
          placeholder="https://t.me/username"
        />
      </Field>

      <Field label="Местонахождение" hint="Где оказывается услуга">
        <TextInput
          value={form.location}
          onChange={(e) => update("location", e.target.value)}
          placeholder="Копенгаген, ул. ..."
        />
      </Field>

      <PhotoUploader
        label="Фотография услуги"
        value={form.photo || null}
        onChange={(url) => update("photo", url ?? "")}
      />

      <Field label="Статус">
        <Select value={form.status} onChange={(e) => update("status", e.target.value)}>
          {SERVICE_STATUSES.map((status) => (
            <option key={status} value={status}>
              {SERVICE_STATUS_LABELS[status]}
            </option>
          ))}
        </Select>
      </Field>

      <SubmitBar saving={saving} onCancel={() => router.push("/admin")} />
    </form>
  );
}
