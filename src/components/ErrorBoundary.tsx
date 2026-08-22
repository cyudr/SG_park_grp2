import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn('Caught by App Error Boundary:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#F4F7F5] p-4 text-[#181c1b]">
          <div className="max-w-md w-full bg-white rounded-2xl p-6 shadow-xl border border-[#bdcac0]/40 text-center">
            <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-200">
              <span className="material-symbols-outlined text-[32px]">refresh</span>
            </div>
            <h2 className="text-xl font-bold text-[#005235] mb-2">Singapore Park Weather</h2>
            <p className="text-sm text-[#556258] mb-6">
              A temporary display notice occurred while loading live data.
            </p>
            <button
              onClick={this.handleReset}
              className="w-full py-2.5 px-4 bg-[#006b47] hover:bg-[#005235] text-white rounded-xl font-semibold text-sm transition-all shadow-sm cursor-pointer"
            >
              Reload Live Forecast
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

