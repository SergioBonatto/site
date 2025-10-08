import React from 'react';
import { useThemeContext } from './ThemeProvider';

const labels = {
  dark: '🌙 Dark',
  light: '☀️ Light',
};

export function ThemeToggle() {
  const { theme } = useThemeContext();

  // Toggle between dark and light
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  const handleClick = () => {
    if (typeof window !== 'undefined' && (window as any).changeThemeWithGif) {
      (window as any).changeThemeWithGif(nextTheme);
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label={`Toggle theme (current: ${labels[theme]})`}
      style={{
        padding: '0.5rem 1rem',
        borderRadius: '0.5rem',
        border: 'none',
        background: theme === 'dark' ? '#222' : '#eee',
        color: theme === 'dark' ? '#fff' : '#222',
        cursor: 'pointer',
        fontWeight: 'bold',
      }}
    >
      {labels[nextTheme]}
    </button>
  );
}
