// what_will_this_do.js

class Something {
  constructor() {
    this.data = "Hello";
  }

  dupData() {
    return this.data + this.data;
  }

  static dupData() {
    return "ByeBye";
  }
}

let thing = new Something();

// both should log true
console.log(Something.dupData() === 'ByeBye');
console.log(thing.dupData() === 'HelloHello');