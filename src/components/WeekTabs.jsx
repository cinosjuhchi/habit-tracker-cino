/**
 * Komponen tab navigasi mingguan
 */
import React from 'react';
import { BarChart3 } from 'lucide-react';
import { formatDateKey } from '../utils/dateUtils';

const WeekTabs = ({ 
  weeks, 
  activeTab, 
  setActiveTab, 
  todayKey 
}) => {
  return (
    <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-8 bg-white p-1.5 rounded-xl shadow-sm border border-slate-200">
      {weeks.map((week) => {
        const isCurrentWeek = week.dates.some(d => formatDateKey(d) === todayKey);
        
        return (
          <button
            key={week.id}
            onClick={() => setActiveTab(week.id)}
            className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 relative ${
              activeTab === week.id 
                ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100' 
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <div className="flex flex-col">
              <span className="font-bold flex items-center justify-center gap-1.5">
                {week.label}
                {isCurrentWeek && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]"></span>
                )}
              </span>
              <span className={`text-[10px] mt-0.5 ${
                activeTab === week.id ? 'text-indigo-500' : 'text-slate-400'
              }`}>
                {week.dateRange}
              </span>
            </div>
          </button>
        );
      })}
      <button
        onClick={() => setActiveTab("Summary")}
        className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-lg font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
          activeTab === "Summary" 
            ? 'bg-slate-800 text-white shadow-md' 
            : 'text-slate-600 hover:bg-slate-50 bg-slate-50'
        }`}
      >
        <BarChart3 className="w-5 h-5" />
        Summary
      </button>
    </div>
  );
};

export default WeekTabs;
