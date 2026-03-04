"use client";
import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Nav } from '@/components/Nav/Nav';
import styles from './blogIndex.module.css';
import Footer from '@/components/Footer/Footer';
import { useTranslation } from '@/i18n/client';


interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
}

export default function BlogIndexClient({ posts }: { posts: Post[] }) {
  const { t } = useTranslation();
  const params = useParams<{ lang: string }>();
  const lang = params?.lang ?? 'en';

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center bg-[var(--syntaxBg)]"
      style={{ color: `var(--mono1)` }}
    >
      <Nav />

      <main
        className="w-full max-w-4xl px-6 md:px-12 py-12 flex-1"
      >
        <header className="mb-12">
          <h1 className={styles.title}>
            # {t('blog.postsTitle')}
          </h1>
          <p className="font-mono text-sm opacity-70 uppercase tracking-widest">
            {t('blog.description')}
          </p>
        </header>

        {posts.length > 0 ? (
          <div className={styles.postsList}>
            {posts.map(post => (
              <Link
                key={post.slug}
                href={`/${lang}/blog/${post.slug}`}
                className={styles.postItem}
              >
                <div className={styles.postHeader}>
                  <h2 className={styles.postTitle}>{post.title}</h2>
                  <span className={styles.postDate}>
                    {post.date}
                  </span>
                </div>
                {post.description && (
                  <p className={styles.postDesc}>{post.description}</p>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div className="font-mono text-sm opacity-90 py-10">
            {t('blog.noPosts')}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
