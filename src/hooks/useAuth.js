/**
 * Custom hook untuk autentikasi Firebase
 */
import { useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInAnonymously,
  signOut 
} from 'firebase/auth';
import { auth } from '../config/firebase';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loginError, setLoginError] = useState(null);

  // Pantau status login pengguna
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Login dengan Google
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setLoginError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login Error:", error);
      setLoginError({ code: error.code, message: error.message });
      setIsLoading(false);
    }
  };

  // Login Anonim
  const handleAnonymousLogin = async () => {
    setIsLoading(true);
    setLoginError(null);
    try {
      await signInAnonymously(auth);
    } catch (error) {
      console.error("Anon Login Error:", error);
      setLoginError({ code: error.code, message: error.message });
      setIsLoading(false);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return {
    user,
    isLoading,
    setIsLoading,
    loginError,
    handleGoogleLogin,
    handleAnonymousLogin,
    handleLogout
  };
};
