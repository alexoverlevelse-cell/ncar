import { dict } from "@/lib/dictionary";
import type { Lang } from "@/lib/i18n";

// Показывается, пока данные берутся из demo-data.ts, чтобы демонстрационные
// карточки не приняли за реальные объявления. Исчезнет сам, когда подключим
// Supabase с настоящими данными.
export function DemoNotice({
  className = "",
  lang = "uk",
}: {
  className?: string;
  lang?: Lang;
}) {
  return (
    <p
      className={`rounded-xl border border-dashed border-border px-3 py-2 text-xs text-muted ${className}`}
    >
      {dict(lang).cars.demoNotice}
    </p>
  );
}
