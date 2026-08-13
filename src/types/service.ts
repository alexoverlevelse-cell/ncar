export const SERVICE_STATUSES = ["active", "inactive"] as const;

export type ServiceStatus = (typeof SERVICE_STATUSES)[number];

export const SERVICE_STATUS_LABELS: Record<ServiceStatus, string> = {
  active: "Показывается",
  inactive: "Скрыта",
};

export interface Service {
  id: string;
  title: string;
  description: string | null;
  price: number | null; // null — "Цена по запросу"
  duration: string | null;
  photo: string | null;
  contact: string | null; // ссылка t.me или телефон исполнителя
  location: string | null; // где оказывается услуга
  status: ServiceStatus;
}

export const SERVICE_COLUMNS =
  "id, title, description, price, duration, photo, contact, location, status";
