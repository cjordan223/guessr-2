import React from 'react';
import { motion } from 'framer-motion';

const GameCell = ({ cell }) => {
  const getState = () => {
    if (!cell.letter) return 'empty';
    if (cell.color === 'green') return 'correct';
    if (cell.color === 'yellow') return 'present';
    if (cell.color === 'gray') return 'absent';
    return 'filled';
  };

  return (
    <motion.div
      className="cell"
      data-state={getState()}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ 
        scale: 1,
        opacity: 1,
        rotateX: cell.color ? 360 : 0
      }}
      transition={{ 
        type: "spring",
        stiffness: 200,
        damping: 15,
        duration: 0.5
      }}
    >
      {cell.letter}
    </motion.div>
  );
};

export default GameCell; 