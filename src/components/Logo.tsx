// Вордмарк из утверждённых макетов: "OLEH DK" (DK — акцентным красным) +
// "AUTO" разрядкой ниже или в строку. Текст здесь фиксированный (не из
// siteConfig) — это визуальный лого-блок, а не название для метаданных.
export function Logo({
  className = "",
  variant = "stacked",
}: {
  className?: string;
  variant?: "stacked" | "inline";
}) {
  if (variant === "inline") {
    return (
      <span className={`inline-flex items-baseline gap-2 ${className}`}>
        <span className="text-sm font-extrabold tracking-tight">
          OLEH <span className="text-accent">DK</span>
        </span>
        <span className="text-xs font-semibold tracking-[0.25em] text-muted">
          AUTO
        </span>
      </span>
    );
  }

  return (
    <span className={`inline-flex flex-col ${className}`}>
      <span className="text-2xl font-extrabold leading-none tracking-tight">
        OLEH <span className="text-accent">DK</span>
      </span>
      <span className="mt-1.5 text-[11px] font-semibold tracking-[0.35em] text-muted">
        AUTO
      </span>
    </span>
  );
}
