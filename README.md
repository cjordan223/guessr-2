# Improvements Breakdown

## Initial Setup and Conversion to React

- **Converted HTML, CSS, and JavaScript to a React application**:
  - Set up a new React project using `create-react-app`.
  - Created components for the board, rows, cells, and input.
  - Refactored JavaScript logic into React hooks and components.

## Core Functionality Implementation

- **Implemented the core game logic**:
  - Fetch a random 5-letter word from an API.
  - Display the game board with 6 rows and 5 cells each.
  - Allow users to input their guesses.
  - Compare the guesses to the answer and color the cells appropriately:
    - Green for correct letters in the correct position.
    - Yellow for correct letters in the wrong position.
    - Gray for incorrect letters.
  - Track the number of attempts and display a game-over message if the user fails to guess the word in 6 attempts.
  - Provide a reset button to start a new game.

## Enhancements and Improvements

- **Added keyboard input handling**:
  - Users can submit their guesses by pressing the Enter key.
- **Displayed guessed letters**:
  - Track and display letters that have been guessed, ensuring each letter is only displayed once.
- **Improved the coloring logic**:
  - Ensure letters are colored correctly, taking into account the number of times each letter appears in the answer.
- **Ensured proper state management**:
  - Made deep copies of state arrays to avoid direct mutation.

## Responsive Design Implementation

- **Updated CSS for responsiveness**:
  - Used Flexbox and CSS Grid to create a flexible layout.
  - Applied media queries to adjust the layout and styles for smaller screen sizes.
  - Ensured the game board, input, and buttons resize appropriately on different devices.
