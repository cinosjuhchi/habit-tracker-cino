/**
 * Utilitas untuk menentukan status aktivitas
 */

/**
 * Menentukan status berdasarkan jumlah hari yang diselesaikan
 * @param {number} completedDays - Jumlah hari yang sudah selesai
 * @returns {Object} { label, color, bg }
 */
export const getStatus = (completedDays) => {
  if (completedDays === 0) {
    return { 
      label: "✗ Belum Mulai", 
      color: "text-red-500", 
      bg: "bg-red-100" 
    };
  }
  if (completedDays >= 1 && completedDays <= 3) {
    return { 
      label: "△ Perlu Usaha", 
      color: "text-orange-500", 
      bg: "bg-orange-100" 
    };
  }
  if (completedDays >= 4 && completedDays <= 5) {
    return { 
      label: "○ Bagus", 
      color: "text-blue-500", 
      bg: "bg-blue-100" 
    };
  }
  return { 
    label: "✓ Luar Biasa", 
    color: "text-emerald-500", 
    bg: "bg-emerald-100" 
  };
};
