import { Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-24 md:py-32 text-center">
          <p className="text-6xl font-black gradient-text mb-4">Oops</p>
          <h1 className="text-2xl font-bold text-text-primary mb-4">Something went wrong</h1>
          <p className="text-text-tertiary mb-8">
            An unexpected error occurred. Try refreshing the page or navigating home.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => this.setState({ hasError: false })}
              className="px-6 py-3 rounded-xl text-base font-semibold border border-border-default text-text-primary hover:bg-surface-tertiary transition-colors"
            >
              Try Again
            </button>
            <Link
              to="/"
              onClick={() => this.setState({ hasError: false })}
              className="px-6 py-3 rounded-xl text-base font-semibold text-white gradient-brand shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
            >
              Back to Home
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
