'use client';

import React, { createContext, useContext, useMemo, ReactNode } from 'react';
import { LanguageCode } from './types';

// O dicionário será um objeto simples de chave/valor
type Dictionary = Record<string, string>;

interface I18nContextValue {
  language: LanguageCode;
  dictionary: Dictionary;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
  language: LanguageCode;
  dictionary: Dictionary;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ 
  children, 
  language, 
  dictionary 
}) => {

  const t = useMemo(() => (key: string): string => {
    return dictionary[key] || key;
  }, [dictionary]);

  const value = useMemo(() => ({
    language,
    dictionary,
    t,
  }), [language, dictionary, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

// Hook para usar o contexto i18n completo
export const useI18n = (): I18nContextValue => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

// Hook leve apenas para a função de tradução
export const useTranslation = () => {
  const { t } = useI18n();
  return { t };
};

// Hook para obter o idioma atual
export const useLanguage = () => {
  const { language } = useI18n();
  return { language };
};
