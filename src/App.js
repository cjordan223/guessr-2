import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

const App = () => {
  const [answer, setAnswer] = useState('');
  const [currentGuess, setCurrentGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [board, setBoard] = useState(Array(6).fill().map(() => Array(5).fill({ letter: '', color: 'gray' })));
  const [message, setMessage] = useState('');
  const [guessedLetters, setGuessedLetters] = useState(new Set());

    const fetchRandomWord = useCallback(async () => {
    try {
      const response = await fetch('https://random-word-form.repl.co/random/noun?count=1');
      const words = await response.json();
      if (words.length > 0 && !words[0].endsWith('s')) {
        setAnswer(words[0].toUpperCase());
        console.log(words[0].toUpperCase());
      } else {
        fetchRandomWord();
      }
    } catch (error) {
      console.error('Error fetching word', error);
    }
  }, []);

  const submitGuess = useCallback(() => {
    if (currentGuess.length !== 5) {
      alert('Guess must be 5 letters');
      return;
    }

    const newBoard = board.map(row => row.map(cell => ({ ...cell })));
    const newGuessedLetters = new Set(guessedLetters);

    const answerLetterCount = {};
    for (const letter of answer) {
      answerLetterCount[letter] = (answerLetterCount[letter] || 0) + 1;
    }

    // First pass: check for correct positions
    currentGuess.split('').forEach((letter, index) => {
      newGuessedLetters.add(letter);
      if (letter === answer[index]) {
        newBoard[attempts][index] = { letter, color: 'green' };
        answerLetterCount[letter]--;
      }
    });

    // Second pass: check for incorrect positions
    currentGuess.split('').forEach((letter, index) => {
      if (newBoard[attempts][index].color !== 'green') {
        if (answer.includes(letter) && answerLetterCount[letter] > 0) {
          newBoard[attempts][index] = { letter, color: 'yellow' };
          answerLetterCount[letter]--;
        } else {
          newBoard[attempts][index] = { letter, color: 'gray' };
        }
      }
    });

    setBoard(newBoard);
    setGuessedLetters(newGuessedLetters);

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
  }, [currentGuess, answer, attempts, board, guessedLetters]);

  useEffect(() => {
    fetchRandomWord();
  }, [fetchRandomWord]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        submitGuess();
      }
    };
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [submitGuess]);

  const handleInputChange = (e) => {
    setCurrentGuess(e.target.value.toUpperCase());
  };

  const resetGame = () => {
    setAnswer('');
    setCurrentGuess('');
    setAttempts(0);
    setBoard(Array(6).fill().map(() => Array(5).fill({ letter: '', color: 'gray' })));
    setMessage('');
    setGuessedLetters(new Set());
    fetchRandomWord();
  };

  return (
    <div className="container">
      <div className="board">
        {board.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <div
                className="cell"
                key={cellIndex}
                style={{ backgroundColor: cell.color }}
              >
                {cell.letter}
              </div>
            ))}
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
      <button onClick={resetGame}>Reset</button>
      <p>{message}</p>
      <p>Attempt: {attempts + 1}/6</p>
      <div className="guessed-letters">
        <h3>Guessed Letters:</h3>
        {[...guessedLetters].map((letter, index) => (
          <span key={index} className="guessed-letter">
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default App;
