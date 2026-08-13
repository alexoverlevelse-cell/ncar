import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api-auth";
import { CAR_COLUMNS } from "@/types/car";
import { parseCarInput } from "@/lib/validate";

// Создание машины. Права проверяются на сервере — скрытая кнопка в интерфейсе
// защитой не считается.
export async function POST(request: Request) {
  const guard = await requireAdmin(request);
  if (!guard.ok) return guard.response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  const parsed = parseCarInput(body, { partial: false });
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const { data, error } = await guard.supabase
    .from("cars")
    .insert({ ...parsed.value, owner_telegram_id: guard.auth.user.id })
    .select(CAR_COLUMNS)
    .single();

  if (error) {
    console.error("Не удалось создать машину:", error.message);
    return NextResponse.json({ error: "Не удалось сохранить" }, { status: 500 });
  }

  return NextResponse.json({ car: data }, { status: 201 });
}
