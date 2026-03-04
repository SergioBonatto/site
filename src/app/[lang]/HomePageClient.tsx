'use client';
import { useEffect } from 'react';
import useDevTools from '@/lib/useDevtools';
import { useThemeContext } from '@/components/Theme/ThemeProvider';
import { Nav } from '@/components/Nav/Nav';
import Footer from '@/components/Footer/Footer';
import KonamiDoom from '@/components/EasterEggs/KonamiDoom';
import { Locale } from '@/i18n'

interface HomePageClientProps {
  children: React.ReactNode;
}

export function HomePageClient({ children }: HomePageClientProps) {
  const isDevToolsOpen = useDevTools();
  const { colors } = useThemeContext();

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
      console.warn(`%c⚠️ Boa tentativa, mas não é aqui!`, 'font-size: 16px; font-weight: bold; color: #ff6b6b; text-shadow: 0 0 10px rgba(255, 107, 107, 0.5);');
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

  return (
    <main className="flex flex-col min-h-screen scroll-smooth">
      <Nav />
      <div className="flex-1">
        {children}
      </div>
      <Footer />
      <KonamiDoom />
    </main>
  );
}
