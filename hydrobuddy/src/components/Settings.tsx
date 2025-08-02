import React from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, X, Bell, Target, Clock } from 'lucide-react';
import { UserSettings, PersonalityMode } from '../types';
import { personalities } from '../utils/personalities';

interface SettingsProps {
  settings: UserSettings;
  onSettingsChange: (settings: UserSettings) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Settings: React.FC<SettingsProps> = ({
  settings,
  onSettingsChange,
  isOpen,
  onClose
}) => {
  const handleChange = (key: keyof UserSettings, value: any) => {
    onSettingsChange({
      ...settings,
      [key]: value
    });
  };

  if (!isOpen) return null;

  return (
    <motion.div 
      className="settings-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="settings-panel"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="settings-header">
          <h2><SettingsIcon size={24} /> Settings</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="settings-content">
          <div className="setting-group">
            <label>
              <Target size={20} />
              <span>Daily Goal (ml)</span>
            </label>
            <input
              type="number"
              value={settings.dailyGoal}
              onChange={(e) => handleChange('dailyGoal', Number(e.target.value))}
              min="500"
              max="5000"
              step="250"
            />
          </div>

          <div className="setting-group">
            <label>
              <Clock size={20} />
              <span>Reminder Interval (minutes)</span>
            </label>
            <input
              type="number"
              value={settings.reminderInterval}
              onChange={(e) => handleChange('reminderInterval', Number(e.target.value))}
              min="15"
              max="240"
              step="15"
            />
          </div>

          <div className="setting-group">
            <label>
              <Bell size={20} />
              <span>Enable Notifications</span>
            </label>
            <label className="switch">
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => handleChange('notifications', e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="setting-group personality-selector">
            <label>Choose Your Personality</label>
            <div className="personality-options">
              {(Object.keys(personalities) as PersonalityMode[]).map((mode) => {
                const personality = personalities[mode];
                return (
                  <motion.div
                    key={mode}
                    className={`personality-option ${settings.personalityMode === mode ? 'active' : ''}`}
                    onClick={() => handleChange('personalityMode', mode)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      borderColor: settings.personalityMode === mode ? personality.theme.primary : '#ccc',
                      backgroundColor: settings.personalityMode === mode ? personality.theme.primary + '20' : 'transparent'
                    }}
                  >
                    <div className="personality-avatar">{personality.avatar}</div>
                    <h4>{personality.name}</h4>
                    <p>{mode.charAt(0).toUpperCase() + mode.slice(1)} Mode</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};