// walk_the_cat.js

let walkMixin = {
  walk: function() {
    return 'Let\'s go for a walk!';
  }
};

class Cat {
  constructor(name) {
    this.name = name;
    Object.assign(this, walkMixin);
  }

  greet() {
    return `Hello! My name is ${this.name}!`;
  }
}

let kitty = new Cat("Sophie");
console.log(kitty.greet()); // Hello! My name is Sophie!
console.log(kitty.walk());  // Let's go for a walk!