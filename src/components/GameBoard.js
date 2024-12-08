import React from 'react';
import GameRow from './GameRow';

const GameBoard = ({ board }) => {
  return (
    <div className="board">
      <h1 className="game-title">Word Guessr</h1>
      {board.map((row, rowIndex) => (
        <GameRow key={rowIndex} row={row} />
      ))}
    </div>
  );
};

export default GameBoard; 