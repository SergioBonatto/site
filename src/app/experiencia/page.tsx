import React from 'react';
import { Metadata } from 'next';
import { Nav } from '@/components/Nav/Nav';
import Footer from '@/components/Footer/Footer';
import styles from './experience.module.css';
import ExperienceView from './ExperienceView'; // Import the new Client Component

// Metadata remains the same, it's great for SEO.
export const metadata: Metadata = {
  title: 'Experiência',
  description: 'Experiência profissional de Sergio Bonatto - Fundador do Agoriz, desenvolvedor na Higher Order Company, desenvolvedor de jogos na UwU Games, e especialista em programação funcional, blockchain, e desenvolvimento web.',
  keywords: ['Sergio Bonatto', 'Experiência', 'Agoriz', 'Higher Order Company', 'UwU Games', 'Blockchain', 'Smart Contracts', 'Solidity', 'React', 'TypeScript', 'Haskell', 'Game Development'],
  openGraph: {
    title: 'Experiência - Sergio Bonatto',
    description: 'Experiência profissional de Sergio Bonatto - Fundador do Agoriz, desenvolvedor na Higher Order Company, desenvolvedor de jogos na UwU Games, e especialista em programação funcional, blockchain, e desenvolvimento web.',
  },
  twitter: {
    title: 'Experiência - Sergio Bonatto',
    description: 'Experiência profissional de Sergio Bonatto - Fundador do Agoriz, desenvolvedor na Higher Order Company, desenvolvedor de jogos na UwU Games, e especialista em programação funcional, blockchain, e desenvolvimento web.',
  },
};

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
