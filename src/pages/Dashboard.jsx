import React, { useState, useMemo } from 'react';

// Hooks
import { useHabitData } from '../hooks/useHabitData';

// Utils
import { generateMonthData, formatDateKey } from '../utils/dateUtils';

// Components
import {
  LoadingScreen,
  ErrorScreen,
  Header,
  WeekTabs,
  WeekView,
  SummaryView
} from '../components';

export default function Dashboard({ user, onLogout }) {
  // Generate data bulan
  const { monthName, weeks, todayKey } = useMemo(() => generateMonthData(), []);

  // Tentukan tab awal berdasarkan minggu saat ini
  const initialTab = useMemo(() => {
    const currentWeek = weeks.find(w => w.dates.some(d => formatDateKey(d) === todayKey));
    return currentWeek ? currentWeek.id : weeks[0].id;
  }, [weeks, todayKey]);

  // State untuk tab aktif
  const [activeTab, setActiveTab] = useState(initialTab);

  const {
    data,
    isDataLoading,
    syncStatus,
    fatalError,
    setFatalError,
    toggleActivity,
    calculateWeekTotal,
    calculateTotalAll,
    getWeeklyStats,
    getActivityTotalAcrossWeeks
  } = useHabitData(user);

  // --- Tampilan Loading Data ---
  if (isDataLoading) {
    return <LoadingScreen />;
  }

  // --- Tampilan Error Fatal ---
  if (fatalError) {
    return (
      <ErrorScreen 
        fatalError={fatalError} 
        onBack={() => {
          setFatalError(null);
        }} 
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
        onLogout={onLogout}
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
