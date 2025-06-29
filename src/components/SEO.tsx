import { Metadata } from 'next';

interface SEOConfig {
  title: string;
  description: string;
  image?: string;
  url?: string;
  keywords?: string[];
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  siteName?: string;
}

/**
 * Generate metadata for Next.js 15 App Router
 * @param config SEO configuration object
 * @returns Metadata object for Next.js
 */
export function generateSEOMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    image = '/card.png',
    url,
    keywords = [],
    type = 'website',
    publishedTime,
    modifiedTime,
    authors = ['Sergio Bonatto'],
    siteName = 'Sergio Bonatto - Full Stack Developer'
  } = config;

  const baseUrl = 'https://bonatto.vercel.app';
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;
  const fullUrl = url ? (url.startsWith('http') ? url : `${baseUrl}${url}`) : baseUrl;

  const metadata: Metadata = {
    title,
    description,
    keywords: keywords.length > 0 ? keywords.join(', ') : undefined,
    authors: authors.map(author => ({ name: author })),
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      type,
      title,
      description,
      url: fullUrl,
      siteName,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: `${title} - ${siteName}`,
        }
      ],
      locale: 'en_US',
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      site: '@fibonatto',
      creator: '@fibonatto',
      title,
      description,
      images: [fullImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };

  return metadata;
}

/**
 * Legacy SEO component for backward compatibility
 * @deprecated Use generateSEOMetadata instead for Next.js App Router
 */
interface SEOProps {
  title: string;
  description: string;
  image: string;
  url: string;
  keywords?: string;
}

const SEO: React.FC<SEOProps> = () => {
  console.warn('SEO component is deprecated. Use generateSEOMetadata for Next.js App Router.');
  
  // This component is kept for backward compatibility but should not be used
  // in App Router. Use generateSEOMetadata instead.
  return null;
};

export default SEO;
