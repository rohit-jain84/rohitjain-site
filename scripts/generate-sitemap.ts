import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Import data to get dynamic slugs
import { caseStudies } from '../src/data/caseStudies.js';
import { articles } from '../src/data/articles.js';

const BASE_URL = 'https://rohitjain.net';

interface SitemapEntry {
  loc: string;
  priority: string;
  changefreq: string;
  lastmod?: string;
}

const staticRoutes: SitemapEntry[] = [
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/projects', priority: '0.9', changefreq: 'monthly' },
  { loc: '/case-studies', priority: '0.9', changefreq: 'monthly' },
  { loc: '/blog', priority: '0.8', changefreq: 'weekly' },
  { loc: '/services', priority: '0.8', changefreq: 'monthly' },
  { loc: '/about', priority: '0.7', changefreq: 'monthly' },
  { loc: '/contact', priority: '0.7', changefreq: 'monthly' },
];

const caseStudyRoutes: SitemapEntry[] = caseStudies.map((cs) => ({
  loc: `/case-studies/${cs.slug}`,
  priority: '0.8',
  changefreq: 'monthly',
}));

const articleRoutes: SitemapEntry[] = articles.map((a) => ({
  loc: `/blog/${a.slug}`,
  priority: '0.7',
  changefreq: 'monthly',
  lastmod: a.publishDate,
}));

const allRoutes = [...staticRoutes, ...caseStudyRoutes, ...articleRoutes];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (r) =>
      `  <url>
    <loc>${BASE_URL}${r.loc}</loc>
    <priority>${r.priority}</priority>
    <changefreq>${r.changefreq}</changefreq>${r.lastmod ? `\n    <lastmod>${r.lastmod}</lastmod>` : ''}
  </url>`
  )
  .join('\n')}
</urlset>
`;

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = resolve(__dirname, '..', 'public', 'sitemap.xml');
writeFileSync(outPath, xml, 'utf-8');
console.log(`Sitemap generated: ${allRoutes.length} URLs → ${outPath}`);
