function _new(obj, ...rest) {
  // 基于obj的原型创建一个新的对象
  const newObj = Object.create(obj.prototype);

  // 添加属性到新创建的newObj上, 并获取obj函数执行的结果.
  const result = obj.apply(newObj, rest);

  // 如果执行结果有返回值并且是一个对象, 返回执行的结果, 否则, 返回新创建的对象
  return typeof result === "object" ? result : newObj;
}

function Person(firtName, lastName) {
  this.firtName = firtName;
  this.lastName = lastName;
}

function A() {
  console.log("1");
  this.a = 1;
}
A.prototype.walk = function () {};

let a = new A();
console.log(Object.getPrototypeOf(a));

let aa = {
  0: "a",
  1: "b",
  2: "c",
  length: 3,
  [Symbol("PrimitiveValue")]: "abc",
};
console.log(aa);
console.log(Object("abc"));
console.log(new A());
console.log(aa === Object("abc"));
