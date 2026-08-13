import { CAR_STATUSES, type CarStatus } from "@/types/car";
import { SERVICE_STATUSES, type ServiceStatus } from "@/types/service";

type Parsed<T> = { value: T } | { error: string };

function asTrimmedString(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim();
  return trimmed === "" ? null : trimmed;
}

function asNumber(raw: unknown): number | null {
  if (typeof raw === "number" && Number.isFinite(raw)) return raw;
  if (typeof raw === "string" && raw.trim() !== "") {
    const parsed = Number(raw.replace(/\s/g, "").replace(",", "."));
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

function asStringArray(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter((item): item is string => typeof item === "string" && item.trim() !== "");
}

export interface CarInput {
  brand: string;
  model: string;
  price: number;
  year: number;
  mileage: number | null;
  fuel_type: string | null;
  transmission: string | null;
  body_type: string | null;
  color: string | null;
  description: string | null;
  photos: string[];
  status: CarStatus;
}

export function parseCarInput(
  body: unknown,
  { partial }: { partial: boolean }
): Parsed<Partial<CarInput>> {
  if (typeof body !== "object" || body === null) {
    return { error: "Некорректный запрос" };
  }
  const raw = body as Record<string, unknown>;
  const value: Partial<CarInput> = {};

  const brand = asTrimmedString(raw.brand);
  const model = asTrimmedString(raw.model);
  const price = asNumber(raw.price);
  const year = asNumber(raw.year);

  if (!partial || raw.brand !== undefined) {
    if (!brand) return { error: "Укажите марку" };
    value.brand = brand;
  }
  if (!partial || raw.model !== undefined) {
    if (!model) return { error: "Укажите модель" };
    value.model = model;
  }
  if (!partial || raw.price !== undefined) {
    if (price === null || price < 0) return { error: "Укажите корректную цену" };
    value.price = price;
  }
  if (!partial || raw.year !== undefined) {
    const currentYear = new Date().getFullYear();
    if (year === null || year < 1900 || year > currentYear + 1) {
      return { error: "Укажите корректный год выпуска" };
    }
    value.year = year;
  }

  if (raw.mileage !== undefined) {
    const mileage = asNumber(raw.mileage);
    if (mileage !== null && mileage < 0) return { error: "Пробег не может быть отрицательным" };
    value.mileage = mileage;
  }
  if (raw.fuel_type !== undefined) value.fuel_type = asTrimmedString(raw.fuel_type);
  if (raw.transmission !== undefined) value.transmission = asTrimmedString(raw.transmission);
  if (raw.body_type !== undefined) value.body_type = asTrimmedString(raw.body_type);
  if (raw.color !== undefined) value.color = asTrimmedString(raw.color);
  if (raw.description !== undefined) value.description = asTrimmedString(raw.description);
  if (raw.photos !== undefined) value.photos = asStringArray(raw.photos);

  if (!partial || raw.status !== undefined) {
    const status = asTrimmedString(raw.status) ?? "available";
    if (!CAR_STATUSES.includes(status as CarStatus)) {
      return { error: "Неизвестный статус" };
    }
    value.status = status as CarStatus;
  }

  return { value };
}

export interface ServiceInput {
  title: string;
  description: string | null;
  price: number | null;
  duration: string | null;
  photo: string | null;
  contact: string | null;
  location: string | null;
  status: ServiceStatus;
}

export function parseServiceInput(
  body: unknown,
  { partial }: { partial: boolean }
): Parsed<Partial<ServiceInput>> {
  if (typeof body !== "object" || body === null) {
    return { error: "Некорректный запрос" };
  }
  const raw = body as Record<string, unknown>;
  const value: Partial<ServiceInput> = {};

  if (!partial || raw.title !== undefined) {
    const title = asTrimmedString(raw.title);
    if (!title) return { error: "Укажите название услуги" };
    value.title = title;
  }

  if (raw.description !== undefined) value.description = asTrimmedString(raw.description);
  if (raw.duration !== undefined) value.duration = asTrimmedString(raw.duration);
  if (raw.photo !== undefined) value.photo = asTrimmedString(raw.photo);
  if (raw.contact !== undefined) value.contact = asTrimmedString(raw.contact);
  if (raw.location !== undefined) value.location = asTrimmedString(raw.location);

  if (raw.price !== undefined) {
    // Пустая цена — это "по запросу", а не ошибка.
    const price = asNumber(raw.price);
    if (price !== null && price < 0) return { error: "Цена не может быть отрицательной" };
    value.price = price;
  }

  if (!partial || raw.status !== undefined) {
    const status = asTrimmedString(raw.status) ?? "active";
    if (!SERVICE_STATUSES.includes(status as ServiceStatus)) {
      return { error: "Неизвестный статус" };
    }
    value.status = status as ServiceStatus;
  }

  return { value };
}
