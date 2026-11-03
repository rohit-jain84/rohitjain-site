/**
 * Post-build step: write one static index.html per route with that route's
 * title, description, canonical and Open Graph tags already in the <head>.
 *
 * Crawlers that do not run JavaScript (LinkedIn, Slack, WhatsApp, Twitter,
 * many SEO tools) read these tags; react-helmet-async then takes them over in
 * the browser because every injected tag carries data-prerender="true".
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { getAllRoutes, SITE_URL, SITE_NAME, personJsonLd, buildTitle } from '../src/data/seo.js';
import type { RouteMeta } from '../src/data/seo.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, '..', 'dist');
const templatePath = join(distDir, 'index.html');

if (!existsSync(templatePath)) {
  console.error(`prerender: ${templatePath} not found. Run "vite build" first.`);
  process.exit(1);
}

const template = readFileSync(templatePath, 'utf-8');

function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function headTags(route: RouteMeta): string {
  const fullTitle = buildTitle(route.title);
  const url = `${SITE_URL}${route.path}`;
  const image = `${SITE_URL}${route.image}`;

  const jsonLd =
    route.path === '/'
      ? personJsonLd
      : route.type === 'article'
        ? {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: route.title,
            description: route.description,
            url,
            image,
            datePublished: route.publishDate,
            author: { '@type': 'Person', name: SITE_NAME, url: SITE_URL },
          }
        : undefined;

  const lines = [
    `<title data-prerender="true">${esc(fullTitle)}</title>`,
    `<meta data-prerender="true" name="description" content="${esc(route.description)}" />`,
    `<link data-prerender="true" rel="canonical" href="${url}" />`,
    `<meta data-prerender="true" property="og:title" content="${esc(fullTitle)}" />`,
    `<meta data-prerender="true" property="og:description" content="${esc(route.description)}" />`,
    `<meta data-prerender="true" property="og:url" content="${url}" />`,
    `<meta data-prerender="true" property="og:type" content="${route.type}" />`,
    `<meta data-prerender="true" property="og:site_name" content="${SITE_NAME}" />`,
    `<meta data-prerender="true" property="og:image" content="${image}" />`,
    `<meta data-prerender="true" property="og:image:width" content="1200" />`,
    `<meta data-prerender="true" property="og:image:height" content="630" />`,
    `<meta data-prerender="true" property="og:image:alt" content="${esc(fullTitle)}" />`,
    `<meta data-prerender="true" name="twitter:card" content="summary_large_image" />`,
    `<meta data-prerender="true" name="twitter:title" content="${esc(fullTitle)}" />`,
    `<meta data-prerender="true" name="twitter:description" content="${esc(route.description)}" />`,
    `<meta data-prerender="true" name="twitter:image" content="${image}" />`,
  ];
  if (jsonLd) {
    lines.push(
      `<script data-prerender="true" type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`,
    );
  }
  return lines.map((l) => `    ${l}`).join('\n');
}

function render(route: RouteMeta): string {
  let html = template;
  // Drop the generic title/description from the template; the route-specific ones replace them.
  html = html.replace(/\s*<title>[\s\S]*?<\/title>/, '');
  html = html.replace(/\s*<meta name="description"[^>]*\/?>/, '');
  const marker = '<meta name="viewport"';
  const idx = html.indexOf(marker);
  if (idx === -1) throw new Error('prerender: viewport meta tag not found in template');
  const lineEnd = html.indexOf('\n', idx);
  return html.slice(0, lineEnd + 1) + headTags(route) + '\n' + html.slice(lineEnd + 1);
}

const routes = getAllRoutes();
for (const route of routes) {
  const outDir = route.path === '/' ? distDir : join(distDir, route.path);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), render(route), 'utf-8');
}
console.log(`prerender: wrote ${routes.length} route(s) under ${distDir}`);
