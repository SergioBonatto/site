import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

const locales = ['en', 'pt-BR', 'es', 'de', 'ja', 'it'];
const defaultLocale = 'en';

async function getPreferredLocale(): Promise<string> {
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language');

  if (acceptLanguage) {
    const languages = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim());

    for (const lang of languages) {
      // Verifica correspondência exata primeiro
      if (locales.includes(lang)) {
        return lang;
      }

      // Se não encontrou exato, tenta o idioma base
      const baseLang = lang.split('-')[0];

      // Casos especiais
      if (baseLang === 'pt') return 'pt-BR';

      // Para outros idiomas, verifica se o código base está nos locales
      const matchedLocale = locales.find(locale => {
        const localeBase = locale.split('-')[0];
        return localeBase === baseLang;
      });

      if (matchedLocale) {
        return matchedLocale;
      }
    }
  }

  return defaultLocale;
}

export default async function RootPage() {
  const locale = await getPreferredLocale();
  redirect(`/${locale}`);
}
