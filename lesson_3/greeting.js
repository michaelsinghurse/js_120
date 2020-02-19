// greeting.js

function Greeting() {}

Greeting.prototype.greet = function(message) {
  console.log(message);
};

function Hello() {}

Hello.prototype = Object.create(Greeting.prototype);

Hello.prototype.hi = function() {
  this.greet('Hello!');
};

function Goodbye() {}

Goodbye.prototype = Object.create(Greeting.prototype);

Goodbye.prototype.bye = function() {
  this.greet("Goodbye");
};

// // case 1
// let hello = new Hello();
// console.log(hello.hi());
// // logs Hello!

// // case 2
// let hello2 = new Hello();
// console.log(hello2.bye());
// // TypeError - hello2.by is not a function

// // case 3
// let hello3 = new Hello();
// console.log(hello3.greet());
// // logs undefined

// // case 4
// let hello4 = new Hello();
// console.log(hello4.greet('Goodbye'));
// // logs Goodbye

// case 5
console.log(Hello.hi());
// TypeError - Hello.hi is not a function

