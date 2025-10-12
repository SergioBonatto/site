import 'server-only';
import type { LanguageCode } from './types';

const dictionaries = {
  'pt-BR': () => import('./locales/pt-BR.json').then((module) => module.default),
  'en': () => import('./locales/en.json').then((module) => module.default),
  'es': () => import('./locales/es.json').then((module) => module.default),
  'de': () => import('./locales/de.json').then((module) => module.default),
  'ja': () => import('./locales/ja.json').then((module) => module.default),
  'it': () => import('./locales/it.json').then((module) => module.default),
};

export const getDictionary = async (locale: LanguageCode) => {
    const loader = dictionaries[locale] || dictionaries['en'];
    return loader();
}
