/**
 * i18n - Internationalization system
 *
 * Functional and composable approach to translations
 *
 * @example
 * ```tsx
 * import { useTranslation } from '@/i18n';
 *
 * function MyComponent() {
 *   const { t } = useTranslation();
 *   return <h1>{t('nav.home')}</h1>;
 * }
 * ```
 */

export { I18nProvider, useI18n, useTranslation, useLanguage } from './I18nContext';
export { I18n, createTranslator, defaultI18n } from './i18n';
export { translations } from './translations';
export type { LanguageCode, TranslationKeys, Translations } from './types';
