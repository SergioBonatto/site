import Head from 'next/head';

interface SEOProps {
  title: string;
  description: string;
  image: string;
  url: string;
  keywords?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, image, url, keywords }) => {
  const fullImageUrl = `https://bonatto.vercel.app${image}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      <meta property="og:type" content="website" />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={title} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@fibonatto" />
      <meta name="twitter:creator" content="@fibonatto" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />

      <link rel="canonical" href={url} />
    </Head>
  );
};

export default SEO;
