'use client';

import React, { useState, useEffect } from 'react';

const SolarSystem: React.FC = () => {
  const [systemScale, setSystemScale] = useState(1);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
    setMounted(true);
    // Responsive scaling based on screen size
    const handleResize = () => {
      const baseScale = window.innerWidth < 640 ? 0.5 :
                        window.innerWidth < 1024 ? 0.7 : 1;
      setSystemScale(baseScale);
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!mounted) return null;

  return isMobile ? <MobileSolarSystem /> : <DesktopSolarSystem systemScale={systemScale} />;
};

const DesktopSolarSystem: React.FC<{ systemScale: number }> = ({ systemScale }) => {
  const [isSunPulsing, setIsSunPulsing] = useState(false);
  const [sunGlowIntensity, setSunGlowIntensity] = useState(1);
  const [isUfoVisible, setIsUfoVisible] = useState(false);
  const [ufoPosition, setUfoPosition] = useState(0);

  const planets = [
    { name: 'mercury', size: 10, color: '#9E9E9E', orbitRadius: 100, animationDuration: 5 },
    { name: 'venus', size: 20, color: '#F5CBA7', orbitRadius: 150, animationDuration: 7 },
    { name: 'mars', size: 15, color: '#FF4500', orbitRadius: 320, animationDuration: 12 },
    { name: 'jupiter', size: 40, color: '#D2B48C', orbitRadius: 420, animationDuration: 15 },
    { name: 'saturn', size: 35, color: '#F4A460', orbitRadius: 550, animationDuration: 18 },
    { name: 'uranus', size: 30, color: '#5F9EA0', orbitRadius: 700, animationDuration: 22 },
    { name: 'neptune', size: 30, color: '#4682B4', orbitRadius: 850, animationDuration: 27 }
  ];
  const stars = React.useMemo(() =>
    Array.from({ length: 150 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.7 + 0.3
    }))
  , []);

  const renderPlanet = (planet: typeof planets[0]) => {
    const planetStyle = {
      position: 'absolute',
      width: `${planet.size * systemScale}px`,
      height: `${planet.size * systemScale}px`,
      backgroundColor: planet.color,
      borderRadius: '50%',
      animationDuration: `${planet.animationDuration}s`,
      transformOrigin: `calc(${planet.orbitRadius * systemScale}px * var(--orbit-scale))`,
      left: `calc(50% - ${planet.orbitRadius * systemScale / 2}px)`,
      top: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 1
    } as React.CSSProperties;

    // Special rendering for Saturn with its ring
    if (planet.name === 'saturn') {
      return (
        <div
          key={planet.name}
          className={`absolute planet ${planet.name} animate-orbit`}
          style={planetStyle}
        >
          {/* Saturn's ring */}
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
        key={planet.name}
        className={`absolute planet ${planet.name} animate-orbit`}
        style={planetStyle}
      />
    );
  };

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

   // UFO animation
    setTimeout(() => {
      setUfoPosition(200); // Move UFO to the right
    }, 100);

    setTimeout(() => {
      setUfoPosition(0); // Move UFO back to the left
      setTimeout(() => {
        setIsUfoVisible(false); // Hide UFO
      }, 1000);
    }, 1500);
  };

  return (
    <div className="relative w-full max-w-6xl h-[80vh] bg-black mx-auto my-10 flex justify-center items-center overflow-hidden border-2 border-[#d4d0c8] p-4 mb-[5rem]"
      style={{ transform: 'translateY(4rem)' }}>
      {/* Stars */}
      {stars.map((star, index) => (
        <div
          key={`star-${index}`}
          className="absolute bg-white rounded-full"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`,
            opacity: star.opacity
          }}
        />
      ))}
      {/* UFO */}
      <div
        className={`absolute z-20 transition-all duration-1000 ease-in-out
          ${isUfoVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{
          width: `${30 * systemScale}px`,
          height: `${15 * systemScale}px`,
          top: '50%',
          left: '50%',
          transform: `translate(calc(-50% + ${ufoPosition}px), -50%)`,
        }}
      >
        {/* UFO Body */}
        <div
          className="absolute w-full h-1/2 bottom-0 rounded-full"
          style={{
            backgroundColor: '#303030',
            boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
          }}
        />
        {/* UFO Dome */}
        <div
          className="absolute w-[60%] h-[60%] bottom-[40%] left-1/2 -translate-x-1/2 rounded-full"
          style={{
            backgroundColor: 'rgba(0, 255, 255, 0.3)',
            border: '2px solid #505050',
          }}
        />
        {/* UFO Lights */}
        <div className="absolute w-full bottom-0 flex justify-around">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-[4px] h-[4px] rounded-full animate-pulse"
              style={{
                backgroundColor: 'rgba(0, 255, 255, 0.8)',
                boxShadow: '0 0 5px rgba(0, 255, 255, 0.8)',
              }}
            />
          ))}
        </div>
      </div>
      {/* Sun */}
      <div
        className={`absolute rounded-full z-10 cursor-pointer transition-all duration-300
          ${isSunPulsing ? 'scale-110' : ''}`}
        onClick={handleSunClick}
        style={{
          width: `${40 * systemScale}px`,
          height: `${40 * systemScale}px`,
          backgroundColor: '#FFD700',
          boxShadow: `
            0 0 ${50 * sunGlowIntensity}px rgba(255, 200, 0, ${0.3 * sunGlowIntensity}),
            0 0 ${100 * sunGlowIntensity}px rgba(255, 160, 0, ${0.2 * sunGlowIntensity}),
            0 0 ${150 * sunGlowIntensity}px rgba(255, 120, 0, ${0.1 * sunGlowIntensity})
          `,
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${isSunPulsing ? 1.1 : 1})`,
          filter: `brightness(${sunGlowIntensity})`,
        }}
      />

      {/* Earth-Moon System */}
      <div
        className="absolute earth-system animate-orbit"
        style={{
          width: `${60 * systemScale}px`,
          height: `${60 * systemScale}px`,
          animationDuration: '10s',
          transformOrigin: `calc(250px * ${systemScale} * var(--orbit-scale))`,
          left: `calc(50% - ${250 * systemScale / 2}px)`,
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

      {/* Render all other planets */}
      {planets.map(renderPlanet)}
    </div>
  );
};

const MobileSolarSystem: React.FC = () => {
  const [systemScale, setSystemScale] = useState(1);
  const [orbitScale, setOrbitScale] = useState(1);
  const [planetSpacing, setPlanetSpacing] = useState(1);
  const [isSunPulsing, setIsSunPulsing] = useState(false);
  const [sunGlowIntensity, setSunGlowIntensity] = useState(1);
  const [isUfoVisible, setIsUfoVisible] = useState(false);
  const [ufoPosition, setUfoPosition] = useState(0);

  useEffect(() => {
    // Responsive scaling based on screen size
    const handleResize = () => {
      const baseScale = window.innerWidth < 640 ? 0.5 : 1;
      const orbitScale = window.innerWidth < 640 ? 0.5 : 1;
      const spacing = window.innerWidth < 640 ? 1.5 : 1;
      setSystemScale(baseScale);
      setOrbitScale(orbitScale);
      setPlanetSpacing(spacing);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const planets = [
    { name: 'mercury', size: 10, color: '#9E9E9E', orbitRadius: 150, animationDuration: 5 },
    { name: 'venus', size: 20, color: '#F5CBA7', orbitRadius: 250, animationDuration: 7 },
    { name: 'mars', size: 15, color: '#FF4500', orbitRadius: 450, animationDuration: 12 },
    { name: 'jupiter', size: 40, color: '#D2B48C', orbitRadius: 600, animationDuration: 15 },
    { name: 'saturn', size: 35, color: '#F4A460', orbitRadius: 800, animationDuration: 18 },
    { name: 'uranus', size: 30, color: '#5F9EA0', orbitRadius: 1000, animationDuration: 22 },
    { name: 'neptune', size: 30, color: '#4682B4', orbitRadius: 1200, animationDuration: 27 }
  ];
    const stars = React.useMemo(() =>
      Array.from({ length: 150 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.7 + 0.3
      }))
    , []);

  const renderPlanet = (planet: typeof planets[0]) => {
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

    // Special rendering for Saturn with its ring
    if (planet.name === 'saturn') {
      return (
        <div
          key={planet.name}
          className={`absolute planet ${planet.name} animate-orbit`}
          style={planetStyle}
        >
          {/* Saturn's ring */}
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
        key={planet.name}
        className={`absolute planet ${planet.name} animate-orbit`}
        style={planetStyle}
      />
    );
  };
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

    // UFO animation
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
  return (
    <div className="relative w-full max-w-6xl h-[80vh] bg-black mx-auto my-10 flex justify-center items-center overflow-hidden border-2 border-[#d4d0c8] p-4 mb-[5rem]"
      style={{ transform: 'translateY(4rem)' }}>
      {/* Stars */}
      {stars.map((star, index) => (
        <div
          key={`star-${index}`}
          className="absolute bg-white rounded-full"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`,
            opacity: star.opacity
          }}
        />
      ))}
      {/* UFO */}
      <div
        className={`absolute z-20 transition-all duration-1000 ease-in-out
          ${isUfoVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{
          width: `${30 * systemScale}px`,
          height: `${15 * systemScale}px`,
          top: '50%',
          left: '50%',
          transform: `translate(calc(-50% + ${ufoPosition}px), -50%)`,
        }}
      >
        {/* UFO Body */}
        <div
          className="absolute w-full h-1/2 bottom-0 rounded-full"
          style={{
            backgroundColor: '#303030',
            boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
          }}
        />
        {/* UFO Dome */}
        <div
          className="absolute w-[60%] h-[60%] bottom-[40%] left-1/2 -translate-x-1/2 rounded-full"
          style={{
            backgroundColor: 'rgba(0, 255, 255, 0.3)',
            border: '2px solid #505050',
          }}
        />
        {/* UFO Lights */}
        <div className="absolute w-full bottom-0 flex justify-around">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-[4px] h-[4px] rounded-full animate-pulse"
              style={{
                backgroundColor: 'rgba(0, 255, 255, 0.8)',
                boxShadow: '0 0 5px rgba(0, 255, 255, 0.8)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Sun */}
      <div
        className={`absolute rounded-full z-10 cursor-pointer transition-all duration-300
          ${isSunPulsing ? 'scale-110' : ''}`}
        onClick={handleSunClick}
        style={{
          width: `${40 * systemScale}px`,
          height: `${40 * systemScale}px`,
          backgroundColor: '#FFD700',
          boxShadow: `0 0 ${25 * systemScale}px rgba(255, 255, 0, 0.5)`,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      />

      {/* Earth-Moon System */}
      <div
        className="absolute earth-system animate-orbit"
        style={{
          width: `${60 * systemScale}px`,
          height: `${60 * systemScale}px`,
          animationDuration: '10s',
          transformOrigin: `calc(350px * ${systemScale} * ${orbitScale})`,
          left: `calc(50% - ${350 * systemScale * orbitScale * planetSpacing / 2}px)`,
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

      {/* Render all other planets */}
      {planets.map(renderPlanet)}
    </div>
  );
};

export default SolarSystem;
