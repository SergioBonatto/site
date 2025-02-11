'use client';

import { useEffect, useCallback, RefObject } from 'react';

export function useMatrixAnimation(
  canvasRef: RefObject<HTMLCanvasElement | null>
) {
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    return { canvas, ctx };
  }, []);

  useEffect(() => {
    const setup = setupCanvas();
    if (!setup) return;

    const { canvas, ctx } = setup;

    const letters = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    let animationFrameId: number;

    function render() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        const opacity = Math.max(0.2, 1 - (y / canvas.height));
        ctx.fillStyle = `rgba(0, 255, 0, ${opacity})`;

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(render);
    }

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [setupCanvas]);
}
