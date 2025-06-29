// Example usage of the new SEO system for Next.js 15 App Router

import { generateSEOMetadata } from '@/components/SEO';
import { Metadata } from 'next';

// ✅ EXAMPLE 1: Static page metadata
export const metadata: Metadata = generateSEOMetadata({
  title: 'About Us - Tech Company',
  description: 'Learn about our mission, values, and the team behind our innovative solutions.',
  image: '/about-us-hero.jpg',
  url: '/about',
  keywords: ['about', 'team', 'company', 'mission', 'values'],
});

// ✅ EXAMPLE 2: Dynamic metadata for blog posts
interface BlogPostProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  // Fetch post data (this would come from your CMS/database)
  const post = await fetchBlogPost(params.slug);
  
  if (!post) {
    return generateSEOMetadata({
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
      url: `/blog/${params.slug}`,
    });
  }
  
  return generateSEOMetadata({
    title: `${post.title} - My Blog`,
    description: post.excerpt,
    image: post.featuredImage || '/default-blog-image.jpg',
    url: `/blog/${params.slug}`,
    type: 'article',
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    keywords: post.tags || [],
    authors: post.authors || ['Default Author'],
  });
}

// ✅ EXAMPLE 3: Product page with rich metadata
interface ProductProps {
  params: { id: string };
}

export async function generateProductMetadata({ params }: ProductProps): Promise<Metadata> {
  const product = await fetchProduct(params.id);
  
  if (!product) {
    return generateSEOMetadata({
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
      url: `/products/${params.id}`,
    });
  }
  
  return generateSEOMetadata({
    title: `${product.name} - E-commerce Store`,
    description: `${product.description.substring(0, 150)}...`,
    image: product.images[0] || '/default-product.jpg',
    url: `/products/${params.id}`,
    keywords: [...product.categories, ...product.tags, 'buy', 'shop'],
    type: 'website',
  });
}

// ✅ EXAMPLE 4: Category page with dynamic content
export async function generateCategoryMetadata(category: string): Promise<Metadata> {
  const categoryData = await fetchCategory(category);
  
  if (!categoryData) {
    return generateSEOMetadata({
      title: 'Category Not Found',
      description: 'The requested category could not be found.',
      url: `/category/${category}`,
    });
  }
  
  return generateSEOMetadata({
    title: `${categoryData.name} - Browse Products`,
    description: `Discover our collection of ${categoryData.name.toLowerCase()} products. ${categoryData.description}`,
    image: categoryData.banner || '/category-default.jpg',
    url: `/category/${category}`,
    keywords: [categoryData.name, ...categoryData.subcategories, 'products', 'shop'],
  });
}

// ✅ EXAMPLE 5: User profile page
interface UserProfileProps {
  params: { username: string };
}

export async function generateUserProfileMetadata({ params }: UserProfileProps): Promise<Metadata> {
  const user = await fetchUserProfile(params.username);
  
  if (!user || user.private) {
    return generateSEOMetadata({
      title: 'User Profile - My Platform',
      description: 'User profile page on My Platform.',
      url: `/users/${params.username}`,
    });
  }
  
  return generateSEOMetadata({
    title: `${user.displayName} (@${user.username}) - My Platform`,
    description: user.bio || `Check out ${user.displayName}'s profile on My Platform.`,
    image: user.avatarUrl || '/default-avatar.jpg',
    url: `/users/${params.username}`,
    type: 'profile',
    authors: [user.displayName],
  });
}

// ✅ EXAMPLE 6: Search results page
interface SearchProps {
  searchParams: { q: string; category?: string };
}

export async function generateSearchMetadata({ searchParams }: SearchProps): Promise<Metadata> {
  const query = searchParams.q || '';
  const category = searchParams.category || '';
  
  const titleParts = ['Search Results'];
  if (query) titleParts.push(`for "${query}"`);
  if (category) titleParts.push(`in ${category}`);
  titleParts.push('- My Site');
  
  const description = `Find ${query ? `"${query}"` : 'what you need'} ${category ? `in ${category}` : 'across all categories'} on My Site.`;
  
  return generateSEOMetadata({
    title: titleParts.join(' '),
    description,
    url: `/search?q=${encodeURIComponent(query)}${category ? `&category=${category}` : ''}`,
    keywords: query ? query.split(' ').filter(Boolean) : ['search'],
  });
}

// ✅ EXAMPLE 7: Event page with structured data
interface EventProps {
  params: { id: string };
}

export async function generateEventMetadata({ params }: EventProps): Promise<Metadata> {
  const event = await fetchEvent(params.id);
  
  if (!event) {
    return generateSEOMetadata({
      title: 'Event Not Found',
      description: 'The requested event could not be found.',
      url: `/events/${params.id}`,
    });
  }
  
  return generateSEOMetadata({
    title: `${event.title} - Events`,
    description: `Join us for ${event.title} on ${formatDate(event.date)}. ${event.shortDescription}`,
    image: event.banner || '/event-default.jpg',
    url: `/events/${params.id}`,
    type: 'website',
    keywords: ['event', event.category, ...event.tags],
    publishedTime: event.createdAt,
    modifiedTime: event.updatedAt,
  });
}

// Helper types for examples
interface BlogPost {
  title: string;
  excerpt: string;
  featuredImage?: string;
  publishedAt: string;
  updatedAt: string;
  tags?: string[];
  authors?: string[];
}

interface Product {
  name: string;
  description: string;
  images: string[];
  categories: string[];
  tags: string[];
}

interface Category {
  name: string;
  description: string;
  banner?: string;
  subcategories: string[];
}

interface User {
  displayName: string;
  username: string;
  bio?: string;
  avatarUrl?: string;
  private: boolean;
}

interface Event {
  title: string;
  date: string;
  shortDescription: string;
  banner?: string;
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// Helper functions (these would be implemented based on your data source)
async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
  // Implementation depends on your CMS/database
  return null;
}

async function fetchProduct(id: string): Promise<Product | null> {
  // Implementation depends on your e-commerce system
  return null;
}

async function fetchCategory(category: string): Promise<Category | null> {
  // Implementation depends on your product catalog
  return null;
}

async function fetchUserProfile(username: string): Promise<User | null> {
  // Implementation depends on your user system
  return null;
}

async function fetchEvent(id: string): Promise<Event | null> {
  // Implementation depends on your event system
  return null;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString();
}

export default function ExampleUsagePage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">SEO System Usage Examples</h1>
      <p className="text-gray-600 mb-4">
        This file demonstrates various ways to use the new SEO system with Next.js 15 App Router.
      </p>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h2 className="font-semibold text-blue-800 mb-2">📚 Key Benefits:</h2>
        <ul className="list-disc list-inside text-blue-700 space-y-1">
          <li>Type-safe metadata generation</li>
          <li>Automatic URL and image handling</li>
          <li>Built-in SEO best practices</li>
          <li>Support for dynamic content</li>
          <li>Rich Open Graph and Twitter Card data</li>
          <li>Structured data ready</li>
        </ul>
      </div>
    </div>
  );
}
