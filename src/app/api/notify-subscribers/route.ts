import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { sendEmail, generateNewPostEmail } from '@/lib/email';

interface Subscriber {
  email: string;
  subscribedAt: string;
  verified: boolean;
}

interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
}

function getSubscribers(): Subscriber[] {
  const subscribersFile = path.join(process.cwd(), 'data', 'subscribers.json');

  if (!fs.existsSync(subscribersFile)) {
    return [];
  }

  const data = fs.readFileSync(subscribersFile, 'utf8');
  return JSON.parse(data);
}

function getLatestPost(): Post | null {
  const postsDirectory = path.join(process.cwd(), 'content/blog');

  if (!fs.existsSync(postsDirectory)) {
    return null;
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

  const sortedPosts = posts.sort((a, b) => (new Date(b.date)).getTime() - (new Date(a.date)).getTime());
  return sortedPosts[0] || null;
}

function sanitizePostSlug(slug: string): string {
  // Remove any path traversal attempts and sanitize
  return slug.replace(/[^a-zA-Z0-9-_]/g, '').substring(0, 100);
}

export async function POST(request: NextRequest) {
  try {
    // Verificar se há uma chave de autenticação para segurança
    const authHeader = request.headers.get('authorization');
    const expectedAuth = process.env.NOTIFY_SECRET || 'dev-secret';

    if (authHeader !== `Bearer ${expectedAuth}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const rawPostSlug = body?.postSlug;
    const subscribers = getSubscribers();

    if (subscribers.length === 0) {
      return NextResponse.json({
        message: 'No subscribers to notify',
        count: 0
      });
    }

    let post: Post | null = null;

    if (rawPostSlug && typeof rawPostSlug === 'string') {
      // Sanitize post slug to prevent path traversal
      const postSlug = sanitizePostSlug(rawPostSlug);

      // Buscar post específico
      const postsDirectory = path.join(process.cwd(), 'content/blog');
      const filePath = path.join(postsDirectory, `${postSlug}.md`);

      if (fs.existsSync(filePath)) {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContents);

        post = {
          slug: postSlug,
          title: data.title,
          date: data.date,
          description: data.description
        };
      }
    } else {
      // Usar o último post
      post = getLatestPost();
    }

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Enviar emails para todos os subscribers
    const results = await Promise.allSettled(
      subscribers.map(async (subscriber) => {
        return await sendEmail({
          to: subscriber.email,
          subject: `📝 New post: ${post!.title}`,
          html: generateNewPostEmail(subscriber.email, post!)
        });
      })
    );

    const successCount = results.filter(result => result.status === 'fulfilled' && result.value).length;
    const failureCount = results.length - successCount;

    console.log(`📧 Notifications sent: ${successCount} successes, ${failureCount} failures`);

    return NextResponse.json({
      message: `Notifications sent to ${successCount} of ${subscribers.length} subscribers`,
      post: {
        title: post.title,
        slug: post.slug,
        date: post.date
      },
      stats: {
        total: subscribers.length,
        success: successCount,
        failures: failureCount
      }
    }, {
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block'
      }
    });

  } catch (error) {
    console.error('Error notifying subscribers:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET para verificar o último post e contar subscribers
export async function GET() {
  try {
    const subscribers = getSubscribers();
    const latestPost = getLatestPost();

    return NextResponse.json({
      subscribersCount: subscribers.length,
      latestPost: latestPost ? {
        title: latestPost.title,
        slug: latestPost.slug,
        date: latestPost.date,
        description: latestPost.description
      } : null
    }, {
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block'
      }
    });
  } catch (error) {
    console.error('Error fetching information:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
