import React, { useState, useEffect, useCallback } from 'react';
import GameBoard from './components/GameBoard';
import GameStats from './components/GameStats';
import GameGuessedLetters from './components/GameGuessedLetters';
import { motion } from 'framer-motion';
import './App.css';
import './styles/GameBoard.css';
import './styles/GameStats.css';
import ParticleBackground from './components/ParticleBackground';

const App = () => {
  const [answer, setAnswer] = useState('');
  const [currentGuess, setCurrentGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [board, setBoard] = useState(Array(6).fill().map(() => Array(5).fill({ letter: '', color: 'gray' })));
  const [message, setMessage] = useState('');
  const [guessedLetters, setGuessedLetters] = useState(new Set());
  const [totalGames, setTotalGames] = useState(0);
  const [wins, setWins] = useState(0);
  const [error, setError] = useState('');
  const [previousGuesses, setPreviousGuesses] = useState(new Set());

  const fetchRandomWord = useCallback(async () => {
    try {
      const response = await fetch('https://random-word-api.vercel.app/api?words=1&length=5');
      if (!response.ok) {
        throw new Error('Failed to fetch word');
      }
      
      const words = await response.json();
      const word = words[0];
      
      if (!word || typeof word !== 'string' || !/^[a-zA-Z]{5}$/.test(word)) {
        throw new Error('Invalid word received from API');
      }

      if (!word.endsWith('s')) {
        setAnswer(word.toUpperCase());
        setError('');
      } else {
        fetchRandomWord();
      }
    } catch (error) {
      console.error('Error fetching word:', error);
      setError('Failed to fetch new word. Please try again.');
    }
  }, []);

  const submitGuess = useCallback(() => {
    const validationError = validateInput(currentGuess);
    if (validationError) {
      setError(validationError);
      return;
    }

    if (previousGuesses.has(currentGuess)) {
      setError('You already tried this word! Are you sure?');
      return;
    }

    try {
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
      setAttempts(prev => prev + 1);

      if (currentGuess === answer) {
        setMessage("Congratulations! You've guessed the word!");
        setWins(prev => prev + 1);
        setTotalGames(prev => prev + 1);
      } else if (attempts + 1 === 6) {
        setMessage(`Game Over! The word was ${answer}`);
        setTotalGames(prev => prev + 1);
      }

      setCurrentGuess('');
    } catch (error) {
      console.error('Error processing guess:', error);
      setError('An error occurred while processing your guess');
    }
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
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [submitGuess]);

  const handleInputChange = (e) => {
    const input = e.target.value.toUpperCase();
    
    if (input && !/^[A-Za-z]+$/.test(input)) {
      setError('Only letters are allowed');
      return;
    }

    const lastLetter = input[input.length - 1];
    
    // Check if the letter exists in the board as yellow or green
    const letterInWord = board.some(row => 
      row.some(cell => 
        cell.letter === lastLetter && (cell.color === 'yellow' || cell.color === 'green')
      )
    );

    // Only show warning if letter was guessed before AND is not yellow/green
    if (lastLetter && guessedLetters.has(lastLetter) && !letterInWord) {
      setError(`Letter "${lastLetter}" has already been guessed!`);
    } else {
      setError('');
    }
    
    setCurrentGuess(input);
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

  const validateInput = (input) => {
    if (!input) return 'Please enter a guess';
    
    if (input.length !== 5) return 'Guess must be 5 letters';
    
    if (!/^[A-Za-z]+$/.test(input)) return 'Only letters are allowed';
    
    return '';
  };

  return (
    <>
      <ParticleBackground />
      <motion.div 
        className={`container ${message.includes('Congratulations') ? 'win' : message.includes('Game Over') ? 'lose' : ''}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="game-section">
          {error && (
            <motion.div 
              className="error-message"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.div>
          )}
          
          <GameBoard board={board} />
          
          <div className="input-container">
            <motion.input
              type="text"
              value={currentGuess}
              onChange={handleInputChange}
              maxLength="5"
              placeholder="Enter guess..."
              whileFocus={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
          </div>
          
          <div className="button-container">
            <motion.button 
              onClick={submitGuess}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit
            </motion.button>
            <motion.button 
              onClick={resetGame}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="reset"
            >
              Reset
            </motion.button>
          </div>
        </div>

        <div className="side-section">
          <GameStats attempts={attempts} totalGames={totalGames} wins={wins} />
          <GameGuessedLetters guessedLetters={guessedLetters} />
          {message && (
            <motion.div 
              className={`message-container ${currentGuess === answer ? 'message-success' : 'message-error'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {message}
            </motion.div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default App;
