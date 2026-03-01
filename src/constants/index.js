/**
 * Konstanta aplikasi Habit Tracker
 */

// Daftar aktivitas yang dilacak
export const ACTIVITIES = [
  "Belajar / Studi",
  "Baca Buku",
  "Olahraga",
  "Jogging",
  "Meditasi",
  "Minum Air 2L",
  "Tidur Cukup 8 Jam",
  "Makan Sehat",
  "Review Target Harian",
  "Quality Time Keluarga"
];

// Nama bulan dalam Bahasa Indonesia
export const MONTHS = [
  "Januari", "Februari", "Maret", "April", 
  "Mei", "Juni", "Juli", "Agustus", 
  "September", "Oktober", "November", "Desember"
];

// Nama bulan singkat
export const SHORT_MONTHS = [
  "Jan", "Feb", "Mar", "Apr", 
  "Mei", "Jun", "Jul", "Ags", 
  "Sep", "Okt", "Nov", "Des"
];

// Nama hari singkat
export const DAY_NAMES = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

// Target per minggu dan bulan
export const WEEKLY_TARGET = 70; // 10 aktivitas * 7 hari
export const MONTHLY_TARGET = 280; // 4 minggu * 70
