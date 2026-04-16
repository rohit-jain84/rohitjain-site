import { SEOHead } from '../components/shared/SEOHead';
import { TechTag } from '../components/shared/TechTag';
import { summary, experience, skills, education } from '../data/resume';

export function About() {
  return (
    <>
      <SEOHead
        title="About"
        description="17 years of enterprise architecture, now building production AI systems. The story of an engineering leader who pivoted into AI — and why it works."
        path="/about"
      />

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-24">
        {/* Intro with photo */}
        <div className="flex flex-col sm:flex-row items-start gap-6 mb-12">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-brand-primary/20 shadow-md flex-shrink-0">
            <img src="/photo/Rohit Jain.jpg" alt="Rohit Jain" className="w-full h-full object-cover object-top scale-110" />
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-brand-primary mb-2">About</p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary mb-4">
              Enterprise Architect Turned AI Engineer
            </h1>
          </div>
        </div>
        <div className="space-y-4 mb-16">
          {summary.paragraphs.map((p, i) => (
            <p key={i} className="text-text-secondary leading-relaxed">{p}</p>
          ))}
        </div>

        {/* Skills */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-8">Skills & Technologies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((category) => (
              <div
                key={category.id}
                className="bg-surface-secondary border border-border-default rounded-xl p-5"
              >
                <h3 className="text-sm font-bold uppercase tracking-wider text-brand-primary mb-3">
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <TechTag key={skill} label={skill} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-8">Experience</h2>
          <div className="space-y-8">
            {experience.map((role) => (
              <article
                key={role.id}
                className="border-l-2 border-border-default pl-6 hover:border-brand-primary transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                  <h3 className="font-bold text-text-primary">{role.title}</h3>
                  <span className="text-sm text-text-muted whitespace-nowrap">
                    {role.startDate} – {role.endDate}
                  </span>
                </div>
                <p className="text-sm text-text-tertiary mb-3">
                  {role.company} &middot; {role.location}
                </p>
                {role.note && (
                  <p className="text-xs text-text-muted italic mb-3">{role.note}</p>
                )}
                <ul className="space-y-2 mb-3">
                  {role.bullets.map((bullet, i) => (
                    <li key={i} className="text-sm text-text-secondary leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-brand-primary/40">
                      {bullet}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5">
                  {role.techStack.map((tech) => (
                    <TechTag key={tech} label={tech} />
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-6">Education</h2>
          <div className="border-l-2 border-border-default pl-6">
            <h3 className="font-bold text-text-primary">
              {education.degree} — {education.field}
            </h3>
            <p className="text-sm text-text-tertiary">{education.institution}</p>
            <p className="text-sm text-text-muted">{education.years}</p>
          </div>
        </section>
      </div>
    </>
  );
}
