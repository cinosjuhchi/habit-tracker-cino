import React from 'react';
import { Navigate } from 'react-router-dom';
import { LoginScreen, LoadingScreen } from '../components';

export default function Login({ 
  user, 
  isLoading,
  onGoogleLogin, 
  onAnonymousLogin, 
  loginError 
}) {
  // Jika sedang loading, tampilkan loading screen
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Jika sudah login, redirect ke dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <LoginScreen 
      onGoogleLogin={onGoogleLogin}
      onAnonymousLogin={onAnonymousLogin}
      loginError={loginError}
    />
  );
}
