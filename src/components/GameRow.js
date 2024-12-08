import React from 'react';
import GameCell from './GameCell';

const GameRow = ({ row }) => {
  return (
    <div className="row">
      {row.map((cell, index) => (
        <GameCell key={index} cell={cell} />
      ))}
    </div>
  );
};

export default GameRow; 