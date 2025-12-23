import './[lang]/globals.css';
import { ThemeProvider } from '@/components/Theme/ThemeProvider';
import { I18nProvider } from '@/i18n/I18nProvider';
import { getDictionary } from '@/i18n/get-dictionary';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Use default language (English) for root layout
  const dictionary = await getDictionary('en');

  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <I18nProvider dictionary={dictionary} language="en">
            {children}
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
