import { NextResponse } from "next/server";
import { authenticate } from "@/lib/telegram-auth";
import { readInitData } from "@/lib/api-auth";

// Клиент спрашивает свою роль, чтобы решить, показывать ли кнопку админки.
// Скрытие кнопки — только удобство: настоящая защита в роутах записи.
export async function POST(request: Request) {
  const auth = await authenticate(await readInitData(request));

  if (!auth) {
    return NextResponse.json({ role: "viewer", authenticated: false });
  }

  return NextResponse.json({
    role: auth.role,
    authenticated: true,
    user: { id: auth.user.id, first_name: auth.user.first_name },
  });
}
