import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api-auth";
import { CAR_COLUMNS } from "@/types/car";
import { parseCarInput } from "@/lib/validate";

// Изменение машины, включая смену статуса на "зарезервирован" / "продан".
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = await requireAdmin(request);
  if (!guard.ok) return guard.response;

  const { id } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  const parsed = parseCarInput(body, { partial: true });
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }
  if (Object.keys(parsed.value).length === 0) {
    return NextResponse.json({ error: "Нечего сохранять" }, { status: 400 });
  }

  const { data, error } = await guard.supabase
    .from("cars")
    .update(parsed.value)
    .eq("id", id)
    .select(CAR_COLUMNS)
    .maybeSingle();

  if (error) {
    console.error("Не удалось изменить машину:", error.message);
    return NextResponse.json({ error: "Не удалось сохранить" }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ error: "Машина не найдена" }, { status: 404 });
  }

  return NextResponse.json({ car: data });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = await requireAdmin(request);
  if (!guard.ok) return guard.response;

  const { id } = await params;

  const { error } = await guard.supabase.from("cars").delete().eq("id", id);

  if (error) {
    console.error("Не удалось удалить машину:", error.message);
    return NextResponse.json({ error: "Не удалось удалить" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
