'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Nav';
import Footer from '@/components/Footer/footer';

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname.slice(1));
    }
  }, []);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorTimer);
  }, []);

  if (!mounted) return null;

  const normalized = currentPath.toLowerCase();

  // Lista de variações comuns para "gleizi/gleiziane" (mas não os nomes corretos)
  const misspellings = [
    'gleisy', 'gleize', 'gleizy', 'gleis', 'glei', 'gleizee',
    'glayzi', 'gleise', 'glazy', 'gleyzi', 'glaizi',
    'gleizian', 'gleiziana', 'gleiziany', 'glezianne'
  ];

  const isLikelyMisspelling = misspellings.some(name => normalized.includes(name));

  if (isLikelyMisspelling) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#000000' }}>
        <Navbar />
        <main className="flex-1 flex items-center justify-center font-mono text-sm">
          <div className="text-left space-y-4 p-4 max-w-xl w-full text-green-400">
            <div>
              <span className="text-white">C:\Projects\poetry&gt;</span>{' '}
              <span className="text-yellow-300">cargo run --bin="{currentPath}"</span>
            </div>

            <div className="text-red-500">
              error: could not find bin target named `{currentPath}` in `poetry`
            </div>

            <div className="text-gray-300">
              note: maybe you mistyped the name? or maybe... you weren’t meant to run this binary.
            </div>

            <div className="pt-4 italic text-gray-500">
              (Você chegou perto. Mas não é esse o nome que faz tudo funcionar.)
            </div>

            <div className="pt-6">
              <span className="text-white">C:\Projects\poetry&gt;</span>
              <span className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>_</span>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Página 404 padrão
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main
        className="flex-1 flex items-center justify-center text-white text-center"
        style={{
          backgroundColor: 'grey',
          backgroundImage: 'url(/buzz-no-signs-of-intelligent-life.gif)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundBlendMode: 'multiply',
          backgroundPosition: 'center',
        }}
      >
        <div className="mt-auto pb-8">
          <h2 className="text-2xl font-bold">
            Seems like no sign of intelligent life anywhere. 🤨
          </h2>
        </div>
      </main>
      <Footer />
    </div>
  );
}
