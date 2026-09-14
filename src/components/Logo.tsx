// Оригинальный логотип из 05-логотип-оригинал.jpg: серебристый контур авто,
// белый OLEH, красный DK, AUTO с красными линиями. Растровая копия с
// прозрачным фоном лежит в public/brand/logo.png — текстовой имитацией
// заменять нельзя (см. README_ДЛЯ_CLAUDE.md).
const WIDTHS = {
  lg: 148,
  md: 140,
} as const;

export function Logo({
  className = "",
  size = "md",
}: {
  className?: string;
  size?: keyof typeof WIDTHS;
}) {
  const width = WIDTHS[size];

  return (
    // eslint-disable-next-line @next/next/no-img-element -- локальный статический ассет из public/
    <img
      src="/brand/logo.png"
      alt="OLEH DK AUTO"
      width={width}
      height={Math.round((width * 355) / 1054)}
      className={className}
      style={{ width, height: "auto" }}
    />
  );
}
