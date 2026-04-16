import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navigation, WHATSAPP_URL } from '../../data/resume';
import { ThemeToggle } from '../shared/ThemeToggle';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border-default bg-surface-secondary/80 backdrop-blur-xl">
      <nav className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="font-extrabold text-lg text-text-primary tracking-tight hover:opacity-80 transition-opacity"
        >
          Rohit Jain
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href ||
              (item.href !== '/' && location.pathname.startsWith(item.href));
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-150 ${
                    isActive
                      ? 'text-brand-primary bg-brand-primary-subtle'
                      : 'text-text-tertiary hover:text-text-primary hover:bg-surface-tertiary'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right side: theme toggle + CTA + mobile menu */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white gradient-brand shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-150"
          >
            Hire Me
          </a>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-text-tertiary hover:text-text-primary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-border-default bg-surface-secondary/95 backdrop-blur-xl">
          <ul className="px-4 py-4 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href ||
                (item.href !== '/' && location.pathname.startsWith(item.href));
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-brand-primary bg-brand-primary-subtle'
                        : 'text-text-tertiary hover:text-text-primary hover:bg-surface-tertiary'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-2">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white gradient-brand"
                onClick={() => setIsMenuOpen(false)}
              >
                Hire Me
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
