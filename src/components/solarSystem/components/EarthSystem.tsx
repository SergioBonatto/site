import React from 'react';

interface EarthSystemProps {
  systemScale: number;
  orbitScale?: number;
  planetSpacing?: number;
}

export const EarthSystem: React.FC<EarthSystemProps> = ({
  systemScale,
  orbitScale = 1,
  planetSpacing = 1
}) => {
  const orbitRadius = 250;

  return (
    <div
      className="absolute earth-system animate-orbit"
      style={{
        width: `${60 * systemScale}px`,
        height: `${60 * systemScale}px`,
        animationDuration: '10s',
        transformOrigin: `calc(${orbitRadius}px * ${systemScale} * ${orbitScale})`,
        left: `calc(50% - ${orbitRadius * systemScale * orbitScale * planetSpacing / 2}px)`,
        top: '50%',
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div
        className="absolute planet earth rounded-full"
        style={{
          width: `${25 * systemScale}px`,
          height: `${25 * systemScale}px`,
          backgroundColor: '#4682B4',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      />
      <div
        className="absolute moon rounded-full animate-moon-orbit"
        style={{
          width: `${7 * systemScale}px`,
          height: `${7 * systemScale}px`,
          backgroundColor: '#C0C0C0',
          top: '50%',
          left: '50%'
        }}
      />
    </div>
  );
};
