import { cn } from "@/lib/sw-toolkit/utils/style";
import React, { ErrorInfo } from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<FallbackProps>;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  className?: string;
}

export interface FallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
    this.resetErrorBoundary = this.resetErrorBoundary.bind(this);
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  resetErrorBoundary() {
    this.setState({ hasError: false, error: undefined });
  }

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error} resetErrorBoundary={this.resetErrorBoundary} />;
      }

      return (
        <DefaultErrorFallback error={this.state.error} resetErrorBoundary={this.resetErrorBoundary} className={this.props.className} />
      );
    }

    return this.props.children;
  }
}

export function DefaultErrorFallback({ error, resetErrorBoundary, className }: FallbackProps & { className?: string }) {
  return (
    <div className={cn("rounded-lg border border-red-300 bg-red-50 p-6 text-red-900 shadow-sm", className)}>
      <div className="mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="mr-3 h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <h2 className="text-xl font-bold">오류가 발생했습니다</h2>
      </div>

      <p className="mb-4 font-medium">{error.message}</p>

      {error.stack && (
        <details className="mb-4 rounded border border-red-300 bg-red-100 p-3" open={false}>
          <summary className="cursor-pointer font-semibold">스택 트레이스</summary>
          <pre className="mt-2 overflow-x-auto text-sm whitespace-pre-wrap text-red-800">{error.stack}</pre>
        </details>
      )}

      <div className="mt-4 flex justify-end">
        <button
          onClick={resetErrorBoundary}
          className="focus:ring-opacity-50 rounded bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none"
        >
          다시 시도
        </button>
      </div>
    </div>
  );
}

export default ErrorBoundary;
