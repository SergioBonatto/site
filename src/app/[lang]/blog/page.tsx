import { generateSEOMetadata } from '@/components/Core/SEO';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getDictionary } from '@/i18n/get-dictionary';
import { LanguageCode } from '@/i18n/types';

export async function generateMetadata({ params }: { params: Promise<{ lang: LanguageCode }> }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  return generateSEOMetadata({
    title: dictionary['blog.title'],
    description: dictionary['blog.description'],
    image: '/cards.png',
    url: '/blog',
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

  const filenames = fs.readdirSync(postsDirectory);
  const posts = filenames.map(filename => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug: filename.replace(/\.md$/, ''),
      title: data.title,
      date: data.date,
      description: data.description
    };
  });

  return posts.sort((a, b) => (new Date(b.date)).getTime() - (new Date(a.date)).getTime());
}

import BlogIndexClient from './BlogIndexClient';

export default async function BlogIndex() {
  const posts = await getPosts();
  return <BlogIndexClient posts={posts} />;
}
