'use client';

import React from 'react';
import { useLanguage } from '@/i18n';
import { useThemeContext } from '../Theme/ThemeProvider';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const { colors } = useThemeContext();

  const toggleLanguage = () => {
    setLanguage(language === 'pt-BR' ? 'en' : 'pt-BR');
  };

  return (
    <button
      onClick={toggleLanguage}
      aria-label={`Current language: ${language}. Click to change`}
      className="language-toggle px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
      style={{
        backgroundColor: colors.syntaxCursor,
        color: colors.mono1,
        border: `1px solid ${colors.mono4}`,
      }}
      title={`Switch to ${language === 'pt-BR' ? 'English' : 'Português'}`}
    >
      {language === 'pt-BR' ? '🇧🇷 PT' : '🇺🇸 EN'}
    </button>
  );
}
