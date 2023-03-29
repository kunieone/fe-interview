// 目标构造函数
function TargetConstructor() {
  this.targetProperty = "target";
}

// 实例化一个目标构造函数的对象
const obj = new TargetConstructor();

// 将该对象的原型链指向新构造函数的实例对象
obj.__proto__ = Object.create(String.prototype);

console.log(obj instanceof TargetConstructor); // 输出：false
console.log(obj instanceof String); // 输出：true
console.log(obj);
console.log(String("a"));

String.prototype = null;
console.log(String("b"));
