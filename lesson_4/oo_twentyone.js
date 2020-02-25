// oo_twentyone.js

let readline = require('readline-sync');

class Card {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
  }

  points() {
    let cardPoints;

    if (!Number.isNaN(Number(this.rank))) {
      cardPoints = Number(this.rank);
    } else if (this.rank === 'J' || this.rank === 'Q' || this.rank === 'K') {
      cardPoints = 10;
    }

    return cardPoints;
  }
}

class Deck {
  static TOTAL_NUM_CARDS = 52;
  static SUITS = [
  '\u2663',   // Clubs
  '\u2666',   // Diamonds
  '\u2665',   // Hearts
  '\u2660',   // Spades
  ];
  static RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 
    'A'];
  
  constructor() {
    this.cards = [];

    Deck.SUITS.forEach(suit => {
      Deck.RANKS.forEach(rank => {
        this.cards.push(new Card(suit, rank));
      });
    });
  }

  removeOneCard() {
    let randomIndex = Math.floor(Math.random() * this.cards.length);
    return this.cards.splice(randomIndex, 1)[0];
  }
}

class Participant {
  constructor() {
    this.hand = [];
  }

  cardDisplayString(hideLast = false) {
    let cardStringArray = this.hand.map(card => card.suit + card.rank);
    let displayString = this.joinOr(cardStringArray, ', ', 'and');

    if (hideLast) {
      displayString = this.hideLastCard(displayString);
    }

    return displayString;
  }

  clearHand() {
    this.hand = [];
  }

  hideLastCard(cardString) {
    return cardString.slice(0, cardString.lastIndexOf(' ') + 1) + 'unknown';
  }

  joinOr(array, delimiter = ', ', conjunction = 'or') {
    if (array.length === 1) return array.toString();

    let joinedArray = array.join(delimiter);

    let lastDelimiterIndex = joinedArray.lastIndexOf(delimiter);

    let sliceEndIndex = array.length > 2 ? lastDelimiterIndex + 1
                                           : lastDelimiterIndex;

    return `${joinedArray.slice(0, sliceEndIndex)} ${conjunction} ` +
      `${array[array.length - 1].toString()}`;
  }

  receiveCard(card) {
    this.hand.push(card);
  }
}

class Player extends Participant {
  static MINIMUM_MONEY = 0;
  static MAXIMUM_MONEY = 10;
  
  constructor() {
    super();
    this.money = 5;
  }

  getMoney() {
    return this.money;
  }

  isBroke() {
    return this.money <= Player.MINIMUM_MONEY;
  }

  isRich() {
    return this.money >= Player.MAXIMUM_MONEY;
  }

  updateMoney(amount) {
    this.money += amount;
  }
}

class Dealer extends Participant {
  dealOneCard(person) {
    if (this.deck.length === 0) {
      this.deck = new Deck();
    }
    person.receiveCard(this.deck.removeOneCard());
  }

  dealStartingHands(player) {
    this.deck = new Deck();
    this.dealOneCard(player);
    this.dealOneCard(player);
    this.dealOneCard(this);
    this.dealOneCard(this);
  }
}

class TwentyOneGame {
  static DEALER_HIT_CEILING = 17;
  static MAXIMUM_SCORE = 21;
  
  constructor() {
    this.player = new Player();
    this.dealer = new Dealer();
  }

  calculateScore(person) {
    let scoreAcesHigh = this.calculateScoreWithAceValuedAt(person, 11);
    let scoreAcesLow = this.calculateScoreWithAceValuedAt(person, 1);

    return scoreAcesHigh <= TwentyOneGame.MAXIMUM_SCORE ?
      scoreAcesHigh : scoreAcesLow;
  }

  calculateScoreWithAceValuedAt(person, aceValue) {
    return person.hand
      .map(card => (card.rank === 'A' ? aceValue : card.points()))
      .reduce((sum, val) => sum + val);
  }

  cashOutPlayer() {
    if (this.isPlayerTheWinner()) {
      this.player.updateMoney(1);
    } else if (this.isPlayerTheLoser()) {
      this.player.updateMoney(-1);
    }
  }

  dealCards() {
    this.player.clearHand();
    this.dealer.clearHand();
    this.dealer.dealStartingHands(this.player);
  }

  dealerTurn() {
    while (true) {
      this.waitForInputToProceed(
        'Press any key to see the dealer\'s next move');

      let choice = this.shouldDealerHit();

      if (!choice) {
        this.prompt('Dealer stays');
        break;
      }

      this.prompt('Dealer hits');
      this.dealer.dealOneCard(this.dealer);
      this.showCards(false);
      if (this.isBusted(this.dealer)) break;
    }
  }

  declareWinner() {
    if (this.isPlayerTheWinner()) {
      this.declareWinnerPlayer();
    } else if (this.isPlayerTheLoser()) {
      this.declareWinnerDealer();
    } else if (this.isTieScore()) {
      this.declareWinnerTie();
    }
  }

  declareWinnerDealer() {
    this.prompt('The Dealer wins! Congrats, Dealer!');
  }

  declareWinnerPlayer() {
    this.prompt('You won! Congratulations!');
  }

  declareWinnerTie() {
    this.prompt('A tie score! Sorry, there is no winner this time!');
  }

  displayGoodbyeMessage() {
    this.prompt('Thanks for playing 21!');
  }

  displayWelcomeMessage() {
    console.clear();
    this.prompt('Welcome to 21!');
  }

  isBusted(person) {
    return this.calculateScore(person) > TwentyOneGame.MAXIMUM_SCORE;
  }

  isDealersScoreHigher() {
    return this.calculateScore(this.dealer) > this.calculateScore(this.player);
  }

  isPlayersScoreHigher() {
    return this.calculateScore(this.player) > this.calculateScore(this.dealer);
  }

  isPlayerTheLoser() {
    return this.isBusted(this.player) ||
      (!this.isBusted(this.dealer) && this.isDealersScoreHigher());
  }

  isPlayerTheWinner() {
    return !this.isBusted(this.player) &&
      (this.isBusted(this.dealer) || this.isPlayersScoreHigher());
  }

  isTieScore() {
    return !this.isBusted(this.player) && !this.isBusted(this.dealer) &&
      this.calculateScore(this.player) === this.calculateScore(this.dealer);
  }

  playAgain() {
    this.prompt('Would you like to play again? (y/n)');
    let choice = readline.question().toLowerCase()[0];

    while (choice !== 'y' && choice !== 'n') {
      this.prompt('Please enter "y" to play again or "n" to stop.');
      choice = readline.question().toLowerCase()[0];
    }

    return choice === 'y';
  }

  playerTurn() {
    while (true) {
      this.prompt('Would you like to hit or stay? (h/s)');
      let choice = readline.question().toLowerCase()[0];

      while (choice !== 'h' && choice !== 's') {
        this.prompt('Please enter "h" to hit or "s" to stay.');
        choice = readline.question().toLowerCase()[0];
      }

      if (choice === 's') break;

      this.dealer.dealOneCard(this.player);
      this.showCards(true);
      if (this.isBusted(this.player)) break;
    }
  }

  playOneGame() {
    this.dealCards();
    this.showCards(true);
    this.playerTurn();
    if (!this.isBusted(this.player)) {
      this.dealerTurn();
    }
    this.waitForInputToProceed('Press any key to see the results');
    this.declareWinner();
    this.showCards(false);
    this.cashOutPlayer();
    this.prompt(`Player's purse: $${this.player.getMoney()}`);
  }

  prompt(message) {
    console.log(`=> ${message}`);
  }

  shouldDealerHit() {
    return this.calculateScore(this.dealer) < TwentyOneGame.DEALER_HIT_CEILING;
  }

  showCards(hideLastDealer) {
    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++');
    console.log(`Your cards: ${this.player.cardDisplayString()}`);
    console.log(`Score: ${this.calculateScore(this.player)}`);

    console.log();

    console.log(
      `Dealer's cards: ${this.dealer.cardDisplayString(hideLastDealer)}`
    );
    if (!hideLastDealer) {
      console.log(`Score: ${this.calculateScore(this.dealer)}`);
    }
    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++');
  }

  start() {
    this.displayWelcomeMessage();

    while (true) {
      this.playOneGame();
      if (this.player.isBroke() || this.player.isRich()) break;
      if (!this.playAgain()) break;
      console.clear();
    }

    this.displayGoodbyeMessage();
  }

  waitForInputToProceed(message) {
    this.prompt(message);
    readline.question();
  }
}

let game = new TwentyOneGame();
game.start();

