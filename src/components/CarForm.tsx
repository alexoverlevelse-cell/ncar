"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Field, Select, SubmitBar, TextArea, TextInput } from "./Field";
import { PhotoListUploader, PhotoUploader } from "./PhotoUploader";
import { apiFetch } from "@/lib/telegram";
import { CAR_STATUSES, CAR_STATUS_LABELS, type Car } from "@/types/car";

// Одна форма и на создание, и на редактирование: отличается только тем,
// куда уходит запрос.
export function CarForm({ car }: { car?: Car }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    brand: car?.brand ?? "",
    model: car?.model ?? "",
    price: car?.price != null ? String(car.price) : "",
    year: car?.year != null ? String(car.year) : "",
    mileage: car?.mileage != null ? String(car.mileage) : "",
    fuel_type: car?.fuel_type ?? "",
    transmission: car?.transmission ?? "",
    body_type: car?.body_type ?? "",
    color: car?.color ?? "",
    description: car?.description ?? "",
    status: car?.status ?? "available",
  });

  // В базе фото лежат одним списком, где первое — главное. В форме их
  // разделяем: главное фото снимается по единому образцу, чтобы список
  // машин выглядел ровно.
  const [mainPhoto, setMainPhoto] = useState<string | null>(car?.photos?.[0] ?? null);
  const [gallery, setGallery] = useState<string[]>(car?.photos?.slice(1) ?? []);

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError(null);

    const body = {
      ...form,
      price: form.price,
      year: form.year,
      mileage: form.mileage === "" ? null : form.mileage,
      photos: [mainPhoto, ...gallery].filter((url): url is string => Boolean(url)),
    };

    const result = car
      ? await apiFetch(`/api/cars/${car.id}`, { method: "PATCH", body })
      : await apiFetch("/api/cars", { method: "POST", body });

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

      <Field label="Марка">
        <TextInput
          value={form.brand}
          onChange={(e) => update("brand", e.target.value)}
          placeholder="Audi"
          required
        />
      </Field>

      <Field label="Модель">
        <TextInput
          value={form.model}
          onChange={(e) => update("model", e.target.value)}
          placeholder="A3 Sportback"
          required
        />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Цена, DKK">
          <TextInput
            value={form.price}
            onChange={(e) => update("price", e.target.value)}
            inputMode="numeric"
            placeholder="129900"
            required
          />
        </Field>
        <Field label="Год">
          <TextInput
            value={form.year}
            onChange={(e) => update("year", e.target.value)}
            inputMode="numeric"
            placeholder="2018"
            required
          />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Пробег, км">
          <TextInput
            value={form.mileage}
            onChange={(e) => update("mileage", e.target.value)}
            inputMode="numeric"
            placeholder="154000"
          />
        </Field>
        <Field label="Топливо">
          <TextInput
            value={form.fuel_type}
            onChange={(e) => update("fuel_type", e.target.value)}
            placeholder="Дизель"
          />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Коробка">
          <TextInput
            value={form.transmission}
            onChange={(e) => update("transmission", e.target.value)}
            placeholder="Автомат"
          />
        </Field>
        <Field label="Кузов">
          <TextInput
            value={form.body_type}
            onChange={(e) => update("body_type", e.target.value)}
            placeholder="Хэтчбек"
          />
        </Field>
      </div>

      <Field label="Цвет">
        <TextInput
          value={form.color}
          onChange={(e) => update("color", e.target.value)}
          placeholder="Чёрный"
        />
      </Field>

      <Field label="Описание">
        <TextArea
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          placeholder="Состояние, комплектация, история обслуживания"
        />
      </Field>

      <PhotoUploader
        label="Главное фото"
        hint="Показывается в списке и на обложке карточки."
        value={mainPhoto}
        onChange={setMainPhoto}
      />

      <PhotoListUploader
        label="Дополнительные фото"
        hint="Можно выбрать сразу несколько."
        value={gallery}
        onChange={setGallery}
      />

      <Field label="Статус">
        <Select value={form.status} onChange={(e) => update("status", e.target.value)}>
          {CAR_STATUSES.map((status) => (
            <option key={status} value={status}>
              {CAR_STATUS_LABELS[status]}
            </option>
          ))}
        </Select>
      </Field>

      <SubmitBar saving={saving} onCancel={() => router.push("/admin")} />
    </form>
  );
}
