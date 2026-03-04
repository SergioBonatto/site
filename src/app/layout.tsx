import './[lang]/globals.css';
import { ThemeProvider } from '@/components/Theme/ThemeProvider';
import { I18nProvider } from '@/i18n/I18nProvider';
import { getDictionary } from '@/i18n/get-dictionary';
import { Fira_Code } from 'next/font/google';

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap',
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dictionary = await getDictionary('en');

  return (
    <html lang="en" className={`${firaCode.variable} font-mono antialiased`}>
      <body className={firaCode.className}>
        <ThemeProvider>
          <I18nProvider dictionary={dictionary} language="en">
            {children}
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
