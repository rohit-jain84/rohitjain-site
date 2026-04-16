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
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-surface-secondary border border-border-default rounded-2xl overflow-hidden hover:border-brand-primary hover:shadow-[var(--shadow-glow)] hover:-translate-y-1 transition-all duration-250"
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
                  <h2 className="text-lg font-bold text-text-primary pr-4">{project.title}</h2>
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
                  <Link to={`/case-studies/${project.caseStudySlug}`} className="text-sm font-semibold text-brand-primary hover:text-brand-primary-hover transition-colors">
                    Read Case Study &rarr;
                  </Link>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-text-muted hover:text-text-primary transition-colors">
                    GitHub &#x2197;
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
