import { useParams, Link } from 'react-router-dom';
import { SEOHead } from '../components/shared/SEOHead';
import { TechTag } from '../components/shared/TechTag';
import { ImageLightbox } from '../components/shared/ImageLightbox';
import { caseStudies } from '../data/caseStudies';
import type { CaseStudySection } from '../data/caseStudies';

function RenderSection({ section }: { section: CaseStudySection }) {
  switch (section.type) {
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

    case 'metrics':
      return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          {section.metrics?.map((m) => (
            <div key={m.label} className="bg-surface-secondary border border-border-default rounded-xl p-4 text-center hover:border-brand-primary hover:shadow-[var(--shadow-glow)] transition-all duration-200">
              <div className="text-2xl font-extrabold tracking-tight gradient-text">{m.value}</div>
              <div className="text-sm font-medium text-text-primary mt-1">{m.label}</div>
              <div className="text-xs text-text-muted mt-0.5">{m.context}</div>
            </div>
          ))}
        </div>
      );

    case 'table':
      if (!section.rows || section.rows.length === 0) return null;
      const [header, ...body] = section.rows;
      return (
        <div className="my-6 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                {header.map((h, i) => (
                  <th key={i} className="text-left px-4 py-2 border-b border-border-default text-text-muted font-semibold uppercase tracking-wider text-xs">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row, ri) => (
                <tr key={ri} className="hover:bg-surface-tertiary/50">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-2.5 border-b border-border-default text-text-secondary">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
              {isInsight ? 'Architecture Insight' : 'Key Takeaway'}
            </span>
            <p className="text-sm text-text-secondary mt-1 leading-relaxed">{section.content}</p>
          </div>
        </div>
      );

    default:
      return null;
  }
}

export function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const study = caseStudies.find((cs) => cs.slug === slug);

  if (!study) {
    return (
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-24 text-center">
        <h1 className="text-2xl font-bold text-text-primary mb-4">Case Study Not Found</h1>
        <Link to="/case-studies" className="text-brand-primary hover:text-brand-primary-hover font-medium">
          &larr; Back to Case Studies
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={study.title}
        description={study.subtitle}
        path={`/case-studies/${slug}`}
      />

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <Link
          to="/case-studies"
          className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-brand-primary transition-colors mb-8"
        >
          &larr; Back to Case Studies
        </Link>

        {/* Header */}
        <header className="bg-surface-secondary border border-border-default rounded-2xl p-8 md:p-12 mb-12">
          <div className="flex flex-wrap gap-4 mb-6 text-sm text-text-muted">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              {study.readingTime}
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              {study.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              {study.role}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary mb-4">
            {study.title}
          </h1>
          <p className="text-lg text-text-tertiary leading-relaxed mb-4">
            {study.subtitle}
          </p>
          {study.githubUrl && (
            <a
              href={study.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:text-brand-primary-hover transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              View Source on GitHub &#x2197;
            </a>
          )}
        </header>

        {/* Screenshot Gallery */}
        {study.screenshots && study.screenshots.length > 0 && (
          <section className="mb-16">
            <h2 className="text-sm font-bold uppercase tracking-widest text-brand-primary mb-6">Screenshots</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {study.screenshots.map((s, i) => (
                <div key={i} className="relative bg-surface-secondary border border-border-default rounded-xl overflow-hidden hover:border-brand-primary hover:shadow-[var(--shadow-glow)] transition-all duration-200">
                  <ImageLightbox
                    src={s.src}
                    alt={s.alt}
                    caption={s.alt}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Real-World Scenarios */}
        {study.scenarios && study.scenarios.length > 0 && (
          <section className="mb-16">
            <h2 className="text-sm font-bold uppercase tracking-widest text-brand-primary mb-6">Real-World Scenarios</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {study.scenarios.map((s, i) => (
                <div key={i} className="bg-surface-secondary border border-border-default rounded-xl p-5">
                  <h3 className="font-bold text-text-primary text-sm mb-2">{s.title}</h3>
                  <p className="text-xs text-text-tertiary leading-relaxed">{s.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Results metrics (prominent, before content) */}
        <section className="mb-16">
          <h2 className="text-sm font-bold uppercase tracking-widest text-brand-primary mb-6">Results</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {study.results.slice(0, 4).map((r) => (
              <div key={r.label} className="bg-surface-secondary border border-border-default rounded-xl p-5 text-center hover:border-brand-primary hover:shadow-[var(--shadow-glow)] transition-all duration-200">
                <div className="text-2xl md:text-3xl font-extrabold tracking-tight gradient-text">{r.value}</div>
                <div className="text-sm font-medium text-text-primary mt-1">{r.label}</div>
                <div className="text-xs text-text-muted mt-0.5">{r.context}</div>
              </div>
            ))}
          </div>
          {study.results.length > 4 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {study.results.slice(4).map((r) => (
                <div key={r.label} className="bg-surface-secondary border border-border-default rounded-xl p-4 text-center hover:border-brand-primary hover:shadow-[var(--shadow-glow)] transition-all duration-200">
                  <div className="text-xl font-extrabold tracking-tight gradient-text">{r.value}</div>
                  <div className="text-sm font-medium text-text-primary mt-1">{r.label}</div>
                  <div className="text-xs text-text-muted mt-0.5">{r.context}</div>
                </div>
              ))}
            </div>
          )}
          {study.resultsSummary && (
            <p className="text-sm text-text-tertiary mt-4 leading-relaxed">{study.resultsSummary}</p>
          )}
        </section>

        {/* The Challenge */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">The Challenge</h2>
          {study.problem.map((p, i) => (
            <p key={i} className="text-text-secondary leading-relaxed mb-4">{p}</p>
          ))}
        </section>

        {/* Architecture */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Architecture Overview</h2>
          {study.architecture.map((p, i) => (
            <p key={i} className="text-text-secondary leading-relaxed mb-4">{p}</p>
          ))}
        </section>

        {/* Key Decisions */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-8">Key Technical Decisions</h2>
          <div className="space-y-12">
            {study.decisions.map((decision, di) => (
              <article key={di} className="border-l-2 border-brand-primary/30 pl-6 hover:border-brand-primary transition-colors">
                <h3 className="text-xl font-bold text-text-primary mb-4">
                  <span className="text-brand-primary mr-2">{String.fromCharCode(65 + di)}.</span>
                  {decision.title}
                </h3>

                <div className="mb-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-text-muted mb-2">The Problem</h4>
                  <p className="text-text-secondary leading-relaxed">{decision.problem}</p>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-text-muted mb-2">The Solution</h4>
                  <p className="text-text-secondary leading-relaxed">{decision.solution}</p>
                </div>

                {decision.sections.map((sec, si) => (
                  <RenderSection key={si} section={sec} />
                ))}

                {decision.insight && (
                  <div className="my-4 flex gap-3 p-4 rounded-lg bg-brand-primary-subtle border border-brand-primary/30">
                    <span className="text-lg flex-shrink-0 mt-0.5">💡</span>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">Key Insight</span>
                      <p className="text-sm text-text-secondary mt-1 leading-relaxed">{decision.insight}</p>
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Lessons Learned */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-8">Lessons Learned</h2>
          <div className="space-y-6">
            {study.lessons.map((lesson, i) => (
              <div key={i} className="bg-surface-secondary border border-border-default rounded-xl p-6">
                <h3 className="font-bold text-text-primary mb-2">
                  <span className="text-brand-primary mr-2">{i + 1}.</span>
                  {lesson.title}
                </h3>
                <p className="text-sm text-text-tertiary leading-relaxed">{lesson.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Tech Stack</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="text-left px-4 py-2 border-b border-border-default text-text-muted font-semibold uppercase tracking-wider text-xs">Layer</th>
                  <th className="text-left px-4 py-2 border-b border-border-default text-text-muted font-semibold uppercase tracking-wider text-xs">Technology</th>
                  <th className="text-left px-4 py-2 border-b border-border-default text-text-muted font-semibold uppercase tracking-wider text-xs">Purpose</th>
                </tr>
              </thead>
              <tbody>
                {study.techStack.map((row, i) => (
                  <tr key={i} className="hover:bg-surface-tertiary/50">
                    <td className="px-4 py-2.5 border-b border-border-default text-text-muted text-xs uppercase tracking-wider">{row.layer}</td>
                    <td className="px-4 py-2.5 border-b border-border-default font-medium text-text-primary">{row.tech}</td>
                    <td className="px-4 py-2.5 border-b border-border-default text-text-tertiary">{row.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Footer nav */}
        <div className="flex flex-wrap gap-4 justify-between items-center pt-8 border-t border-border-default">
          <Link
            to="/case-studies"
            className="text-sm font-semibold text-brand-primary hover:text-brand-primary-hover transition-colors"
          >
            &larr; All Case Studies
          </Link>
          <div className="flex flex-wrap gap-2">
            {study.techStack.slice(0, 6).map((t) => (
              <TechTag key={t.tech} label={t.tech} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
