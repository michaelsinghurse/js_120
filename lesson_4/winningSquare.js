// winningSquare.js

const HUMAN_MARKER = 'X';
const COMPUTER_MARKER = 'O';
const EMPTY_MARKER = ' ';

const POSSIBLE_WINNING_ROWS = [
  [ "1", "2", "3" ],            // top row of board
  [ "4", "5", "6" ],            // center row of board
  [ "7", "8", "9" ],            // bottom row of board
  [ "1", "4", "7" ],            // left column of board
  [ "2", "5", "8" ],            // middle column of board
  [ "3", "6", "9" ],            // right column of board
  [ "1", "5", "9" ],            // diagonal: top-left to bottom-right
  [ "3", "5", "7" ],            // diagonal: bottom-left to top-right
];

function winningSquare(squares, marker) {
  
  for (let index = 0; index < POSSIBLE_WINNING_ROWS.length; index += 1) {
    let winningRow = POSSIBLE_WINNING_ROWS[index];
    
    if (winningRow.filter(key => squares[key] === marker).length === 2 &&
        winningRow.filter(key => squares[key] === EMPTY_MARKER).length === 1) {
        return winningRow.find(key => squares[key] === EMPTY_MARKER);
    }
  }

  return null;
}

let board = {
  1: 'X',
  2: ' ',
  3: ' ', 
  4: ' ',
  5: 'X',
  6: 'O',
  7: ' ',
  8: ' ',
  9: 'O',
};

let winner = winningSquare(board, COMPUTER_MARKER);
console.log(winner);
