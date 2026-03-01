# 📅 Personal Habit Tracker

Aplikasi pelacak kebiasaan harian yang dibangun dengan React + Vite dan terintegrasi dengan Firebase untuk penyimpanan cloud secara real-time.

## ✨ Fitur

- 📊 Pelacakan 10 kebiasaan harian
- 📆 Tampilan mingguan dan ringkasan bulanan
- ☁️ Sinkronisasi real-time dengan Firebase Cloud
- 🔐 Autentikasi Google dan mode anonim
- 📱 Desain responsif dengan Tailwind CSS

## 🏗️ Struktur Proyek

```
src/
├── components/          # Komponen React
│   ├── ErrorScreen.jsx
│   ├── GoogleLogo.jsx
│   ├── Header.jsx
│   ├── LoadingScreen.jsx
│   ├── LoginScreen.jsx
│   ├── SummaryView.jsx
│   ├── WeekTabs.jsx
│   ├── WeekView.jsx
│   └── index.js         # Barrel export
├── config/
│   └── firebase.js      # Konfigurasi Firebase (aman)
├── constants/
│   └── index.js         # Konstanta aplikasi
├── hooks/
│   ├── useAuth.js       # Hook autentikasi
│   └── useHabitData.js  # Hook data habit
├── utils/
│   ├── dateUtils.js     # Utilitas tanggal
│   └── statusUtils.js   # Utilitas status
└── App.jsx              # Komponen utama
```

## 🔒 Keamanan Firebase

Kredensial Firebase disimpan dalam file `.env` yang **TIDAK boleh di-commit ke Git**.

### Setup Environment Variables

1. Copy file `.env.example` menjadi `.env`:
   ```bash
   cp .env.example .env
   ```

2. Isi dengan kredensial Firebase Anda:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   VITE_APP_ID=habit-tracker-cino
   ```

## 🚀 Menjalankan Aplikasi

```bash
# Install dependencies
npm install

# Development
npm run dev

# Build untuk production
npm run build

# Preview production build
npm run preview
```

## 📝 Catatan Penting

- File `.env` sudah ditambahkan ke `.gitignore` untuk keamanan
- Gunakan `.env.example` sebagai template untuk environment variables
- Pastikan Firebase Authentication dan Firestore sudah dikonfigurasi dengan benar

---

Dibangun dengan ❤️ menggunakan React + Vite + Firebase + Tailwind CSS
