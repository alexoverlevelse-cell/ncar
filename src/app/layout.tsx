import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import { BottomNav } from "@/components/BottomNav";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: `${siteConfig.companyName} — ${siteConfig.tagline}`,
  description: siteConfig.tagline,
};

export const viewport: Viewport = {
  themeColor: "#0d0d0f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: telegram-web-app.js дописывает в <html> свои
    // CSS-переменные до гидратации React — расхождение ожидаемо и безопасно.
    <html
      lang="ru"
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
        <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col pb-[76px]">
          {children}
        </div>
        <BottomNav />
      </body>
    </html>
  );
}
