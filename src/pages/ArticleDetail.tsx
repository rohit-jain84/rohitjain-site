import { useParams, Link } from 'react-router-dom';
import { SEOHead } from '../components/shared/SEOHead';
import { ArticleHeroImage } from '../components/shared/ArticleHeroImage';
import { articles } from '../data/articles';
import { WHATSAPP_URL } from '../data/resume';
import type { ArticleSection } from '../data/articles';

function RenderArticleSection({ section }: { section: ArticleSection }) {
  switch (section.type) {
    case 'heading':
      if (section.level === 3) {
        return <h3 className="text-base font-semibold text-text-primary mt-6 mb-2 pl-3 border-l-2 border-brand-primary/30">{section.content}</h3>;
      }
      return (
        <>
          <div className="mt-12 mb-6 border-t border-border-default" />
          <h2 className="text-2xl font-bold text-text-primary mb-4">{section.content}</h2>
        </>
      );

    case 'text':
      return <p className="text-text-secondary leading-relaxed mb-4">{section.content}</p>;

    case 'code':
      return (
        <div className="my-6 bg-surface-code border border-border-default rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b border-border-default">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-error/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-warning/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-success/60" />
            </div>
            <span className="text-xs text-text-muted font-mono">{section.filename || section.language}</span>
          </div>
          <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
            <code className="text-text-secondary font-mono">{section.content}</code>
          </pre>
        </div>
      );

    case 'list':
      if (section.ordered) {
        return (
          <ol className="my-4 space-y-2 list-decimal list-inside">
            {section.items?.map((item, i) => (
              <li key={i} className="text-text-secondary leading-relaxed pl-2">
                {item}
              </li>
            ))}
          </ol>
        );
      }
      return (
        <ul className="my-4 space-y-2">
          {section.items?.map((item, i) => (
            <li key={i} className="text-text-secondary leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:rounded-full before:bg-brand-primary/40">
              {item}
            </li>
          ))}
        </ul>
      );

    case 'callout':
      const isInsight = section.variant === 'insight';
      return (
        <div className={`my-6 flex gap-3 p-4 rounded-lg border ${
          isInsight
            ? 'bg-brand-primary-subtle border-brand-primary/30'
            : 'bg-brand-accent-subtle border-brand-accent/30'
        }`}>
          <span className="text-lg flex-shrink-0 mt-0.5">{isInsight ? '💡' : '⭐'}</span>
          <div>
            <span className={`text-xs font-bold uppercase tracking-wider ${isInsight ? 'text-brand-primary' : 'text-brand-accent'}`}>
              {isInsight ? 'Insight' : 'Key Takeaway'}
            </span>
            <p className="text-sm text-text-secondary mt-1 leading-relaxed">{section.content}</p>
          </div>
        </div>
      );

    default:
      return null;
  }
}

export function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-24 text-center">
        <h1 className="text-2xl font-bold text-text-primary mb-4">Article Not Found</h1>
        <Link to="/blog" className="text-brand-primary hover:text-brand-primary-hover font-medium">
          &larr; Back to Blog
        </Link>
      </div>
    );
  }

  // Build table of contents from h2 headings
  const toc = article.sections
    .filter((s) => s.type === 'heading' && s.level === 2)
    .map((s) => ({
      title: s.content,
      id: s.content.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    }));

  // Render sections with IDs for TOC links
  const sectionsWithIds = article.sections.map((section) => {
    if (section.type === 'heading' && section.level === 2) {
      const id = section.content.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return { ...section, id };
    }
    return section;
  });

  return (
    <>
      <SEOHead
        title={article.title}
        description={article.subtitle}
        path={`/blog/${slug}`}
        type="article"
        publishDate={article.publishDate}
      />

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-brand-primary transition-colors mb-8"
        >
          &larr; Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex flex-wrap gap-3 mb-4">
            {article.tags.map((tag) => (
              <span key={tag} className="text-xs font-medium text-text-muted bg-surface-tertiary px-2.5 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary mb-4">
            {article.title}
          </h1>
          <p className="text-lg text-text-tertiary leading-relaxed mb-4">
            {article.subtitle}
          </p>
          <div className="flex items-center gap-4 text-sm text-text-muted">
            <span>{article.readingTime}</span>
            <span>&middot;</span>
            <span>{new Date(article.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </header>

        {/* Hero illustration */}
        <ArticleHeroImage slug={article.slug} title={article.title} />

        {/* Table of Contents */}
        {toc.length > 2 && (
          <nav className="bg-surface-secondary border border-border-default rounded-xl p-6 mb-12">
            <h2 className="text-sm font-bold uppercase tracking-wider text-text-muted mb-3">In This Article</h2>
            <ul className="space-y-2">
              {toc.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-sm text-brand-primary hover:text-brand-primary-hover transition-colors"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Article Content */}
        <article className="prose-custom">
          {sectionsWithIds.map((section, i) => {
            if (section.type === 'heading' && section.level === 2 && 'id' in section) {
              return (
                <div key={i}>
                  <div className="mt-12 mb-6 border-t border-border-default" />
                  <h2 id={(section as { id: string }).id} className="text-2xl font-bold text-text-primary mb-4 scroll-mt-20">
                    {section.content}
                  </h2>
                </div>
              );
            }
            return <RenderArticleSection key={i} section={section} />;
          })}
        </article>

        {/* Author / CTA */}
        <div className="mt-16 pt-8 border-t border-border-default">
          <div className="bg-surface-secondary border border-border-default rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6">
            <img
              src="/photo/Rohit Jain.jpg"
              alt="Rohit Jain"
              className="w-16 h-16 rounded-full object-cover object-top flex-shrink-0"
            />
            <div className="text-center sm:text-left">
              <p className="font-bold text-text-primary">Rohit Jain</p>
              <p className="text-sm text-text-tertiary mb-2">
                AI Engineer building production RAG systems, agents, and document intelligence. 17+ years enterprise architecture.
              </p>
              <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-brand-primary hover:text-brand-primary-hover transition-colors">
                  Get in Touch &rarr;
                </a>
                <Link to="/case-studies" className="text-sm font-semibold text-text-muted hover:text-text-primary transition-colors">
                  Read Case Studies &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
