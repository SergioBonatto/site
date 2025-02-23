import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Navbar from '@/components/Nav';
import { remark } from 'remark';
import html from 'remark-html';
import Footer from '@/components/Footer/footer';
import SEO from '@/components/SEO';
import { cn } from '@/lib/utils';

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

  try {
    const filePath = path.join(process.cwd(), 'content/blog', `${slug}.md`);

    if (!fs.existsSync(filePath)) {
      return (
        <div className="flex flex-col min-h-screen bg-teal-600">
          <Navbar />
          <main className="relative flex-grow pt-40 pb-10"> {/* Adjusted to avoid overlap */}
            <SEO
              title="Post not found - Sergio Bonatto"
              description="Full Stack Developer, formal proofs, lambda calculus, Haskell, JavaScript, Python"
              image="/cards.png"
              url="https://bonatto.vercel.app/"
            />
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
          <Footer /> {/* Footer will always be at the bottom */}
        </div>
      );
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return (
      <div className="flex flex-col min-h-screen bg-teal-600">
        <SEO
          title={`${(data as PostData).title} - Sergio Bonatto`}
          description={(data as PostData).description}
          image="/cards.png"
          url={`https://bonatto.vercel.app/blog/${slug}`}
        />
        <Navbar />
        <main className="relative flex-grow pt-40 pb-10"> {/* Adjusted to avoid overlap */}
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
                {(data as PostData).title}
              </h2>
              <div className="text-base text-gray-600 mb-4 font-['MS Sans Serif']">
                {(data as PostData).date}
              </div>
              <div className="space-y-3 md:space-y-4 font-['MS Sans Serif'] text-gray-800 prose max-w-none">
                <div className={cn(
                  "border-2",
                  WIN95_BORDERS.sunken,
                  "bg-[#ececec] p-2 md:p-3"
                )}>
                  <div
                    className="leading-relaxed text-base md:text-lg"
                    dangerouslySetInnerHTML={{ __html: contentHtml }}
                  />
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );

  } catch (error) {
    console.error('Error loading post:', error);
    return (
      <div className="flex flex-col min-h-screen bg-teal-600">
        <Navbar />
        <main className="relative flex-grow pt-40 pb-10"> {/* Adjusted to avoid overlap */}
          <SEO
            title="Error - Sergio Bonatto"
            description="Full Stack Developer, formal proofs, lambda calculus, Haskell, JavaScript, Python"
            image="/cards.png"
            url="https://bonatto.vercel.app/"
          />
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
                Error loading post
              </h2>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }
}
