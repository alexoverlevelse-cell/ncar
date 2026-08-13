import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api-auth";
import { SERVICE_COLUMNS } from "@/types/service";
import { parseServiceInput } from "@/lib/validate";

export async function POST(request: Request) {
  const guard = await requireAdmin(request);
  if (!guard.ok) return guard.response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  const parsed = parseServiceInput(body, { partial: false });
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const { data, error } = await guard.supabase
    .from("services")
    .insert({ ...parsed.value, owner_telegram_id: guard.auth.user.id })
    .select(SERVICE_COLUMNS)
    .single();

  if (error) {
    console.error("Не удалось создать услугу:", error.message);
    return NextResponse.json({ error: "Не удалось сохранить" }, { status: 500 });
  }

  return NextResponse.json({ service: data }, { status: 201 });
}
