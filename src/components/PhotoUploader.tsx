"use client";

import { useRef, useState } from "react";
import { uploadPhoto } from "@/lib/upload";
import { PlusIcon, TrashIcon } from "./icons";

function UploadError({ message }: { message: string | null }) {
  if (!message) return null;
  return <p className="text-xs text-red-400">{message}</p>;
}

// Одно фото — например, главное фото машины или обложка услуги.
export function PhotoUploader({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  value: string | null;
  onChange: (url: string | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = ""; // чтобы повторный выбор того же файла сработал
    if (!file) return;

    setUploading(true);
    setError(null);
    const result = await uploadPhoto(file);
    setUploading(false);

    if (result.ok) onChange(result.url);
    else setError(result.error);
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm text-muted">{label}</span>

      {value ? (
        <div className="relative overflow-hidden rounded-xl border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element -- домен Supabase Storage заранее не известен */}
          <img src={value} alt="" className="aspect-[4/3] w-full object-cover" />
          <button
            type="button"
            onClick={() => onChange(null)}
            aria-label="Удалить фото"
            className="absolute right-2 top-2 rounded-lg bg-background/80 p-2 text-red-400 backdrop-blur"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-surface text-muted disabled:opacity-60"
        >
          <PlusIcon className="h-6 w-6" />
          <span className="text-sm">{uploading ? "Загружаем…" : "Выбрать фото"}</span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />

      {hint && <span className="text-xs text-muted">{hint}</span>}
      <UploadError message={error} />
    </div>
  );
}

// Несколько фото — галерея машины. Порядок сохраняется.
export function PhotoListUploader({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  value: string[];
  onChange: (urls: string[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (files.length === 0) return;

    setUploading(true);
    setError(null);

    const uploaded: string[] = [];
    for (const file of files) {
      const result = await uploadPhoto(file);
      if (result.ok) uploaded.push(result.url);
      else setError(result.error);
    }

    setUploading(false);
    if (uploaded.length > 0) onChange([...value, ...uploaded]);
  }

  function remove(url: string) {
    onChange(value.filter((item) => item !== url));
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm text-muted">{label}</span>

      <div className="grid grid-cols-3 gap-2">
        {value.map((url) => (
          <div
            key={url}
            className="relative overflow-hidden rounded-lg border border-border"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- домен Supabase Storage заранее не известен */}
            <img src={url} alt="" className="aspect-square w-full object-cover" />
            <button
              type="button"
              onClick={() => remove(url)}
              aria-label="Удалить фото"
              className="absolute right-1 top-1 rounded-md bg-background/80 p-1.5 text-red-400 backdrop-blur"
            >
              <TrashIcon className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex aspect-square flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-border bg-surface text-muted disabled:opacity-60"
        >
          <PlusIcon className="h-5 w-5" />
          <span className="text-[11px]">{uploading ? "Грузим…" : "Добавить"}</span>
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFiles}
        className="hidden"
      />

      {hint && <span className="text-xs text-muted">{hint}</span>}
      <UploadError message={error} />
    </div>
  );
}
