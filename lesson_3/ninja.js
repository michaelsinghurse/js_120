// ninja.js

// // Implement the method described in the comments below:
// function Ninja() {
//   this.swung = false;
// }

// Ninja.prototype.swing = function() {
//   this.swung = !this.swung;
//   return this;
// };

// // Add a swing method to the Ninja prototype which
// // modifies `swung` and returns the calling object

// let ninjaA = new Ninja();
// let ninjaB = new Ninja();

// console.log(ninjaA.swing().swung);      // logs `true`
// console.log(ninjaB.swing().swung);      // logs `true`


// In this problem, we'll ask you to create a new instance of an object, without
// having direct access to the constructor function:

let ninjaA;

{
  const Ninja = function() {
    this.swung = false;
  };

  ninjaA = new Ninja();
}

// create a `ninjaB` object here; don't change anything else
let ninjaB = new ninjaA.constructor();
console.log(ninjaA);
console.log(ninjaB);
console.log(ninjaA.constructor === ninjaB.constructor); // => true