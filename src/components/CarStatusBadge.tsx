import { CAR_STATUS_LABELS, type CarStatus } from "@/types/car";

// Цвет несёт смысл: зелёный — машина ещё в игре (кто-то держит бронь),
// красный — сделка закрыта. Серый — служебные статусы, их видит только админ.
const styles: Record<CarStatus, string> = {
  available: "bg-surface-2 text-muted ring-border",
  reserved: "bg-green-500/15 text-green-400 ring-green-500/40",
  sold: "bg-red-500/15 text-red-400 ring-red-500/40",
  draft: "bg-surface-2 text-muted ring-border",
  hidden: "bg-surface-2 text-muted ring-border",
};

export function CarStatusBadge({
  status,
  className = "",
}: {
  status: CarStatus;
  className?: string;
}) {
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 ${styles[status]} ${className}`}
    >
      {CAR_STATUS_LABELS[status]}
    </span>
  );
}
