"use client";

import type { ReactNode } from "react";

const inputClass =
  "w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-foreground placeholder:text-muted focus:border-accent focus:outline-none";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm text-muted">{label}</span>
      {children}
      {hint && <span className="text-xs text-muted">{hint}</span>}
    </label>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={inputClass} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputClass} min-h-24 resize-y`} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={inputClass} />;
}

export function SubmitBar({
  saving,
  onCancel,
  submitLabel = "Сохранить",
}: {
  saving: boolean;
  onCancel: () => void;
  submitLabel?: string;
}) {
  return (
    <div className="flex gap-3 pt-2">
      <button
        type="submit"
        disabled={saving}
        className="flex-1 rounded-xl bg-accent py-3 font-medium text-black disabled:opacity-60"
      >
        {saving ? "Сохраняем…" : submitLabel}
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="rounded-xl border border-border px-5 py-3 font-medium text-muted"
      >
        Отмена
      </button>
    </div>
  );
}
