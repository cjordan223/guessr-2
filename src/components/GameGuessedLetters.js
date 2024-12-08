import React from 'react';
import { motion } from 'framer-motion';

const GameGuessedLetters = ({ guessedLetters }) => {
  return (
    <div className="stats-container">
      <div className="stat-item">
        <span className="stat-label">Guessed Letters:</span>
        <div className="letters-grid">
          {[...guessedLetters].map((letter, index) => (
            <motion.span
              key={index}
              className="stat-value"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: index * 0.05 
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameGuessedLetters; 