import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
  type?: 'website' | 'article';
  publishDate?: string;
  jsonLd?: Record<string, unknown>;
}

const BASE_URL = 'https://rohitjain.net';

export function SEOHead({ title, description, path = '', type = 'website', publishDate, jsonLd }: SEOHeadProps) {
  const fullTitle = title === 'Home'
    ? 'Rohit Jain | AI Engineer — RAG, Agents, LLMOps'
    : `${title} | Rohit Jain`;
  const url = `${BASE_URL}${path}`;

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
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}
