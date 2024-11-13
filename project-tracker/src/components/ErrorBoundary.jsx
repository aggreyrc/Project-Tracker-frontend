// src/components/ErrorBoundary.jsx
import React from 'react';
import ErrorPage from '../pages/ErrorPage';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state to indicate an error
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Log error details if needed
    console.error("ErrorBoundary caught an error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
