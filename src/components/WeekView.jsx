/**
 * Komponen tampilan mingguan dengan tabel aktivitas
 */
import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { ACTIVITIES, DAY_NAMES, SHORT_MONTHS } from '../constants';
import { formatDateKey } from '../utils/dateUtils';
import { getStatus } from '../utils/statusUtils';

const WeekView = ({ 
  weekObj, 
  todayKey, 
  data, 
  syncStatus, 
  onToggleActivity,
  calculateWeekTotal 
}) => {
  const weekTotal = calculateWeekTotal(weekObj);
  const weekPercentage = ((weekTotal / 70) * 100).toFixed(1);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            {weekObj.label} 
            <span className="text-sm font-medium px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full">
              {weekObj.dateRange}
            </span>
          </h2>
          <p className="text-slate-500 mt-1">
            Klik lingkaran pada tanggal yang sesuai. Data langsung tersimpan di awan!
          </p>
        </div>
        <div className="text-left md:text-right bg-white p-3 rounded-lg border border-slate-200 shadow-sm w-full md:w-auto">
          <div className="text-sm text-slate-500 font-medium mb-1">Progress {weekObj.label}</div>
          <div className="flex items-center gap-3">
            <div className="w-full md:w-32 h-3 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${weekPercentage}%` }}
              ></div>
            </div>
            <span className="font-bold text-indigo-600">{weekPercentage}%</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 font-semibold text-slate-700 sticky left-0 bg-slate-50 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                Aktivitas
              </th>
              {weekObj.dates.map(date => {
                const dateKey = formatDateKey(date);
                const isToday = dateKey === todayKey;
                
                return (
                  <th 
                    key={dateKey} 
                    className={`p-3 font-semibold text-center w-20 border-b-2 ${
                      isToday ? 'border-b-indigo-500 bg-indigo-50' : 'border-b-transparent text-slate-700'
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <span className={`text-xs ${isToday ? 'text-indigo-600 font-bold' : 'text-slate-500'}`}>
                        {DAY_NAMES[date.getDay()]}
                      </span>
                      <span className={`text-lg ${isToday ? 'text-indigo-700 font-black' : 'text-slate-800'}`}>
                        {date.getDate()}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {SHORT_MONTHS[date.getMonth()]}
                      </span>
                    </div>
                  </th>
                );
              })}
              <th className="p-4 font-semibold text-slate-700 text-center w-24">Progress</th>
              <th className="p-4 font-semibold text-slate-700 w-36">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {ACTIVITIES.map(activity => {
              const completedInWeek = weekObj.dates.filter(
                date => data[formatDateKey(date)]?.[activity]
              ).length;
              const status = getStatus(completedInWeek);
              const progressPct = ((completedInWeek / 7) * 100).toFixed(0);

              return (
                <tr key={activity} className="hover:bg-slate-50 transition-colors group">
                  <td className="p-4 font-medium text-slate-800 sticky left-0 bg-white group-hover:bg-slate-50 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                    {activity}
                  </td>
                  {weekObj.dates.map(date => {
                    const dateKey = formatDateKey(date);
                    const isToday = dateKey === todayKey;
                    const isDone = data[dateKey]?.[activity] || false;
                    
                    return (
                      <td key={dateKey} className={`p-4 text-center ${isToday ? 'bg-indigo-50/30' : ''}`}>
                        <button 
                          onClick={() => onToggleActivity(dateKey, activity)}
                          className="focus:outline-none hover:scale-110 transition-transform p-1 disabled:opacity-50"
                          title={`Tandai ${activity} untuk ${dateKey}`}
                          disabled={syncStatus === 'syncing'}
                        >
                          {isDone ? (
                            <CheckCircle2 className="w-7 h-7 text-emerald-500 mx-auto drop-shadow-sm" />
                          ) : (
                            <Circle className={`w-7 h-7 mx-auto ${isToday ? 'text-indigo-300' : 'text-slate-200'}`} />
                          )}
                        </button>
                      </td>
                    );
                  })}
                  <td className="p-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-xs font-bold text-slate-600">{completedInWeek}/7</span>
                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all ${completedInWeek > 0 ? 'bg-indigo-400' : ''}`}
                          style={{ width: `${progressPct}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold w-full justify-center ${status.bg} ${status.color}`}>
                      {status.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeekView;
