import Link from 'next/link';
import Navbar from '@/components/Nav';
import Footer from '@/components/Footer/footer';
import SEO from '@/components/SEO';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { cn } from '@/lib/utils';

const WIN95_BORDERS = {
  raised: "border-t-white border-l-white border-r-gray-800 border-b-gray-800",
  sunken: "border-t-gray-800 border-l-gray-800 border-r-white border-b-white",
} as const;

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

export default async function BlogIndex() {
  const posts = await getPosts();

  return (
    <div className="flex flex-col min-h-screen bg-teal-600">
      <SEO
        title="Blog - Sergio Bonatto"
        description="Posts sobre desenvolvimento, provas formais e outras coisas interessantes"
        image="/cards.png"
        url="https://bonatto.vercel.app/blog"
      />
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
              Blog Posts
            </h2>
            {posts.length > 0 ? (
              <div className="space-y-3 md:space-y-4 font-['MS Sans Serif'] text-gray-800">
                {posts.map(post => (
                  <div key={post.slug} className={cn(
                    "border-2",
                    WIN95_BORDERS.sunken,
                    "bg-[#ececec] p-2 md:p-3"
                  )}>
                    <Link href={`/blog/${post.slug}`} className="block hover:text-blue-600">
                      <h3 className="md:text-lg font-bold text-[#000080]">{post.title}</h3>
                    </Link>
                    <p className="md:text-base text-gray-600 mt-1">{post.date}</p>
                    <p className="mt-2">{post.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-800 text-center py-8 font-['MS Sans Serif']">
                Nenhum post encontrado.
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
