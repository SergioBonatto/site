'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Nav';
import Footer from '@/components/Footer/footer';

export default function JimmyPage() {
  const [mounted, setMounted] = useState(false);
  const [asciiFrames, setAsciiFrames] = useState<string[]>([]);
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    setMounted(true);

    // Função para converter GIF para ASCII
    async function convertGifToAscii() {
      try {
        // Carregar o GIF
        const response = await fetch('/jimmy.gif');
        const blob = await response.blob();
        const img = new Image();
        const url = URL.createObjectURL(blob);
        img.src = url;

        // Esperar o GIF carregar
        await new Promise((resolve) => (img.onload = resolve));

        // Configurar canvas para processar frames
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = img.width;
        canvas.height = img.height;

        // Função simples para converter imagem para ASCII
        const generateAscii = (imageData: ImageData) => {
          const chars = ' .:-=+*#%@';
          let ascii = '';
          for (let y = 0; y < imageData.height; y += 2) {
            for (let x = 0; x < imageData.width; x++) {
              const i = (y * imageData.width + x) * 4;
              const r = imageData.data[i];
              const g = imageData.data[i + 1];
              const b = imageData.data[i + 2];
              const brightness = (r + g + b) / 3;
              const charIndex = Math.floor((brightness / 255) * (chars.length - 1));
              ascii += chars[charIndex];
            }
            ascii += '\n';
          }
          return ascii;
        };

        // Gerar frames (simulação simples)
        const frames: string[] = [];
        const frameCount = 10; // Número estimado de frames
        for (let i = 0; i < frameCount; i++) {
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width / 4, canvas.height / 4); // Reduzindo resolução
          frames.push(generateAscii(imageData));
        }

        setAsciiFrames(frames);

        // Limpar URL temporária
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Erro ao processar GIF:', error);
      }
    }

    convertGifToAscii();
  }, []);

  // Animação dos frames
  useEffect(() => {
    if (asciiFrames.length > 0) {
      const interval = setInterval(() => {
        setCurrentFrame((prev) => (prev + 1) % asciiFrames.length);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [asciiFrames]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main
        className="flex-1 flex items-center justify-center text-white text-center"
        style={{
          backgroundColor: 'grey',
          backgroundImage: 'url(/jimmy.gif)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundBlendMode: 'multiply',
          backgroundPosition: 'center',
        }}
      >
        <div className="mt-auto pb-8">
          {asciiFrames.length > 0 ? (
            <pre className="text-green-400 font-mono text-xs md:text-sm whitespace-pre">
              {asciiFrames[currentFrame]}
            </pre>
          ) : (
            <h2 className="text-2xl font-bold">
              Carregando animação ASCII...
            </h2>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
