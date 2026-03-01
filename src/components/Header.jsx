/**
 * Komponen header aplikasi
 */
import React from 'react';
import { CalendarDays, Clock, Cloud, CloudOff, Loader2, LogOut } from 'lucide-react';

const Header = ({ 
  monthName, 
  user, 
  syncStatus, 
  onLogout 
}) => {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-md shadow-inner">
              <CalendarDays className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                Personal Habit Tracker
              </h1>
              <p className="text-indigo-100 text-sm mt-1 flex items-center gap-1.5 opacity-90">
                <Clock className="w-4 h-4" /> 
                Periode: <strong className="font-semibold">{monthName}</strong>
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Profil User */}
            <div className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/20 flex items-center gap-3">
              {user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full border-2 border-indigo-300" 
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-indigo-500 border-2 border-indigo-300 flex items-center justify-center font-bold text-sm">
                  {user.displayName ? user.displayName.charAt(0).toUpperCase() : '?'}
                </div>
              )}
              
              <div className="flex flex-col">
                <span className="font-bold text-sm leading-tight">
                  {user.displayName || 'Pengguna'}
                </span>
                
                {/* Indikator Status Cloud Database */}
                <div className="flex items-center gap-1 mt-0.5 text-[10px] font-medium opacity-80">
                  {syncStatus === 'syncing' && (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin text-yellow-300"/>
                      <span className="text-yellow-100">Menyinkronkan</span>
                    </>
                  )}
                  {syncStatus === 'synced' && (
                    <>
                      <Cloud className="w-3 h-3 text-emerald-300"/>
                      <span className="text-emerald-100">Tersimpan</span>
                    </>
                  )}
                  {syncStatus === 'error' && (
                    <>
                      <CloudOff className="w-3 h-3 text-red-300"/>
                      <span className="text-red-100">Error</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {/* Tombol Logout */}
            <button 
              onClick={onLogout}
              title="Keluar / Logout"
              className="p-2.5 bg-white/10 hover:bg-red-500/80 rounded-lg backdrop-blur-sm border border-white/20 transition-colors text-white"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
