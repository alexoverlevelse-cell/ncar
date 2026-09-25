import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import { AppFrame } from "@/components/AppFrame";
import { LangProvider } from "@/components/LangProvider";
import { dict } from "@/lib/dictionary";
import { getLang } from "@/lib/i18n-server";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  // cyrillic-ext обязателен: обычный cyrillic не содержит українські
  // літери ї/є/ґ — без него они рендерились бы "квадратиками".
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
});

export async function generateMetadata(): Promise<Metadata> {
  const tagline = dict(await getLang()).meta.tagline;
  return {
    title: `${siteConfig.companyName} — ${tagline}`,
    description: tagline,
  };
}

export const viewport: Viewport = {
  themeColor: "#202222",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const lang = await getLang();

  return (
    // suppressHydrationWarning: telegram-web-app.js дописывает в <html> свои
    // CSS-переменные до гидратации React — расхождение ожидаемо и безопасно.
    <html
      lang={lang}
      className={`${geistSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className="min-h-full">
        <LangProvider lang={lang}>
          <AppFrame>{children}</AppFrame>
        </LangProvider>
      </body>
    </html>
  );
}
