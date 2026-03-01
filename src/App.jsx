/**
 * Habit Tracker - Personal Habit Tracking Application
 * Main App Component (Modular Version)
 */
import React, { useState, useMemo } from 'react';

// Hooks
import { useAuth } from './hooks/useAuth';
import { useHabitData } from './hooks/useHabitData';

// Utils
import { generateMonthData, formatDateKey } from './utils/dateUtils';

// Components
import {
  LoadingScreen,
  ErrorScreen,
  LoginScreen,
  Header,
  WeekTabs,
  WeekView,
  SummaryView
} from './components';

export default function App() {
  // Generate data bulan
  const { monthName, weeks, todayKey } = useMemo(() => generateMonthData(), []);

  // Tentukan tab awal berdasarkan minggu saat ini
  const initialTab = useMemo(() => {
    const currentWeek = weeks.find(w => w.dates.some(d => formatDateKey(d) === todayKey));
    return currentWeek ? currentWeek.id : weeks[0].id;
  }, [weeks, todayKey]);

  // State untuk tab aktif
  const [activeTab, setActiveTab] = useState(initialTab);

  // Custom hooks untuk auth dan data
  const { 
    user, 
    isLoading, 
    setIsLoading,
    loginError, 
    handleGoogleLogin, 
    handleAnonymousLogin, 
    handleLogout 
  } = useAuth();

  const {
    data,
    syncStatus,
    fatalError,
    setFatalError,
    toggleActivity,
    calculateWeekTotal,
    calculateTotalAll,
    getWeeklyStats,
    getActivityTotalAcrossWeeks
  } = useHabitData(user, setIsLoading);

  // --- Tampilan Error Fatal ---
  if (fatalError) {
    return (
      <ErrorScreen 
        fatalError={fatalError} 
        onBack={() => {
          setFatalError(null);
          setIsLoading(false);
        }} 
      />
    );
  }

  // --- Tampilan Loading ---
  if (isLoading) {
    return <LoadingScreen />;
  }

  // --- Tampilan Login ---
  if (!user) {
    return (
      <LoginScreen 
        onGoogleLogin={handleGoogleLogin}
        onAnonymousLogin={handleAnonymousLogin}
        loginError={loginError}
      />
    );
  }

  // --- Tampilan Utama ---
  const activeWeekObj = weeks.find(w => w.id === activeTab);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans selection:bg-indigo-200 pb-10">
      {/* Header */}
      <Header 
        monthName={monthName}
        user={user}
        syncStatus={syncStatus}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <WeekTabs 
          weeks={weeks}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          todayKey={todayKey}
        />

        {/* Dynamic Content Area */}
        {activeWeekObj ? (
          <WeekView 
            weekObj={activeWeekObj}
            todayKey={todayKey}
            data={data}
            syncStatus={syncStatus}
            onToggleActivity={toggleActivity}
            calculateWeekTotal={calculateWeekTotal}
          />
        ) : (
          <SummaryView 
            monthName={monthName}
            weeks={weeks}
            calculateTotalAll={calculateTotalAll}
            getWeeklyStats={getWeeklyStats}
            getActivityTotalAcrossWeeks={getActivityTotalAcrossWeeks}
          />
        )}
      </main>
    </div>
  );
}