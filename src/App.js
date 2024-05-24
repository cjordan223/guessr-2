import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [answer, setAnswer] = useState('');
  const [currentGuess, setCurrentGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [board, setBoard] = useState(Array(6).fill(Array(5).fill('')));
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchRandomWord();
  }, []);

  const fetchRandomWord = async () => {
    try {
      const response = await fetch('https://random-word-api.herokuapp.com/word?number=1&length=5');
      const words = await response.json();
      if (words[0].endsWith('s')) {
        fetchRandomWord();
      } else {
        setAnswer(words[0].toUpperCase());
        console.log(words[0].toUpperCase());
      }
    } catch (error) {
      console.error('Error fetching word', error);
    }
  };

  const handleInputChange = (e) => {
    setCurrentGuess(e.target.value.toUpperCase());
  };

  const submitGuess = () => {
    if (currentGuess.length !== 5) {
      alert('Guess must be 5 letters');
      return;
    }

    const newBoard = [...board];
    newBoard[attempts] = currentGuess.split('');
    setBoard(newBoard);

    if (currentGuess === answer) {
      setMessage("Congratulations! You've guessed the word!");
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts === 6) {
        setMessage(`Game Over! The word was ${answer}`);
      }
    }

    setCurrentGuess('');
  };

  return (
    <div className="container">
      <div className="board">
        {board.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((cell, cellIndex) => {
              let backgroundColor = 'gray';
              if (cell === answer[cellIndex]) {
                backgroundColor = 'green';
              } else if (answer.includes(cell)) {
                backgroundColor = 'yellow';
              }
              return (
                <div className="cell" key={cellIndex} style={{ backgroundColor }}>
                  {cell}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={currentGuess}
        onChange={handleInputChange}
        maxLength="5"
        placeholder="Enter guess..."
      />
      <button onClick={submitGuess}>Submit</button>
      <p>{message}</p>
    </div>
  );
};

export default App;