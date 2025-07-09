import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Navbar from '@/components/Nav';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypePrismPlus from 'rehype-prism-plus';
import rehypeStringify from 'rehype-stringify';
import Footer from '@/components/Footer/footer';
import { generateSEOMetadata } from '@/components/SEO';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';
import MarkdownContent from '@/components/MarkdownContent';
import PrismLoader from '@/components/PrismLoader';
import { ClientOnly } from '@/components/ClientOnly';

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

const WIN95_BORDERS = {
  raised: "border-t-white border-l-white border-r-gray-800 border-b-gray-800",
  sunken: "border-t-gray-800 border-l-gray-800 border-r-white border-b-white",
} as const;

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
      <div className="flex flex-col min-h-screen bg-teal-600">
        <Navbar />
        <main className="relative flex-grow pt-40 pb-10">
          <section className={cn(
            "w-full max-w-6xl mx-auto bg-[#c0c0c0] border-2 md:w-4/5",
            WIN95_BORDERS.raised,
            "p-3 md:p-4 lg:p-5"
          )}>
            <div className={cn(
              "bg-white h-full p-4 md:p-6 border-2",
              WIN95_BORDERS.sunken
            )}>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-['MS Sans Serif'] text-[#000080] mb-4 md:mb-6 select-none">
                Post not found
              </h2>
            </div>
          </section>
        </main>
        <Footer />
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
    <div className="flex flex-col min-h-screen bg-teal-600">
      <Navbar />
      <main className="relative flex-grow pt-40 pb-10">
        <section className={cn(
          "w-full max-w-6xl mx-auto bg-[#c0c0c0] border-2 md:w-4/5",
          WIN95_BORDERS.raised,
          "p-3 md:p-4 lg:p-5"
        )}>
          <div className={cn(
            "bg-white h-full p-4 md:p-6 border-2",
            WIN95_BORDERS.sunken
          )}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-['MS Sans Serif'] text-[#000080] mb-4 md:mb-6 select-none">
              {postData.data.title}
            </h2>
            <div className="text-base text-gray-600 mb-4 font-['MS Sans Serif']">
              {postData.data.date}
            </div>
            <div className="space-y-3 md:space-y-4 font-['MS Sans Serif'] text-gray-800">
              <div className={cn(
                "border-2",
                WIN95_BORDERS.sunken,
                "bg-[#ececec] p-2 md:p-3"
              )}>
                <MarkdownContent content={contentHtml} />
                <ClientOnly>
                  <PrismLoader />
                </ClientOnly>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
