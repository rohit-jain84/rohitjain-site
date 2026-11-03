import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { getAllRoutes, SITE_URL } from '../src/data/seo.js';

const allRoutes = getAllRoutes();

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (r) =>
      `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <priority>${r.priority}</priority>
    <changefreq>${r.changefreq}</changefreq>${r.publishDate ? `\n    <lastmod>${r.publishDate}</lastmod>` : ''}
  </url>`
  )
  .join('\n')}
</urlset>
`;

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = resolve(__dirname, '..', 'public', 'sitemap.xml');
writeFileSync(outPath, xml, 'utf-8');
console.log(`sitemap: wrote ${allRoutes.length} URL(s) to ${outPath}`);
