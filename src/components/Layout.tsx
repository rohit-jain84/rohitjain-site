import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ErrorBoundary } from './shared/ErrorBoundary';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-surface-primary text-text-primary flex flex-col">
      <ScrollToTop />
      {/* Skip to content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-surface-secondary focus:text-brand-primary focus:border focus:border-brand-primary focus:shadow-lg focus:text-sm focus:font-semibold"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        <ErrorBoundary key={location.pathname}>
          <div key={location.pathname} className="animate-page-in">
            <Outlet />
          </div>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}
