import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypePrismPlus from 'rehype-prism-plus';
import rehypeStringify from 'rehype-stringify';
import { generateSEOMetadata } from '@/components/Core/SEO';
import { Metadata } from 'next';
import MarkdownContent from '@/components/Core/MarkdownContent';
import PrismLoader from '@/components/Theme/PrismLoader';
import { ClientOnly } from '@/components/Core/ClientOnly';
import { Nav } from '@/components/Nav/Nav';
import styles from '../article.module.css';
import Footer from '@/components/Footer/Footer';

interface PostData {
  title: string;
  date: string;
  description: string;
}

interface Props {
  params: Promise<{
    slug: string;
  }>;
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const postData = await getPostData(slug);

  if (!postData) {
    return generateSEOMetadata({
      title: 'Post Not Found - Sergio Bonatto',
      description: 'The requested blog post could not be found.',
      image: '/cards.png',
      url: `/blog/${slug}`,
    });
  }

  return generateSEOMetadata({
    title: `${postData.data.title} - Sergio Bonatto`,
    description: postData.data.description,
    image: '/cards.png',
    url: `/blog/${slug}`,
    type: 'article',
    publishedTime: new Date(postData.data.date).toISOString(),
    keywords: ['blog', 'programming', 'development', 'tech'],
  });
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'content/blog');
  const files = fs.readdirSync(postsDirectory);

  return files.map((filename) => ({
    slug: filename.replace(/\.md$/, ''),
  }));
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const postData = await getPostData(slug);

  if (!postData) {
    return (
      <div className={styles.container} style={{ color: 'var(--mono1)' }}>
        <main className={styles.main}>
          <Nav />
          <section>
            <div className={styles.header}>
              <h2 className={styles.title}>
                Post not found
              </h2>
            </div>
          </section>
        </main>
      </div>
    );
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

  return (
    <div className={styles.container} style={{ color: 'var(--mono1)' }}>
      <Nav />
      <main className={styles.main}>
        <section>
          <div className={styles.header}>
            <h2 className={styles.title}>{postData.data.title}</h2>
            <div className={styles.date}>{postData.data.date}</div>
          </div>
          <div className={styles.content}>
            <MarkdownContent content={contentHtml} />
            <ClientOnly>
              <PrismLoader />
            </ClientOnly>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
