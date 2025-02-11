import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://bonatto.vercel.app'),
  title: 'Sergio Bonatto - Full Stack Developer',
  description: 'Developer specialized in full stack development, formal proofs, lambda calculus, Haskell, JavaScript, Python. Based in Brasilia, Brazil.',
  authors: [{ name: 'Sergio Bonatto', url: 'https://bonatto.vercel.app' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Sergio Bonatto - Full Stack Developer',
    description: 'Developer specialized in full stack development, formal proofs, lambda calculus, Haskell, JavaScript, Python. Based in Brasilia, Brazil.',
    images: [
      {
        url: '/cards.png',
        width: 1200,
        height: 630,
        alt: 'Sergio Bonatto - Full Stack Developer Portfolio',
      }
    ],
    url: 'https://bonatto.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@fibonatto',
    creator: '@fibonatto',
    title: 'Sergio Bonatto - Full Stack Developer',
    description: 'Developer specialized in full stack development, formal proofs, lambda calculus, Haskell, JavaScript, Python. Based in Brasilia, Brazil.',
    images: ['/cards.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.png',
  }
};
