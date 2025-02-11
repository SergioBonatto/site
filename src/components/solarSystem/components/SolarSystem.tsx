'use client';

import React, { useState } from 'react';
import { Stars } from './Stars';
import { UFO } from './UFO';
import { Sun } from './Sun';
import { EarthSystem } from './EarthSystem';
import { PlanetComponent } from './Planet';
import { useStars } from '../hooks/useStars';
import { useResponsiveScale } from '../hooks/useResponsiveScale';
import { desktopPlanets, mobilePlanets } from '../data/planets';


const SolarSystem: React.FC = () => {
  const { systemScale, orbitScale, planetSpacing, isMobile } = useResponsiveScale();
  const stars = useStars(150);

  const [isSunPulsing, setIsSunPulsing] = useState(false);
  const [sunGlowIntensity, setSunGlowIntensity] = useState(1);
  const [isUfoVisible, setIsUfoVisible] = useState(false);
  const [ufoPosition, setUfoPosition] = useState(0);

  const handleSunClick = () => {
    setIsSunPulsing(true);
    setSunGlowIntensity(2.5);
    setIsUfoVisible(true);

    const pulseInterval = setInterval(() => {
      setSunGlowIntensity(prev => {
        if (prev > 1) return prev - 0.1;
        clearInterval(pulseInterval);
        return 1;
      });
    }, 50);

    setTimeout(() => {
      setUfoPosition(200);
    }, 100);

    setTimeout(() => {
      setUfoPosition(0);
      setTimeout(() => {
        setIsUfoVisible(false);
      }, 1000);
    }, 1500);
  };

  const planets = isMobile ? mobilePlanets : desktopPlanets;

  return (
    <div className="relative w-full max-w-6xl h-[80vh] bg-black mx-auto my-10 flex justify-center items-center overflow-hidden border-2 border-[#d4d0c8] p-4 mb-[5rem]"
      style={{ transform: 'translateY(4rem)' }}>
      <Stars stars={stars} />
      <UFO
        isVisible={isUfoVisible}
        position={ufoPosition}
        systemScale={systemScale}
      />
      <Sun
        systemScale={systemScale}
        isPulsing={isSunPulsing}
        glowIntensity={sunGlowIntensity}
        onClick={handleSunClick}
      />
      <EarthSystem
        systemScale={systemScale}
        orbitScale={orbitScale}
        planetSpacing={planetSpacing}
      />
      {planets.map(planet => (
        <PlanetComponent
          key={planet.name}
          planet={planet}
          systemScale={systemScale}
          orbitScale={orbitScale}
          planetSpacing={planetSpacing}
        />
      ))}
    </div>
  );
};

export default SolarSystem;
