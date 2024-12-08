import React from 'react';
import { motion } from 'framer-motion';

const GameStats = ({ attempts, totalGames, wins }) => {
  return (
    <motion.div 
      className="stats-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="stat-item">
        <span className="stat-label">Current Attempt</span>
        <span className="stat-value">{attempts}/6</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Games Played</span>
        <span className="stat-value">{totalGames}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Win Rate</span>
        <span className="stat-value">
          {totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0}%
        </span>
      </div>
    </motion.div>
  );
};

export default GameStats; 