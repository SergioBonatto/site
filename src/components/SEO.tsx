import Head from 'next/head';

interface SEOProps {
  title: string;
  description: string;
  image: string;
  url: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, image, url }) => {
  const fullImageUrl = `https://bonatto.vercel.app${image}`;

  return (
    <Head>
      <meta property="og:type" content="website" />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={title} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@fibonatto" />
      <meta name="twitter:creator" content="@fibonatto" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
    </Head>
  );
};

export default SEO;
