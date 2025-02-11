import type { Metadata } from "next";
import "./globals.css";
import { metadata as siteMetadata } from '@/app/metadata';

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
  <head>
    <link rel="icon" type="image/png" href="/favicon.png" />
  </head>
  <body>{children}</body>
</html>
  );
}
