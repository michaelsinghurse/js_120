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
  
  displayCards(hideLast = false) {
    let cardStringArray = this.hand.map(card => card.suit + card.rank);
    let displayString = this.joinOr(cardStringArray, ', ', 'and');
    
    if (hideLast) {
      displayString = this.hideLastCard(displayString);
    }
    
    console.log(displayString);
  }
  
  displayScore() {
    console.log('Score: ' + this.calculateScore());
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

  hit() {
    // STUB
  }

  score() {
    // STUB
  }
  
  stay() {
    // STUB
  }
}

class Dealer extends Participant {
  // Very similar to a Player. Do we need this?

  constructor() {
    super();
  }
  
  hide() {
    // STUB
  }
  
  hit() {
    // STUB
  }
  
  reveal() {
    // STUB
  }

  score() {
    // STUB
  }
  
  stay() {
    // STUB
  }

  deal() {
    // STUB
    // does the dealer or the deck deal?
  }
}

class TwentyOneGame {
  constructor() {
    this.player = new Player();
    this.dealer = new Dealer();
    this.deck = new Deck();
  }

  dealCards() {
    this.player.receiveCard(this.deck.removeOneCard());
    this.player.receiveCard(this.deck.removeOneCard());
    this.dealer.receiveCard(this.deck.removeOneCard());
    this.dealer.receiveCard(this.deck.removeOneCard());
  }

  dealerTurn() {
    // STUB
  }

  displayGoodbyeMessage() {
    console.log('Thanks for playing 21!');
  }

  displayResult() {
    // STUB
  }

  displayWelcomeMessage() {
    clear();
    console.log('Welcome to 21!');
  }

  playerTurn() {
    while (true) {
      console.log('Would you like to hit or stay? (h/s)');
      let choice = readline.question();
      
      while (choice !== 'h' && choice !== 's') {
        console.log('Please enter "h" to hit or "s" to stay.');
        choice = readline.question();
      }
      
      if (choice === 's') break;
      
      this.player.receiveCard(this.deck.removeOneCard());
      this.showCards(true);
      if (this.player.isBusted()) break;
    }
  }

  showCards(hideLastDealer) {
    console.log('Your hand:');
    this.player.displayCards();
    this.player.displayScore();
    
    console.log();
    
    console.log('Dealer\'s hand:');
    this.dealer.displayCards(hideLastDealer);
    if (!hideLastDealer) {
      this.dealer.displayScore();
    }
  }

  start() {
    // SPIKE
    this.displayWelcomeMessage();
    this.dealCards();
    this.showCards(true)
    this.playerTurn();
    this.dealerTurn();
    this.displayResult();
    this.displayGoodbyeMessage();
  }
}

let game = new TwentyOneGame();
game.start();

