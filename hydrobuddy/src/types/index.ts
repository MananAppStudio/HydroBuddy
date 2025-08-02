export type PersonalityMode = 'roast' | 'anime' | 'sergeant';

export interface WaterIntakeData {
  id: string;
  amount: number;
  timestamp: Date;
}

export interface DailyGoal {
  target: number; // in ml
  current: number; // in ml
}

export interface PersonalityConfig {
  mode: PersonalityMode;
  name: string;
  avatar: string;
  messages: {
    greeting: string[];
    reminder: string[];
    achievement: string[];
    encouragement: string[];
    warning: string[];
  };
  theme: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
}

export interface UserSettings {
  dailyGoal: number;
  reminderInterval: number; // in minutes
  personalityMode: PersonalityMode;
  notifications: boolean;
}

export interface AppState {
  settings: UserSettings;
  dailyData: WaterIntakeData[];
  lastReminderTime: Date | null;
}