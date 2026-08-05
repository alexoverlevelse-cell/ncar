// Показывается, пока данные берутся из demo-data.ts, чтобы демонстрационные
// карточки не приняли за реальные объявления. Исчезнет сам, когда подключим
// Supabase с настоящими данными.
export function DemoNotice({ className = "" }: { className?: string }) {
  return (
    <p
      className={`rounded-xl border border-dashed border-border px-3 py-2 text-xs text-muted ${className}`}
    >
      Демонстрационные данные — для примера, пока не подключена база.
    </p>
  );
}
