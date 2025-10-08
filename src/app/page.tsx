'use client';
import { useEffect } from 'react';
import useDevTools from '@/lib/useDevtools';
import { useThemeContext } from '@/components/ThemeProvider';
import { Nav } from '@/components/Nav';
import About from '@/components/About';


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

  return <HomeContent />;
}

function HomeContent() {
  const { colors } = useThemeContext();
  return (
    <main>
      <Nav />
      <div style={{ backgroundColor: colors.syntaxBg, color: colors.mono1 }}>
        <About />
      </div>
    </main>
  );
}
