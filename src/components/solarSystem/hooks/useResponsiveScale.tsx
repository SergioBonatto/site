'use client';

import { useState, useEffect } from 'react';

interface ScaleConfig {
  systemScale: number;
  orbitScale: number;
  planetSpacing: number;
  isMobile: boolean;
}

export const useResponsiveScale = (): ScaleConfig => {
  const [config, setConfig] = useState<ScaleConfig>({
    systemScale: 1,
    orbitScale: 1,
    planetSpacing: 1,
    isMobile: false
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const isMobile = width < 640;

      setConfig({
        systemScale: isMobile ? 0.5 : width < 1024 ? 0.7 : 1,
        orbitScale: isMobile ? 0.5 : 1,
        planetSpacing: isMobile ? 1.5 : 1,
        isMobile
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return config;
};
