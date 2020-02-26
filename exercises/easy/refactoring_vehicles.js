// refactoring_vehicles.js

class Vehicle {
  constructor(make, model) {
    this.make = make;
    this.model = model;
    this.wheels = null;
  }
  
  getWheels() {
    return this.wheels;
  }
  
  info() {
    return `${this.make} ${this.model}`;
  }
}

class Car extends Vehicle {
  constructor(make, model) {
    super(make, model);
    this.wheels = 4;
  }
}

class Motorcycle extends Vehicle {
  constructor(make, model) {
    super(make, model);
    this.wheels = 2;
  }
}

class Truck extends Vehicle {
  constructor(make, model, payload) {
    super(make, model);
    this.wheels = 6;
    this.payload = payload;
  }
}