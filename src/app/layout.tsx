import type { Metadata } from "next";
import "../styles/prism.css";
import "./globals.css";

import { ThemeProvider } from '@/components/Theme/ThemeProvider';
import { metadata as siteMetadata } from '@/app/metadata';
import { StructuredData } from '@/components/StructuredData';
import FloatingGif from '@/components/Core/FloatingGif';
import Script from 'next/script';

export const metadata: Metadata = siteMetadata;
export default function RootLayout({ children }: { children: React.ReactNode }) {
  console.log('Rendering RootLayout');
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta />
        <meta/>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="canonical" href="https://bonatto.vercel.app" />
        <link rel="alternate" type="application/rss+xml" title="Blog - Sergio Bonatto" href="/feed.xml" />
      </head>
      <body>
        <ThemeProvider>
          <Script id="prism-preload" strategy="beforeInteractive">
            {`
              window.Prism = window.Prism || {};
              window.Prism.manual = true;
            `}
          </Script>
          <StructuredData />
          <FloatingGif />
          {children ? (
            <>
              {children}
            </>
          ) : (
            <>
              {console.error('Children are not being passed to RootLayout')}
            </>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
