import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://bonatto.vercel.app'),
  title: 'Sergio Bonatto - Full Stack Developer',
  description: 'Sergio Bonatto - Full Stack Developer in Brasília specializing in formal proofs, lambda calculus, Haskell, JavaScript, Python, and computational logic. Expert in software architecture, functional programming, web development, and algorithm optimization. Passionate about problem-solving, formal verification, and building scalable web applications.'
,
  authors: [{ name: 'Sergio Bonatto', url: 'https://bonatto.vercel.app' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Sergio Bonatto - Full Stack Developer',
    description: 'Sergio Bonatto - Full Stack Developer in Brasília specializing in formal proofs, lambda calculus, Haskell, JavaScript, Python, and computational logic. Expert in software architecture, functional programming, web development, and algorithm optimization. Passionate about problem-solving, formal verification, and building scalable web applications.',

    images: [
      {
        url: 'https://bonatto.vercel.app/cards.png',
        width: 1200,
        height: 630,
        alt: 'Sergio Bonatto - Full Stack Developer Portfolio',
      }
    ],
    url: 'https://bonatto.vercel.app',
  },
  twitter: {
    card: 'summary',
    site: '@fibonatto',
    creator: 'fibonatto',
    title: 'Sergio Bonatto - Full Stack Developer',
    description: 'Sergio Bonatto - Full Stack Developer in Brasília specializing in formal proofs, lambda calculus, Haskell, JavaScript, Python, and computational logic. Expert in software architecture, functional programming, web development, and algorithm optimization. Passionate about problem-solving, formal verification, and building scalable web applications.'
,
    images: ['https://bonatto.vercel.app/cards.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon.png', type: 'image/png', sizes: '32x32' }
    ]
  }
};
