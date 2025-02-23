import Link from 'next/link';
import Navbar from '@/components/Nav';
import Footer from '@/components/Footer/footer';
import SEO from '@/components/SEO';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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
    <main className="relative min-h-screen bg-teal-600">
      <div className="relative z-10">
        <SEO
          title="Blog - Sergio Bonatto"
          description="Posts sobre desenvolvimento, provas formais e outras coisas interessantes"
          image="/cards.png"
          url="https://bonatto.vercel.app/blog"
        />
        <Navbar />
        <div className="container mx-auto mt-8 p-4">
          <div className="bg-win95-window border-2 border-win95-border shadow-win95">
            <div className="bg-win95-titlebar px-2 py-1">
              <span className="text-black font-bold">Blog Posts</span>
            </div>
            <div className="p-4">
              {posts.length > 0 ? (
                <div className="space-y-4">
                  {posts.map(post => (
                    <div
                      key={post.slug}
                      className="bg-win95-window border-2 border-win95-border shadow-win95"
                    >
                      <div className="p-4">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="block hover:text-blue-300"
                        >
                          <h2 className="text-lg font-bold text-white">{post.title}</h2>
                        </Link>
                        <p className="text-sm text-gray-300 mt-1">{post.date}</p>
                        <p className="text-white mt-2">{post.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-white text-center py-8">
                  Nenhum post encontrado.
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}
