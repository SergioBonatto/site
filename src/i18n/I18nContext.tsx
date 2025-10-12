'use client';

import React, { createContext, useContext, useState, useCallback, useMemo, ReactNode, useEffect } from 'react';
import { LanguageCode } from './types';
import { I18n } from './i18n';

interface I18nContextValue {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  t: (key: string, params?: Record<string, string>) => string;
  i18n: I18n;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
  defaultLanguage?: LanguageCode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({
  children,
  defaultLanguage = 'pt-BR',
}) => {
  // Always start with defaultLanguage for SSR consistency
  const [language, setLanguageState] = useState<LanguageCode>(defaultLanguage);

  // Load saved language after hydration (client-side only)
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') as LanguageCode;
    const supportedLanguages: LanguageCode[] = ['pt-BR', 'en', 'es', 'de', 'ja', 'it'];
    if (savedLanguage && supportedLanguages.includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    }
  }, []);

  // Memoize i18n instance to avoid recreating on every render
  const i18n = useMemo(() => new I18n(language), [language]);

  // Memoize translation function
  const t = useCallback(
    (key: string, params?: Record<string, string>) => i18n.t(key, params),
    [i18n]
  );

  // Memoize language setter with localStorage persistence
  const setLanguage = useCallback((newLanguage: LanguageCode) => {
    setLanguageState(newLanguage);
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', newLanguage);
    }
  }, []);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
      i18n,
    }),
    [language, setLanguage, t, i18n]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

// Custom hook to use i18n context
export const useI18n = (): I18nContextValue => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

// Hook to get only the translation function (lighter alternative)
export const useTranslation = () => {
  const { t } = useI18n();
  return { t };
};

// Hook to get only the language
export const useLanguage = () => {
  const { language, setLanguage } = useI18n();
  return { language, setLanguage };
};
