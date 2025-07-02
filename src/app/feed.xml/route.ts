import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
}

async function getPosts(): Promise<Post[]> {
  const postsDirectory = path.join(process.cwd(), 'content/blog');

  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const filenames = fs.readdirSync(postsDirectory);
  const posts = filenames.map(filename => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug: filename.replace(/\.md$/, ''),
      title: data.title,
      date: data.date,
      description: data.description,
      content: content
    };
  });

  return posts.sort((a, b) => (new Date(b.date)).getTime() - (new Date(a.date)).getTime());
}

export async function GET() {
  const posts = await getPosts();
  const baseUrl = process.env.SITE_URL
    ? process.env.SITE_URL
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';

  const rssItems = posts.map(post => {
    const postUrl = `${baseUrl}/blog/${post.slug}`;
    const pubDate = new Date(post.date).toUTCString();

    return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
    </item>`;
  }).join('');

  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog - Sergio Bonatto</title>
    <description>Posts about development, formal proofs and other interesting topics</description>
    <link>${baseUrl}/blog</link>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>sergio@bonatto.dev (Sergio Bonatto)</managingEditor>
    <webMaster>sergio@bonatto.dev (Sergio Bonatto)</webMaster>
    <ttl>60</ttl>
    ${rssItems}
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'max-age=3600, s-maxage=3600',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
    },
  });
}
