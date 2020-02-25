// oo_twentyone.js

let clear = require('clear');
let readline = require('readline-sync');

class Card {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
  }
  
  points() {
    if (!Number.isNaN(Number(this.rank))) {
      return Number(this.rank);
    } else if (this.rank === 'J' || this.rank === 'Q' || this.rank === 'K') { 
      return 10;
    }
  }
}

class Deck {
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

Deck.TOTAL_NUM_CARDS = 52;
Deck.SUITS = [
  '\u2663',   // Clubs
  '\u2666',   // Diamonds
  '\u2665',   // Hearts
  '\u2660',   // Spades
];
Deck.RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

class Participant {
  constructor() {
    this.hand = [];
  }
  
  calculateScore() {
    let scoreAcesHigh = this.calculateScoreWithAceValuedAt(11);
    let scoreAcesLow = this.calculateScoreWithAceValuedAt(1);
    
    return scoreAcesHigh <= 21 ? scoreAcesHigh : scoreAcesLow;
  }
  
  calculateScoreWithAceValuedAt(aceValue) {
    return this.hand
      .map(card => card.rank === 'A' ? aceValue : card.points())
      .reduce((sum, val) => sum += val);
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
  
  isBusted() {
    return this.calculateScore() > 21;
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
  constructor() {
    super();
    this.money = 5;
  }
  
  getMoney() {
    return this.money;
  }
  
  isBroke() {
    return this.money <= 0;
  }
  
  isRich() {
    return this.money >= 10;
  }
  
  updateMoney(amount) {
    this.money += amount;
  }
}

class Dealer extends Participant {
  constructor() {
    super();
  }
  
  dealOneCard(person) {
    person.receiveCard(this.deck.removeOneCard());
  }
  
  dealStartingHands(player) {
    this.deck = new Deck();
    this.dealOneCard(player);
    this.dealOneCard(player);
    this.dealOneCard(this);
    this.dealOneCard(this);
  }
  
  doYouWantToHit() {
    return this.calculateScore() < 17;
  }
}

class TwentyOneGame {
  constructor() {
    this.player = new Player();
    this.dealer = new Dealer();
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
      
      let choice = this.dealer.doYouWantToHit();
      
      if (!choice) {
        this.prompt('Dealer stays');
        break;
      }
      
      this.prompt('Dealer hits');
      this.dealer.dealOneCard(this.dealer);
      this.showCards(true);
      if (this.dealer.isBusted()) break;
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
    clear();
    this.prompt('Welcome to 21!');
  }
  
  isDealersScoreHigher() {
    return this.dealer.calculateScore() > this.player.calculateScore();
  }
  
  isPlayersScoreHigher() {
    return this.player.calculateScore() > this.dealer.calculateScore();
  }
  
  isPlayerTheLoser() {
    return this.player.isBusted() ||
      (!this.dealer.isBusted() && this.isDealersScoreHigher());
  }
  
  isPlayerTheWinner() {
    return !this.player.isBusted() && 
      (this.dealer.isBusted() || this.isPlayersScoreHigher());  
  }
  
  isTieScore() {
    return !this.player.isBusted() && !this.dealer.isBusted() && 
      this.player.calculateScore() === this.dealer.calculateScore();
  }
  
  playAgain() {  
    this.prompt('Would you like to play again? (y/n)');
    let choice = readline.question();
    
    while (choice !== 'y' && choice !== 'n') {
      this.prompt('Please enter "y" to play again or "n" to stop.');
      choice = readline.question();
    }
    
    return choice === 'y';
  }

  playerTurn() {
    while (true) {
      this.prompt('Would you like to hit or stay? (h/s)');
      let choice = readline.question();
      
      while (choice !== 'h' && choice !== 's') {
        this.prompt('Please enter "h" to hit or "s" to stay.');
        choice = readline.question();
      }
      
      if (choice === 's') break;
      
      this.dealer.dealOneCard(this.player);
      this.showCards(true);
      if (this.player.isBusted()) break;
    }
  }
  
  playOneGame() {
    this.dealCards();
    this.showCards(true);
    this.playerTurn();
    if (!this.player.isBusted()) {
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

  showCards(hideLastDealer) {
    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++');
    console.log(`Your cards: ${this.player.cardDisplayString()}`);
    console.log(`Score: ${this.player.calculateScore()}`);
    
    console.log();
    
    console.log(
      `Dealer's cards: ${this.dealer.cardDisplayString(hideLastDealer)}`
    );
    if (!hideLastDealer) {
      console.log(`Score: ${this.dealer.calculateScore()}`);
    }
    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++');
  }

  start() {
    this.displayWelcomeMessage();
    
    while (true) {
      this.playOneGame();
      if (this.player.isBroke() || this.player.isRich()) break;
      if (!this.playAgain()) break;
      clear();
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

