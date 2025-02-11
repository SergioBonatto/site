'use client';
import { useEffect } from 'react';
import SEO from '@/components/SEO';
import Navbar from '@/components/Nav';
import MusicPlayer from '@/components/musicPlayer';
import SolarSystem from '@/components/solarSystem/components/SolarSystem';
import About from '@/components/About/about';
import Contact from '@/components/Contact/contact';
import Footer from '@/components/Footer/footer';
import { MatrixBackground } from '@/components/MatrixBackground';
import { ClientOnly } from '@/components/ClientOnly';
import useDevTools from '@/lib/useDevtools';


export default function Home() {
  const isDevToolsOpen = useDevTools();

  useEffect(() => {
  }, [isDevToolsOpen]);

  return (
    <main className={`relative min-h-screen bg-teal-600`}>
        <MatrixBackground />
      {/* Page content */}
      <div className="relative z-10">
        <SEO
          title="Sergio Bonatto - Formal Proofs"
          description="Full Stack Developer, formal proofs, lambda calculus, Haskell, JavaScript, Python, Time Traveler"
          image="/cards.png"
          url="https://bonatto.vercel.app/"
        />
        <Navbar />
        <MusicPlayer />
        <ClientOnly fallback={null}>
          <SolarSystem />
        </ClientOnly>
        <About />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
