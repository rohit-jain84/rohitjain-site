import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
  type?: 'website' | 'article';
  publishDate?: string;
  image?: string;
  jsonLd?: Record<string, unknown>;
}

const BASE_URL = 'https://rohitjain.net';
const DEFAULT_OG_IMAGE = '/og-default.svg';

export function SEOHead({ title, description, path = '', type = 'website', publishDate, image, jsonLd }: SEOHeadProps) {
  const fullTitle = title === 'Home'
    ? 'Rohit Jain | AI Engineer — RAG, Agents, LLMOps'
    : `${title} | Rohit Jain`;
  const url = `${BASE_URL}${path}`;
  const ogImage = `${BASE_URL}${image || DEFAULT_OG_IMAGE}`;

  const defaultJsonLd = type === 'article' ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    datePublished: publishDate,
    author: {
      '@type': 'Person',
      name: 'Rohit Jain',
      url: BASE_URL,
    },
  } : undefined;

  const structuredData = jsonLd || defaultJsonLd;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Rohit Jain" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}
