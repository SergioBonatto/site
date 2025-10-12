import { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://bonatto.vercel.app'),
  title: {
    default: 'Sergio Bonatto - Full Stack Developer',
    template: '%s | Sergio Bonatto'
  },
  description: 'Sergio Bonatto - Full Stack Developer in Brasília specializing in formal proofs, lambda calculus, Haskell, JavaScript, Python, and computational logic. Expert in software architecture, functional programming, web development, and algorithm optimization. Passionate about problem-solving, formal verification, and building scalable web applications.',
  keywords: ['Sergio Bonatto', 'Full Stack Developer', 'Software Engineer', 'Brasília', 'React', 'Next.js', 'TypeScript', 'JavaScript', 'Python', 'Haskell', 'Lambda Calculus', 'Formal Proofs', 'Web Development', 'Portfolio'],
  authors: [{ name: 'Sergio Bonatto', url: 'https://bonatto.vercel.app' }],
  creator: 'Sergio Bonatto',
  publisher: 'Sergio Bonatto',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bonatto.vercel.app',
    siteName: 'Sergio Bonatto Portfolio',
    title: 'Sergio Bonatto - Full Stack Developer',
    description: 'Sergio Bonatto - Full Stack Developer in Brasília specializing in formal proofs, lambda calculus, Haskell, JavaScript, Python, and computational logic. Expert in software architecture, functional programming, web development, and algorithm optimization. Passionate about problem-solving, formal verification, and building scalable web applications.',
    images: [
      {
        url: 'https://bonatto.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Sergio Bonatto - Full Stack Developer Portfolio',
        type: 'image/png',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@fibonatto',
    creator: '@fibonatto',
    title: 'Sergio Bonatto - Full Stack Developer',
    description: 'Sergio Bonatto - Full Stack Developer in Brasília specializing in formal proofs, lambda calculus, Haskell, JavaScript, Python, and computational logic. Expert in software architecture, functional programming, web development, and algorithm optimization. Passionate about problem-solving, formal verification, and building scalable web applications.'
,
    images: ['https://bonatto.vercel.app/og-image.png'],
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
    ],
    apple: [
      { url: '/favicon.png' }
    ]
  },
  alternates: {
    canonical: 'https://bonatto.vercel.app',
    types: {
      'application/rss+xml': 'https://bonatto.vercel.app/feed.xml'
    }
  }
};
