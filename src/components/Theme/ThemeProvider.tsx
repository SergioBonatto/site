"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import colors from '../../config/colors';
import type { Theme, ThemeColors } from '../../types/theme';


interface ThemeContextProps {
  theme: Theme;
  colors: ThemeColors;
  setThemeMode: (theme: Theme) => void;
  requestThemeChange: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
  throw new Error('useThemeContext must be used within ThemeProvider');
  }
  return context;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [themeColors, setThemeColors] = useState<ThemeColors>(colors.dark);

  // Applies the theme to <html> immediately
  const applyTheme = useCallback((newTheme: Theme) => {
    const root = document.documentElement;

    // Step 1: Update color-scheme immediately to prevent flash
    // Only update if different to avoid forcing style recalcs
    if (root.style.colorScheme !== newTheme) {
      root.style.colorScheme = newTheme;
    }

    // Step 2: Update classes synchronously (needed for CSS selectors)
    if (!root.classList.contains(newTheme)) {
      root.classList.remove('dark', 'light');
      root.classList.add(newTheme);
    }

    // Step 3: Batch CSS variable updates in a single rAF
    // This ensures all updates happen in one render cycle
    requestAnimationFrame(() => {
      const themeObj = colors[newTheme];

      // Apply all CSS variables
      // Modern browsers optimize consecutive setProperty calls
      for (const [key, value] of Object.entries(themeObj)) {
        root.style.setProperty(`--${key}`, value);
      }
    });

    // Step 4: Update React state after DOM updates - only if changed
    setTheme((prev) => {
      if (prev === newTheme) return prev;
      return newTheme;
    });
    setThemeColors((prev) => {
      const next = colors[newTheme];
      // shallow compare a few keys to avoid unnecessary updates
      if (prev && prev.syntaxBg === next.syntaxBg && prev.mono1 === next.mono1) return prev;
      return next;
    });
  }, []);

  // Immediately switches the theme
  const setThemeMode = useCallback((newTheme: Theme) => {
    if (typeof window !== 'undefined') {
      try {
        const current = localStorage.getItem('theme-mode');
        if (current !== newTheme) {
          localStorage.setItem('theme-mode', newTheme);
        }
      } catch {
        // ignore quota/access errors
      }
    }
    // Avoid re-applying if already the current state
    setTheme((prev) => {
      if (prev === newTheme) return prev;
      applyTheme(newTheme);
      return newTheme;
    });
  }, [applyTheme]);

  // Requests a theme change: the caller decides when to switch
  const requestThemeChange = useCallback((newTheme: Theme) => {
    setThemeMode(newTheme);
  }, [setThemeMode]);

  // Detects and applies the initial theme and observes system changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem('theme-mode');
    const mql = window.matchMedia('(prefers-color-scheme: dark)');

    // Applies saved or system theme on load
    if (saved === 'light' || saved === 'dark') {
      applyTheme(saved);
    } else {
      const systemTheme = mql.matches ? 'dark' : 'light';
      applyTheme(systemTheme);
      localStorage.setItem('theme-mode', systemTheme);
    }

    // During navigation, always follows the system theme
    const updateSystemTheme = (e: MediaQueryListEvent) => {
      const systemTheme = e.matches ? 'dark' : 'light';
      requestThemeChange(systemTheme);
    };
    mql.addEventListener('change', updateSystemTheme);
    return () => {
      mql.removeEventListener('change', updateSystemTheme);
    };
  }, [applyTheme, requestThemeChange]);

  return (
    <ThemeContext.Provider value={{ theme, colors: themeColors, setThemeMode, requestThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
}
