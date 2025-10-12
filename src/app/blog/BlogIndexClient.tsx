"use client";
import React from 'react';
import Link from 'next/link';
import { Nav } from '@/components/Nav/Nav';
import styles from './blogIndex.module.css';
import Footer from '@/components/Footer/Footer';
import { useTranslation } from '@/i18n';


interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
}

export default function BlogIndexClient({ posts }: { posts: Post[] }) {
  const { t } = useTranslation();

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center bg-[var(--syntaxBg)] transition-colors duration-300"
      style={{ color: `var(--mono1)` }}
    >
      <Nav />

      <main
        className="w-full max-w-3xl px-4 sm:px-6 md:px-8 lg:px-10"
        style={{ width: '100%', maxWidth: '80%' }}
      >
        <section className="mt-8 sm:mt-10">
          <div className="mb-6 sm:mb-8">
            <h2 className={styles.header}>
              {t('blog.postsTitle')}
            </h2>
            <p className="text-base text-[var(--mono2)] mb-4">
              {t('blog.description')}
            </p>
          </div>

          {posts.length > 0 ? (
            <div className="space-y-4 sm:space-y-6">
              {posts.map(post => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className={`block rounded-xl group ${styles.card}`}
                  style={{ textDecoration: 'none' }}
                  tabIndex={0}
                >
                  <h3 className={styles.cardTitle}>{post.title}</h3>
                  <p className={styles.cardDate}>{post.date}</p>
                  <p className={styles.cardDesc}>{post.description}</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center text-[var(--mono2)] py-10">
              {t('blog.noPosts')}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
