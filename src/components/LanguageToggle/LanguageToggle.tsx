'use client';

import React from 'react';
import { useLanguage } from '@/i18n';
import { useThemeContext } from '../Theme/ThemeProvider';
import { LanguageCode } from '@/i18n/types';

const languageConfig: Record<LanguageCode, { flag: string; label: string; next: LanguageCode }> = {
  'pt-BR':  { flag: '🇧🇷', label: 'PT', next: 'en' },
  'en':     { flag: '🇺🇸', label: 'EN', next: 'es' },
  'es':     { flag: '🇪🇸', label: 'ES', next: 'de' },
  'de':     { flag: '🇩🇪', label: 'DE', next: 'ja' },
  'ja':     { flag: '🇯🇵', label: 'JA', next: 'it' },
  'it':     { flag: '🇮🇹', label: 'IT', next: 'pt-BR' },
};

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const { colors } = useThemeContext();

  const currentConfig = languageConfig[language];
  const nextConfig = languageConfig[currentConfig.next];

  const toggleLanguage = () => {
    setLanguage(currentConfig.next);
  };

  return (
    <button
      onClick={toggleLanguage}
      aria-label={`Current language: ${language}. Click to change to ${nextConfig.label}`}
      className="language-toggle px-3 py-1.5 rounded-md text-sm font-medium transition-colors hover:opacity-80"
      style={{
        backgroundColor: colors.syntaxCursor,
        color: colors.mono1,
        border: `1px solid ${colors.mono4}`,
      }}
      title={`Switch to ${nextConfig.flag} ${nextConfig.label}`}
    >
      {currentConfig.flag} {currentConfig.label}
    </button>
  );
}
