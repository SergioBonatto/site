import Head from 'next/head';

interface MetaTagsTestProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export function MetaTagsTest({
  title = "Sergio Bonatto - Full Stack Developer",
  description = "Full Stack Developer in Brasília specializing in formal proofs, lambda calculus, Haskell, JavaScript, Python, and computational logic.",
  image = "https://bonatto.vercel.app/card.png",
  url = "https://bonatto.vercel.app"
}: MetaTagsTestProps) {
  return (
    <Head>
      {/* Standard Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="Sergio Bonatto, Full Stack Developer, Software Engineer, Brasília, React, Next.js, TypeScript, JavaScript, Python, Haskell" />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Sergio Bonatto Portfolio" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@fibonatto" />

      {/* Additional Meta Tags */}
      <meta name="author" content="Sergio Bonatto" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" href={url} />
    </Head>
  );
}
