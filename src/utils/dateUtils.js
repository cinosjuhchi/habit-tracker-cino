/**
 * Utilitas untuk manipulasi tanggal
 */
import { MONTHS, SHORT_MONTHS } from '../constants';

/**
 * Format tanggal menjadi key string (YYYY-MM-DD)
 * @param {Date} date - Objek tanggal
 * @returns {string} Format YYYY-MM-DD
 */
export const formatDateKey = (date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

/**
 * Generate data bulan saat ini dengan 4 minggu
 * @returns {Object} { monthName, weeks, todayKey }
 */
export const generateMonthData = () => {
  const now = new Date();
  const monthName = `${MONTHS[now.getMonth()]} ${now.getFullYear()}`;
  
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const day = startOfMonth.getDay();
  const diff = startOfMonth.getDate() - day + (day === 0 ? -6 : 1);
  const firstMonday = new Date(startOfMonth.setDate(diff));

  const weeks = [];
  for (let w = 0; w < 4; w++) {
    const weekDates = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(firstMonday);
      date.setDate(firstMonday.getDate() + (w * 7) + d);
      weekDates.push(date);
    }
    
    const firstDay = weekDates[0];
    const lastDay = weekDates[6];
    const dateRange = `${firstDay.getDate()} ${SHORT_MONTHS[firstDay.getMonth()]} - ${lastDay.getDate()} ${SHORT_MONTHS[lastDay.getMonth()]}`;

    weeks.push({
      id: `Minggu ${w + 1}`,
      label: `Minggu ${w + 1}`,
      dateRange: dateRange,
      dates: weekDates
    });
  }
  
  return { monthName, weeks, todayKey: formatDateKey(now) };
};
