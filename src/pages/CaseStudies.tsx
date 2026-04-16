import { Link } from 'react-router-dom';
import { SEOHead } from '../components/shared/SEOHead';
import { TechTag } from '../components/shared/TechTag';
import { caseStudies } from '../data/caseStudies';

export function CaseStudies() {
  return (
    <>
      <SEOHead
        title="Case Studies"
        description="Deep-dive case studies: architecture decisions, evaluation metrics, and lessons learned from building production AI systems."
        path="/case-studies"
      />

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <p className="text-sm font-bold uppercase tracking-widest text-brand-primary mb-2">Case Studies</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary mb-4">
          Deep Dives
        </h1>
        <p className="text-text-tertiary mb-12 max-w-2xl">
          Problem &rarr; Architecture &rarr; Key Decisions &rarr; Results &rarr; Lessons. Each case study walks through how and why — not just what.
        </p>

        <div className="space-y-6">
          {caseStudies.map((study) => (
            <Link
              key={study.slug}
              to={`/case-studies/${study.slug}`}
              className="group block bg-surface-secondary border border-border-default rounded-2xl p-6 md:p-8 hover:border-brand-primary hover:shadow-[var(--shadow-glow)] hover:-translate-y-0.5 transition-all duration-250 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 gradient-brand opacity-0 group-hover:opacity-100 transition-opacity duration-250" />
              {/* Hero screenshot if available */}
              {study.screenshots && study.screenshots.length > 0 && (
                <div className="w-full aspect-[3/1] overflow-hidden rounded-lg bg-surface-tertiary mb-4 border border-border-default">
                  <img src={study.screenshots[0].src} alt={study.screenshots[0].alt} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                </div>
              )}
              <div className="flex items-start justify-between gap-4 mb-3">
                <h2 className="text-xl font-bold text-text-primary group-hover:text-brand-primary transition-colors">
                  {study.title}
                </h2>
                <span className="flex-shrink-0 text-sm font-semibold text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Read &rarr;
                </span>
              </div>
              <p className="text-sm text-text-tertiary leading-relaxed mb-4">{study.subtitle}</p>

              {/* Result highlights */}
              <div className="flex flex-wrap gap-2 mb-4">
                {study.results.slice(0, 4).map((r) => (
                  <span key={r.label} className="text-xs font-semibold text-brand-primary bg-brand-primary-subtle px-2 py-0.5 rounded">
                    {r.value} {r.label}
                  </span>
                ))}
              </div>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5">
                {study.techStack.slice(0, 8).map((t) => (
                  <TechTag key={t.tech} label={t.tech} />
                ))}
                {study.techStack.length > 8 && (
                  <TechTag label={`+${study.techStack.length - 8}`} />
                )}
              </div>

              <div className="flex items-center gap-4 mt-4 text-xs text-text-muted">
                <span>{study.readingTime}</span>
                <span>{study.duration}</span>
                <span>{study.role}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
