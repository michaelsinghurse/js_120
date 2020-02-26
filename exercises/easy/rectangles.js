// rectangles.js

class Rectangle {
  constructor(width, length) {
    this.width = width;
    this.length = length;
  }
  
  getArea() {
    return this.width * this.length;
  }
  
  getLength() {
    return this.length;
  }
  
  getWidth() {
    return this.width;
  }
}

let rect = new Rectangle(4, 5);

// all should return true;
console.log(rect.getWidth() === 4);
console.log(rect.getLength() === 5);
console.log(rect.getArea() === 20);
