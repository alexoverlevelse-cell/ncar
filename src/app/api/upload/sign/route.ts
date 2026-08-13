import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { requireAdmin } from "@/lib/api-auth";

export const PHOTO_BUCKET = "photos";

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/heic": "heic",
};

// Файл заливается с телефона напрямую в Supabase Storage по подписанной
// ссылке. Через наш сервер его не гоняем: у Vercel лимит тела запроса
// 4.5 МБ, а фото с камеры обычно больше.
export async function POST(request: Request) {
  const guard = await requireAdmin(request);
  if (!guard.ok) return guard.response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  const { contentType } = (body ?? {}) as { contentType?: string };
  const extension = contentType ? ALLOWED_TYPES[contentType] : undefined;

  if (!extension) {
    return NextResponse.json(
      { error: "Можно загружать только изображения: JPG, PNG, WEBP или HEIC" },
      { status: 400 }
    );
  }

  const path = `uploads/${randomUUID()}.${extension}`;

  const { data, error } = await guard.supabase.storage
    .from(PHOTO_BUCKET)
    .createSignedUploadUrl(path);

  if (error || !data) {
    console.error("Не удалось создать ссылку для загрузки:", error?.message);
    return NextResponse.json(
      {
        error:
          "Не удалось подготовить загрузку. Проверьте, что в Supabase создано хранилище «photos».",
      },
      { status: 500 }
    );
  }

  const { data: publicUrlData } = guard.supabase.storage
    .from(PHOTO_BUCKET)
    .getPublicUrl(path);

  return NextResponse.json({
    path: data.path,
    token: data.token,
    publicUrl: publicUrlData.publicUrl,
  });
}
