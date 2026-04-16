import { Link } from 'react-router-dom';
import { SEOHead } from '../components/shared/SEOHead';
import { TechTag } from '../components/shared/TechTag';
import { useTheme } from '../context/ThemeContext';
import { hero, projects, services, designPrinciples, testimonials, WHATSAPP_URL } from '../data/resume';

function resolveHero(hero: string | { light: string; dark: string } | undefined, siteIsDark: boolean): string | undefined {
  if (!hero) return undefined;
  if (typeof hero === 'string') return hero;
  return siteIsDark ? hero.dark : hero.light;
}

export function Home() {
  const { theme } = useTheme();
  const siteIsDark = theme.isDark;
  const featuredProjects = projects.slice(0, 3);

  return (
    <>
      <SEOHead
        title="Home"
        description="Rohit Jain — AI Engineer building production RAG systems, LLM agents, and document intelligence platforms. Enterprise system design principles in every layer."
        path="/"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Rohit Jain',
          url: 'https://rohitjain.net',
          jobTitle: 'AI Engineer',
          description: 'AI Engineer building production RAG systems, LLM agents, and document intelligence platforms.',
          sameAs: [
            'https://github.com/rohit-jain84',
            'https://www.linkedin.com/in/rohitjaintech/',
          ],
        }}
      />

      {/* Hero Section */}
      <section className="hero-glow relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-20 md:py-32 text-center">
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-brand-primary/20 shadow-lg mx-auto mb-6">
            <img src={hero.photoUrl} alt={hero.name} className="w-full h-full object-cover object-top scale-110" />
          </div>
          {hero.availableForWork && (
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-brand-primary-subtle text-brand-primary border border-brand-primary/30 mb-6 hover:bg-brand-primary hover:text-white transition-colors duration-200"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
              Available
            </a>
          )}
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-text-primary mb-6">{hero.name}</h1>
          <p className="text-lg md:text-xl text-text-tertiary max-w-2xl mx-auto mb-4">{hero.title}</p>
          <p className="text-base text-text-muted max-w-xl mx-auto mb-10">{hero.headline}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/projects" className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-base font-semibold text-white gradient-brand shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
              View Projects
            </Link>
            <Link to="/case-studies" className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-base font-semibold text-text-primary border-2 border-border-default hover:border-brand-primary hover:text-brand-primary transition-all duration-200">
              Read Case Studies
            </Link>
          </div>
        </div>
      </section>

      {/* How I Build — Design Principles */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-20 md:py-28">
        <div className="text-center mb-14">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-primary mb-2">How I Build</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary">
            System Design Principles in Every Project
          </h2>
          <p className="text-text-tertiary mt-3 max-w-2xl mx-auto">
            These aren't buzzwords — each principle is demonstrated with working code across my open-source projects.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {designPrinciples.map((p) => {
            const linkedProject = projects.find((proj) => proj.id === p.projectId);
            const href = linkedProject?.caseStudySlug ? `/case-studies/${linkedProject.caseStudySlug}` : '/projects';
            return (
              <Link
                key={p.id}
                to={href}
                className="group relative block bg-surface-secondary border border-border-default rounded-2xl p-5 hover:border-brand-primary hover:shadow-[var(--shadow-glow)] hover:-translate-y-0.5 transition-all duration-250 overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 gradient-brand opacity-0 group-hover:opacity-100 transition-opacity duration-250" />
                <h3 className="text-sm font-bold text-text-primary group-hover:text-brand-primary transition-colors mb-1.5">{p.title}</h3>
                <p className="text-xs text-text-tertiary leading-relaxed mb-3">{p.description}</p>
                <span className="text-xs font-semibold text-brand-primary">
                  See in action &rarr;
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* What I Build — Services */}
      <section className="bg-surface-secondary border-y border-border-default">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-20 md:py-28">
          <div className="text-center mb-14">
            <p className="text-sm font-bold uppercase tracking-widest text-brand-primary mb-2">What I Build</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary">
              Production AI Systems
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service) => (
              <div
                key={service.id}
                className="group relative bg-surface-primary border border-border-default rounded-2xl p-6 hover:border-brand-primary hover:shadow-[var(--shadow-glow)] hover:-translate-y-0.5 transition-all duration-250 overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 gradient-brand opacity-0 group-hover:opacity-100 transition-opacity duration-250" />
                <h3 className="text-base font-bold text-text-primary mb-2">{service.title}</h3>
                <p className="text-sm text-text-tertiary leading-relaxed mb-4">{service.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {service.tags.map((tag) => (
                    <TechTag key={tag} label={tag} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects — with screenshots */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-20 md:py-28">
        <div className="text-center mb-14">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-primary mb-2">Featured Work</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary">Recent Projects</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <Link
              key={project.id}
              to={project.caseStudySlug ? `/case-studies/${project.caseStudySlug}` : '/projects'}
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
                {project.caseStudySlug && (
                  <span className="inline-block text-xs font-semibold uppercase tracking-wider text-brand-accent bg-brand-accent-subtle px-2.5 py-0.5 rounded-full mb-3">
                    Case Study
                  </span>
                )}
                <h3 className="text-lg font-bold text-text-primary group-hover:text-brand-primary transition-colors mb-2">{project.title}</h3>
                {project.scenario && (
                  <p className="text-xs text-text-muted leading-relaxed mb-3 italic">"{project.scenario}"</p>
                )}
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.highlights.map((h) => (
                    <span key={h} className="text-xs font-semibold text-brand-primary bg-brand-primary-subtle px-2 py-0.5 rounded">{h}</span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 5).map((tech) => (
                    <TechTag key={tech} label={tech} />
                  ))}
                  {project.techStack.length > 5 && <TechTag label={`+${project.techStack.length - 5}`} />}
                </div>
              </div>
              <div className="px-6 py-4 border-t border-border-default flex gap-4">
                <span className="text-sm font-semibold text-brand-primary">
                  Read Case Study &rarr;
                </span>
                {project.githubUrl && (
                  <span
                    className="text-sm font-semibold text-text-muted hover:text-text-primary transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
                    }}
                    role="link"
                    tabIndex={0}
                  >
                    GitHub &#x2197;
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:text-brand-primary-hover transition-colors">
            View all projects &rarr;
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-surface-secondary border-y border-border-default">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-20 md:py-28">
          <div className="text-center mb-14">
            <p className="text-sm font-bold uppercase tracking-widest text-brand-primary mb-2">What Clients Say</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary">
              Built on Trust & Results
            </h2>
            <p className="text-text-tertiary mt-3 max-w-2xl mx-auto">
              Feedback from 17 years of building enterprise systems — the same rigor I now bring to AI engineering.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="group relative bg-surface-primary border border-border-default rounded-2xl p-6 md:p-8 hover:border-brand-primary hover:shadow-[var(--shadow-glow)] transition-all duration-250"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 gradient-brand opacity-0 group-hover:opacity-100 transition-opacity duration-250" />
                <svg className="w-8 h-8 text-brand-primary/20 mb-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
                </svg>
                <blockquote className="text-sm md:text-base text-text-secondary leading-relaxed mb-6">
                  "{t.quote}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-brand flex items-center justify-center text-white font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{t.name}</p>
                    <p className="text-xs text-text-muted">{t.company} — {t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface-secondary border-t border-border-default">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-20 md:py-28 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary mb-4">
            Let's Build Something Together
          </h2>
          <p className="text-text-tertiary max-w-lg mx-auto mb-8">
            I'm available for freelance AI engineering work. Long-term hourly engagements preferred — let's start with a conversation.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-base font-semibold text-white gradient-brand shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
              Get in Touch
            </a>
            <Link to="/services" className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-base font-semibold text-text-primary border-2 border-border-default hover:border-brand-primary hover:text-brand-primary transition-all duration-200">
              View Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
