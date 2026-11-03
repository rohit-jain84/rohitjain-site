import { caseStudies } from './caseStudies';
import { articles } from './articles';

/**
 * Single source of truth for page metadata.
 * Used by SEOHead (runtime), scripts/prerender.ts (static head tags per route),
 * scripts/generate-sitemap.ts and scripts/og-data.ts (share-card generation).
 */
export const SITE_URL = 'https://www.rohitjain.net';
export const SITE_NAME = 'Rohit Jain';
export const HOME_TITLE = 'Rohit Jain | AI Engineer — RAG, Agents, LLMOps';
export const DEFAULT_OG_IMAGE = '/og/default.png';

export interface PageMeta {
  title: string;
  description: string;
  path: string;
}

export const pageMeta = {
  home: {
    title: 'Home',
    description:
      'Rohit Jain — AI Engineer building production RAG systems, LLM agents, and document intelligence platforms. Enterprise system design principles in every layer.',
    path: '/',
  },
  about: {
    title: 'About',
    description:
      '17 years of enterprise architecture, now building production AI systems. The story of an engineering leader who pivoted into AI — and why it works.',
    path: '/about',
  },
  projects: {
    title: 'Projects',
    description:
      'Production AI systems: multi-tenant RAG, LLM agents with MCP, document intelligence, LLMOps, and more. Built with Python, FastAPI, LangGraph.',
    path: '/projects',
  },
  caseStudies: {
    title: 'Case Studies',
    description:
      'Deep-dive case studies: architecture decisions, evaluation metrics, and lessons learned from building production AI systems.',
    path: '/case-studies',
  },
  blog: {
    title: 'Blog',
    description:
      'Technical articles on RAG systems, AI agents, LLMOps, and the enterprise-to-AI career transition.',
    path: '/blog',
  },
  services: {
    title: 'Services',
    description:
      'AI engineering services: RAG systems, LLM agents, document intelligence, and LLMOps. Long-term engagements with measurable outcomes.',
    path: '/services',
  },
  contact: {
    title: 'Contact',
    description:
      'Get in touch for AI engineering work. Available for freelance RAG, agent, and document intelligence projects.',
    path: '/contact',
  },
} as const satisfies Record<string, PageMeta>;

export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Rohit Jain',
  url: SITE_URL,
  jobTitle: 'AI Engineer',
  description:
    'AI Engineer building production RAG systems, LLM agents, and document intelligence platforms. 17+ years enterprise architecture.',
  sameAs: ['https://www.linkedin.com/in/rohitjaintech/', 'https://github.com/rohit-jain84'],
  knowsAbout: ['RAG', 'LLM Agents', 'MCP', 'LangGraph', 'Document Intelligence', 'LLMOps', 'Python', 'FastAPI', 'Azure'],
};

export function buildTitle(title: string): string {
  return title === 'Home' ? HOME_TITLE : `${title} | ${SITE_NAME}`;
}

export function caseStudyImage(slug: string): string {
  return `/og/case-study-${slug}.png`;
}

export function articleImage(slug: string): string {
  return `/og/article-${slug}.png`;
}

export interface RouteMeta extends PageMeta {
  type: 'website' | 'article';
  image: string;
  publishDate?: string;
  changefreq: 'weekly' | 'monthly';
  priority: string;
}

/** Every indexable route on the site, with the metadata the static head tags need. */
export function getAllRoutes(): RouteMeta[] {
  const staticRoutes: RouteMeta[] = [
    { ...pageMeta.home, type: 'website', image: DEFAULT_OG_IMAGE, changefreq: 'weekly', priority: '1.0' },
    { ...pageMeta.projects, type: 'website', image: DEFAULT_OG_IMAGE, changefreq: 'monthly', priority: '0.9' },
    { ...pageMeta.caseStudies, type: 'website', image: DEFAULT_OG_IMAGE, changefreq: 'monthly', priority: '0.9' },
    { ...pageMeta.blog, type: 'website', image: DEFAULT_OG_IMAGE, changefreq: 'monthly', priority: '0.8' },
    { ...pageMeta.services, type: 'website', image: DEFAULT_OG_IMAGE, changefreq: 'monthly', priority: '0.8' },
    { ...pageMeta.about, type: 'website', image: DEFAULT_OG_IMAGE, changefreq: 'monthly', priority: '0.7' },
    { ...pageMeta.contact, type: 'website', image: DEFAULT_OG_IMAGE, changefreq: 'monthly', priority: '0.7' },
  ];

  const caseStudyRoutes: RouteMeta[] = caseStudies.map((cs) => ({
    title: cs.title,
    description: cs.subtitle,
    path: `/case-studies/${cs.slug}`,
    type: 'website',
    image: caseStudyImage(cs.slug),
    changefreq: 'monthly',
    priority: '0.8',
  }));

  const articleRoutes: RouteMeta[] = articles.map((a) => ({
    title: a.title,
    description: a.subtitle,
    path: `/blog/${a.slug}`,
    type: 'article',
    image: articleImage(a.slug),
    publishDate: a.publishDate,
    changefreq: 'monthly',
    priority: '0.7',
  }));

  return [...staticRoutes, ...caseStudyRoutes, ...articleRoutes];
}
