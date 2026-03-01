/**
 * Komponen halaman login
 */
import React from 'react';
import { CalendarDays, ShieldAlert } from 'lucide-react';
import GoogleLogo from './GoogleLogo';

const LoginScreen = ({ 
  onGoogleLogin, 
  onAnonymousLogin, 
  loginError 
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 font-sans p-4">
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl max-w-md w-full text-center border border-white/50 relative overflow-hidden">
        {/* Ornamen Latar */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-blue-50 opacity-50 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 rounded-full bg-indigo-50 opacity-50 blur-2xl"></div>
        
        <div className="relative z-10">
          <div className="w-20 h-20 bg-indigo-600 rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-6 transform -rotate-3 hover:rotate-0 transition-transform">
            <CalendarDays className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Habit Tracker</h1>
          <p className="text-slate-500 mb-8">
            Bangun kebiasaan baikmu mulai hari ini. Masuk untuk menyimpan progress secara otomatis.
          </p>
          
          <div className="space-y-3">
            <button 
              onClick={onGoogleLogin}
              className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-200 hover:border-indigo-600 text-slate-700 font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-md group"
            >
              <GoogleLogo />
              Masuk dengan Google
            </button>

            <button 
              onClick={onAnonymousLogin}
              className="w-full flex items-center justify-center gap-3 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-600 font-semibold py-3 px-6 rounded-xl transition-all duration-300"
            >
              Masuk sebagai Tamu (Mode Anonim)
            </button>
          </div>

          {/* Tampilan Error Khusus Login */}
          {loginError && (
            <div className="mt-6 text-left bg-red-50 p-4 rounded-xl border border-red-100">
              <h4 className="font-bold text-red-800 text-sm flex items-center gap-1.5 mb-2">
                <ShieldAlert className="w-4 h-4" /> Gagal Masuk
              </h4>
              <p className="text-xs text-red-600 font-mono break-all mb-3">
                {loginError.code}
              </p>
              
              {loginError.code === 'auth/unauthorized-domain' && (
                <div className="text-xs text-slate-700">
                  <strong className="text-slate-800">Penyebab:</strong> Domain tempat aplikasi ini berjalan belum diizinkan oleh Firebase.<br/><br/>
                  <strong className="text-slate-800">Solusi:</strong> Tambahkan domain berikut ini:<br/>
                  <code className="bg-slate-200 p-1 rounded font-bold block mt-1 break-all text-indigo-700">
                    {window.location.hostname}
                  </code>
                  <br/>ke menu <strong>Authentication &gt; Settings &gt; Authorized domains</strong> di dashboard Firebase-mu.
                </div>
              )}

              {loginError.code === 'auth/popup-closed-by-user' && (
                <div className="text-xs text-slate-700">
                  <strong className="text-slate-800">Penyebab:</strong> Popup login ditutup atau diblokir oleh browser di dalam lingkungan layar *preview* ini.<br/><br/>
                  <strong className="text-slate-800">Solusi sementara:</strong> Gunakan tombol <strong>"Masuk sebagai Tamu"</strong> di atas untuk mencoba aplikasinya di layar ini.
                </div>
              )}
            </div>
          )}
          
          <p className="text-xs text-slate-400 mt-8">
            Data Anda akan diamankan dengan enkripsi Firebase Cloud Database.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
