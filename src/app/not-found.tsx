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

  if (!mounted) return null;  const normalized = currentPath.toLowerCase();

  // Função para calcular distância de Levenshtein (algoritmo de edição)
  const levenshteinDistance = (str1: string, str2: string): number => {
    const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));

    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;

    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,     // deletion
          matrix[j - 1][i] + 1,     // insertion
          matrix[j - 1][i - 1] + indicator // substitution
        );
      }
    }

    return matrix[str2.length][str1.length];
  };

  // Verifica se é um erro de digitação baseado em similaridade
  const isTypoOf = (input: string, target: string, maxDistance: number = 2): boolean => {
    if (input === target) return false; // Nome exato não é erro
    if (Math.abs(input.length - target.length) > maxDistance) return false; // Diferença muito grande

    return levenshteinDistance(input, target) <= maxDistance;
  };

  // Nomes corretos que queremos detectar erros
  const correctNames = ['gleizi', 'gleiziane'];

  const isLikelyMisspelling = correctNames.some(name => isTypoOf(normalized, name));

  if (isLikelyMisspelling) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#000000' }}>
        <Navbar />
        <main className="flex-1 flex items-center justify-center font-mono text-sm">
          <div className="text-left space-y-4 p-4 max-w-xl w-full text-green-400">
            <div>
              <span className="text-white">C:\Projects\poetry&gt;</span>{' '}
              <span className="text-yellow-300">cargo run --bin=&quot;{currentPath}&quot;</span>
            </div>

            <div className="text-red-500">
              error: could not find bin target named `{currentPath}` in `poetry`
            </div>

            <div className="text-gray-300">
              note: maybe you mistyped the name? or maybe... you weren&apos;t meant to run this binary.
            </div>

            <div className="pt-4 italic text-gray-500">
              (You got close. But that&apos;s not the name that makes everything work.)
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

  // Default 404 page
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
