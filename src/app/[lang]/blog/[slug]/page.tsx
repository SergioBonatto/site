import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypePrismPlus from 'rehype-prism-plus';
import rehypeStringify from 'rehype-stringify';
import { getDictionary, LanguageCode } from '@/i18n';
import { generateSEOMetadata } from '@/components/Core/SEO';
import { Metadata } from 'next';
import BlogPostClient from './BlogPostClient';

interface PostData {
  title: string;
  date: string;
  description: string;
}

async function getPostData(slug: string): Promise<{ data: PostData; content: string } | null> {
  try {
    const filePath = path.join(process.cwd(), 'content/blog', `${slug}.md`);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      data: data as PostData,
      content
    };
  } catch (error) {
    console.error('Error loading post:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; lang: LanguageCode }> }): Promise<Metadata> {
  const { slug, lang } = await params;
  const postData = await getPostData(slug);
  const dictionary = await getDictionary(lang);

  if (!postData) {
    return generateSEOMetadata({
      title: `${dictionary['blog.notFound']} - Sergio Bonatto`,
      description: dictionary['blog.notFoundDescription'],
      image: '/cards.png',
      url: `/${lang}/blog/${slug}`,
    });
  }

  return generateSEOMetadata({
    title: `${postData.data.title} - Sergio Bonatto`,
    description: postData.data.description,
    image: '/cards.png',
    url: `/${lang}/blog/${slug}`,
    type: 'article',
    publishedTime: new Date(postData.data.date).toISOString(),
    keywords: ['blog', 'programming', 'development', 'tech'],
  });
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'content/blog');
  const files = fs.readdirSync(postsDirectory);

  const locales: LanguageCode[] = ['pt-BR', 'en', 'es', 'de', 'ja', 'it'];
  const paths = files.flatMap((filename) =>
    locales.map((locale) => ({
      slug: filename.replace(/\.md$/, ''),
      lang: locale
    }))
  );

  return paths;
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string; lang: LanguageCode }> }) {
  const { slug } = await params;
  const postData = await getPostData(slug);

  if (!postData) {
    return <BlogPostClient postData={null} />;
  }

  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypePrismPlus, {
      ignoreMissing: true,
      showLineNumbers: false,
      defaultLanguage: 'text',
      preloadLanguages: ['solidity', 'javascript', 'typescript', 'jsx', 'tsx', 'css', 'json', 'bash'],
      aliases: {
        solidity: 'solidity',
        sol: 'solidity',
        js: 'javascript',
        ts: 'typescript',
        tsx: 'typescript',
        jsx: 'javascript',
        shell: 'bash',
        sh: 'bash'
      }
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(postData.content);
  const contentHtml = processedContent.toString();

  // Debug: Log if we have syntax highlighted code
  if (process.env.NODE_ENV === 'development') {
    const hasCodeBlocks = contentHtml.includes('language-');
    console.log(`Post ${slug} has code blocks:`, hasCodeBlocks);
    if (hasCodeBlocks) {
      const languageMatches = contentHtml.match(/language-\w+/g);
      console.log('Languages found:', languageMatches);
    }
  }

  return <BlogPostClient postData={postData} contentHtml={contentHtml} />;
}
