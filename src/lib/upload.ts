"use client";

import { apiFetch } from "./telegram";
import { getSupabaseClient } from "./supabase";

const PHOTO_BUCKET = "photos";
const MAX_SIZE_MB = 15;

export type UploadResult =
  | { ok: true; url: string }
  | { ok: false; error: string };

// Загрузка идёт в два шага: сервер (проверив права админа) выдаёт подписанную
// ссылку, а сам файл уходит с телефона прямо в Supabase Storage.
export async function uploadPhoto(file: File): Promise<UploadResult> {
  if (!file.type.startsWith("image/")) {
    return { ok: false, error: "Это не изображение" };
  }
  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    return { ok: false, error: `Файл больше ${MAX_SIZE_MB} МБ` };
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return { ok: false, error: "Хранилище не подключено" };
  }

  const signed = await apiFetch("/api/upload/sign", {
    method: "POST",
    body: { contentType: file.type },
  });
  if (!signed.ok) return { ok: false, error: signed.error };

  const { path, token, publicUrl } = signed.data as {
    path: string;
    token: string;
    publicUrl: string;
  };

  const { error } = await supabase.storage
    .from(PHOTO_BUCKET)
    .uploadToSignedUrl(path, token, file);

  if (error) {
    return { ok: false, error: `Не удалось загрузить файл: ${error.message}` };
  }

  return { ok: true, url: publicUrl };
}
