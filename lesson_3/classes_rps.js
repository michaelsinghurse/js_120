// classes_rps.js
//  a re-write of oo_rps.js using classes

let readline = require('readline-sync');

class Player {
  constructor() {
    this.move = null;  
  }
}

class Computer extends Player {
  constructor() {
    super();
  }
  
  choose() {
    const choices = ['rock', 'paper', 'scissors'];
    let randomIndex = Math.floor(Math.random() * choices.length);
    this.move = choices[randomIndex];  
  }  
}

class Human extends Player {
  constructor() {
    super();
  }
  
  choose() {
    let choice;

    while (true) {
      console.log('Please choose rock, paper, or scissors');
      choice = readline.question();
      if (['rock', 'paper', 'scissors'].includes(choice)) break;
      console.log('Sorry, invalid choice.');
    }
  
    this.move = choice;
  }  
}

class RPSGame {
  constructor() {
    this.human = new Human();
    this.computer = new Computer();  
  }

  displayWelcomeMessage() {
    console.log('Welcome to Rock, Paper, Scissors!');
  }
  
  displayWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;
  
    console.log(`You chose: ${humanMove}`);
    console.log(`The computer chose: ${computerMove}`);
  
    if ((humanMove === 'rock' && computerMove === 'scissors') ||
        (humanMove === 'paper' && computerMove === 'rock') ||
        (humanMove === 'scissors' && computerMove === 'paper')) {
      console.log('You won!');
    } else if ((computerMove === 'rock' && humanMove === 'scissors') ||
               (computerMove === 'paper' && humanMove === 'rock') ||
               (computerMove === 'scissors' && humanMove === 'paper')) {
      console.log('Computer won!');
    } else {
     console.log('It\'s a tie!');
    }
  }
  
  playAgain() {
    console.log('Would you like to play again? (y/n)');
    let answer = readline.question();
    return answer.toLowerCase()[0] === 'y';
  }
  
  displayGoodbyeMessage() {
    console.log('Thanks for playing Rock, Paper, Scissors!');
  }
  
  play() {
    this.displayWelcomeMessage();
  
    while (true) {
      this.human.choose();
      this.computer.choose();
      this.displayWinner();
      if (!this.playAgain()) break;
    }
  
    this.displayGoodbyeMessage();
  }
}

let rpsGame = new RPSGame();
rpsGame.play();
