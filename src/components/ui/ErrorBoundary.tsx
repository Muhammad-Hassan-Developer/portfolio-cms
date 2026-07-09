import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="flex min-h-[400px] items-center justify-center px-4">
          <div className="text-center">
            <div className="mb-4 text-6xl"> </div>
            <h2 className="mb-2 text-xl font-bold text-text-primary">Something went wrong</h2>
            <p className="mb-6 text-sm text-text-secondary">
              An unexpected error occurred. Please try refreshing the page.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Button onClick={() => window.location.reload()}>Refresh Page</Button>
              <Button variant="secondary" onClick={() => this.setState({ hasError: false, error: null })}>
                Try Again
              </Button>
            </div>
            {import.meta.env.DEV && this.state.error && (
              <pre className="mt-6 mx-auto max-w-lg overflow-auto rounded-xl bg-surface-elevated p-4 text-left text-xs text-error">
                {this.state.error.message}
              </pre>
            )}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
