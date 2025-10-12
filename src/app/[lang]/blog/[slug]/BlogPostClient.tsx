'use client';

import React from 'react';
import { Nav } from '@/components/Nav/Nav';
import MarkdownContent from '@/components/Core/MarkdownContent';
import dynamic from 'next/dynamic';
const PrismLoader = dynamic(() => import('@/components/Theme/PrismLoader'), {
  ssr: false,
  loading: () => <div style={{ height: 1 }} />,
});
import { ClientOnly } from '@/components/Core/ClientOnly';
import Footer from '@/components/Footer/Footer';
import styles from '../article.module.css';
import { useTranslation } from '@/i18n/client';

interface PostData {
  title: string;
  date: string;
  description: string;
}

interface BlogPostClientProps {
  postData: { data: PostData; content: string } | null;
  contentHtml?: string;
}

export default function BlogPostClient({ postData, contentHtml }: BlogPostClientProps) {
  const { t } = useTranslation();

  if (!postData) {
    return (
      <div className={styles.container} style={{ color: 'var(--mono1)' }}>
        <main className={styles.main}>
          <Nav />
          <section>
            <div className={styles.header}>
              <h2 className={styles.title}>
                {t('blog.notFound')}
              </h2>
            </div>
          </section>
        </main>
      </div>
    );
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
            <MarkdownContent content={contentHtml || ''} />
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
