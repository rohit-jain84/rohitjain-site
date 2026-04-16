import { useState } from 'react';
import { SEOHead } from '../components/shared/SEOHead';
import { contact, WHATSAPP_URL } from '../data/resume';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validate(name: string, email: string, message: string): FormErrors {
  const errors: FormErrors = {};
  if (name.trim().length < 2) errors.name = 'Name must be at least 2 characters.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = 'Please enter a valid email address.';
  if (message.trim().length < 10) errors.message = 'Message must be at least 10 characters.';
  return errors;
}

export function Contact() {
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const errors = validate(values.name, values.email, values.message);
  const isValid = Object.keys(errors).length === 0;

  function handleBlur(field: string) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  function handleChange(field: string, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!isValid) return;

    const name = values.name.trim();
    const email = values.email.trim();
    const message = values.message.trim();
    const msg = `Hi Rohit, I'm ${name} (${email}). ${message}`;
    window.open(`https://wa.me/919999766876?text=${encodeURIComponent(msg)}`, '_blank');
  }

  const fieldClass = (field: keyof FormErrors) =>
    `w-full px-4 py-2.5 rounded-lg border bg-surface-secondary text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors ${
      touched[field] && errors[field] ? 'border-error' : 'border-border-default'
    }`;

  return (
    <>
      <SEOHead
        title="Contact"
        description="Get in touch for AI engineering work. Available for freelance RAG, agent, and document intelligence projects."
        path="/contact"
      />

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <p className="text-sm font-bold uppercase tracking-widest text-brand-primary mb-2">Contact</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary mb-4">
          Get in Touch
        </h1>
        <p className="text-text-tertiary mb-12 max-w-lg">
          Interested in working together? I'm open to freelance engagements and prefer to start with a conversation about your needs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div>
            <h2 className="text-lg font-bold text-text-primary mb-6">Send a Message</h2>
            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={values.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  onBlur={() => handleBlur('name')}
                  className={fieldClass('name')}
                  placeholder="Your name"
                />
                {touched.name && errors.name && (
                  <p className="text-xs text-error mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={values.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  className={fieldClass('email')}
                  placeholder="you@example.com"
                />
                {touched.email && errors.email && (
                  <p className="text-xs text-error mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={values.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  onBlur={() => handleBlur('message')}
                  className={`${fieldClass('message')} resize-y`}
                  placeholder="Tell me about your project..."
                />
                {touched.message && errors.message && (
                  <p className="text-xs text-error mt-1">{errors.message}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={Object.keys(touched).length > 0 && !isValid}
                className="w-full px-6 py-3 rounded-lg text-base font-semibold text-white gradient-brand shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-md"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Direct Contact */}
          <div>
            <h2 className="text-lg font-bold text-text-primary mb-6">Or Reach Out Directly</h2>
            <div className="space-y-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-surface-secondary border-2 border-success/30 rounded-xl hover:border-success hover:shadow-[var(--shadow-glow)] transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">WhatsApp</p>
                  <p className="text-sm text-text-muted">+91-9999766876 · Fastest response</p>
                </div>
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 p-4 bg-surface-secondary border border-border-default rounded-xl hover:border-brand-primary hover:shadow-[var(--shadow-glow)] transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-primary-subtle flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">Email</p>
                  <p className="text-sm text-text-muted">{contact.email}</p>
                </div>
              </a>
              <a
                href={contact.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-surface-secondary border border-border-default rounded-xl hover:border-brand-primary hover:shadow-[var(--shadow-glow)] transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-primary-subtle flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-brand-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">LinkedIn</p>
                  <p className="text-sm text-text-muted">Professional profile</p>
                </div>
              </a>
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-surface-secondary border border-border-default rounded-xl hover:border-brand-primary hover:shadow-[var(--shadow-glow)] transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-primary-subtle flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-brand-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">GitHub</p>
                  <p className="text-sm text-text-muted">Project source code</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
