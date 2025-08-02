import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  delay: number;
  duration: number;
}

interface ConfettiProps {
  isActive: boolean;
}

export const Confetti: React.FC<ConfettiProps> = ({ isActive }) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (isActive) {
      const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'];
      const newPieces: ConfettiPiece[] = [];
      
      for (let i = 0; i < 50; i++) {
        newPieces.push({
          id: i,
          x: Math.random() * window.innerWidth,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 0.5,
          duration: 2 + Math.random() * 1
        });
      }
      
      setPieces(newPieces);
      
      // Clear confetti after animation
      const timeout = setTimeout(() => {
        setPieces([]);
      }, 4000);
      
      return () => clearTimeout(timeout);
    }
  }, [isActive]);

  if (pieces.length === 0) return null;

  return (
    <div className="confetti-container" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 1000
    }}>
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{ 
            x: piece.x, 
            y: -20,
            rotate: 0,
            opacity: 1
          }}
          animate={{ 
            y: window.innerHeight + 20,
            rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
            opacity: 0
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            width: '10px',
            height: '10px',
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '0%'
          }}
        />
      ))}
    </div>
  );
};