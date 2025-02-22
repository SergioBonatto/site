'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Nav';
import gifFrames from 'gif-frames';

const generateAscii = (imageData: ImageData): string => {
  const characters = '@#8&OLI)i=+;:,. ';  // From darkest to lightest
  let ascii = '';
  const width = imageData.width;
  const height = imageData.height;

  // Determina o passo baseado no tamanho da tela
  const isPortrait = window.innerHeight > window.innerWidth;
  const yStep = isPortrait ? 4 : 2; // Pula mais linhas no modo retrato
  const xStep = isPortrait ? 2 : 1; // Pula mais colunas no modo retrato

  for (let y = 0; y < height; y += yStep) {
    for (let x = 0; x < width; x += xStep) {
      const idx = (y * width + x) * 4;
      const [r, g, b] = [
        imageData.data[idx],
        imageData.data[idx + 1],
        imageData.data[idx + 2]
      ];

      const brightness = Math.round((r + g + b) / 3);
      const charIndex = characters.length - 1 - Math.floor((brightness / 255) * (characters.length - 1));
      ascii += characters[charIndex];
    }
    ascii += '\n';
  }

  return ascii;
};

export default function JimmyPage() {
  const [mounted, setMounted] = useState(false);
  const [asciiFrames, setAsciiFrames] = useState<string[]>([]);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPortrait] = useState(false);

  const convertGifToAscii = async () => {
    try {
      const frameData = await gifFrames({
        url: '/jimmy.gif',
        frames: 'all',
        outputType: 'canvas'
      });

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const firstFrame = frameData[0];
      const fullWidth = firstFrame.frameInfo.width;
      const height = firstFrame.frameInfo.height;

      // Detecta se a tela está no modo retrato
      const isPortrait = window.innerHeight > window.innerWidth;

      // Se for modo retrato, pega apenas 60% da largura total, começando a 40% do início
      const cropX = isPortrait ? Math.floor(fullWidth * 0.2) : 0; // Começa a 40% da largura
      const cropWidth = isPortrait ? Math.floor(fullWidth * 0.6) : fullWidth; // Pega 60% da largura


      canvas.width = cropWidth;
      canvas.height = height;

      const frames = frameData.map(frame => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
          frame.getImage(),
          cropX,
          0,
          cropWidth,
          height,
          0,
          0,
          cropWidth,
          height
        );
        return generateAscii(ctx.getImageData(0, 0, cropWidth, height));
      });

      setAsciiFrames(frames);
    } catch (error) {
      console.error('Error processing GIF:', error);
    }
  };

  useEffect(() => {
    setMounted(true);
    convertGifToAscii();
  }, []);

  useEffect(() => {
    if (asciiFrames.length > 0) {
      const interval = setInterval(() => {
        setCurrentFrame((prev) => (prev + 1) % asciiFrames.length);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [asciiFrames]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center text-white text-center bg-black">
        <div className={`w-full ${isPortrait ? 'mb-[20vh]' : 'pb-8'}`}>
          {asciiFrames.length > 0 ? (
            <pre
              className="text-green-400 font-mono text-[0.5em] md:text-[0.6em] whitespace-pre overflow-hidden"
              style={{
                lineHeight: '1em',
                letterSpacing: '0em',
                transform: 'scale(1)',
                maxWidth: '100vw',
                maxHeight: '100vh',
                margin: '0 auto',
              }}
            >
              {asciiFrames[currentFrame]}
            </pre>
          ) : (
            <h2 className="text-2xl font-bold">
              why are you gay?
            </h2>
          )}
        </div>
      </main>
    </div>
  );
}
