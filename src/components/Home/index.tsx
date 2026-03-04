import { Metadata } from 'next';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypePrismPlus from 'rehype-prism-plus';
import rehypeStringify from 'rehype-stringify';

import { getDictionary, Locale } from '@/i18n';
import { generateSEOMetadata } from '@/components/Core/SEO';
import MarkdownContent from '@/components/Core/MarkdownContent';
import PrismLoader from '@/components/Theme/PrismLoader';

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return generateSEOMetadata({
    title: `Sergio Bonatto`,
    description: dictionary['home.description'],
    image: '/cards.png',
    url: `/${lang}`,
  });
}

async function renderCodeSnippet(code: string): Promise<string> {
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypePrismPlus, {
      ignoreMissing: true,
      showLineNumbers: false,
      defaultLanguage: 'c',
      preloadLanguages: ['c']
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(code);

  return processed.toString();
}

export default async function Home({
    params
    }: {
    params: Promise<{ lang: Locale }>;
    }) {
    const { lang } = await params;
    const dictionary = await getDictionary(lang);

    const codeSnippet = `
    #include <stdio.h>

    typedef struct {
        const char* name;
        const char* focus;
    } Profile;

    int main(void) {
        Profile profile = {
            .name = "Sergio Bonatto",
            .focus = "programming languages, type systems, and low-level systems"
        };

        printf("%s\\nSoftware engineer focused on %s.\\n", profile.name, profile.focus);
        return 0;
    }
    `;

  const contentHtml = await renderCodeSnippet(codeSnippet);

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <PrismLoader />
      <h1 className="text-4xl mb-8">
        {dictionary['home.greeting']}
      </h1>

      <MarkdownContent
        content={contentHtml}
        className="dark:prose-invert mb-6"
      />

      <p className="text-lg">
        {dictionary['home.focus']}
      </p>
    </main>
  );
}