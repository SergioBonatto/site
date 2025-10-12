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
      if (locales.includes(lang)) {
        return lang;
      }

      const baseLang = lang.split('-')[0];

      if (baseLang === 'pt') return 'pt-BR';

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
