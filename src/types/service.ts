export interface Service {
  id: string;
  title: string;
  description: string | null;
  price: number | null; // null — "Цена по запросу"
  duration: string | null;
  photo: string | null;
}

export const SERVICE_COLUMNS = "id, title, description, price, duration, photo";
