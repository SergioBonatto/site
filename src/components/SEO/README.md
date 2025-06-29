# SEO Component Usage Guide

## Overview

This SEO component has been modernized for Next.js 15 App Router. The old `next/head` approach has been replaced with the new metadata system.

## Usage

### Basic Usage

```typescript
import { generateSEOMetadata } from '@/components/SEO';
import { Metadata } from 'next';

export const metadata: Metadata = generateSEOMetadata({
  title: 'My Page Title',
  description: 'A compelling description of my page content.',
  image: '/my-page-image.jpg',
  url: '/my-page',
});
```

### Advanced Usage with All Options

```typescript
export const metadata: Metadata = generateSEOMetadata({
  title: 'Advanced Blog Post',
  description: 'Deep dive into advanced web development concepts.',
  image: '/blog/advanced-post-cover.jpg',
  url: '/blog/advanced-post',
  keywords: ['web development', 'javascript', 'nextjs', 'seo'],
  type: 'article',
  publishedTime: '2024-01-15T10:00:00.000Z',
  modifiedTime: '2024-01-16T14:30:00.000Z',
  authors: ['Sergio Bonatto', 'Co-Author Name'],
  siteName: 'Custom Site Name'
});
```

### Dynamic Metadata Generation

```typescript
// For dynamic pages like [slug]
import { generateSEOMetadata } from '@/components/SEO';

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  
  return generateSEOMetadata({
    title: post.title,
    description: post.excerpt,
    image: post.coverImage,
    url: `/blog/${params.slug}`,
    keywords: post.tags,
    type: 'article',
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
  });
}
```

## Features

- ✅ **Next.js 15 App Router Compatible**
- ✅ **TypeScript Support**
- ✅ **Open Graph Optimization**
- ✅ **Twitter Card Support**
- ✅ **SEO Best Practices**
- ✅ **Flexible Configuration**
- ✅ **Automatic URL Handling**
- ✅ **Image Optimization**
- ✅ **Rich Metadata Support**

## Migration from Old SEO Component

### Before (Pages Router):
```tsx
import SEO from '@/components/SEO';

// In your component
<SEO 
  title="My Page"
  description="Page description"
  image="/image.jpg"
  url="/my-page"
  keywords="keyword1, keyword2"
/>
```

### After (App Router):
```typescript
// In your page.tsx
import { generateSEOMetadata } from '@/components/SEO';

export const metadata = generateSEOMetadata({
  title: 'My Page',
  description: 'Page description',
  image: '/image.jpg',
  url: '/my-page',
  keywords: ['keyword1', 'keyword2']
});
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | `string` | **Required** | Page title |
| `description` | `string` | **Required** | Page description |
| `image` | `string` | `'/card.png'` | Social media image |
| `url` | `string` | Base URL | Canonical URL |
| `keywords` | `string[]` | `[]` | SEO keywords array |
| `type` | `'website' \| 'article' \| 'profile'` | `'website'` | OpenGraph type |
| `publishedTime` | `string` | `undefined` | Article publish date |
| `modifiedTime` | `string` | `undefined` | Article modified date |
| `authors` | `string[]` | `['Sergio Bonatto']` | Content authors |
| `siteName` | `string` | `'Sergio Bonatto - Full Stack Developer'` | Site name |

## Best Practices

1. **Always provide title and description** - These are crucial for SEO
2. **Use descriptive images** - Images should be 1200x630px for optimal social sharing
3. **Keep descriptions under 160 characters** - For optimal search engine display
4. **Use relevant keywords** - But avoid keyword stuffing
5. **Set canonical URLs** - Prevents duplicate content issues
6. **Use structured data** - Consider adding JSON-LD for rich snippets

## Troubleshooting

### Common Issues

1. **Image not showing in social previews**
   - Ensure image is publicly accessible
   - Use absolute URLs for external images
   - Check image dimensions (1200x630px recommended)

2. **Metadata not updating**
   - Clear browser cache
   - Check if metadata is properly exported
   - Verify no conflicting metadata in layout.tsx

3. **TypeScript errors**
   - Ensure all required properties are provided
   - Check import paths are correct
