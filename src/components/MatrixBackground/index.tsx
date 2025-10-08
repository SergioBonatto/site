'use client';

import { useRef } from 'react';
import { useMatrixAnimation } from './useMatrixAnimation';
import { ClientOnly } from '../Core/ClientOnly';

interface MatrixBackgroundProps {
  className?: string;
}

// Internal component that only runs on the client side
function MatrixBackgroundInner({ className = '' }: MatrixBackgroundProps) {
  // Keep type as non-null, but initialize as null
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useMatrixAnimation(canvasRef);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full ${className}`}
      style={{ zIndex: -1 }}
    />
  );
}

// Public component that ensures client-side only rendering
export function MatrixBackground(props: MatrixBackgroundProps) {
  return (
    <ClientOnly>
      <MatrixBackgroundInner {...props} />
    </ClientOnly>
  );
}
