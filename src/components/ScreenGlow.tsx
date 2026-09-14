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
            "radial-gradient(52% 34% at 5% 100%, rgba(182,66,70,0.20), transparent 72%)",
            "radial-gradient(48% 35% at 93% 100%, rgba(240,240,235,0.18), transparent 73%)",
            "linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.24) 100%)",
          ].join(","),
        }}
      />

      {/* граница и отражающий бетонный пол */}
      <div className="absolute inset-x-0 bottom-0 h-[38%] border-t border-white/15 bg-[linear-gradient(180deg,rgba(160,160,154,0.16),rgba(47,48,47,0.40)_28%,rgba(10,11,11,0.58))]" />
      <div
        className="absolute inset-x-0 bottom-0 h-[38%] opacity-90"
        style={{
          backgroundImage: [
            "radial-gradient(52% 76% at 88% 90%, rgba(248,248,242,0.36), transparent 72%)",
            "radial-gradient(42% 70% at 16% 94%, rgba(248,248,242,0.23), transparent 74%)",
            "radial-gradient(42% 68% at 3% 100%, rgba(190,48,53,0.20), transparent 72%)",
            "linear-gradient(100deg, transparent 28%, rgba(255,255,255,0.10) 50%, transparent 70%)",
          ].join(","),
        }}
      />
      <div className="absolute inset-x-0 bottom-[37.8%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* корпуса светильников */}
      {["9%", "91%"].map((left) => (
        <div key={left} className="absolute top-5 h-10 w-7 -translate-x-1/2 rounded-[0.45rem_0.45rem_0.6rem_0.6rem] bg-[linear-gradient(90deg,#090909,#252525_50%,#070707)] shadow-[0_8px_10px_rgba(0,0,0,0.6)] before:absolute before:left-1/2 before:top-1/2 before:-z-10 before:h-5 before:w-9 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-md before:bg-[#111] before:shadow-[0_2px_8px_rgba(0,0,0,0.65)]" style={{ left }}>
          <div className="absolute -bottom-0.5 left-1/2 h-2 w-5 -translate-x-1/2 rounded-[50%] bg-[#ffe6bb] shadow-[0_8px_16px_5px_rgba(255,222,168,0.34)]" />
        </div>
      ))}
    </div>
  );
}
