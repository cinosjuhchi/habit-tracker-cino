/**
 * Komponen tampilan loading
 */
import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 font-sans">
      <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mb-4" />
      <h2 className="text-xl font-bold text-slate-800">Menyiapkan Aplikasi...</h2>
      <p className="text-slate-500 mt-2">Tunggu sebentar ya, Cino!</p>
    </div>
  );
};

export default LoadingScreen;
