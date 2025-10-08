import React from 'react';
import { useThemeContext } from './ThemeProvider';

export function ThemeToggle() {
  const { theme } = useThemeContext();
  const nextTheme = theme === 'dark' ? 'light' : 'dark';
  const isDark = theme === 'dark';

  const handleClick = () => {
    // The animation will be controlled by CSS
    const changeThemeWithGif = (window as Window & { changeThemeWithGif?: (theme: string) => void }).changeThemeWithGif;
    if (typeof window !== 'undefined' && changeThemeWithGif) {
      changeThemeWithGif(nextTheme);
    }
  };

  // ------------------------------------------
  // SVG Icons
  // ------------------------------------------

  // The Moon will be filled with var(--hue6) (gold/orange)
  const MoonIcon = () => (
    <svg
      key="moon" // Key to help React manage the transition
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

  // The Sun will be filled and stroked with currentColor (var(--mono1))
  const SunIcon = () => (
    <svg
      key="sun" // Key to help React manage the transition
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
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="theme-toggle"
      tabIndex={0}
    >
      {/* Using the 'key' prop and React Transition Group (if used) is ideal.
          Without RTG, the trick is to make the span contain the SVG and animate the SVG. */}
      <span className="theme-toggle__icon" aria-hidden="true">
        {/* We use the 'key' prop to force an "element swap",
            which CSS can intercept with animations. */}
        {isDark ? <MoonIcon /> : <SunIcon />}
      </span>
    </button>
  );
}
