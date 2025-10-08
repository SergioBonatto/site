"use client";
import React, { useEffect, useRef, useState } from 'react';
import { useThemeContext } from './ThemeProvider';
import colors from '@/config/colors';

const gifUrl = '/shigure-ui-smol.gif';

const FloatingGif: React.FC = () => {
  const { theme, requestThemeChange } = useThemeContext();
  const [visible, setVisible] = useState(false);
  const [expanding, setExpanding] = useState(false);
  const [pendingTheme, setPendingTheme] = useState<null | string>(null);
  const [gifKey, setGifKey] = useState(0);
  const prevTheme = useRef(theme);
  const timeouts = useRef<{show?: NodeJS.Timeout, change?: NodeJS.Timeout}>({});


  // Function to start the flow: shows gif, changes theme after 2.9s, hides after 3s
  const startThemeChangeWithGif = (newTheme: string) => {
    if (timeouts.current.change) clearTimeout(timeouts.current.change);
    if (timeouts.current.show) clearTimeout(timeouts.current.show);
    setExpanding(false);
    setVisible(false);
    setTimeout(() => {
      setPendingTheme(newTheme);
      setVisible(true);
      setTimeout(() => setExpanding(true), 30);
      timeouts.current.change = setTimeout(() => {
        requestThemeChange(newTheme as any);
      }, 1000);
      timeouts.current.show = setTimeout(() => {
        setVisible(false);
        setTimeout(() => {
          setExpanding(false);
          setPendingTheme(null);
        }, 200);
      }, 1500);
    }, 50);
  };


  // Expor função global apenas no cliente
  useEffect(() => {
    (window as any).changeThemeWithGif = startThemeChangeWithGif;
  }, [startThemeChangeWithGif]);


  // ThemeToggle and others should call startThemeChangeWithGif

  // Prevent gif from showing on initial mount
  const hasMounted = useRef(false);

  // Only show gif if theme change was initiated by startThemeChangeWithGif
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      prevTheme.current = theme;
      return;
    }
    // If theme changed and it was NOT triggered by startThemeChangeWithGif, do not show gif
    if (prevTheme.current !== theme && pendingTheme) {
      // The animation will be handled by startThemeChangeWithGif
      prevTheme.current = theme;
      return;
    }
    prevTheme.current = theme;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);


  const oppositeTheme = theme === 'light' ? 'dark' : 'light';
  const targetColor = colors[oppositeTheme].syntaxBg;

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10002,
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      <div
        style={{
          width: 120,
          height: 120,
          animation: 'spin 4s linear infinite',
          display: 'block',
          opacity: visible ? 1 : 0,
          transition:
            (visible || expanding)
              ? 'opacity 0s, transform 3s cubic-bezier(0.4,0,0.2,1)'
              : 'opacity 0.3s, transform 0s',
          transform: expanding ? 'scale(50)' : 'scale(1)',
          backgroundColor: targetColor,
          maskImage: `url(${gifUrl})`,
          maskSize: 'contain',
          maskRepeat: 'no-repeat',
          maskPosition: 'center',
          // Prefix for Safari/Chrome compatibility
          WebkitMaskImage: `url(${gifUrl})`,
          WebkitMaskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
        }}
      />
    </div>
  );
};

export default FloatingGif;
