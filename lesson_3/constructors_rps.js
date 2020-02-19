// constructors_rps.js
//  a re-write of oo_rps.js using constructors and prototypes

let readline = require('readline-sync');

function Player() {
  this.move = null;
}

Player.prototype.sayHi = function() {
  console.log('Hi');
};

function Computer() {}

Computer.prototype = Object.create(Player.prototype);
Computer.prototype.constructor = Computer;

Computer.prototype.choose = function() {
  const choices = ['rock', 'paper', 'scissors'];
  let randomIndex = Math.floor(Math.random() * choices.length);
  this.move = choices[randomIndex];
};

function Human() {}

Human.prototype = Object.create(Player.prototype);
Human.prototype.constructor = Human;

Human.prototype.choose = function() {
  let choice;

  while (true) {
    console.log('Please choose rock, paper, or scissors');
    choice = readline.question();
    if (['rock', 'paper', 'scissors'].includes(choice)) break;
    console.log('Sorry, invalid choice.');
  }

  this.move = choice;
};

function RPSGame() {
  this.human = new Human();
  this.computer = new Computer();
}

RPSGame.prototype.displayWelcomeMessage = function() {
  console.log('Welcome to Rock, Paper, Scissors!');
};

RPSGame.prototype.displayWinner = function() {
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
};

RPSGame.prototype.playAgain = function() {
  console.log('Would you like to play again? (y/n)');
  let answer = readline.question();
  return answer.toLowerCase()[0] === 'y';
};

RPSGame.prototype.displayGoodbyeMessage = function() {
  console.log('Thanks for playing Rock, Paper, Scissors!');
};

RPSGame.prototype.play = function() {
  this.displayWelcomeMessage();

  while (true) {
    this.human.choose();
    this.computer.choose();
    this.displayWinner();
    if (!this.playAgain()) break;
  }

  this.displayGoodbyeMessage();
};

let rpsGame = new RPSGame();
rpsGame.play();
