/**
 * Custom hook untuk mengelola data habit dari Firestore
 */
import { useState, useEffect } from 'react';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db, APP_ID } from '../config/firebase';
import { ACTIVITIES } from '../constants';
import { formatDateKey } from '../utils/dateUtils';

export const useHabitData = (user) => {
  const [data, setData] = useState({});
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [syncStatus, setSyncStatus] = useState('synced');
  const [fatalError, setFatalError] = useState(null);

  // Mengambil data secara Real-Time dari Firestore
  useEffect(() => {
    if (!user) {
      console.log('[useHabitData] No user, skipping Firestore');
      setData({});
      setIsDataLoading(false);
      return;
    }

    // Check if db is properly initialized
    if (!db) {
      console.error('[useHabitData] Firestore db is not initialized!');
      setFatalError('Firestore tidak terinisialisasi. Cek konfigurasi Firebase.');
      setIsDataLoading(false);
      return;
    }

    console.log('[useHabitData] Setting up Firestore listener for user:', user.uid);
    console.log('[useHabitData] APP_ID:', APP_ID);
    setIsDataLoading(true);
    const docRef = doc(db, 'artifacts', APP_ID, 'users', user.uid, 'habits', 'tracking_data');
    
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      console.log('[useHabitData] Firestore snapshot received, exists:', docSnap.exists());
      if (docSnap.exists()) {
        setData(docSnap.data().records || {});
      } else {
        setData({});
      }
      setIsDataLoading(false);
      setSyncStatus('synced');
      setFatalError(null);
    }, (error) => {
      console.error("[useHabitData] Firestore error:", error.code, error.message);
      setSyncStatus('error');
      setFatalError(error.code || error.message);
      setIsDataLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Toggle aktivitas dan simpan ke Firestore
  const toggleActivity = async (dateKey, activity) => {
    if (!user) return;
    
    setSyncStatus('syncing');
    
    const newData = {
      ...data,
      [dateKey]: {
        ...(data[dateKey] || {}),
        [activity]: !data[dateKey]?.[activity]
      }
    };
    setData(newData);
    
    try {
      const docRef = doc(db, 'artifacts', APP_ID, 'users', user.uid, 'habits', 'tracking_data');
      await setDoc(docRef, { records: newData }, { merge: true });
      setSyncStatus('synced');
    } catch (error) {
      console.error("Save error:", error);
      setSyncStatus('error');
      alert("Gagal menyimpan ke Cloud! Cek koneksi internet atau Rules Firestore Anda.");
    }
  };

  // Kalkulasi fungsi
  const calculateWeekTotal = (weekObj) => {
    let count = 0;
    ACTIVITIES.forEach(act => {
      weekObj.dates.forEach(date => {
        const key = formatDateKey(date);
        if (data[key]?.[act]) count++;
      });
    });
    return count;
  };

  const calculateTotalAll = (weeks) => {
    return weeks.reduce((sum, week) => sum + calculateWeekTotal(week), 0);
  };

  const getWeeklyStats = (weeks) => {
    return weeks.map(week => ({
      name: week.label,
      total: calculateWeekTotal(week),
      percentage: ((calculateWeekTotal(week) / 70) * 100).toFixed(1)
    }));
  };

  const getActivityTotalAcrossWeeks = (activity, weeks) => {
    let count = 0;
    weeks.forEach(week => {
      week.dates.forEach(date => {
        const key = formatDateKey(date);
        if (data[key]?.[activity]) count++;
      });
    });
    return count;
  };

  return {
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
  };
};
