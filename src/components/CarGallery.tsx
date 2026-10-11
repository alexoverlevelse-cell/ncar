"use client";

import { useRef, useState } from "react";
import { ArrowLeftIcon } from "./icons";

export function CarGallery({ photos, title, lang }: {
  photos: string[]; title: string; lang: "uk" | "en";
}) {
  const strip = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  function move(direction: number) {
    const element = strip.current;
    if (!element) return;
    const current = Math.round(element.scrollLeft / element.clientWidth);
    const next = Math.max(0, Math.min(photos.length - 1, current + direction));
    element.scrollTo({ left: next * element.clientWidth, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }
  const buttonClass = "absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/65 text-white shadow-lg backdrop-blur transition hover:bg-black/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-30";
  return <div className="relative" role="region" aria-label={lang === "en" ? "Car photos" : "Фотографії автомобіля"}>
    <div ref={strip} className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      onScroll={() => { const element = strip.current; if (element) setIndex(Math.round(element.scrollLeft / element.clientWidth)); }}>
      {photos.map((photo, i) => (
        // eslint-disable-next-line @next/next/no-img-element -- Photos are hosted in Supabase Storage.
        <img key={`${photo}-${i}`} src={photo} alt={`${title}, ${lang === "en" ? "photo" : "фото"} ${i + 1}`} className="aspect-[4/3] w-full shrink-0 snap-center object-cover" />
      ))}
    </div>
    <button type="button" className={`${buttonClass} left-3`} disabled={index === 0} aria-label={lang === "en" ? "Previous photo" : "Попереднє фото"} onClick={() => move(-1)}><ArrowLeftIcon className="h-5 w-5" /></button>
    <button type="button" className={`${buttonClass} right-3`} disabled={index === photos.length - 1} aria-label={lang === "en" ? "Next photo" : "Наступне фото"} onClick={() => move(1)}><ArrowLeftIcon className="h-5 w-5 rotate-180" /></button>
    <p className="pointer-events-none absolute bottom-3 right-4 rounded-full bg-black/75 px-3 py-1 text-xs font-semibold text-white backdrop-blur" aria-live="polite">{index + 1} / {photos.length}</p>
  </div>;
}
