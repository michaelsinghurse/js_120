// lesson1_08_01.js

function createBook(title, author, read = false) {
  return {
    title,
    author,
    read,
    
    description() {
      return `${this.title} was written by ${this.author}. ` +
             `I ${this.read? 'have read' : "haven't read"} it.`;
    },
    
    readBook() {
      this.read = true;
    },
  };
}

let book1 = createBook('Mythos', 'Stephen Fry');
// console.log(book1.description());

// let book2 = createBook('Me Talk Pretty One Day', 'David Sedaris');
// console.log(book2.description());

// let book3 = createBook('Aunts aren\'t Gentlemen', 'PG Wodehouse');
// console.log(book3.description());

console.log(book1.description());
book1.readBook();
console.log(book1.read);
console.log(book1.description());


