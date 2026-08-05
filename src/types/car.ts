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
  photos: string[];
  status: CarStatus;
}
