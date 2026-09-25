import Link from "next/link";
import { ChevronRightIcon, TelegramIcon } from "@/components/icons";
import { PageHeader } from "@/components/PageHeader";
import { dict } from "@/lib/dictionary";
import { getLang } from "@/lib/i18n-server";
import { serviceCatalog } from "@/lib/service-catalog";

export default async function ServicesPage() {
  const lang = await getLang();
  const t = dict(lang).services;

  return (
    <main className="flex flex-1 flex-col">
      <PageHeader
        backHref="/home"
        lang={lang}
        title={t.title}
        subtitle={t.subtitle}
      />
      <div className="flex flex-col gap-3 px-5 pb-10">
        {serviceCatalog.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="flex min-h-24 items-center gap-4 rounded-2xl border border-white/10 bg-[linear-gradient(120deg,#2b2d2d,#222424)] p-4 shadow-[0_12px_30px_rgba(0,0,0,0.16)]"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-black/25 text-2xl">
              {service.icon}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-bold leading-snug">{service.title[lang]}</span>
              <span className="mt-1 block text-sm leading-snug text-muted">{service.summary[lang]}</span>
            </span>
            <ChevronRightIcon className="h-5 w-5 shrink-0 text-muted" />
          </Link>
        ))}

        <Link href="/contact" className="mt-1 flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.04] py-4 font-semibold">
          <TelegramIcon className="h-5 w-5 text-[#229ED9]" />
          {t.contactCta}
        </Link>
      </div>
    </main>
  );
}
