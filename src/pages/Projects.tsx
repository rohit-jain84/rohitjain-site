import { Link } from 'react-router-dom';
import { SEOHead } from '../components/shared/SEOHead';
import { TechTag } from '../components/shared/TechTag';
import { useTheme } from '../context/ThemeContext';
import { projects } from '../data/resume';

/** Resolve a hero screenshot value to a URL based on the current theme.
 *  Rule: light site → dark app screenshot (contrast), dark site → light app screenshot. */
function resolveHero(hero: string | { light: string; dark: string } | undefined, siteIsDark: boolean): string | undefined {
  if (!hero) return undefined;
  if (typeof hero === 'string') return hero;
  return siteIsDark ? hero.dark : hero.light;
}

export function Projects() {
  const { theme } = useTheme();
  const siteIsDark = theme.isDark;

  return (
    <>
      <SEOHead
        title="Projects"
        description="Production AI systems: multi-tenant RAG, LLM agents with MCP, document intelligence, LLMOps, and more. Built with Python, FastAPI, LangGraph."
        path="/projects"
      />

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <p className="text-sm font-bold uppercase tracking-widest text-brand-primary mb-2">Projects</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary mb-4">
          What I've Built
        </h1>
        <p className="text-text-tertiary mb-12 max-w-2xl">
          Production-grade AI systems with measurable results. Each project includes architecture decisions, evaluation metrics, Docker orchestration, and comprehensive documentation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => {
            const cardHref = project.caseStudySlug
              ? `/case-studies/${project.caseStudySlug}`
              : project.githubUrl || '/projects';

            const CardWrapper = project.caseStudySlug
              ? Link
              : project.githubUrl ? 'a' : 'div';

            const cardProps = project.caseStudySlug
              ? { to: cardHref }
              : project.githubUrl
                ? { href: cardHref, target: '_blank', rel: 'noopener noreferrer' }
                : {};

            return (
              <CardWrapper
                key={project.id}
                {...cardProps as any}
                className="group relative block bg-surface-secondary border border-border-default rounded-2xl overflow-hidden hover:border-brand-primary hover:shadow-[var(--shadow-glow)] hover:-translate-y-1 transition-all duration-250"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 gradient-brand opacity-0 group-hover:opacity-100 transition-opacity duration-250" />
                {/* Hero screenshot */}
                {project.heroScreenshot && (
                  <div className="w-full aspect-video overflow-hidden bg-surface-tertiary">
                    <img
                      src={resolveHero(project.heroScreenshot, siteIsDark)}
                      alt={project.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h2 className="text-lg font-bold text-text-primary group-hover:text-brand-primary transition-colors pr-4">{project.title}</h2>
                    {project.caseStudySlug && (
                      <span className="flex-shrink-0 text-xs font-semibold uppercase tracking-wider text-brand-accent bg-brand-accent-subtle px-2.5 py-0.5 rounded-full">
                        Case Study
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-text-tertiary leading-relaxed mb-3">{project.description}</p>
                  {/* Architecture one-liner */}
                  {project.architectureOneLiner && (
                    <p className="text-xs text-text-muted leading-relaxed mb-3 font-mono bg-surface-tertiary px-3 py-2 rounded-lg">
                      {project.architectureOneLiner}
                    </p>
                  )}
                  {/* Real-world scenario */}
                  {project.scenario && (
                    <div className="mb-3 pl-3 border-l-2 border-brand-primary/30">
                      <p className="text-xs text-text-muted leading-relaxed italic">{project.scenario}</p>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.highlights.map((h) => (
                      <span key={h} className="text-xs font-semibold text-brand-primary bg-brand-primary-subtle px-2 py-0.5 rounded">{h}</span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <TechTag key={tech} label={tech} />
                    ))}
                  </div>
                </div>
                <div className="px-6 py-4 border-t border-border-default flex gap-4">
                  {project.caseStudySlug && (
                    <span className="text-sm font-semibold text-brand-primary">
                      Read Case Study &rarr;
                    </span>
                  )}
                  {project.githubUrl && (
                    <span
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-white gradient-brand px-3 py-1 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
                      }}
                      role="link"
                      tabIndex={0}
                    >
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                      View Source on GitHub &#x2197;
                    </span>
                  )}
                </div>
              </CardWrapper>
            );
          })}
        </div>
      </div>
    </>
  );
}
