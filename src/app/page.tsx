// app/page.tsx
import { Metadata } from 'next';
import SEO from '@/components/SEO';
import Navbar from '@/components/Nav';
import MusicPlayer from '@/components/musicPlayer';
import SolarSystem from '@/components/solarSystem';
import About from '@/components/About/about';
import Contact from '@/components/Contact/contact';
import Footer from '@/components/Footer/footer';

export const metadata: Metadata = {
  title: 'Sergio Bonatto - Full Stack Developer',
  description:
      'Dev, frontend, formal proofs, Brasilia,lambda calculus, Haskell, JavaScript, Python, Time Traveler, Fibo',
  openGraph: {
    title: 'Sergio Bonatto - Full Stack Developer',
    description:
      'Dev, frontend, formal proofs, Brasilia,lambda calculus, Haskell, JavaScript, Python, Time Traveler, Fibo',
    images: ['Imagens/cards.png'],
    url: 'https://sergiobonatto.github.io/',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@fibonatto',
    creator: '@fibonatto',
    title: 'Sergio Bonatto - Full Stack Developer',
    description:
      'Dev, frontend, formal proofs, Brasilia,lambda calculus, Haskell, JavaScript, Python, Fibo, Time Traveler',
    images: ['Imagens/cards.png'],
  },
};

export default function Home() {
  return (
    <div className="bg-teal-600">
      <SEO
        title="Sergio Bonatto - Formal Proofs"
        description="Dev, frontend, formal proofs, kind, kindelia, JavaScript, Time Traveler, São Paulo, Higher Order Company, HVM, lambda calculus, UwU tech"
        image="/cards.png"
        url="https://sergiobonatto.github.io/"
      />
      <Navbar />
      <MusicPlayer />
      <SolarSystem />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
