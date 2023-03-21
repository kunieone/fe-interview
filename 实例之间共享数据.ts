let shared = [];

class Accessor {
  shared: string[];
  constructor(public name: string) {
    this.shared = shared;
  }
  store(v: string) {
    this.shared.push(v);
  }
}

let a1 = new Accessor("小明");
let a2 = new Accessor("小红");
a1.store("我是小明");

console.log(a2);
