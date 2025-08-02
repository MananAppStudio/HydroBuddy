import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PersonalityConfig } from '../types';
import { getRandomMessage } from '../utils/personalities';

interface PersonalityDisplayProps {
  personality: PersonalityConfig;
  currentAmount: number;
  dailyGoal: number;
  lastIntakeTime?: Date;
}

export const PersonalityDisplay: React.FC<PersonalityDisplayProps> = ({
  personality,
  currentAmount,
  dailyGoal,
  lastIntakeTime
}) => {
  const [message, setMessage] = useState('');
  const [messageKey, setMessageKey] = useState(0);

  useEffect(() => {
    // Determine message type based on current state
    let messageType: keyof PersonalityConfig['messages'];
    
    const percentage = (currentAmount / dailyGoal) * 100;
    
    if (currentAmount === 0) {
      messageType = 'greeting';
    } else if (percentage >= 100) {
      messageType = 'achievement';
    } else if (percentage < 30) {
      messageType = 'warning';
    } else if (lastIntakeTime && Date.now() - lastIntakeTime.getTime() > 2 * 60 * 60 * 1000) {
      messageType = 'reminder';
    } else {
      messageType = 'encouragement';
    }

    const newMessage = getRandomMessage(personality, messageType);
    setMessage(newMessage);
    setMessageKey(prev => prev + 1);
  }, [personality, currentAmount, dailyGoal, lastIntakeTime]);

  return (
    <div className="personality-display">
      <motion.div 
        className="avatar-container"
        animate={{ 
          rotate: [0, -5, 5, -5, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3
        }}
      >
        <div className="avatar" style={{ fontSize: '80px' }}>
          {personality.avatar}
        </div>
      </motion.div>

      <div className="personality-info">
        <h2 style={{ color: personality.theme.primary }}>{personality.name}</h2>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={messageKey}
            className="message-bubble"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            style={{
              backgroundColor: personality.theme.secondary + '20',
              borderColor: personality.theme.primary,
              color: personality.theme.text
            }}
          >
            <p>{message}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};