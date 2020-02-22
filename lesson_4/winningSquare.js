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

function winningSquare(board, marker) {
  let numOfMarkers = 0;
  let numOfEmptys = 0;
  let emptyKey = '';
  
  for (let index = 0; index < POSSIBLE_WINNING_ROWS.length; index += 1) {
    let winning_row = POSSIBLE_WINNING_ROWS[index];
    
    winning_row.forEach(square => {
      if (board[square] === marker) {
        numOfMarkers += 1;
      } else if (board[square] === EMPTY_MARKER) {
        numOfEmptys += 1;
        emptyKey = square;
      }
    });
    
    if (numOfMarkers === 2 && numOfEmptys === 1) {
      return emptyKey;
    }
    
    numOfMarkers = 0;
    numOfEmptys = 0;
  }
  
  return null;
}

let squares = {
  1: 'O',
  2: 'X',
  3: ' ', 
  4: ' ',
  5: ' ',
  6: ' ',
  7: ' ',
  8: ' ',
  9: ' ',
};

let winner = winningSquare(squares, COMPUTER_MARKER);
console.log(winner);



