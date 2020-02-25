// oo_ttt.js

let readline  = require('readline-sync');

class Square {
  static UNUSED_SQUARE = " ";
  static HUMAN_MARKER = "X";
  static COMPUTER_MARKER = "O";
  
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

class Board {
  static NUM_OF_SQUARES = 9;
  static CENTER_SQUARE_KEY = '5';
  
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
    console.clear();
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

  randomOpenSquareKey() {
    let validChoices = this.unusedSquares();
    let choice;

    do {
      choice = (1 + Math.floor(Math.random() * 9)).toString();
    } while (!validChoices.includes(choice));

    return choice;
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
    let winner = null;

    for (let idx = 0; idx < TTTGame.POSSIBLE_WINNING_ROWS.length; idx += 1) {
      let winningRow = TTTGame.POSSIBLE_WINNING_ROWS[idx];

      if (
        winningRow.filter(key => {
          return this.squares[key].getMarker() === marker;
        }).length === 2
        &&
        winningRow.filter(key => {
          return this.squares[key].getMarker() === Square.UNUSED_SQUARE;
        }).length === 1
        ) {
          winner = winningRow.find(key => {
            return this.squares[key].getMarker() === Square.UNUSED_SQUARE;
          });
      }
    }

    return winner;
  }
}

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
  static POSSIBLE_WINNING_ROWS = [
    [ "1", "2", "3" ],            // top row of board
    [ "4", "5", "6" ],            // center row of board
    [ "7", "8", "9" ],            // bottom row of board
    [ "1", "4", "7" ],            // left column of board
    [ "2", "5", "8" ],            // middle column of board
    [ "3", "6", "9" ],            // right column of board
    [ "1", "5", "9" ],            // diagonal: top-left to bottom-right
    [ "3", "5", "7" ],            // diagonal: bottom-left to top-right
  ];

  constructor() {
    this.humanWinCount = 0;
    this.computerWinCount = 0;
    this.numOfGames = 0;
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
      choice = this.board.randomOpenSquareKey();
    }

    this.board.markSquareAt(choice, this.computer.getMarker());
  }

  displayWelcomeMessage() {
    console.clear();
    console.log("Welcome to Tic Tac Toe!");
    console.log('');
  }

  displayGoodbyeMessage() {
    console.log('Thanks for playing Tic Tac Toe! Goodbye!');
  }

  displayMatchScore() {
    console.log('++++++++++++++++++++++++++++++++++++');
    console.log('Match Score:');
    console.log(` Human ${this.humanWinCount}`);
    console.log(` Computer ${this.computerWinCount}`);
    console.log('First player to 3 wins the match!');
    console.log('++++++++++++++++++++++++++++++++++++');
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

  matchOver() {
    return this.humanWinCount === 3 || this.computerWinCount === 3;
  }

  play() {
    this.displayWelcomeMessage();
    this.board.display();

    while (true) {
      this.playOneGame();

      this.board.displayWithClear();
      this.displayResults();

      this.updateMatchScore();
      this.displayMatchScore();
      if (this.matchOver()) break;

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
      choice = readline.question().toLowerCase()[0];
      if (choice === 'y' || choice === 'n') break;
      console.log('Please enter "y" to play again or "n" to exit.');
    }

    return choice === 'y';
  }

  playOneGame() {
    this.numOfGames += 1;

    while (true) {
      if (this.numOfGames % 2 !== 0) {
        this.humanMoves();
        if (this.gameOver()) break;

        this.computerMoves();
        if (this.gameOver()) break;
      } else {
        this.computerMoves();
        if (this.gameOver()) break;

        this.board.displayWithClear();

        this.humanMoves();
        if (this.gameOver()) break;
      }

      this.board.displayWithClear();
    }
  }

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }

  updateMatchScore() {
    if (this.isWinner(this.human)) {
      this.humanWinCount += 1;
    } else if (this.isWinner(this.computer)) {
      this.computerWinCount += 1;
    }
  }
}

let game = new TTTGame();
game.play();

