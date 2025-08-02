import { useEffect, useCallback, useRef } from 'react';
import { PersonalityConfig } from '../types';
import { getRandomMessage } from '../utils/personalities';
import { getLastReminderTime, saveLastReminderTime } from '../utils/storage';

export const useNotifications = (
  enabled: boolean,
  intervalMinutes: number,
  personality: PersonalityConfig
) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }

    return false;
  }, []);

  const sendNotification = useCallback(async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission || !enabled) return;

    const message = getRandomMessage(personality, 'reminder');
    
    new Notification(`${personality.avatar} ${personality.name}`, {
      body: message,
      icon: '/water-icon.svg',
      badge: '/water-icon.svg',
      tag: 'water-reminder',
      requireInteraction: true
    });

    saveLastReminderTime(new Date());
  }, [enabled, personality, requestPermission]);

  const checkAndSendReminder = useCallback(() => {
    const lastReminder = getLastReminderTime();
    const now = new Date();
    
    if (!lastReminder) {
      // First time, just save current time
      saveLastReminderTime(now);
      return;
    }

    const timeDiff = now.getTime() - lastReminder.getTime();
    const minutesPassed = timeDiff / (1000 * 60);

    if (minutesPassed >= intervalMinutes) {
      sendNotification();
    }
  }, [intervalMinutes, sendNotification]);

  useEffect(() => {
    if (!enabled) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Check immediately when enabled
    checkAndSendReminder();

    // Set up interval
    intervalRef.current = setInterval(() => {
      checkAndSendReminder();
    }, 60000); // Check every minute

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [enabled, checkAndSendReminder]);

  return {
    requestPermission,
    sendNotification
  };
};