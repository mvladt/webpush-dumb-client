import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { error: null };
  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { children, fallback } = this.props;

    const ErrorFallback = fallback;

    if (error) {
      return <ErrorFallback message={error.message} stack={error.stack} />;
    }

    return children;
  }
}
