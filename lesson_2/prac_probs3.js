// prac_probs3.js

// // original
// let foo = {
//   a: 0,
//   incrementA: function() {
//     function increment() {
//       this.a += 1;
//     }

//     increment();
//   }
// };

// // arrow function to preserve context
// let foo = {
//   a: 0,
//   incrementA: function() {
//     let increment = () => {
//       this.a += 1;
//     }

//     increment();
//   }
// };

// // use variable to preserve context
// let foo = {
//   a: 0,
//   incrementA: function() {
//     let self = this;
//     function increment() {
//       self.a += 1;
//     }

//     increment();
//   }
// };

// // bind the function expression
// let foo = {
//   a: 0,
//   incrementA: function() {
//     let increment = function() {
//       this.a += 1;
//     }.bind(this);

//     increment();
//   }
// };

// use a method rather than modify increment function
let foo = {
  a: 0,
  incrementA: function() {
    function increment() {
      this.a += 1;
    }

    increment.call(foo);
  }
};

console.log(foo.a);
foo.incrementA();
foo.incrementA();
foo.incrementA();
console.log(foo.a);