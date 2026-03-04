import { generateSEOMetadata } from '@/components/Core/SEO';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getDictionary } from '@/i18n/get-dictionary';
import { Locale } from '@/i18n/types';

export const revalidate = 0; // Garante que a lista de posts não seja cacheada incorretamente

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  return generateSEOMetadata({
    title: dictionary['blog.title'],
    description: dictionary['blog.description'],
    image: '/cards.png',
    url: `/${lang}/blog`,
    keywords: ['blog', 'development', 'formal proofs', 'programming', 'tech'],
  });
}

interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
}

async function getPosts(): Promise<Post[]> {
  const postsDirectory = path.join(process.cwd(), 'content/blog');

  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
    return [];
  }

  const filenames = fs.readdirSync(postsDirectory).filter(file => file.endsWith('.md'));
  
  const posts = filenames.map(filename => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug: filename.replace(/\.md$/, ''),
      title: data.title || 'Untitled',
      date: data.date || 'No date',
      description: data.description || ''
    };
  });

  return posts
    .filter(post => post.title !== 'Untitled')
    .sort((a, b) => (new Date(b.date)).getTime() - (new Date(a.date)).getTime());
}

import BlogIndexClient from './BlogIndexClient';

export default async function BlogIndex() {
  const posts = await getPosts();
  return <BlogIndexClient posts={posts} />;
}
