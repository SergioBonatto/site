/**
 * i18n - Internationalization system
 *
 * Server-first, performant, and type-safe translations for Next.js App Router.
 *
 * This file should only export server-side utilities and types.
 * Client-side hooks are exported from `./client`.
 */

export { getDictionary } from './get-dictionary';
export type { LanguageCode, TranslationKeys, Translations } from './types';