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
      className="min-h-screen w-full flex flex-col items-center bg-[var(--syntaxBg)] transition-colors duration-300"
      style={{ color: `var(--mono1)` }}
    >
      <Nav />

      <main
        className="w-full max-w-4xl px-6 md:px-12 py-12"
      >
        <header className="mb-12">
          <h1 className={styles.header}>
            <span className="opacity-40 mr-2"></span>
            {t('blog.postsTitle')}
          </h1>
          <p className="font-mono text-xs opacity-50 uppercase tracking-widest">
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
                tabIndex={0}
              >
                <div className={styles.postHeader}>
                  <span className={styles.postDate}>
                    <span className="opacity-50">[</span>
                    {post.date}
                    <span className="opacity-50">]</span>
                  </span>
                  <h2 className={styles.postTitle}>{post.title}</h2>
                </div>
                {post.description && (
                  <p className={styles.postDesc}>{post.description}</p>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div className="font-mono text-sm opacity-50 py-10">
            {t('blog.noPosts')}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
