import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = ['en', 'pt-BR', 'es', 'de', 'ja', 'it'];

  const yuuUrls = languages.map(lang => ({
    url: `https://bonatto.vercel.app/${lang}/yuu`,
    lastModified: new Date('2025-12-30'),
    changeFrequency: 'yearly' as const,
    priority: 0.01,
  }));

  return [
    {
      url: 'https://bonatto.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://bonatto.vercel.app/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://bonatto.vercel.app/jimmy',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...yuuUrls,
  ]
}
