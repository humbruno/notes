import Head from 'next/head';

interface SEOProps {
  tabName: string;
  title: string;
  description: string;
}

const SEO = ({ tabName, title, description }: SEOProps) => {
  const titleTab = `${tabName} - NOTE.me`;

  return (
    <Head>
      <title>{titleTab}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
    </Head>
  );
};

export default SEO;
