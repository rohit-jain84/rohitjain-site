/** Emits the data scripts/generate-og-cards.py needs, as JSON on stdout. */
import { caseStudies } from '../src/data/caseStudies.js';
import { articles } from '../src/data/articles.js';
import { hero } from '../src/data/resume.js';
import { caseStudyImage, articleImage, DEFAULT_OG_IMAGE } from '../src/data/seo.js';

const cards = [
  {
    file: DEFAULT_OG_IMAGE,
    kind: 'default',
    eyebrow: 'rohitjain.net',
    title: hero.name,
    subtitle: hero.title,
    chips: ['RAG Systems', 'AI Agents & MCP', 'Document Intelligence', 'LLMOps'],
  },
  ...caseStudies.map((cs) => ({
    file: caseStudyImage(cs.slug),
    kind: 'case-study',
    eyebrow: 'Case Study',
    title: cs.title,
    subtitle: cs.subtitle,
    chips: cs.results.slice(0, 3).map((r) => `${r.value} ${r.label}`),
  })),
  ...articles.map((a) => ({
    file: articleImage(a.slug),
    kind: 'article',
    eyebrow: `Article - ${a.readingTime}`,
    title: a.title,
    subtitle: a.subtitle,
    chips: a.tags.slice(0, 4),
  })),
];

process.stdout.write(JSON.stringify(cards, null, 2));
