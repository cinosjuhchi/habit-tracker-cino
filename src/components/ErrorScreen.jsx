/**
 * Komponen tampilan error fatal
 */
import React, { useState } from 'react';
import { ShieldAlert, Copy, Check } from 'lucide-react';

const ErrorScreen = ({ fatalError, onBack }) => {
  const [copied, setCopied] = useState(false);
  
  const isAuthError = fatalError.includes('auth/');
  const isDbError = fatalError.includes('permission-denied') || fatalError.includes('Missing or insufficient permissions');

  const handleCopyRules = () => {
    const rulesText = `rules_version = '2';\nservice cloud.firestore {\n  match /databases/{database}/documents {\n    match /{document=**} {\n      allow read, write: if true;\n    }\n  }\n}`;
    navigator.clipboard.writeText(rulesText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 font-sans p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-xl w-full border-t-8 border-red-500">
        <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">
          Terjadi Kendala Konfigurasi
        </h2>
        <p className="text-slate-600 mb-6 text-center text-sm">
          Ada pengaturan Firebase yang perlu disesuaikan.
        </p>
        
        <div className="text-left bg-slate-50 p-6 rounded-xl border border-slate-200">
          <h3 className="font-bold text-slate-800 mb-4 text-lg">
            🔧 Cara Cepat Memperbaikinya:
          </h3>
          
          {isAuthError && (
            <div className="space-y-4">
              <p className="text-sm font-medium text-slate-700">
                Sepertinya Anda belum mengaktifkan Google Sign-In di Firebase:
              </p>
              <ol className="list-decimal list-outside ml-4 text-slate-700 space-y-3 font-medium text-sm">
                <li>Buka dashboard Firebase Anda.</li>
                <li>Masuk ke menu <strong>Authentication</strong>.</li>
                <li>Pilih tab <strong>Sign-in method</strong>.</li>
                <li>Klik tombol <strong>Add new provider</strong> (Tambah penyedia baru).</li>
                <li>Pilih <strong>Google</strong>.</li>
                <li>Aktifkan saklarnya (Enable), isi "Project support email" dengan email Anda.</li>
                <li>Klik <strong>Save</strong> (Simpan).</li>
              </ol>
            </div>
          )}

          {isDbError && (
            <div className="space-y-4">
              <ol className="list-decimal list-outside ml-4 text-slate-700 space-y-2 text-sm font-medium">
                <li>Buka dashboard Firebase Anda dan masuk ke menu <strong>Firestore Database</strong>.</li>
                <li>Pilih tab <strong>Rules</strong> (Aturan).</li>
                <li>Hapus semua teks yang ada di sana, dan <strong>Copy-Paste teks di bawah ini</strong>:</li>
              </ol>
              
              <div className="relative mt-2">
                <div className="bg-slate-900 text-emerald-400 p-4 rounded-lg text-sm font-mono whitespace-pre overflow-x-auto shadow-inner border border-slate-800">
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}`}
                </div>
                <button 
                  onClick={handleCopyRules}
                  className="absolute top-3 right-3 bg-white/10 hover:bg-white/20 text-white p-1.5 rounded-md transition-colors flex items-center gap-1 text-xs font-sans backdrop-blur-sm"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Tersalin!' : 'Copy'}
                </button>
              </div>
              
              <p className="text-sm text-slate-700 font-medium">
                4. Terakhir, klik tombol <strong>Publish</strong>.
              </p>
            </div>
          )}
          
          {(!isAuthError && !isDbError) && (
            <div className="bg-red-50 text-red-800 p-3 rounded-lg text-xs font-mono mb-4 break-all">
              {fatalError}
            </div>
          )}

          <button 
            onClick={onBack}
            className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorScreen;
