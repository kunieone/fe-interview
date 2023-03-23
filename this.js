let name = "小王",
  age = 17;

let obj = {
  name: "小张",
  outterAge: this.age,
  age: 24,
  getInfo: function () {
    const age = 20;
    console.log("名字", this.name, "年龄", this.age, age, global.age);
    console.log("我是全局作用域吗", this === global);
  },
};

const { getInfo } = obj;
global.__proto__.age = 90;
getInfo();
getInfo.call(obj);

console.log(Function.prototype.call);
/* call 、bind 、 apply 这三个函数的第一个参数都是 this 的指向对象，第二个参数差别就来了：
call 的参数是直接放进去的，第二第三第 n 个参数全都用逗号分隔，直接放到后面 obj.myFun.call(db,'成都', ... ,'string' )。apply 的所有参数都必须放在一个数组里面传进去 obj.myFun.apply(db,['成都', ..., 'string' ])。bind 除了返回是函数以外，它 的参数和 call 一样。
当然，三者的参数不限定是 string 类型，允许是各种类型，包括函数 、 object 等等！ */
