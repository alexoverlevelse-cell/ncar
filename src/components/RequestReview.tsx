"use client";

import { useEffect, useRef, useState } from "react";
import { TelegramLink } from "./TelegramLink";
import { dict } from "@/lib/dictionary";
import type { Lang } from "@/lib/i18n";
import { inspectionChecks, selectionSteps, serviceCatalog } from "@/lib/service-catalog";
import { buildTelegramLink } from "@/lib/site-config";

export function RequestReview({ message, type, lang, onClose }: {
  message: string; type: string; lang: Lang; onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [accepted, setAccepted] = useState(false);
  const { request: t, services: s } = dict(lang);
  const inspection = type === "found" || type === "search";
  const service = serviceCatalog.find((item) => item.requestType === (inspection ? "inspection" : type));
  const link = buildTelegramLink(`${message}\n\n${t.acknowledgedMessage}`);

  useEffect(() => {
    const element = dialog.current;
    const overflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element?.close();
      document.body.style.overflow = overflow;
    };
  }, []);

  return (
    <dialog ref={dialog} onCancel={onClose} aria-labelledby="review-title" className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-md overflow-y-auto overscroll-contain rounded-3xl border border-white/20 bg-[#191b1c] p-0 text-white shadow-2xl backdrop:bg-black/75">
      <div className="space-y-5 p-5">
        <div className="flex items-start justify-between gap-3">
          <h2 id="review-title" className="text-2xl font-bold">{t.reviewTitle}</h2>
          <button type="button" autoFocus onClick={onClose} aria-label={t.editRequest} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 text-xl">×</button>
        </div>
        <p className="text-sm leading-relaxed">{t.reviewIntro}</p>
        <section className="space-y-3">
          <h3 className="font-bold">{inspection ? s.inspectionPriceTitle : s.priceLabel}</h3>
          {inspection ? <>
            <dl className="divide-y divide-white/15 rounded-2xl border border-white/15 bg-white/5">
              {s.priceRows.map(([label, price]) => <div key={label} className="flex items-center justify-between gap-3 p-3 text-sm"><dt>{label}</dt><dd className="shrink-0 font-bold text-[#F6C644]">{price}</dd></div>)}
            </dl>
            <p className="text-sm leading-relaxed"><strong>{s.priceNoteStrong}</strong> {s.priceNote}</p>
            <p className="rounded-xl border border-[#F6C644]/30 bg-[#F6C644]/10 p-3 text-sm leading-relaxed">{s.travelNote}</p>
          </> : <p className="rounded-xl border border-white/15 p-3 font-bold text-[#F6C644]">{service?.price[lang]}</p>}
        </section>
        <section className="space-y-3">
          <h3 className="font-bold">{s.whatIncluded}</h3>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed">{service?.items.map(item => <li key={item.uk}>{item[lang]}</li>)}</ul>
        </section>
        {type === "search" && <section className="space-y-3"><h3 className="font-bold">{s.stepsTitle}</h3><ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed">{selectionSteps.map(([title, body]) => <li key={title.uk}><strong>{title[lang]}</strong><p>{body[lang]}</p></li>)}</ol></section>}
        {inspection && <section className="space-y-3"><h3 className="font-bold">{s.checksTitle}</h3><ul className="space-y-3 text-sm leading-relaxed">{inspectionChecks.map(([, title, body]) => <li key={title.uk}><strong>{title[lang]}</strong><p>{body[lang]}</p></li>)}</ul></section>}
        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/25 p-4 text-sm font-semibold">
          <input type="checkbox" checked={accepted} onChange={event => setAccepted(event.target.checked)} className="mt-0.5 h-5 w-5 shrink-0 accent-[#B64246]" />
          {t.acknowledge}
        </label>
        <p className="text-sm leading-relaxed">{t.reviewHint}</p>
        {accepted && link ? <TelegramLink href={link} className="flex min-h-14 items-center justify-center rounded-2xl bg-accent px-4 text-center font-bold text-white">{t.reviewSend}</TelegramLink> : <button type="button" disabled className="min-h-14 w-full cursor-not-allowed rounded-2xl bg-white/10 px-4 font-bold text-white/50">{t.reviewSend}</button>}
        <button type="button" onClick={onClose} className="min-h-11 w-full text-sm font-semibold underline underline-offset-4">{t.editRequest}</button>
      </div>
    </dialog>
  );
}
