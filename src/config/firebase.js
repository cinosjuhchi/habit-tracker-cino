/**
 * Konfigurasi Firebase
 * Kredensial diambil dari environment variables untuk keamanan
 */
import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Konfigurasi Firebase dari environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Validasi konfigurasi
const validateConfig = () => {
  const requiredFields = ['apiKey', 'authDomain', 'projectId'];
  const missingFields = requiredFields.filter(field => !firebaseConfig[field]);
  
  if (missingFields.length > 0) {
    console.error(`Firebase config missing: ${missingFields.join(', ')}`);
    console.error('Pastikan file .env sudah dibuat dengan benar. Lihat .env.example');
    return false;
  }
  return true;
};

// Inisialisasi Firebase
let app = null;
let auth = null;
let db = null;
let appCheck = null;

if (validateConfig()) {
  app = initializeApp(firebaseConfig);
  
  // Aktifkan debug token untuk development (localhost)
  if (import.meta.env.DEV) {
    self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
  }
  
  // Inisialisasi App Check dengan reCAPTCHA v3 (opsional)
  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  if (recaptchaSiteKey) {
    try {
      appCheck = initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(recaptchaSiteKey),
        isTokenAutoRefreshEnabled: true
      });
      console.log('[Firebase] App Check initialized');
    } catch (error) {
      console.warn('[Firebase] App Check initialization failed:', error.message);
    }
  } else {
    console.warn('[Firebase] App Check: VITE_RECAPTCHA_SITE_KEY tidak ditemukan di .env');
  }
  
  auth = getAuth(app);
  db = getFirestore(app);
  console.log('[Firebase] Auth and Firestore initialized');
}

// App ID untuk folder database
export const APP_ID = import.meta.env.VITE_APP_ID || 'habit-tracker-cino';

export { app, auth, db, appCheck };
export default firebaseConfig;
