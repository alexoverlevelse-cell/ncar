// Фон «вариант 1» из макета 03: цельный графит, широкий мягкий серебристый
// свет в обоих верхних углах, сдержанный красный отсвет снизу слева и
// нейтральный снизу справа. Свет лежит ПОЗАДИ интерфейса — карточки остаются
// тёмными и непрозрачными (см. README_ДЛЯ_CLAUDE.md).
//
// На экране знакомства (макет 02) фон почти плоский: там справа стоит портрет
// Олега, и его непрозрачная подложка перекрывала бы свет тёмным прямоугольником.
// Поэтому для него отдельный вариант — только мягкий свет слева.
const LAYERS = {
  full: [
    "radial-gradient(60% 38% at 0% 0%, rgba(241,239,232,0.11), transparent 70%)",
    "radial-gradient(60% 38% at 100% 0%, rgba(241,239,232,0.10), transparent 70%)",
    "radial-gradient(55% 32% at 0% 100%, rgba(182,66,70,0.16), transparent 70%)",
    "radial-gradient(55% 30% at 100% 100%, rgba(165,167,167,0.07), transparent 70%)",
  ],
  welcome: [
    "radial-gradient(70% 30% at 0% 0%, rgba(241,239,232,0.07), transparent 72%)",
    "radial-gradient(60% 28% at 0% 100%, rgba(182,66,70,0.10), transparent 72%)",
  ],
} as const;

export function ScreenGlow({
  variant = "full",
}: {
  variant?: keyof typeof LAYERS;
}) {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{ backgroundImage: LAYERS[variant].join(",") }}
    />
  );
}

// Фон главного меню по актуальному референсу: стена гаража с лёгкой
// фактурой бетона, два настенных светильника в верхних углах (тёплый свет
// падает вниз с затуханием) и едва заметный красный отсвет снизу слева.
// Текст и карточки не светятся — свет принадлежит только окружению.
export function GarageGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* фактура бетонной стены */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "180px 180px",
        }}
      />

      {/* тёплый свет от светильников + красный отсвет + лёгкое затемнение пола */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            "radial-gradient(40% 42% at 9% 0%, rgba(255,224,173,0.20), transparent 66%)",
            "radial-gradient(40% 42% at 91% 0%, rgba(255,224,173,0.17), transparent 66%)",
            "radial-gradient(58% 30% at 6% 100%, rgba(182,66,70,0.13), transparent 70%)",
            "linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.24) 100%)",
          ].join(","),
        }}
      />

      {/* корпуса светильников */}
      {["9%", "91%"].map((left) => (
        <svg
          key={left}
          viewBox="0 0 24 16"
          className="absolute top-2 h-4 w-6 -translate-x-1/2 text-black/75"
          style={{ left }}
        >
          <rect x="7" y="0" width="10" height="6" rx="2" fill="currentColor" />
          <ellipse cx="12" cy="7.5" rx="6.5" ry="1.7" fill="currentColor" />
        </svg>
      ))}
    </div>
  );
}
