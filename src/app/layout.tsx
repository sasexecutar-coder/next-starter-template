import Footer from "@/app/_components/footer";
import { SiteHeader } from "@/app/_components/site-header";
import { themeScript } from "@/app/_components/theme-toggle";
import { buttonClass } from "@/app/_components/ui/button";
import { SITE } from "@/lib/site";
import type { Metadata } from "next";
import { DM_Mono, DM_Sans, Inter } from "next/font/google";

import "./globals.css";

// D-03: DM Sans (display), Inter (leitura/UI), DM Mono (sistema/metadados)
const display = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });
const mono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.name, template: `%s | ${SITE.name}` },
  description: SITE.description,
  openGraph: { siteName: SITE.name, locale: "pt_BR", type: "website" },
  icons: { icon: "/brand/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={SITE.locale} className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <body className="bg-canvas text-ink">
        {/* D-33: aplica o tema salvo antes da pintura. Fica no <body> (e não no <head>) porque o runtime
            insere <script> de chunks no <head> antes da hidratação e desalinharia o elemento. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <a href="#conteudo" className={buttonClass("primary", "lg", "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50")}>
          Pular para o conteúdo
        </a>
        <SiteHeader />
        <div id="conteudo" className="min-h-screen">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
