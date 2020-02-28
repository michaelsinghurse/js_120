// ancestors.js

let ancestorsMixin = {
  ancestors() {
    let proto = Object.getPrototypeOf(this);
    
    if (!proto.hasOwnProperty('name')) {
      return [ 'Object.prototype' ];
    }
    
    return [ proto['name'] ].concat(proto.ancestors());
  },
};

let foo = {name: 'foo'};
Object.assign(foo, ancestorsMixin);

let bar = Object.create(foo);
bar.name = 'bar';

let baz = Object.create(bar);
baz.name = 'baz';

let qux = Object.create(baz);
qux.name = 'qux';

console.log(qux.ancestors());  
// returns ['baz', 'bar', 'foo', 'Object.prototype']

console.log(baz.ancestors());  
// returns ['bar', 'foo', 'Object.prototype']

console.log(bar.ancestors());  
// returns ['foo', 'Object.prototype']

console.log(foo.ancestors());  // returns ['Object.prototype']