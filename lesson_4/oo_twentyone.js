// oo_twentyone.js

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
    } else if (this.rank === 'A') {
      // TODO: Not sure if this is best way to handle Aces?
      return { high: 11, low: 1 };
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
Deck.SUITS = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
Deck.RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

class Participant {
  constructor() {
    // STUB
    // What sort of state does a participant need?
    // Score? Hand? Amount of money available?
    // What else goes here? All the redundant behavior from Player and Dealer?
    this.hand = [];
  }
  
  receiveCard(card) {
    this.hand.push(card);
  }
}

class Player extends Participant {
  constructor() {
    // STUB
    // What sort of state does a player need?
    // Score? Hand? Amount of money available?
    super();
    this.money = 5;
  }

  hit() {
    // STUB
  }

  isBusted() {
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

  isBusted() {
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
    console.log('Welcome to 21!');
  }

  playerTurn() {
    // STUB
  }

  showCards() {
    // STUB
  }

  start() {
    // SPIKE
    this.displayWelcomeMessage();
    this.dealCards();
    this.showCards();
    this.playerTurn();
    this.dealerTurn();
    this.displayResult();
    this.displayGoodbyeMessage();
  }
}

let game = new TwentyOneGame();
game.start();

console.log(game.dealer.hand);
console.log(game.player.hand);