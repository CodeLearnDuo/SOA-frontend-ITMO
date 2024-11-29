// components/ErrorBoundary.js
import React from 'react';
import { Typography } from '@mui/material';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Обновить состояние при ошибке
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Можно логировать ошибки здесь
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <Typography variant="h6">Something went wrong.</Typography>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
