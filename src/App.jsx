import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Hooks
import { useAuth } from './hooks/useAuth';

// Components
import { ProtectedRoute } from './components';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

export default function App() {
  // Custom hooks untuk auth
  const { 
    user, 
    isLoading, 
    loginError, 
    handleGoogleLogin, 
    handleAnonymousLogin, 
    handleLogout 
  } = useAuth();

  return (
    <Routes>
      {/* Route Login */}
      <Route 
        path="/login" 
        element={
          <Login 
            user={user}
            isLoading={isLoading}
            onGoogleLogin={handleGoogleLogin}
            onAnonymousLogin={handleAnonymousLogin}
            loginError={loginError}
          />
        } 
      />

      {/* Route Dashboard (Protected) */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute user={user} isLoading={isLoading}>
            <Dashboard 
              user={user}
              onLogout={handleLogout}
            />
          </ProtectedRoute>
        } 
      />

      {/* Redirect root ke dashboard atau login */}
      <Route 
        path="/" 
        element={
          isLoading ? null : (
            user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
          )
        } 
      />

      {/* Fallback untuk route tidak ditemukan */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}