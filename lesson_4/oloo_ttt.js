// oloo_ttt.js

let clear = require('clear');
let readline  = require('readline-sync');

let Square = {
  UNUSED_SQUARE: " ",
  HUMAN_MARKER: "X",
  COMPUTER_MARKER: "O",
  
  init(marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
    return this;
  },

  getMarker() {
    return this.marker;
  },

  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  },

  setMarker(marker) {
    this.marker = marker;
  },

  toString() {
    return this.marker;
  },
};

let Board = {
  init() {
    this.squares = {};
    for (let index = 1; index <= 9; index += 1) {
      this.squares[String(index)] = Object.create(Square).init();
    }
    return this;
  },

  countMarkersFor(player, keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === player.marker;
    });

    return markers.length;
  },

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
  },

  displayWithClear() {
    clear();
    console.log('');
    console.log('');
    this.display();
  },

  isFull() {
    return this.unusedSquares().length === 0;
  },

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  },

  unusedSquares() {
    return Object.keys(this.squares).filter(key => {
      return this.squares[key].isUnused();
    });
  },
};

let PlayerPrototype = {
  initialize(marker) {
    this.marker = marker;
    return this;
  },

  getMarker() {
    return this.marker;
  },
};

let Human = Object.create(PlayerPrototype);
Human.init = function() {
  return this.initialize(Square.HUMAN_MARKER);
};

let Computer = Object.create(PlayerPrototype);
Computer.init = function() {
  return this.initialize(Square.COMPUTER_MARKER);
};

let TTTGame = {
  POSSIBLE_WINNING_ROWS: [
    [ "1", "2", "3" ],            // top row of board
    [ "4", "5", "6" ],            // center row of board
    [ "7", "8", "9" ],            // bottom row of board
    [ "1", "4", "7" ],            // left column of board
    [ "2", "5", "8" ],            // middle column of board
    [ "3", "6", "9" ],            // right column of board
    [ "1", "5", "9" ],            // diagonal: top-left to bottom-right
    [ "3", "5", "7" ],            // diagonal: bottom-left to top-right
  ],

  init() {
    this.board = Object.create(Board).init();
    this.human = Object.create(Human).init();
    this.computer = Object.create(Computer).init();
    return this;
  },

  computerMoves() {
    let choice;
    let validChoices = this.board.unusedSquares();

    do {
      choice = (1 + Math.floor(Math.random() * 9)).toString();
    } while (!validChoices.includes(choice));

    this.board.markSquareAt(choice, this.computer.getMarker());
  },

  displayWelcomeMessage() {
    clear();
    console.log("Welcome to Tic Tac Toe!");
    console.log('');
  },

  displayGoodbyeMessage() {
    console.log('Thanks for playing Tic Tac Toe! Goodbye!');
  },

  displayResults() {
    if (this.isWinner(this.human)) {
      console.log('You won! Congratulations!');
    } else if (this.isWinner(this.computer)) {
      console.log('I won! I won! Take that, human!');
    } else {
      console.log('A tie game. How boring.');
    }
  },

  gameOver() {
    return this.board.isFull() || this.someoneWon();
  },

  humanMoves() {
    let choice;

    while (true) {
      let validChoices = this.board.unusedSquares();
      const prompt = `Choose a square: (${validChoices.join(' ')}): `;
      choice = readline.question(prompt);

      if (validChoices.includes(choice)) break;

      console.log('Sorry, that is not a valid choice.');
      console.log();
    }

    this.board.markSquareAt(choice, this.human.getMarker());
  },

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  },

  play() {
    this.displayWelcomeMessage();

    this.board.display();
    while (true) {
      this.humanMoves();
      if (this.gameOver()) break;

      this.computerMoves();
      if (this.gameOver()) break;

      this.board.displayWithClear();
    }

    this.board.displayWithClear();
    this.displayResults();
    this.displayGoodbyeMessage();
  },

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  },
};

let game = Object.create(TTTGame).init();
game.play();

