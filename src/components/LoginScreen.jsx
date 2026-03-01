/**
 * Komponen halaman login
 */
import React, { useState } from 'react';
import { CalendarDays, ShieldAlert, ShieldCheck, Loader2 } from 'lucide-react';
import GoogleLogo from './GoogleLogo';

const LoginScreen = ({ 
  onGoogleLogin, 
  onAnonymousLogin, 
  loginError 
}) => {
  const [isVerified, setIsVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState(null);

  const handleVerify = async () => {
    setIsVerifying(true);
    setVerifyError(null);
    
    try {
      // Pastikan grecaptcha sudah dimuat
      if (typeof window.grecaptcha === 'undefined') {
        throw new Error('reCAPTCHA belum dimuat. Refresh halaman.');
      }

      await window.grecaptcha.ready(async () => {
        try {
          const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
          const token = await window.grecaptcha.execute(siteKey, { action: 'login' });
          
          if (token) {
            setIsVerified(true);
            setIsVerifying(false);
          } else {
            throw new Error('Verifikasi gagal');
          }
        } catch (err) {
          setVerifyError('Gagal verifikasi. Coba lagi.');
          setIsVerifying(false);
        }
      });
    } catch (err) {
      setVerifyError(err.message || 'Gagal verifikasi. Coba lagi.');
      setIsVerifying(false);
    }
  };

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
          <p className="text-slate-500 mb-6">
            Bangun kebiasaan baikmu mulai hari ini. Masuk untuk menyimpan progress secara otomatis.
          </p>

          {/* Verifikasi reCAPTCHA */}
          <div className="mb-6">
            {!isVerified ? (
              <div className="space-y-3">
                <button
                  onClick={handleVerify}
                  disabled={isVerifying}
                  className={`w-full flex items-center justify-center gap-3 py-3 px-6 rounded-xl font-bold transition-all duration-300 ${
                    isVerifying
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-emerald-50 border-2 border-emerald-200 hover:border-emerald-500 text-emerald-700 hover:shadow-md'
                  }`}
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Memverifikasi...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-5 h-5" />
                      Verifikasi Saya Bukan Robot
                    </>
                  )}
                </button>
                
                {verifyError && (
                  <p className="text-xs text-red-500 font-medium">{verifyError}</p>
                )}
                
                <p className="text-xs text-slate-400">
                  Klik tombol di atas untuk memverifikasi sebelum login
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 py-3 px-6 bg-emerald-100 text-emerald-700 rounded-xl font-bold">
                <ShieldCheck className="w-5 h-5" />
                Terverifikasi! Silakan login.
              </div>
            )}
          </div>
          
          <div className="space-y-3">
            <button 
              onClick={onGoogleLogin}
              disabled={!isVerified}
              className={`w-full flex items-center justify-center gap-3 py-3 px-6 rounded-xl font-bold transition-all duration-300 ${
                isVerified
                  ? 'bg-white border-2 border-slate-200 hover:border-indigo-600 text-slate-700 hover:shadow-md group'
                  : 'bg-slate-100 border-2 border-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <GoogleLogo className={`w-5 h-5 ${isVerified ? 'group-hover:scale-110' : ''} transition-transform`} />
              Masuk dengan Google
            </button>

            <button 
              onClick={onAnonymousLogin}
              disabled={!isVerified}
              className={`w-full flex items-center justify-center gap-3 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                isVerified
                  ? 'bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-600'
                  : 'bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed'
              }`}
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
            Dilindungi oleh reCAPTCHA &amp; Firebase Cloud Database.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
