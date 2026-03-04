'use client';

import React from 'react';
import { useThemeContext } from './ThemeProvider';

export function ThemeToggle() {
  const { theme } = useThemeContext();
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  const handleClick = () => {
    // A animação e a troca de tema são controladas globalmente
    const changeThemeWithGif = (window as Window & { changeThemeWithGif?: (theme: string) => void }).changeThemeWithGif;
    if (typeof window !== 'undefined' && changeThemeWithGif) {
      changeThemeWithGif(nextTheme);
    }
  };

  return (
    <div className="font-mono text-md">
      <button
        onClick={handleClick}
        className="
          px-3 py-1.5
          tracking-wide
          whitespace-nowrap
          text-center
          opacity-70 hover:opacity-100
          transition-opacity
          flex items-center
        "
        aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      >
        <span className="opacity-50 mr-1">:</span>
        {theme}
      </button>
    </div>
  );
}
