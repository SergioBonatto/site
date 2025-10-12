import React from 'react';
import { generateSEOMetadata } from '@/components/Core/SEO';
import { Nav } from '@/components/Nav/Nav';
import Footer from '@/components/Footer/Footer';
import styles from './experience.module.css';
import ExperienceView from './ExperienceView';
import { getDictionary } from '@/i18n/get-dictionary';
import { LanguageCode } from '@/i18n/types';

export async function generateMetadata({ params }: { params: Promise<{ lang: LanguageCode }> }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  return generateSEOMetadata({
    title: dictionary['experience.title'],
    description: dictionary['experience.description'],
    image: '/og-image.png',
    url: '/experiencia',
    keywords: ['Sergio Bonatto', 'Experience', 'Agoriz', 'Higher Order Company', 'UwU Games', 'Blockchain', 'Smart Contracts', 'Solidity', 'React', 'TypeScript', 'Haskell', 'Game Development', 'Functional Programming'],
  });
}

// This is the main Server Component for the page.
// It renders the static shell (Nav, Footer) and the dynamic client part (ExperienceView).
export default function ExperienciaPage() {
  return (
    <div className={styles.pageWrapper}>
      <Nav />
      <ExperienceView />
      <Footer />
    </div>
  );
}
