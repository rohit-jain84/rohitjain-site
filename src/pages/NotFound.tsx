import { Link } from 'react-router-dom';
import { SEOHead } from '../components/shared/SEOHead';

export function NotFound() {
  return (
    <>
      <SEOHead title="404" description="Page not found" />

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-24 md:py-32 text-center">
        <p className="text-6xl font-black gradient-text mb-4">404</p>
        <h1 className="text-2xl font-bold text-text-primary mb-4">Page Not Found</h1>
        <p className="text-text-tertiary mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-base font-semibold text-white gradient-brand shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
        >
          Back to Home
        </Link>
      </div>
    </>
  );
}
