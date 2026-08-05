import { getSupabaseClient } from "./supabase";
import { demoCars, demoServices } from "./demo-data";
import { CAR_COLUMNS, type Car } from "@/types/car";
import { SERVICE_COLUMNS, type Service } from "@/types/service";

// "demo" — показаны данные-заглушки из demo-data.ts, потому что Supabase ещё
// не подключён. Интерфейс помечает такие данные, чтобы их не приняли за
// настоящие объявления.
export type DataSource = "supabase" | "demo";

export async function loadCars(): Promise<{ cars: Car[]; source: DataSource }> {
  const supabase = getSupabaseClient();
  if (!supabase) return { cars: demoCars, source: "demo" };

  const { data, error } = await supabase
    .from("cars")
    .select(CAR_COLUMNS)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Не удалось загрузить машины из Supabase:", error.message);
    return { cars: demoCars, source: "demo" };
  }

  return { cars: (data ?? []) as Car[], source: "supabase" };
}

export async function loadCar(
  id: string
): Promise<{ car: Car | null; source: DataSource }> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return { car: demoCars.find((car) => car.id === id) ?? null, source: "demo" };
  }

  const { data, error } = await supabase
    .from("cars")
    .select(CAR_COLUMNS)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Не удалось загрузить машину из Supabase:", error.message);
    return { car: demoCars.find((car) => car.id === id) ?? null, source: "demo" };
  }

  return { car: (data as Car) ?? null, source: "supabase" };
}

export async function loadServices(): Promise<{
  services: Service[];
  source: DataSource;
}> {
  const supabase = getSupabaseClient();
  if (!supabase) return { services: demoServices, source: "demo" };

  const { data, error } = await supabase
    .from("services")
    .select(SERVICE_COLUMNS)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Не удалось загрузить услуги из Supabase:", error.message);
    return { services: demoServices, source: "demo" };
  }

  return { services: (data ?? []) as Service[], source: "supabase" };
}
