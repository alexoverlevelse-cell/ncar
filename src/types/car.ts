export type CarStatus = "available" | "reserved" | "sold";

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
