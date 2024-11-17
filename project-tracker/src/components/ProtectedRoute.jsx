// src/components/ProtectedRoute.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);

  // If the user is authenticated, render the child components
  if (isAuthenticated) {
    return children;
  }

  // If the user is not authenticated, redirect to the home page
  return <Navigate to="/" />;
}
