// pet_shelter.js

class Owner {
  constructor(name) {
    this.name = name;
    this.pets = [];
  }
  
  addPet(pet) {
    this.pets.push(pet);  
  }
  
  numberOfPets() {
    return this.pets.length;
  }
}

class Pet {
  constructor(type, name) {
    this.type = type;
    this.name = name;
  }
}

class Shelter {
  constructor() {
    this.adoptions = {};
  }
  
  adopt(owner, pet) {
    owner.addPet(pet);
    
    if (this.adoptions.hasOwnProperty(owner.name)) {
      this.adoptions[owner.name].push(pet);
    } else {
      this.adoptions[owner.name] = [pet];
    }
  }
  
  printAdoptions() {
    Object.keys(this.adoptions).forEach(owner => {
      console.log(`${owner} has adopted the following pets:`);
      
      this.adoptions[owner].forEach(pet => {
        console.log(`a ${pet.type} named ${pet.name}`);
      });
      console.log();
    });
  }
}



let butterscotch = new Pet('cat', 'Butterscotch');
let pudding      = new Pet('cat', 'Pudding');
let darwin       = new Pet('bearded dragon', 'Darwin');
let kennedy      = new Pet('dog', 'Kennedy');
let sweetie      = new Pet('parakeet', 'Sweetie Pie');
let molly        = new Pet('dog', 'Molly');
let chester      = new Pet('fish', 'Chester');

let phanson = new Owner('P Hanson');
let bholmes = new Owner('B Holmes');

let shelter = new Shelter();
shelter.adopt(phanson, butterscotch);
shelter.adopt(phanson, pudding);
shelter.adopt(phanson, darwin);
shelter.adopt(bholmes, kennedy);
shelter.adopt(bholmes, sweetie);
shelter.adopt(bholmes, molly);
shelter.adopt(bholmes, chester);
shelter.printAdoptions();
console.log(`${phanson.name} has ${phanson.numberOfPets()} adopted pets.`);
console.log(`${bholmes.name} has ${bholmes.numberOfPets()} adopted pets.`);