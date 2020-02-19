// create_pets.js

// Use a factory function to create pet objects. The factory should let us 
// create and use pets like this:

function createPet(animal, name) {
  return {
    animal,
    name,
    
    sleep() {
      console.log('I am sleeping');
    },
    
    wake() {
      console.log('I am awake');
    },
  };
}

let pudding = createPet("Cat", "Pudding");
console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
pudding.sleep(); // I am sleeping
pudding.wake();  // I am awake

let neptune = createPet("Fish", "Neptune");
console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
neptune.sleep(); // I am sleeping
neptune.wake();  // I am awake

let PetPrototype = {
  sleep() {
    console.log('I am sleeping');
  },
  
  wake() {
    console.log('I am awake');
  },
  
  init(animal, name) {
    this.animal = animal;
    this.name = name;
    return this;
  },
};


let pudding2 = Object.create(PetPrototype).init("Cat", "Pudding");
console.log(`I am a ${pudding2.animal}. My name is ${pudding2.name}.`);
pudding2.sleep(); // I am sleeping
pudding2.wake();  // I am awake

let neptune2 = Object.create(PetPrototype).init("Fish", "Neptune");
console.log(`I am a ${neptune2.animal}. My name is ${neptune2.name}.`);
neptune2.sleep(); // I am sleeping
neptune2.wake();  // I am awake
