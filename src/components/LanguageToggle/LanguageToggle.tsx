'use client';

import React from 'react';
import { useLanguage } from '@/i18n/I18nProvider'; // Updated import
import { useThemeContext } from '../Theme/ThemeProvider';
import { LanguageCode } from '@/i18n/types';
import { usePathname } from 'next/navigation';

const languageConfig: Record<LanguageCode, { flag: string; label: string; next: LanguageCode }> = {
  'pt-BR': { flag: '🇧🇷', label: 'PT', next: 'en' },
  'en':    { flag: '🇺🇸', label: 'EN', next: 'es' },
  'es':    { flag: '🇪🇸', label: 'ES', next: 'de' },
  'de':    { flag: '🇩🇪', label: 'DE', next: 'ja' },
  'ja':    { flag: '🇯🇵', label: 'JA', next: 'it' },
  'it':    { flag: '🇮🇹', label: 'IT', next: 'web' },
  'web' :   { flag: '🏳️‍⚧️', label: 'WEB', next: 'pt-BR' },
};

export function LanguageToggle() {
  const { language } = useLanguage();
  const { colors } = useThemeContext();
  const pathname = usePathname();

  // Fallback to 'pt-BR' if language is not in the config
  const validLanguage = (language && language in languageConfig) ? language : 'pt-BR';
  const currentConfig = languageConfig[validLanguage];
  const nextConfig = languageConfig[currentConfig?.next || 'en'];

  // Early return if config is not available
  if (!currentConfig || !nextConfig) {
    return null;
  }

  const toggleLanguage = () => {
    // Extrai o locale atual do pathname (primeira parte após /)
    const pathParts = pathname.split('/').filter(Boolean);
    const currentLocaleInPath = pathParts[0] || '';

    // Lista de todos os locales válidos
    const validLocales = Object.keys(languageConfig);

    // Verifica se o primeiro segmento é um locale válido
    const isValidLocale = validLocales.includes(currentLocaleInPath);

    // Remove o locale do pathname
    const pathWithoutLocale = isValidLocale
      ? '/' + pathParts.slice(1).join('/')
      : pathname;

    // Constrói o novo caminho com o novo locale
    const newPath = `/${currentConfig.next}${pathWithoutLocale || ''}`;

    // Debug logs
    console.log('Safari Debug:', {
      currentLanguage: validLanguage,
      nextLanguage: currentConfig.next,
      pathname,
      pathParts,
      currentLocaleInPath,
      isValidLocale,
      pathWithoutLocale,
      newPath
    });

    // Usa window.location.replace() para forçar navegação no Safari
    window.location.replace(newPath);
  };

  return (
    <button
      onClick={toggleLanguage}
      aria-label={`Current language: ${validLanguage}. Click to change to ${nextConfig.label}`}
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
