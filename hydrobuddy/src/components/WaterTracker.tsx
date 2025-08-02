import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { motion } from 'framer-motion';
import { Droplets, Plus } from 'lucide-react';
import { PersonalityConfig } from '../types';

interface WaterTrackerProps {
  currentAmount: number;
  dailyGoal: number;
  personality: PersonalityConfig;
  onAddWater: (amount: number) => void;
}

const quickAddAmounts = [200, 250, 500, 750];

export const WaterTracker: React.FC<WaterTrackerProps> = ({
  currentAmount,
  dailyGoal,
  personality,
  onAddWater
}) => {
  const percentage = Math.min((currentAmount / dailyGoal) * 100, 100);

  return (
    <div className="water-tracker">
      <motion.div 
        className="progress-container"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <CircularProgressbar
          value={percentage}
          text={`${currentAmount}ml`}
          styles={buildStyles({
            rotation: 0.25,
            strokeLinecap: 'round',
            textSize: '16px',
            pathTransitionDuration: 0.5,
            pathColor: personality.theme.primary,
            textColor: personality.theme.text,
            trailColor: personality.theme.secondary + '30',
            backgroundColor: personality.theme.background,
          })}
        />
        <div className="goal-text">
          Goal: {dailyGoal}ml
        </div>
      </motion.div>

      <div className="quick-add-section">
        <h3>Quick Add</h3>
        <div className="quick-add-buttons">
          {quickAddAmounts.map((amount) => (
            <motion.button
              key={amount}
              className="quick-add-btn"
              onClick={() => onAddWater(amount)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                backgroundColor: personality.theme.primary,
                color: personality.theme.background
              }}
            >
              <Droplets size={16} />
              <span>{amount}ml</span>
            </motion.button>
          ))}
        </div>
        
        <motion.button
          className="custom-add-btn"
          onClick={() => {
            const amount = prompt('Enter custom amount (ml):');
            if (amount && !isNaN(Number(amount))) {
              onAddWater(Number(amount));
            }
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            backgroundColor: personality.theme.secondary,
            color: personality.theme.text
          }}
        >
          <Plus size={20} />
          <span>Custom Amount</span>
        </motion.button>
      </div>
    </div>
  );
};