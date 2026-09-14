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
