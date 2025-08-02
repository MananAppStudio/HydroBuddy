import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Settings as SettingsIcon } from 'lucide-react';
import './App.css';

import { WaterTracker } from './components/WaterTracker';
import { PersonalityDisplay } from './components/PersonalityDisplay';
import { Settings } from './components/Settings';
import { Confetti } from './components/Confetti';

import { UserSettings, WaterIntakeData } from './types';
import { getPersonality } from './utils/personalities';
import { 
  loadSettings, 
  saveSettings, 
  loadDailyData, 
  addWaterIntake,
  getTodayTotal 
} from './utils/storage';
import { useNotifications } from './hooks/useNotifications';
import { playWaterSound, playAchievementSound } from './utils/sounds';

function App() {
  const [settings, setSettings] = useState<UserSettings>(loadSettings());
  const [dailyData, setDailyData] = useState<WaterIntakeData[]>(loadDailyData());
  const [currentTotal, setCurrentTotal] = useState(getTodayTotal());
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const personality = getPersonality(settings.personalityMode);
  
  // Use notifications hook
  useNotifications(
    settings.notifications,
    settings.reminderInterval,
    personality
  );

  // Update theme based on personality
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', personality.theme.primary);
    root.style.setProperty('--secondary-color', personality.theme.secondary);
    root.style.setProperty('--background-color', personality.theme.background);
    root.style.setProperty('--text-color', personality.theme.text);
    root.style.setProperty('--accent-color', personality.theme.accent);
    
    document.body.style.backgroundColor = personality.theme.background;
    document.body.style.color = personality.theme.text;
  }, [personality]);

  // Handle adding water
  const handleAddWater = (amount: number) => {
    const newIntake = addWaterIntake(amount);
    const updatedData = [...dailyData, newIntake];
    const newTotal = currentTotal + amount;
    
    setDailyData(updatedData);
    setCurrentTotal(newTotal);
    
    // Play sound effects
    try {
      playWaterSound();
      
      // Check if goal is achieved
      if (currentTotal < settings.dailyGoal && newTotal >= settings.dailyGoal) {
        setTimeout(() => {
          playAchievementSound();
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 100);
        }, 300);
      }
    } catch (error) {
      console.log('Sound playback failed:', error);
    }
  };

  // Handle settings change
  const handleSettingsChange = (newSettings: UserSettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  // Get last intake time
  const lastIntakeTime = dailyData.length > 0 
    ? new Date(dailyData[dailyData.length - 1].timestamp)
    : undefined;

  return (
    <div className="app" style={{ minHeight: '100vh' }}>
      <Confetti isActive={showConfetti} />
      
      <header className="app-header">
        <h1>HydroBuddy</h1>
        <button 
          className="settings-btn"
          onClick={() => setSettingsOpen(true)}
          style={{ color: personality.theme.primary }}
        >
          <SettingsIcon size={24} />
        </button>
      </header>

      <main className="app-main">
        <PersonalityDisplay
          personality={personality}
          currentAmount={currentTotal}
          dailyGoal={settings.dailyGoal}
          lastIntakeTime={lastIntakeTime}
        />

        <WaterTracker
          currentAmount={currentTotal}
          dailyGoal={settings.dailyGoal}
          personality={personality}
          onAddWater={handleAddWater}
        />
      </main>

      <AnimatePresence>
        {settingsOpen && (
          <Settings
            settings={settings}
            onSettingsChange={handleSettingsChange}
            isOpen={settingsOpen}
            onClose={() => setSettingsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
