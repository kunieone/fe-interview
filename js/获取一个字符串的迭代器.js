const str = "hello";
const iterator = str[Symbol.iterator]();

console.log(iterator.next()); // { value: "h", done: false }
console.log(iterator.next()); // { value: "e", done: false }
console.log(iterator.next()); // { value: "l", done: false }
console.log(iterator.next()); // { value: "l", done: false }
console.log(iterator.next()); // { value: "o", done: false }
console.log(iterator.next()); // { value: undefined, done: true }
