// oo_ttt.js

let clear = require('clear');
let readline  = require('readline-sync');

class Square {
  constructor(marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
  }

  getMarker() {
    return this.marker;
  }

  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  }

  setMarker(marker) {
    this.marker = marker;
  }

  toString() {
    return this.marker;
  }
}

Square.UNUSED_SQUARE = " ";
Square.HUMAN_MARKER = "X";
Square.COMPUTER_MARKER = "O";

class Board {
  constructor() {
    this.squares = {};
    for (let index = 1; index <= Board.NUM_OF_SQUARES; index += 1) {
      this.squares[String(index)] = new Square();
    }
  }

  countMarkersFor(player, keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === player.marker;
    });

    return markers.length;
  }

  display() {
    console.log("");
    console.log("     |     |");
    console.log(`  ${this.squares["1"]}  ` +
                `|  ${this.squares["2"]}  ` +
                `|  ${this.squares["3"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["4"]}  ` +
                `|  ${this.squares["5"]}  ` +
                `|  ${this.squares["6"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["7"]}  ` +
                `|  ${this.squares["8"]}  ` +
                `|  ${this.squares["9"]}`);
    console.log("     |     |");
    console.log("");
  }

  displayWithClear() {
    clear();
    console.log('');
    console.log('');
    this.display();
  }
  
  isCenterSquareEmpty() {
    return this.squares[this.getCenterSquareKey()].getMarker() === 
      Square.UNUSED_SQUARE;
  }
  
  getCenterSquareKey() {
    return Board.CENTER_SQUARE_KEY;
  }

  isFull() {
    return this.unusedSquares().length === 0;
  }

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  }

  reset() {
    for (let index = 1; index <= Board.NUM_OF_SQUARES; index += 1) {
      this.squares[index].setMarker(Square.UNUSED_SQUARE);
    }
  }

  unusedSquares() {
    return Object.keys(this.squares).filter(key => {
      return this.squares[key].isUnused();
    });
  }

  winningSquare(marker) {
    for (let idx1 = 0; idx1 < TTTGame.POSSIBLE_WINNING_ROWS.length; idx1 += 1) {
      let winningRow = TTTGame.POSSIBLE_WINNING_ROWS[idx1];
      let numOfMarkers = 0;
      let numOfEmptys = 0;
      let emptyKey = '';

      for (let idx2 = 0; idx2 < winningRow.length; idx2 += 1) {
        let square = winningRow[idx2];

        if (this.squares[square].getMarker() === marker) {
          numOfMarkers += 1;
        } else if (this.squares[square].getMarker() === Square.UNUSED_SQUARE) {
          numOfEmptys += 1;
          emptyKey = square;
        }
      }

      if (numOfMarkers === 2 && numOfEmptys === 1) {
        return emptyKey;
      }
    }
    
    return null;
  }
}

Board.NUM_OF_SQUARES = 9;
Board.CENTER_SQUARE_KEY = '5';

class Player {
  constructor(marker) {
    this.marker = marker;
  }

  getMarker() {
    return this.marker;
  }
}

class Human extends Player {
  constructor() {
    super(Square.HUMAN_MARKER);
  }
}

class Computer extends Player {
  constructor() {
    super(Square.COMPUTER_MARKER);
  }
}

class TTTGame {
  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
  }

  computerMoves() {
    let choice = this.board.winningSquare(this.computer.getMarker());
    
    if (choice === null) {
      choice = this.board.winningSquare(this.human.getMarker());
    }
    
    if (choice === null) {
      if (this.board.isCenterSquareEmpty()) {
        choice = this.board.getCenterSquareKey();
      }
    }

    if (choice === null) {
      let validChoices = this.board.unusedSquares();

      do {
        choice = (1 + Math.floor(Math.random() * 9)).toString();
      } while (!validChoices.includes(choice));
    }

    this.board.markSquareAt(choice, this.computer.getMarker());
  }

  displayWelcomeMessage() {
    clear();
    console.log("Welcome to Tic Tac Toe!");
    console.log('');
  }

  displayGoodbyeMessage() {
    console.log('Thanks for playing Tic Tac Toe! Goodbye!');
  }

  displayResults() {
    if (this.isWinner(this.human)) {
      console.log('You won! Congratulations!');
    } else if (this.isWinner(this.computer)) {
      console.log('I won! I won! Take that, human!');
    } else {
      console.log('A tie game. How boring.');
    }
  }

  gameOver() {
    return this.board.isFull() || this.someoneWon();
  }

  humanMoves() {
    let choice;

    while (true) {
      let validChoices = this.board.unusedSquares();
      const prompt = `Choose a square: (${this.joinOr(validChoices)}): `;
      choice = readline.question(prompt);

      if (validChoices.includes(choice)) break;

      console.log('Sorry, that is not a valid choice.');
      console.log();
    }

    this.board.markSquareAt(choice, this.human.getMarker());
  }

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  }

  joinOr(array, delimiter = ', ', conjunction = 'or') {
    if (!Array.isArray(array)) return undefined;
    if (array.length === 1) return array.toString();

    let joinedArray = array.join(delimiter);

    let lastDelimiterIndex = joinedArray.length
                           - array[array.length - 1].toString().length
                           - 2;

    let sliceEndIndex = array.length > 2 ? lastDelimiterIndex + 1
                                           : lastDelimiterIndex;

    return `${joinedArray.slice(0, sliceEndIndex)} ${conjunction} ` +
      `${array[array.length - 1].toString()}`;
  }

  play() {
    this.displayWelcomeMessage();
    this.board.display();

    while (true) {
      while (true) {
        this.humanMoves();
        if (this.gameOver()) break;

        this.computerMoves();
        if (this.gameOver()) break;

        this.board.displayWithClear();
      }

      this.board.displayWithClear();
      this.displayResults();

      if (!this.playAgain()) break;

      this.board.reset();
      this.board.displayWithClear();
    }

    this.displayGoodbyeMessage();
  }

  playAgain() {
    let choice;

    console.log('Do you want to play again? (y/n)');
    while (true) {
      choice = readline.question();
      if (choice === 'y' || choice === 'n') break;
      console.log('Please enter "y" to play again or "n" to exit.');
    }

    return choice === 'y';
  }

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }
}

TTTGame.POSSIBLE_WINNING_ROWS = [
  [ "1", "2", "3" ],            // top row of board
  [ "4", "5", "6" ],            // center row of board
  [ "7", "8", "9" ],            // bottom row of board
  [ "1", "4", "7" ],            // left column of board
  [ "2", "5", "8" ],            // middle column of board
  [ "3", "6", "9" ],            // right column of board
  [ "1", "5", "9" ],            // diagonal: top-left to bottom-right
  [ "3", "5", "7" ],            // diagonal: bottom-left to top-right
];

let game = new TTTGame();
game.play();

