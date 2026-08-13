export const CAR_STATUSES = [
  "draft",
  "available",
  "reserved",
  "sold",
  "hidden",
] as const;

export type CarStatus = (typeof CAR_STATUSES)[number];

// Что видит обычный посетитель. draft и hidden до него не доходят: их
// отсекает RLS-политика в supabase/schema.sql.
export const PUBLIC_CAR_STATUSES: CarStatus[] = ["available", "reserved", "sold"];

export const CAR_STATUS_LABELS: Record<CarStatus, string> = {
  draft: "Черновик",
  available: "В наличии",
  reserved: "Зарезервирован",
  sold: "Продан",
  hidden: "Скрыт",
};

export interface Car {
  id: string;
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

// Набор колонок для select в Supabase — держать синхронно с интерфейсом выше.
export const CAR_COLUMNS =
  "id, brand, model, price, year, mileage, fuel_type, transmission, body_type, color, description, photos, status";
