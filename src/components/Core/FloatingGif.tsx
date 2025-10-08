"use client";
import React, { useEffect, useCallback } from 'react';
import { useThemeContext } from '../Theme/ThemeProvider';
import { Theme } from '@/types/theme';

const FloatingGif: React.FC = () => {
  const { requestThemeChange } = useThemeContext();

  const startThemeTransition = useCallback((newTheme: Theme) => {
    if (!document.startViewTransition) {
      requestThemeChange(newTheme);
      return;
    }

    document.startViewTransition(() => {
      requestThemeChange(newTheme);
    });
  }, [requestThemeChange]);

  useEffect(() => {
    (window as Window & { changeThemeWithGif?: (theme: Theme) => void }).changeThemeWithGif = startThemeTransition;
  }, [startThemeTransition]);

  return null; // The component does not need to render anything visible
};

export default FloatingGif;
