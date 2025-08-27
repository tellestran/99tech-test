
import React from "react";

type State = { hasError: boolean; error?: Error };

export class ErrorBoundary extends React.Component<
    { children: React.ReactNode; fallback?: React.ReactNode },
    State
> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        console.error("Caught by ErrorBoundary:", error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                this.props.fallback ?? (
                    <div className="flex min-h-[200px] items-center justify-center rounded bg-red-900/30 text-red-200">
                        <p>Something went wrong. Please try again later.</p>
                    </div>
                )
            );
        }
        return this.props.children;
    }
}