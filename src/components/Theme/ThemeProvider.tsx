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
    setTheme(newTheme);
    setThemeColors(colors[newTheme]);
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(newTheme);
    // Updates all CSS variables for the theme in <html>
    const themeObj = colors[newTheme];
    Object.entries(themeObj).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });
  }, []);

  // Immediately switches the theme
  const setThemeMode = useCallback((newTheme: Theme) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme-mode', newTheme);
    }
    applyTheme(newTheme);
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
