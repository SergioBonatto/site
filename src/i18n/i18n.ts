import { LanguageCode } from './types';
import { pipe } from '../utils/functional';
import { translations as staticTranslations } from './translations';

type TranslationsShape = Record<string, Record<string, string>>;

// Initialize translations synchronously to ensure server and client render the
// same strings on first render (prevents hydration mismatches).
let loadedTranslations: TranslationsShape | null = staticTranslations || null;

async function ensureTranslations(): Promise<TranslationsShape> {
  if (loadedTranslations) return loadedTranslations;
  // Fallback: attempt dynamic import if static wasn't available for some reason
  try {
    const mod = await import('./translations');
    loadedTranslations = (mod as unknown as { translations: TranslationsShape }).translations;
    return loadedTranslations;
  } catch (e) {
    console.warn('Failed to load translations', e);
    // keep null and let callers fallback to keys
    loadedTranslations = null;
    throw e;
  }
}

// Synchronous getter that falls back to the key when translations aren't loaded yet
const getTranslationSync = (language: LanguageCode, key: string): string => {
  if (loadedTranslations) {
    return (
      loadedTranslations[language]?.[key] ||
      loadedTranslations['en']?.[key] ||
      key
    );
  }
  return key;
};

// Pure function to apply parameters to a string
const applyParams = (text: string, params?: Record<string, string>): string => {
  if (!params) return text;
  return Object.entries(params).reduce(
    (result, [k, value]) => result.replace(`{{${k}}}`, value),
    text
  );
};

// Create a translator that works synchronously using fallback and starts
// background loading of the real translations. Once loaded, subsequent
// calls will return localized strings.
export const createTranslator = (language: LanguageCode) => {
  // Start background load but don't await it here
  ensureTranslations().catch(() => {
    /* ignore */
  });

  return (key: string, params?: Record<string, string>): string =>
    pipe(
      key,
      (k: string) => getTranslationSync(language, k),
      (text: string) => applyParams(text, params)
    );
};

// I18n class refactored to be more functional and to use the lazy translator
export class I18n {
  private translate: (key: string, params?: Record<string, string>) => string;
  private currentLanguage: LanguageCode;

  constructor(language: LanguageCode) {
    this.currentLanguage = language;
    this.translate = createTranslator(language);
  }

  t(key: string, params?: Record<string, string>): string {
    return this.translate(key, params);
  }

  // Helper method to get the current language
  getLanguage(): LanguageCode {
    return this.currentLanguage;
  }
}

// Export a default instance (can be overridden by context)
export const defaultI18n = new I18n('pt-BR');
