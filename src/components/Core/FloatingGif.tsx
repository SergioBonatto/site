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

    // Add will-change hint before transition starts
    const root = document.documentElement;
    root.style.willChange = 'mask-size, mask-position';

    const transition = document.startViewTransition(() => {
      requestThemeChange(newTheme);
    });

    // Cleanup will-change after transition to free GPU resources
    transition.finished
      .then(() => {
        root.style.willChange = '';
      })
      .catch(() => {
        // Cleanup even on error
        root.style.willChange = '';
      });
  }, [requestThemeChange]);

  useEffect(() => {
    (window as Window & { changeThemeWithGif?: (theme: Theme) => void }).changeThemeWithGif = startThemeTransition;
  }, [startThemeTransition]);

  return null; // The component does not need to render anything visible
};

export default FloatingGif;
