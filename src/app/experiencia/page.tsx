import React from 'react';
import { Metadata } from 'next';
import ExperienceClient from './ExperienceClient';

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

export default function ExperienciaPage() {
  return <ExperienceClient />;
}
