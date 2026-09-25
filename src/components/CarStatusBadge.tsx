import { dict } from "@/lib/dictionary";
import type { Lang } from "@/lib/i18n";
import { type CarStatus } from "@/types/car";

// Цвет несёт смысл: жёлтый — машина занята, но сделка ещё не закрыта;
// красный — продана. Цвета заданы сплошными, без прозрачности: значок часто
// лежит поверх фотографии, и полупрозрачный фон пропускал бы её сквозь себя.
const styles: Record<CarStatus, { badge: string; dot: string }> = {
  available: {
    badge: "border-border bg-surface-2 text-muted",
    dot: "bg-neutral-500",
  },
  reserved: {
    badge: "border-[#6b5518] bg-[#3a2d0a] text-[#f3c33f]",
    dot: "bg-[#f5b921]",
  },
  sold: {
    badge: "border-[#6e2a26] bg-[#3a1614] text-[#ef7b72]",
    dot: "bg-[#e5484d]",
  },
  draft: {
    badge: "border-border bg-surface-2 text-muted",
    dot: "bg-neutral-500",
  },
  hidden: {
    badge: "border-border bg-surface-2 text-muted",
    dot: "bg-neutral-500",
  },
};

export function CarStatusBadge({
  status,
  className = "",
  lang = "uk",
}: {
  status: CarStatus;
  className?: string;
  lang?: Lang;
}) {
  const style = styles[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border px-2 py-1 text-[11px] font-medium leading-none tracking-[0.01em] ${style.badge} ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      {dict(lang).status[status]}
    </span>
  );
}
