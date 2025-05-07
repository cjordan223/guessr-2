# Word Guessr

A modern, interactive word-guessing game built with React. Inspired by Wordle, this game challenges players to guess a 5-letter word within 6 attempts.

[Try it live](https://cjordan223.github.io/guessr-2/)

## Features

- 🎮 Interactive game board with 6 attempts to guess a 5-letter word
- 🎯 Real-time feedback with color-coded letters:
  - 🟩 Green: Correct letter in correct position
  - 🟨 Yellow: Correct letter in wrong position
  - ⬜ Gray: Letter not in word
- 📊 Game statistics tracking (attempts, win rate)
- ⌨️ Keyboard support for input
- 📱 Responsive design for all devices
- ✨ Modern UI with smooth animations
- 🌟 Particle background effects

## Technologies Used

- React 18
- Framer Motion for animations
- TSParticles for background effects
- Modern CSS with Flexbox and Grid
- Random Word API for word generation

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/cjordan223/guessr-2.git
```

2. Install dependencies:
```bash
cd guessr-2
npm install
```

3. Start the development server:
```bash
npm start
```



## How to Play

1. The game will generate a random 5-letter word
2. Enter your guess in the input field
3. After each guess, the letters will be color-coded:
   - Green: Letter is correct and in the right position
   - Yellow: Letter is in the word but in the wrong position
   - Gray: Letter is not in the word
4. You have 6 attempts to guess the word
5. Use the feedback from each guess to narrow down the possibilities

## Contributing

Feel free to submit issues and enhancement requests

## License

This project is open source and available under the MIT License.
