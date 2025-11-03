import { Component, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  fallback: React.ComponentType<{ message?: string; stack?: string }>;
};

type State = {
  error: Error | null;
};

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };
  static getDerivedStateFromError(error: Error): Partial<State> {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { children, fallback: Fallback } = this.props;

    if (error) {
      return <Fallback message={error.message} stack={error.stack} />;
    }

    return children;
  }
}
