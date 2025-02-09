import React from 'react';

interface SunProps {
  systemScale: number;
  isPulsing: boolean;
  glowIntensity: number;
  onClick: () => void;
}

export const Sun: React.FC<SunProps> = ({
  systemScale,
  isPulsing,
  glowIntensity,
  onClick
}) => (
  <div
    className={`absolute rounded-full z-10 cursor-pointer transition-all duration-300
      ${isPulsing ? 'scale-110' : ''}`}
    onClick={onClick}
    style={{
      width: `${40 * systemScale}px`,
      height: `${40 * systemScale}px`,
      backgroundColor: '#FFD700',
      boxShadow: `
        0 0 ${50 * glowIntensity}px rgba(255, 200, 0, ${0.3 * glowIntensity}),
        0 0 ${100 * glowIntensity}px rgba(255, 160, 0, ${0.2 * glowIntensity}),
        0 0 ${150 * glowIntensity}px rgba(255, 120, 0, ${0.1 * glowIntensity})
      `,
      top: '50%',
      left: '50%',
      transform: `translate(-50%, -50%) scale(${isPulsing ? 1.1 : 1})`,
      filter: `brightness(${glowIntensity})`,
    }}
  />
);
