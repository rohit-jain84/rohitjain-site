import { Helmet } from 'react-helmet-async';
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE, buildTitle } from '../../data/seo';

interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
  type?: 'website' | 'article';
  publishDate?: string;
  image?: string;
  jsonLd?: Record<string, unknown>;
  /** Keep the page out of search indexes (404, drafts). */
  noindex?: boolean;
}

export function SEOHead({ title, description, path = '', type = 'website', publishDate, image, jsonLd, noindex = false }: SEOHeadProps) {
  const fullTitle = buildTitle(title);
  const url = `${SITE_URL}${path}`;
  const ogImage = `${SITE_URL}${image || DEFAULT_OG_IMAGE}`;

  const defaultJsonLd = type === 'article' ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    image: ogImage,
    datePublished: publishDate,
    author: {
      '@type': 'Person',
      name: SITE_NAME,
      url: SITE_URL,
    },
  } : undefined;

  const structuredData = jsonLd || defaultJsonLd;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />
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
