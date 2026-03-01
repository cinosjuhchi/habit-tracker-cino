/**
 * Komponen tampilan ringkasan/dashboard
 */
import React from 'react';
import { 
  Target, 
  CalendarDays, 
  Award, 
  TrendingUp, 
  BarChart3, 
  AlertCircle 
} from 'lucide-react';
import { ACTIVITIES, MONTHLY_TARGET } from '../constants';

const SummaryView = ({ 
  monthName, 
  weeks, 
  calculateTotalAll, 
  getWeeklyStats, 
  getActivityTotalAcrossWeeks 
}) => {
  const totalAll = calculateTotalAll(weeks);
  const targetAll = MONTHLY_TARGET;
  const percentageAll = ((totalAll / targetAll) * 100).toFixed(1);
  const weeklyStats = getWeeklyStats(weeks);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Dashboard Ringkasan</h2>
        <p className="text-slate-500">
          Perbandingan progress dan pencapaian selama bulan {monthName}.
        </p>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4 border-l-4 border-l-indigo-500">
          <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm text-slate-500 font-medium">Total Selesai</div>
            <div className="text-2xl font-bold text-slate-800">{totalAll}</div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="p-3 bg-slate-100 text-slate-600 rounded-lg">
            <CalendarDays className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm text-slate-500 font-medium">Target Bulanan</div>
            <div className="text-2xl font-bold text-slate-800">{targetAll}</div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm text-slate-500 font-medium">Persentase</div>
            <div className="text-2xl font-bold text-slate-800">{percentageAll}%</div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm text-slate-500 font-medium">Rata-rata/Minggu</div>
            <div className="text-2xl font-bold text-slate-800">{(totalAll / 4).toFixed(1)}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Mingguan */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-500" />
            Perbandingan Mingguan
          </h3>
          <div className="h-64 flex items-end justify-between gap-2 px-4 pb-2">
            {weeklyStats.map(stat => (
              <div key={stat.name} className="flex flex-col items-center flex-1 group">
                <div className="w-full flex justify-center items-end h-48 bg-slate-50 rounded-t-lg relative">
                  <div 
                    className="w-12 md:w-16 bg-indigo-500 rounded-t-md transition-all duration-700 ease-out flex items-start justify-center pt-2 relative hover:bg-indigo-600 shadow-sm"
                    style={{ height: `${Math.max(stat.percentage, 5)}%` }} 
                  >
                    <span className="absolute -top-6 text-sm font-bold text-slate-600">{stat.total}</span>
                  </div>
                </div>
                <div className="mt-3 text-sm font-semibold text-slate-600 text-center">{stat.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Rincian per Aktivitas */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-indigo-500" />
            Rincian Aktivitas Bulanan
          </h3>
          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {ACTIVITIES.map(activity => {
              const total = getActivityTotalAcrossWeeks(activity, weeks);
              const maxTarget = 28; // 4 minggu * 7 hari
              const pct = ((total / maxTarget) * 100).toFixed(0);
              
              return (
                <div 
                  key={activity} 
                  className="bg-slate-50 rounded-lg p-3 border border-slate-100 hover:border-indigo-200 transition-colors"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-slate-700">{activity}</span>
                    <span className="text-sm font-bold text-slate-600 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                      {total} / 28
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-400 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryView;
