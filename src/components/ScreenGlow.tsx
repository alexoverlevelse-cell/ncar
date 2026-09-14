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

      {/* широкий реалистичный свет: он виден на стене вокруг карточек */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            "radial-gradient(44% 34% at 10% 10%, rgba(255,225,177,0.24), transparent 72%)",
            "radial-gradient(44% 34% at 90% 10%, rgba(255,225,177,0.22), transparent 72%)",
            "radial-gradient(50% 32% at 8% 100%, rgba(182,66,70,0.16), transparent 72%)",
            "radial-gradient(45% 28% at 92% 82%, rgba(255,225,177,0.07), transparent 76%)",
            "linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.24) 100%)",
          ].join(","),
        }}
      />

      {/* корпуса светильников */}
      {["9%", "91%"].map((left) => (
        <div key={left} className="absolute top-5 h-10 w-7 -translate-x-1/2 rounded-[0.45rem_0.45rem_0.6rem_0.6rem] bg-[linear-gradient(90deg,#090909,#252525_50%,#070707)] shadow-[0_8px_10px_rgba(0,0,0,0.6)]" style={{ left }}>
          <div className="absolute -bottom-0.5 left-1/2 h-2 w-5 -translate-x-1/2 rounded-[50%] bg-[#ffe6bb] shadow-[0_8px_16px_5px_rgba(255,222,168,0.34)]" />
        </div>
      ))}
    </div>
  );
}
