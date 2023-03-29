## 说一下伪数组

伪数组（类数组对象）一般指的是具有 length 属性，且包含一些数字索引属性的对象，例如 NodeList 对象，arguments 对象等。

这些对象与真正的数组类似，但并不完全相同。例如，它们通常不具有数组对象所具有的方法和属性，例如 forEach、map、reduce 等。

对于这些对象，可以使用 for...of 语句进行迭代，但是需要将其转换为真正的数组对象。可以使用 Array.from 方法或者扩展运算符...来将伪数组转换为真正的数组对象，然后再进行迭代。

例如，使用 Array.from 方法：

```javascript
const nodeList = document.querySelectorAll("div"); // 获取 NodeList 对象
const array = Array.from(nodeList); // 将 NodeList 对象转换为真正的数组对象
for (const item of array) {
  console.log(item);
}
```

使用扩展运算符...：

```javascript
const nodeList = document.querySelectorAll("div"); // 获取 NodeList 对象
const array = [...nodeList]; // 将 NodeList 对象转换为真正的数组对象
for (const item of array) {
  console.log(item);
}
```

需要注意的是，一些旧版本的浏览器可能不支持 for...of 语句和 Array.from 方法，可以使用传统的 for 循环进行迭代。

哪些伪数组？

- 获取 DOM 的时候，一系列的 DOM 就是伪数组(NodeList)

## 理解 Vue 的单向数据流

所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。
额外的，每次父级组件发生更新时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你不应该在一个子组件内部改变 prop。如果你这样做了，Vue 会在浏览器的控制台中发出警告。子组件想修改时，只能通过 $emit 派发一个自定义事件，父组件接收到后，由父组件修改。
有两种常见的试图改变一个 prop 的情形 :

这个 prop 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的 prop 数据来使用。 在这种情况下，最好定义一个本地的 data 属性并将这个 prop 用作其初始值：

```js
props: ['initialCounter'],
data: function () {
return {
counter: this.initialCounter
}
}
```

这个 prop 以一种原始的值传入且需要进行转换。 在这种情况下，最好使用这个 prop 的值来定义一个计算属性

```js
props: ['size'],
computed: {
normalizedSize: function () {
return this.size.trim().toLowerCase()
}
}
```

## call 和 bind 的区别

call 和 bind 都是 Javascript 中用于改变函数上下文（this）的方法，它们的主要区别在于它们的执行方式和返回值。

call 方法是在函数上调用的，它的第一个参数是需要绑定到函数上下文的对象，后面的参数是函数调用时的参数。call 方法会立即执行函数并返回函数执行后的结果。例如：

```javascript
const obj = { name: "John" };

function sayName() {
  console.log(this.name);
}

sayName.call(obj); // 输出 "John"
```

在这个例子中，我们使用 call 方法将 obj 对象绑定到 sayName 函数的上下文中，并且立即执行了 sayName 函数。

bind 方法是在函数上调用的，它的第一个参数是需要绑定到函数上下文的对象，后面的参数是函数调用时的参数。bind 方法不会立即执行函数，而是返回一个新的函数，该函数的上下文已经被绑定到指定的对象。例如：

```javascript
const obj = { name: "John" };

function sayName() {
  console.log(this.name);
}

const boundFunc = sayName.bind(obj); // 绑定上下文并返回新的函数
boundFunc(); // 输出 "John"
```

在这个例子中，我们使用 bind 方法将 obj 对象绑定到 sayName 函数的上下文中，并且返回一个新的函数 boundFunc，该函数的上下文已经被绑定到 obj 对象。然后我们调用 boundFunc 函数，它将输出 obj 对象的 name 属性。

因此，call 方法和 bind 方法的主要区别在于它们的执行方式和返回值。call 方法会立即执行函数并返回函数执行后的结果，而 bind 方法返回一个新的函数，该函数的上下文已经被绑定到指定的对象，需要再次调用该函数才能执行。

## MVVM

MVVM 是一种常见的软件架构设计模式，用于实现用户界面和应用程序逻辑之间的分离。MVVM 模式包含三个核心组件：Model（模型）、View（视图）和 ViewModel（视图模型）。

Model 层代表数据模型，也可以在 Model 中定义数据修改和操作的业务逻辑。View 层代表用户界面，负责将数据模型转化成 UI 展现出来。在 MVVM 架构下，View 和 Model 之间并没有直接的联系，而是通过 ViewModel 进行交互。ViewModel 充当了 View 和 Model 之间的中介，负责协调两者之间的交互。

ViewModel 通过双向数据绑定把 View 层和 Model 层连接了起来，而 View 和 Model 之间的同步工作完全是自动的，无需人为干涉，因此开发者只需关注业务逻辑，不需要手动操作 DOM，不需要关注数据状态的同步问题，复杂的数据状态维护完全由 MVVM 来统一管理。

在 MVVM 架构中，ViewModel 是 View 的抽象，它负责为 View 提供数据和业务逻辑。ViewModel 通常是一个包含了多个属性和方法的类，其中的属性和方法是为 View 提供数据和操作的接口。ViewModel 通过与 Model 交互来获取数据和执行业务逻辑，然后将处理好的数据提供给 View 进行展示。同时，ViewModel 还会监听 View 的变化，并且在需要的时候更新 Model 的数据。

ViewModel 在实现上通常使用双向数据绑定技术来与 View 进行交互。在这种模式下，ViewModel 将自己绑定到 View 的数据绑定引擎中，当 View 的数据发生变化时，ViewModel 会立即收到通知，然后根据变化的情况更新自己的状态，最后再将新的状态反馈到 View 中。反过来，当 ViewModel 的状态发生变化时，它也会通知 View，并将新的数据状态反馈到 View 中进行展示。这种双向绑定的方式可以让 ViewModel 和 View 之间的交互变得更加自然和流畅。

总之，MVVM 架构通过将业务逻辑、数据处理和 UI 分离，提高了代码的可维护性和可测试性，同时还可以降低开发难度，提高开发效率。

## watch 和 computed 的区别

```

```

## 直接给一个数组项赋值，Vue 能检测到变化吗？

由于 JavaScript 的限制，Vue 不能检测到以下数组的变动：

当你利用索引直接设置一个数组项时，例如：`vm.items[indexOfItem] = newValue`
当你修改数组的长度时，例如：`vm.items.length = newLength`

为了解决第一个问题，Vue 提供了以下操作方法：

```js
// Vue.set
Vue.set(vm.items, indexOfItem, newValue);
// vm.$set，Vue.set的一个别名
vm.$set(vm.items, indexOfItem, newValue);
// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue);
//为了解决第二个问题，Vue 提供了以下操作方法：
// Array.prototype.splice
vm.items.splice(newLength);
```

### Vue3 对这个问题有什么修复？

在 Vue 3 中，Vue 引入了 Proxy 对象来代替了 Vue 2 中的 Object.defineProperty，这样 Vue 就可以更好地跟踪数组项的变化。因此，直接给一个数组项赋值，Vue 3 能够检测到变化并及时更新视图。不再需要使用 Vue.set、vm.$set 或 Array.prototype.splice 等方法来手动触发更新。

## CSS 样式穿透

需要注意：

```md
( >>> 只作用于 css
::v-deep 只作用于 sass
/deep/ 只作用于 less
```
