import { Locale } from '@/i18n/types';

export function replaceLocaleInPath(
  pathname: string,
  newLocale: Locale
) {
  const segments = pathname.split('/');

  // ['', 'pt-BR', 'blog', 'slug']
  segments[1] = newLocale;

  return segments.join('/');
}