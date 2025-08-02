import { AppState, UserSettings, WaterIntakeData } from '../types';
import { startOfDay } from 'date-fns';

const STORAGE_KEYS = {
  SETTINGS: 'hydrobuddy_settings',
  DAILY_DATA: 'hydrobuddy_daily_data',
  LAST_REMINDER: 'hydrobuddy_last_reminder'
};

export const defaultSettings: UserSettings = {
  dailyGoal: 2000, // 2 liters
  reminderInterval: 60, // 1 hour
  personalityMode: 'anime',
  notifications: true
};

export const loadSettings = (): UserSettings => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading settings:', error);
  }
  return defaultSettings;
};

export const saveSettings = (settings: UserSettings): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving settings:', error);
  }
};

export const loadDailyData = (): WaterIntakeData[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.DAILY_DATA);
    if (stored) {
      const data = JSON.parse(stored);
      // Filter to only include today's data
      const todayStart = startOfDay(new Date()).getTime();
      return data.filter((item: WaterIntakeData) => 
        new Date(item.timestamp).getTime() >= todayStart
      );
    }
  } catch (error) {
    console.error('Error loading daily data:', error);
  }
  return [];
};

export const saveDailyData = (data: WaterIntakeData[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.DAILY_DATA, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving daily data:', error);
  }
};

export const addWaterIntake = (amount: number): WaterIntakeData => {
  const newIntake: WaterIntakeData = {
    id: Date.now().toString(),
    amount,
    timestamp: new Date()
  };
  
  const currentData = loadDailyData();
  const updatedData = [...currentData, newIntake];
  saveDailyData(updatedData);
  
  return newIntake;
};

export const getTodayTotal = (): number => {
  const data = loadDailyData();
  return data.reduce((total, item) => total + item.amount, 0);
};

export const getLastReminderTime = (): Date | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.LAST_REMINDER);
    if (stored) {
      return new Date(stored);
    }
  } catch (error) {
    console.error('Error loading last reminder time:', error);
  }
  return null;
};

export const saveLastReminderTime = (time: Date): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.LAST_REMINDER, time.toISOString());
  } catch (error) {
    console.error('Error saving last reminder time:', error);
  }
};