import { SEOHead } from '../components/shared/SEOHead';
import { TechTag } from '../components/shared/TechTag';
import { services, WHATSAPP_URL } from '../data/resume';

export function Services() {
  return (
    <>
      <SEOHead
        title="Services"
        description="AI engineering services: RAG systems, LLM agents, document intelligence, and LLMOps. Long-term engagements with measurable outcomes."
        path="/services"
      />

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <p className="text-sm font-bold uppercase tracking-widest text-brand-primary mb-2">Services</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary mb-4">
          How I Can Help
        </h1>
        <p className="text-text-tertiary mb-12 max-w-2xl">
          I build production AI systems for teams that need more than a prototype. Every engagement starts with understanding the problem, not pitching a solution.
        </p>

        {/* Service Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative bg-surface-secondary border border-border-default rounded-2xl p-6 hover:border-brand-primary hover:shadow-[var(--shadow-glow)] transition-all duration-250 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 gradient-brand opacity-0 group-hover:opacity-100 transition-opacity duration-250" />
              <h3 className="text-lg font-bold text-text-primary mb-2">{service.title}</h3>
              <p className="text-sm text-text-tertiary leading-relaxed mb-4">{service.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {service.tags.map((tag) => (
                  <TechTag key={tag} label={tag} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Ideal Client */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Ideal Client</h2>
          <div className="bg-surface-secondary border border-border-default rounded-xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-text-primary mb-2">You're a good fit if</h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li className="pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-success">You have an existing product that needs AI capabilities</li>
                  <li className="pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-success">You have users, data, and business context</li>
                  <li className="pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-success">You need production concerns (multi-tenancy, cost, security) from day one</li>
                  <li className="pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-success">You value measurable results over impressive demos</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-text-primary mb-2">Probably not a fit if</h3>
                <ul className="space-y-2 text-sm text-text-tertiary">
                  <li className="pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-text-muted">You need pure ML research or model training</li>
                  <li className="pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-text-muted">You want a quick ChatGPT wrapper without production architecture</li>
                  <li className="pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-text-muted">You need a data scientist for statistical modeling</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Engagement Models */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Engagement Models</h2>
          <div className="space-y-4">
            <div className="bg-surface-secondary border border-border-default rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-bold text-text-primary">Long-term Hourly</h3>
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-accent bg-brand-accent-subtle px-2 py-0.5 rounded-full">
                  Preferred
                </span>
              </div>
              <p className="text-sm text-text-tertiary leading-relaxed">
                Ongoing engagement where I become part of your team. Deep context, consistent velocity, best results. Minimum 20 hours/week recommended.
              </p>
            </div>
            <div className="bg-surface-secondary border border-border-default rounded-xl p-6">
              <h3 className="font-bold text-text-primary mb-2">Project-Based</h3>
              <p className="text-sm text-text-tertiary leading-relaxed">
                Defined scope with milestone payments. Good for well-scoped features or proof-of-concept builds.
              </p>
            </div>
            <div className="bg-surface-secondary border border-border-default rounded-xl p-6">
              <h3 className="font-bold text-text-primary mb-2">Paid Trial</h3>
              <p className="text-sm text-text-tertiary leading-relaxed">
                Start with a small, paid task to evaluate fit before committing to a longer engagement. Low risk for both sides.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center py-8">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-base font-semibold text-white gradient-brand shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
          >
            Start a Conversation
          </a>
        </div>
      </div>
    </>
  );
}
