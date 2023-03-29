class Dog {}
Dog.prototype.walk = function () {
  console.log("wwooof");
  console.log(this);
};

new Dog().walk();

class Cat {
  constructor() {}
  walk() {
    console.log("wwooof");
    console.log(this);
  }
}

new Cat().walk();
