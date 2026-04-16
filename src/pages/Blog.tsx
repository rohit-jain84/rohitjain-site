import { Link } from 'react-router-dom';
import { SEOHead } from '../components/shared/SEOHead';
import { ArticleHeroImage } from '../components/shared/ArticleHeroImage';
import { articles } from '../data/articles';

export function Blog() {
  return (
    <>
      <SEOHead
        title="Blog"
        description="Technical articles on RAG systems, AI agents, LLMOps, and the enterprise-to-AI career transition."
        path="/blog"
      />

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <p className="text-sm font-bold uppercase tracking-widest text-brand-primary mb-2">Blog</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary mb-4">
          Technical Articles
        </h1>
        <p className="text-text-tertiary mb-12 max-w-2xl">
          Lessons from building production AI systems — written for engineers who want depth, not hype.
        </p>

        <div className="space-y-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              to={`/blog/${article.slug}`}
              className="group block bg-surface-secondary border border-border-default rounded-2xl p-6 md:p-8 hover:border-brand-primary hover:shadow-[var(--shadow-glow)] hover:-translate-y-0.5 transition-all duration-250 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 gradient-brand opacity-0 group-hover:opacity-100 transition-opacity duration-250" />
              {/* Inline hero thumbnail */}
              <div className="mb-4 -mx-6 md:-mx-8 -mt-6 md:-mt-8 overflow-hidden rounded-t-2xl">
                <ArticleHeroImage slug={article.slug} title={article.title} className="rounded-none" />
              </div>
              <div className="flex items-start justify-between gap-4 mb-2">
                <h2 className="text-lg font-bold text-text-primary group-hover:text-brand-primary transition-colors">
                  {article.title}
                </h2>
                <span className="flex-shrink-0 text-xs text-text-muted whitespace-nowrap mt-1">{article.readingTime}</span>
              </div>
              <p className="text-sm text-text-tertiary leading-relaxed mb-4">{article.subtitle}</p>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span key={tag} className="text-xs font-medium text-text-muted bg-surface-tertiary px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-text-muted">
                  {new Date(article.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              <div className="mt-4">
                <span className="text-sm font-semibold text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Read article &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
