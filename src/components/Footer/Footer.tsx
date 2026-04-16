import { Link } from 'react-router-dom';
import { contact } from '../../data/resume';
import { ThemeToggle } from '../shared/ThemeToggle';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border-default bg-surface-secondary">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo + tagline */}
          <div className="text-center md:text-left">
            <Link to="/" className="font-extrabold text-lg text-text-primary tracking-tight">
              Rohit Jain
            </Link>
            <p className="text-sm text-text-muted mt-1">AI Engineer — Production Systems with Enterprise Design Principles</p>
          </div>

          {/* Links + Theme */}
          <div className="flex items-center gap-6">
            <a
              href={`mailto:${contact.email}`}
              className="text-text-muted hover:text-brand-primary transition-colors text-sm"
            >
              Email
            </a>
            <a
              href={contact.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-brand-primary transition-colors text-sm"
            >
              LinkedIn
            </a>
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-brand-primary transition-colors text-sm"
            >
              GitHub
            </a>
            <ThemeToggle />
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border-default text-center">
          <p className="text-sm text-text-muted">
            &copy; {currentYear} Rohit Jain. Built with React, TypeScript & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
