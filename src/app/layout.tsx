import type { Metadata } from "next";
import "./globals.css";
import { metadata as siteMetadata } from '@/app/metadata';
import { StructuredData } from '@/components/StructuredData';

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0d9488" />
        <meta name="msapplication-TileColor" content="#0d9488" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="canonical" href="https://bonatto.vercel.app" />
        <link rel="alternate" type="application/rss+xml" title="Blog - Sergio Bonatto" href="/feed.xml" />
      </head>
      <body>
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
