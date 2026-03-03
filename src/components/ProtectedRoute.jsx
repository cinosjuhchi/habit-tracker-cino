import React from 'react';
import { Navigate } from 'react-router-dom';
import { LoadingScreen } from './index';

export default function ProtectedRoute({ user, isLoading, children }) {
  // Jika sedang loading, tampilkan loading screen
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Jika belum login, redirect ke halaman login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
