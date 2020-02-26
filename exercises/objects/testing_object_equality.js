// testing_object_equality.js

function objectsEqual(obj1, obj2) {
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return undefined;
  
  let obj1Props = Object.getOwnPropertyNames(obj1).sort();
  let obj2Props = Object.getOwnPropertyNames(obj2).sort();
  
  if (obj1Props.length !== obj2Props.length) return false;
  
  for (let index = 0; index < obj1Props.length; index += 1) {
    let obj1Key = obj1Props[index];
    let obj2Key = obj2Props[index];
    
    if (obj1Key !== obj2Key) return false;
    if (obj1[obj1Key] !== obj2[obj2Key]) return false;
  }
  
  return true;
}

// should all log true
console.log(objectsEqual({a: 'foo'}, {a: 'foo'}) === true);
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}) === false);
console.log(objectsEqual({}, {}) === true);
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}) === false);