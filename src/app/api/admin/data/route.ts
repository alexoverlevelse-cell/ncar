import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api-auth";
import { CAR_COLUMNS } from "@/types/car";
import { SERVICE_COLUMNS } from "@/types/service";

// Списки для админки: в отличие от публичных страниц, сюда попадают также
// черновики и скрытые записи (читаем через service role, минуя RLS).
export async function POST(request: Request) {
  const guard = await requireAdmin(request);
  if (!guard.ok) return guard.response;

  const [carsResult, servicesResult] = await Promise.all([
    guard.supabase.from("cars").select(CAR_COLUMNS).order("created_at", { ascending: false }),
    guard.supabase
      .from("services")
      .select(SERVICE_COLUMNS)
      .order("created_at", { ascending: false }),
  ]);

  if (carsResult.error || servicesResult.error) {
    console.error(
      "Не удалось загрузить данные для админки:",
      carsResult.error?.message ?? servicesResult.error?.message
    );
    return NextResponse.json({ error: "Не удалось загрузить данные" }, { status: 500 });
  }

  return NextResponse.json({
    cars: carsResult.data ?? [],
    services: servicesResult.data ?? [],
  });
}
