import React from 'react';
import { useThemeContext } from './ThemeProvider';

export function ThemeToggle() {
  const { theme } = useThemeContext();
  const nextTheme = theme === 'dark' ? 'light' : 'dark';
  const isDark = theme === 'dark';

  const handleClick = () => {
    // A animação será controlada pelo CSS
    if (typeof window !== 'undefined' && (window as any).changeThemeWithGif) {
      (window as any).changeThemeWithGif(nextTheme);
    }
  };

  // ------------------------------------------
  // Ícones SVG
  // ------------------------------------------

  // A Lua será preenchida com var(--hue6) (dourado/laranja)
  const MoonIcon = () => (
    <svg
      key="moon" // Chave para ajudar o React a gerenciar a transição
      className="toggle-svg"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="var(--hue6)"
      stroke="var(--hue6)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  );

  // O Sol será preenchido e traçado com currentColor (var(--mono1))
  const SunIcon = () => (
    <svg
      key="sun" // Chave para ajudar o React a gerenciar a transição
      className="toggle-svg"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
  );

  return (
    <button
      onClick={handleClick}
      aria-label={isDark ? 'Mudar para o tema claro' : 'Mudar para o tema escuro'}
      className="theme-toggle"
      tabIndex={0}
    >
      {/* O uso da chave 'key' e o React Transition Group (se usasse) é o ideal.
          Sem RTG, o truque é fazer com que o span contenha o SVG e animar o SVG. */}
      <span className="theme-toggle__icon" aria-hidden="true">
        {/* Usamos a chave 'key' para forçar uma "troca" de elemento,
            que o CSS pode interceptar com animações. */}
        {isDark ? <MoonIcon /> : <SunIcon />}
      </span>
    </button>
  );
}
