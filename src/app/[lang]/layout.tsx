import type { Metadata, Viewport } from "next";
import "./globals.css";

import { ThemeProvider } from '@/components/Theme/ThemeProvider';
import { I18nProvider } from '@/i18n/I18nProvider';
import { metadata as siteMetadata, viewport as siteViewport } from '@/app/[lang]/metadata'; // Adjusted path
import { StructuredData } from '@/components/StructuredData';
import FloatingGif from '@/components/Core/FloatingGif';
import Script from 'next/script';
import { getDictionary } from "@/i18n/get-dictionary";
import { LanguageCode } from "@/i18n/types";

export const metadata: Metadata = siteMetadata;
export const viewport: Viewport = siteViewport;

// Gera os parâmetros estáticos para todos os locales
export async function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'pt-BR' },
    { lang: 'es' },
    { lang: 'de' },
    { lang: 'ja' },
    { lang: 'it' },
  ];
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: Promise<{ lang: LanguageCode }>
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <html lang={lang}>
      <body>
        <ThemeProvider>
          <I18nProvider dictionary={dictionary} language={lang}>
            <Script id="prism-preload" strategy="beforeInteractive">
              {`
                window.Prism = window.Prism || {};
                window.Prism.manual = true;
              `}
            </Script>
            <StructuredData />
            <FloatingGif />
            {children}
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
