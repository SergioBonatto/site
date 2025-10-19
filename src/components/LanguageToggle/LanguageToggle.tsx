'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/i18n/I18nProvider';
import { useThemeContext } from '../Theme/ThemeProvider';
import { LanguageCode } from '@/i18n/types';
import { usePathname } from 'next/navigation';

const languageConfig: Record<LanguageCode, { flag: string; label: string; name: string }> = {
  'pt-BR': { flag: '🇧🇷', label: 'PT', name: 'Português' },
  'en':    { flag: '🇺🇸', label: 'EN', name: 'English' },
  'es':    { flag: '🇪🇸', label: 'ES', name: 'Español' },
  'de':    { flag: '🇩🇪', label: 'DE', name: 'Deutsch' },
  'ja':    { flag: '🇯🇵', label: 'JA', name: '日本語' },
  'it':    { flag: '🇮🇹', label: 'IT', name: 'Italiano' },
  'web' :   { flag: '🏳️‍⚧️', label: 'WEB', name: 'Web' },
};

export function LanguageToggle() {
  const { language } = useLanguage();
  const { colors } = useThemeContext();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fallback to 'pt-BR' if language is not in the config
  const validLanguage = (language && language in languageConfig) ? language : 'pt-BR';
  const currentConfig = languageConfig[validLanguage];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Early return if config is not available (must be after hooks)
  if (!currentConfig) {
    return null;
  }

  const changeLanguage = (newLanguage: LanguageCode) => {
    if (newLanguage === validLanguage) {
      setIsOpen(false);
      return;
    }

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
    const newPath = `/${newLanguage}${pathWithoutLocale || ''}`;

    console.log('Language change:', {
      currentLanguage: validLanguage,
      newLanguage,
      pathname,
      newPath
    });

    // Usa window.location.replace() para forçar navegação no Safari
    window.location.replace(newPath);
  };

  return (
    <div ref={dropdownRef} className="language-toggle relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Current language: ${currentConfig.name}. Click to change language`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="px-4 py-2.5 md:px-5 md:py-3 rounded-lg text-base md:text-lg font-medium transition-colors hover:opacity-80 flex items-center gap-2"
        style={{
          backgroundColor: colors.syntaxCursor,
          color: colors.mono1,
          border: `1px solid ${colors.mono4}`,
          minWidth: '100px',
        }}
        title="Select language"
      >
        <span className="text-xl md:text-2xl">{currentConfig.flag}</span>
        <span className="font-semibold">{currentConfig.label}</span>
        <span style={{ fontSize: '0.8em', marginLeft: '4px' }}>▼</span>
      </button>

      {isOpen && (
        <div
          className={
            // Mobile: centralizado no botão, Desktop: alinhado à direita
            'absolute left-1/2 -translate-x-1/2 right-auto md:left-auto md:translate-x-0 md:right-0 py-1 rounded-lg shadow-xl z-50 w-[280px] md:w-[240px] overflow-y-auto ' +
            // Mobile: acima do botão
            'bottom-full mb-2 ' +
            // Desktop: abaixo do botão
            'md:top-full md:mt-2 md:mb-0 md:bottom-auto'
          }
          style={{
            backgroundColor: colors.syntaxCursor,
            border: `2px solid ${colors.mono4}`,
            maxWidth: 'calc(100vw - 2rem)',
            maxHeight: 'calc(100vh - 120px)',
          }}
          role="menu"
        >
          {(Object.keys(languageConfig) as LanguageCode[]).map((lang) => {
            const config = languageConfig[lang];
            const isActive = lang === validLanguage;

            return (
              <button
                key={lang}
                onClick={() => changeLanguage(lang)}
                className="w-full px-6 py-4 md:px-6 md:py-4 text-left text-lg md:text-lg transition-colors hover:opacity-80 flex items-center gap-3 touch-manipulation"
                style={{
                  color: colors.mono1,
                  backgroundColor: isActive ? colors.mono4 : 'transparent',
                  fontWeight: isActive ? 'bold' : 'normal',
                  minHeight: '56px',
                }}
                role="menuitem"
              >
                <span className="text-2xl md:text-2xl">{config.flag}</span>
                <span className="flex-1">{config.name}</span>
                {isActive && <span className="text-xl font-bold">✓</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
