import React from 'react';
import { Planet } from '../types';

interface PlanetProps {
  planet: Planet;
  systemScale: number;
  orbitScale?: number;
  planetSpacing?: number;
}

export const PlanetComponent: React.FC<PlanetProps> = ({
  planet,
  systemScale,
  orbitScale = 1,
  planetSpacing = 1
}) => {
  const planetStyle = {
    position: 'absolute',
    width: `${planet.size * systemScale}px`,
    height: `${planet.size * systemScale}px`,
    backgroundColor: planet.color,
    borderRadius: '50%',
    animationDuration: `${planet.animationDuration}s`,
    transformOrigin: `calc(${planet.orbitRadius * systemScale * orbitScale}px)`,
    left: `calc(50% - ${planet.orbitRadius * systemScale * orbitScale * planetSpacing / 2}px)`,
    top: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1
  } as React.CSSProperties;

  if (planet.name === 'saturn') {
    return (
      <div
        className={`absolute planet ${planet.name} animate-orbit`}
        style={planetStyle}
      >
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                     border-transparent border-opacity-60 border-solid"
          style={{
            width: `${(planet.size * 1.7) * systemScale}px`,
            height: `${(planet.size * 0.6) * systemScale}px`,
            borderWidth: `${(planet.size * 0.15) * systemScale}px`,
            borderColor: 'rgba(244, 164, 96, 0.6)',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%) rotate(20deg)',
            zIndex: -1
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={`absolute planet ${planet.name} animate-orbit`}
      style={planetStyle}
    />
  );
};
