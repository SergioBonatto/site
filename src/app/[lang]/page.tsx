'use client';
import { useEffect } from 'react';
import useDevTools from '@/lib/useDevtools';
import { useThemeContext } from '@/components/Theme/ThemeProvider';
import { Nav } from '@/components/Nav/Nav';
import About from '@/components/About/About';
import Footer from '@/components/Footer/Footer';
import ProjectsSection from '@/components/Projects/ProjectsSection';
import KonamiDoom from '@/components/EasterEggs/KonamiDoom';

export default function Home() {
  const isDevToolsOpen = useDevTools();

  useEffect(() => {
    if (isDevToolsOpen) {
      console.log(`
        🕵️‍♂️ Hey there, curious developer!

        While I appreciate your investigative spirit,
        I'm afraid I can't let you peek behind the curtain.

        But since you're here, why not grab a coffee ☕️ and visit:
        https://github.com/SergioBonatto

        PS: The cake is a lie! 🍰
      `);
    }
  }, [isDevToolsOpen]);

  // Handle hash navigation on page load
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // Aguarda um pouco para garantir que os elementos foram renderizados
      setTimeout(() => {
        const id = hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          const offset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, []);

  return <HomeContent />;
}

function HomeContent() {
  const { colors } = useThemeContext();
  return (
    <main className="scroll-smooth">
      <Nav />
      <div
        style={{ backgroundColor: colors.syntaxBg, color: colors.mono1 }}
        className="transition-colors duration-300"
      >
        <About />
      </div>
      <ProjectsSection />
      <Footer />
      <KonamiDoom />
    </main>
  );
}
