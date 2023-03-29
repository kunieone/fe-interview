## TS 协变和逆变

## 如何理解面向对象和函数式编程

### 函数式编程

特点：

- 函数是一等公民：函数也是一种类型，可以被传入也可以被传出。
- 声明式编程： 代码可读性强，不需要关注函数逻辑，写完了业务的逻辑，在完成每一步对应的函数
- 纯函数
  1. 引用透明（纯输入纯输出）（输出值仅由输入值影响）
  2. 数据不可变 （传入的引用类型的参数不能被改变，改变了就是篡改了外部的状态）如果要更新，可以 return 出去然后在外部赋值。
  3. 没有副作用（比如说我在面向对象的时候需要在方法中修改 this 下的状态，这样会导致看不见的地方的数据被改变，会带来意料之外的错误

### 面向对象

- 封装
  每一个实例化的对象的修改实际上都是对一组状态的封装

- 继承
  把相似逻辑写成模板，用父子关系不断构建类似于现实物体的逻辑。

- 多态
  对不不同的地方使用多态（重载和覆盖）的方法完成具体的修改。

### 共同点

两者都好处:都有利于高效率的开发，更容易维护

坏处：函数式占空间大，因为默认数据不可变，如果要在处理过程发生变化需要复制空间这样
面向对象容易简单逻辑复杂化，

### 不同点

函数式对多线程处理比较方便，因为默认数据不可变也就省掉了很多的互斥锁。而面向对象由于状态的共享会导致多线程操控不对象共享的状态。容易死锁

## JS 的基本类型？数字是对象吗？

在 JavaScript 中，基本数据类型有七种：null、undefined、boolean、number、string、symbol 和 bigint。

其中，前六种基本数据类型不是对象，它们是原始值，它们没有属性和方法。虽然 JavaScript 中的基本数据类型不是对象，但是 JavaScript 引擎会自动将其转换为对象，从而可以让我们调用一些方法。

例如，我们可以在字符串上调用 toUpperCase() 方法，虽然字符串是基本数据类型，但是 JavaScript 引擎会自动将其转换为 String 对象，以便我们调用该方法。

至于第七种基本数据类型 bigint，它是在 ECMAScript 2020 中新增的。它是一种用来表示大整数的数据类型，它也不是对象，但是它可以使用一些基本的方法，例如 toString() 和 valueOf()。

## Vue3 如何实现双向绑定，Vue2 的区别

Vue2:
Vue2 实现双向绑定的原理是通过数据劫持（Data Observation）来实现的。

在 Vue2 中，通过使用 Object.defineProperty 方法来劫持组件的 data 对象中的属性，从而实现对属性的访问控制，当数据变化时，通过调用 Watcher 对象的 update 方法来通知对应的视图进行更新。而在模板中使用 v-model 指令时，Vue2 会将表单元素的 value 绑定到组件 data 对象中的对应属性上，并通过监听表单元素的 input 或 change 事件来实现视图到数据的绑定.

具体来说，当表单元素的值发生变化时，会触发对应的 input 或 change 事件，然后 Vue2 会通过绑定的 setter 方法将新的值赋给对应的 data 属性，此时又会触发数据劫持中的 setter 方法，从而通过 Watcher 对象将数据变化通知给视图进行更新。

## 如何理解 Python 里的 async await 如何理解 JS 的异步 async await

## 是否做过页面网站，使用的布局方式（说的 flex）

## 接触过 svelte 吗，有什么特点啥的

## 说说 EventLoop

https://dmitripavlutin.com/javascript-promises-settimeout/

JS 的运行时包括：

1. 调用栈，全局的代码没调用一次函数，将会压入一帧到栈中
2. 堆，用于存储对象的一片内存空间，通常是非线性，非结构化的。
3. 消息队列，被处理的消息会被移出队列，并作为输入参数来调用与之关联的函数。创造一个新的栈帧到调用栈中 (JobQueue,TaskQueue)

事件循环：

```
while (queue.waitForMessage()) {
  queue.processNextMessage();
}
```

JavaScript 的事件循环模型与许多其他语言不同的一个非常有趣的特性是，它永不阻塞。处理 I/O 通常通过事件和回调来执行，所以当一个应用正等待一个 IndexedDB 查询返回或者一个 XHR 请求返回时，它仍然可以处理其他事情，比如用户输入。

```
A --+---------------------------+-------------> B JS 线程
        |                       |(完成通知 JS 线程)
        -----让 CPU 处理 I/O---

```

(这个线程是什么呢？当 Event Loop 需要执行 I/O 操作时，它将从一个池（通过 Libuv 库）中使用系统线程，当这个作业完成时，回调将排队等待在 “pending callbacks” 阶段被执行。)

Node.JS 在 CPU 密集的操作中有劣势，因为无法完成对多个 CPU 的同时使用，但是在 Node10 加入了工作线程，弥补了部分的不足。

node 的工作原理： node 使用 chrom 的 V8 引擎来解释编译 JS 语言，将编译后的代码传递给 libuv，在 libuv 中进行区别是调用 linux 的 libev/libio 还是 window 的 IOCP 实现具体操作

事件环工作原理：node 执行 JS 调用栈中的代码，发现宏任务将其放到对应的宏任务队列，微任务放到微任务队列。将 JS 栈中的代码执行完毕后，清空微任务队列，进入事件环，取出第一个宏任务进入 JS 执行栈执行。完毕后，清空微任务对列，进入宏任务取下一个，形成事件环

注意：process.nextTick 微任务会在微任务队列中第一个执行

浏览器与 node 将异步任务分为宏任务与微任务

首先执行 js 主线程中得代码，将对应的宏任务与微任务分别放入宏任务队列与微任务队列

- js 主线程代码执行完毕
- 清空微任务队列
- 取出第一个宏任务执行,
- 重复以上操作后将宏任务队列中完成的回调一次取出执行。

## 如果一个 Golang 写了没有任何约束的包含 T 泛型的函数，编译之后 T 会展开成所有类型吗？

在 Golang 中，泛型类型是通过类型参数来实现的，而不是通过预处理展开的方式。因此，在编译时，泛型类型并不会展开成所有类型。

相反，当你在调用泛型函数时，你需要为函数提供具体的类型参数，这些类型参数将被用于实例化泛型函数中的类型参数。这意味着泛型函数只会在运行时实例化为具体的类型。

## 如何理解泛型,TS 中的泛型与 Golang 中新加入的泛型

## Cookie 和 Session？

Cookie 是一种在客户端存储数据的技术，可以用来识别用户并记住他们的偏好设置等信息。Cookie 通常由服务器发送给浏览器，在浏览器内存储，并随后每次请求时被发送回服务器。
Session 是在服务端存储数据的技术，可以用来存储有关特定用户的信息，例如登录状态、购物车内容等。每个会话都由唯一的会话 ID（Session ID）标识，通常由服务器生成并通过 Cookie 在浏览器中存储。

## Node.js 的工作原来？Node.js 的非阻塞 IO 实现了什么？解决了什么

## 说一下常见的数据结构

线性：

- 线性表
- 链表
- 队列
  - 优先队列
  - 单调队列
- 栈
- 堆

  非线性：

- 树：
  - 二叉树
    - 红黑树
    - B+树
    - BST
    - AVL
  - 多叉树
- 图
  - 有向图无向图
  - 带权图非带权图

## git fetch & git pull

fetch 只是下载远程的更改到本地的仓库，而 git pull 是将远程代码直接拉取并合并到目前的这个更改的分支上。

## Virtual DOM 与 diff 算法

Diff 算法是一种对比算法。对比两者是旧虚拟 DOM 和新虚拟 DOM，对比出是哪个虚拟节点更改了，找出这个虚拟节点，并只更新这个虚拟节点所对应的真实节点，而不用更新其他数据没发生改变的节点，实现精准地更新真实 DOM，进而提高效率。
使用虚拟 DOM 算法的损耗计算：
总损耗 = 虚拟 DOM 增删改+（与 Diff 算法效率有关）真实 DOM 差异增删改+（较少的节点）排版与重绘
直接操作真实 DOM 的损耗计算：
总损耗 = 真实 DOM 完全增删改+（可能较多的节点）排版与重绘

Vue 框架中涉及到算法的部分包括虚拟 DOM 算法。虚拟 DOM 算法是 Vue 框架用于优化 DOM 操作的一种算法，它通过在 JavaScript 内部构建虚拟的 DOM 树来代替直接操作真实的 DOM 元素，从而避免频繁的重排和重绘操作，提高性能。其时间复杂度为 O(n)，其中 n 为虚拟 DOM 节点数量。

### 虚拟 DOM 过程

虚拟 DOM 算法的比较过程，通常称为“diff 算法”，可以分为以下几个步骤：

对比新旧树的根节点，如果不同，则替换真实 DOM 中的根节点，并将新树的子树全部重新渲染到真实 DOM 中。

如果新旧树的根节点相同，则对比它们的子节点。这个过程使用类似于编辑距离算法的动态规划思想，通过遍历新旧树的所有节点来计算它们之间的差异。

对比后的差异以一定的规则应用到真实 DOM 树中，使其与新虚拟 DOM 树一致。

通过以上步骤，Vue 框架可以高效地更新需要变化的部分，而不必重新渲染整个页面，从而提高了性能。

### Diff 算法的原理

当数据改变时，会触发 setter，并且通过 Dep.notify 去通知所有订阅者 Watcher，订阅者们就会调用 patch 方法，给真实 DOM 打补丁，更新相应的视图。

## 多语言项目的开发经验

多语言适配（i18n）与使用哪种前端框架无关。

本质上是维护一个 map，然后通过一个中间层返回当前语种的显示内容。

这个 map 可以存储在 DB，通过 HTTP 接口获取；
也可以硬编码在 javascript 文件中，通过某个公共的 translate 方法获取；

当前语种可以由用户选择存储在本地；
也可以由 WebServer 通过判断客户端 IP 地址来识别使用哪种语种；

## JS 内部的 sort 使用的是什么算法

插入排序和快速排序相结合

## 懒加载和预加载

懒加载是指在页面滚动时，按需加载图片或其他资源，而不是在页面加载时就一次性加载全部资源。这种技术可以减少页面的初始加载时间，提高网页的响应速度。懒加载可以用于图片、视频、音频等大型资源的加载，或者用于网站中需要滚动加载的内容。

预加载是指在页面加载时，提前加载一些可能需要用到的资源，以便在需要时能够立即显示。这些资源包括图片、CSS 文件、JavaScript 文件、字体文件等。预加载可以缩短资源的加载时间，提高网页的响应速度，增强用户体验。

## 浏览器点击返回的底层运行逻辑是什么样的？

- 浏览器点击返回的底层运行逻辑包括以下步骤：
- 浏览器将当前页面压入历史记录栈中。
- 加载历史记录栈中的前一个页面，并从缓存中读取该页面的资源（如 HTML、CSS、JS 等）。
- 重建前一个页面的 DOM 树和渲染树，并执行其中的 JavaScript 代码。
- 将前一个页面的渲染结果绘制到屏幕上。

## 你认为 CompositionAPI 的优缺点在哪里？

- CompositionAPI 是 Vue3 中新增的一组 API，提供了一种更灵活、可组合的方式来编写组件逻辑。其优点包括：
- 更灵活：与 Vue2 的 Options API 相比，Composition API 不再强制按照生命周期钩子函数的顺序编写代码，可以更自由地组织代码逻辑。
- 可组合：Composition API 支持将逻辑分解为多个可重用、可组合的函数，方便代码复用和测试。
- 更好的类型推断：Composition API 借助 TypeScript 的类型推断机制，能够提供更准确的类型提示。

- 可能会增加代码的复杂度和理解难度。

## 如何理解前端工程化？

前端工程化是指使用各种工具和技术来提高前端开发效率、降低开发成本和维护成本，包括代码管理、构建打包、自动化测试、持续集成、部署等方面。前端工程化的目标是实现代码质量的统一、开发流程的规范化、协作效率的提高和项目交付速度的加快。

## 告诉我一些 NPM 的命令，越多越好。

npm install：安装依赖包。
npm run xxx：运行脚本命令，例如 npm run dev。
npm start：启动应用程序。
npm test：运行测试脚本。
npm publish：发布模块到 NPM 仓库。
npm outdated：检查过期的依赖包。
npm update：更新依赖包。
npm uninstall：卸载依赖包。

## 告诉我一些常用的 Linux 命令，越多越好。

ls：列出当前目录下的文件和目录。
cd：切换当前目录。
pwd：显示当前目录的完整路径。
mkdir：创建目录。
rm：删除文件或目录。
cp：复制文件或目录。
mv：移动文件或目录。
grep：搜索文本。
tar：打包和解压文件。
top：监视系统进程。
ps：列出当前系统中的进程。

## ES6 中 new 的过程

new 实现过程
创建一个新的空对象
把 this 绑定到空对象
使空对象的**proto**指向构造函数的 prototype
执行构造函数，为空对象添加属性
判断构造函数的返回值是否为对象，如果是对象，就使用构造函数的返回值，否则返回创建的对象

## 为什么类创建的实例不能直接使用`__proto__`获取到原型对象？

在 JavaScript 中，类通过原型和构造函数实现。每个对象都有一个内部属性 [[Prototype]]（即原型），可以使用 Object.getPrototypeOf() 方法获取。proto 属性是指向当前对象的原型的非标准私有属性，应该避免直接使用它来修改原型对象，因为这可能会对所有实例对象产生影响，并且与规范不符。在生产环境中，优先使用标准方法 Object.getPrototypeOf() 获取实例对象的原型，然后再为原型对象添加属性或方法。原型是实现继承机制的基础，访问最顶层原型可以使用 Object.prototype。理解和掌握原型概念对编写高效、可靠的 JavaScript 代码非常重要。

## ES6 的对象静态方法：

```js
Object.is()
Object.assign()
Object.getOwnPropertyDescriptors()
__proto__属性，Object.setPrototypeOf()，Object.getPrototypeOf()
Object.keys()，Object.values()，Object.entries()
Object.fromEntries()
Object.hasOwn()
```

## 双因素认证？

https://www.ruanyifeng.com/blog/2017/11/2fa-tutorial.html

## 同源策略是什么？

同源策略是指只有具有相同源的页面才能够共享数据，比如 cookie，同源是指页面具有相同的协议、域名、端口号，有一项不同就不是同源。 有同源策略能够保证 web 网页的安全性。

## Promise Generator 和回调函数实现异步的区别

## 对象中什么不可枚举？什么可以枚举？如何创建一个不可枚举的属性?

## Object.fromEntries()?

ES2019 中新增的方法，它可以将一个键值对数组转换成一个对象。

具体来说，Object.fromEntries() 接收一个包含若干个键值对的数组，每个键值对都是一个长度为 2 的数组，第一个元素表示属性名，第二个元素表示属性值。方法将这些键值对转换成一个新的对象，并返回该对象。

下面是一个例子：

```js
const entries = [
  ["foo", 1],
  ["bar", 2],
];
const obj = Object.fromEntries(entries);

console.log(obj); // { foo: 1, bar: 2 }
```

在上面的例子中，通过将 entries 数组传递给 Object.fromEntries() 方法，得到了一个包含 foo 和 bar 两个属性的新对象 obj。

需要注意的是，如果 entries 数组中存在重复的属性名，则后面的值会覆盖前面的值，例如：

```js
const entries = [
  ["foo", 1],
  ["bar", 2],
  ["foo", 3],
];
const obj = Object.fromEntries(entries);

console.log(obj); // { foo: 3, bar: 2 }
```

在上面的例子中，entries 数组中存在两个 foo 属性，但是最终生成的对象中只有一个 foo 属性，其值为 3。

## 说说 Vue.js 中的 v-cloak 指令

可以使用 v-cloak 指令设置样式，这些样式会在 Vue 实例编译结束时，从绑定的 HTML 元素上被移除。

当网络较慢，网页还在加载 Vue.js ，而导致 Vue 来不及渲染，这时页面就会显示出 Vue 源代码。我们可以使用 v-cloak 指令来解决这一问题。

```html
<div id="app">{{context}}</div>
```

```js
<script>
    var app = new Vue({
        el: '#app',
        data: {
            context:'互联网头部玩家钟爱的健身项目'
        }
    });
</script>
```

我们使用 v-cloak 指令来解决屏幕闪动的问题吧 O(∩_∩)O~

js 不变，在 div 中加入 v-cloak 指令。

```html
<div id="app" v-cloak>{{context}}</div>
```

```css
[v-cloak] {
  display: none;
}
```

使用 v-cloak 指令之后的效果（demo）：

在简单项目中，使用 v-cloak 指令是解决屏幕闪动的好方法。但在大型、工程化的项目中（webpack、vue-router）只有一个空的 div 元素，元素中的内容是通过路由挂载来实现的，这时我们就不需要用到 v-cloak 指令咯。

## 路由挂载

## WEB 应用从服务器主动推送 Data 到客户端有那些方式？

- HTML5 WebSocket
  HTML5 WebSocket 是一种基于 TCP 协议的全双工通信协议。通过浏览器建立 WebSocket 连接后，服务器可以主动向客户端推送数据。

- WebSocket 通过 Flash
  在不支持 HTML5 WebSocket 的浏览器环境下，可以通过引入 Flash 插件实现 WebSocket 功能。Flash 可以利用 Socket 类与服务器建立连接，并通过 ActionScript 代码调用 JavaScript 接口，实现浏览器与服务端的双向通信。

- XHR 长时间连接
  XHR 长时间连接是指通过 XMLHttpRequest 对象发送一个长期挂起的请求，直到服务器有数据更新时才返回响应结果。客户端收到响应后，可以通过 JavaScript 代码再次发送一个新的请求，保持长时间连接。

- XHR Multipart Streaming
  XHR Multipart Streaming 是一种基于 HTTP 的流媒体传输技术。服务器向客户端发送多个 HTTP 响应，每次发送一部分数据，在客户端脚本中通过 XMLHTTPRequest 对象逐步解析这些数据。

- 不可见的 Iframe
  不可见的 Iframe 是一种通过添加一个隐藏的 iframe 元素来实现推送的方式。在服务器端将内容写入 iframe 中的 body 标签，并通过 JavaScript 控制 iframe 的高度，从而实现 DOM 更新和消息推送。

- \<script> 标签的长时间连接(可跨域)

  \<script> 标签的长时间连接是指利用 script 标签的 src 属性与服务器建立一个长时间挂起的请求。服务器返回的响应是一段 JavaScript 代码，客户端通过执行这段代码来获取数据并更新页面。由于 script 标签的跨域特性，这种方式可以实现跨域推送数据。

## 完整的路由解析过程

1、导航被触发
2、在失活的组件里调用离开守卫
3、调用全局的 beforeEach 守卫
4、在重用的组件里调用 beforeRouteUpdate 守卫
5、在路由配置里调用 beforEnter
6、解析异步路由组件
7、在被激活的组件里调用 beforeRouteEnter
8、调用全局的 beforeResolve 守卫
9、导航被确认
10、调用全局的 afterEach 钩子
11、触发 DOM 更新
12、在创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数

## 完成一个路由拦截登录：

```js
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",

      component: (resolve) => {
        require(["../components/Home"], resolve);
      },
    },
    {
      path: "/record",
      name: "record",
      component: (resolve) => {
        require(["../components/Record"], resolve);
      },
    },
    {
      path: "/Register",
      name: "Register",
      component: (resolve) => {
        require(["../components/Register"], resolve);
      },
    },
    {
      path: "/Luck",
      name: "Luck",
      // 需要登录才能进入的页面可以增加一个 meta 属性
      meta: {
        requireAuth: true,
      },
      component: (resolve) => {
        require(["../components/luck28/Luck"], resolve);
      },
    },
  ],
});

// 判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
  if (to.matched.some((res) => res.meta.requireAuth)) {
    // 判断是否需要登录权限
    if (localStorage.getItem("username")) {
      // 判断是否登录
      next();
    } else {
      // 没登录则跳转到登录界面
      next({
        path: "/Register",
        query: { redirect: to.fullPath },
      });
    }
  } else {
    next();
  }
});

export default router;
```

## 由易到难，高频到低频。

HTML、CSS、JS 基础知识

flex: 0 1 auto 是什么意思？
css 有哪些伪元素选择器
HTML5 语义化标签有哪些？
闭包编程题
手写 Promise 实现
手写 requestCache 实现
同步异步、微任务宏任务
深拷贝

生命周期钩子函数
如何获取原始 DOM
如何获取虚拟 DOM
原理是什么？如何实现？
对 diff 的理解
数据双向绑定如何实现？兼容性？
状态管理、组件通信
路由跳转
ElementUI、antd 基本框架搭配 UI 库

组件化开发
源码理解程度
能力熟悉程度
浏览器基本知识

浏览器缓存原理
本地存储
基本能力（上传、下载）

## Vue2 和 Vue3 的区别

1. main.js 不同，vue2 和 vue3 的 vue 实例挂载方式不一样。
2. 父子传参不同，vue2：父传子，用 props,子传父用事件 Emitting Events。在 vue2 中，会调用 this.$emit 然后传入事件名和对象。vue3：父传子，用 props,子传父用事件 Emitting Events。在 vue3 中的 setup()中的第二个参数 content 对象中就有 emit，那么我们只要在 setup()接收第二个参数中使用分解对象法取出 emit 就可以在 setup 方法中随意使用了。
3. vue3 支持 Fragment。也就是有多个根节点
4. vue3 可以使用组合式 api，也就是逻辑写在 setup 函数，相比于旧的 api 使用属性来分组，这样代码会更加简便和整洁。
5. 生命周期钩子函数不同。Vue2--------------vue3

- beforeCreate -> setup()
- created -> setup()
- beforeMount -> onBeforeMount
- mounted -> onMounted
- beforeUpdate -> onBeforeUpdate
- updated -> onUpdated
- beforeDestroy -> onBeforeUnmount
- destroyed -> onUnmounted
- activated -> onActivated
- deactivated -> onDeactivated
- errorCaptured -> onErrorCaptured

## 箭头函数和 function 函数的区别

首先说一下箭头函数的一些特殊用法：

1. 不需要返回值，但是省略大括号：
   `let fn = () => void doesNotReturn();`
2. 返回对象，但是防止歧义：
   `let getTempItem = id => ({ id: id, name: "Temp" });`
3. 箭头函数不会创建自己的 this
4. 箭头函数继承而来的 this 指向永远不变（重要！！深入理解！！）
5. .call()/.apply()/.bind()无法改变箭头函数中 this 的指向
6. ### 箭头函数不能作为构造函数使用 了解一下构造函数的 new 都做了些什么？简单来说，分为四步：
   ① JS 内部首先会先生成一个对象；
   ② 再把函数中的 this 指向该对象；
   ③ 然后执行构造函数中的语句；
   ④ 最终返回该对象实例。
   但是！！因为箭头函数没有自己的 this，它的 this 其实是继承了外层执行环境中的 this，且 this 指向永远不会随在哪里调用、被谁调用而改变，所以箭头函数不能作为构造函数使用，或者说构造函数不能定义成箭头函数，否则用 new 调用时会报错！ 7.箭头函数没有自己的 arguments
7. 箭头函数没有原型 prototype

## Object.is()

用于判断两个值是否相等。它与 === 运算符类似，但对于 NaN 的比较有所不同。Object.is() 认为 NaN 等于 NaN，而 === 则不认为它们相等

## null vs undefined

null 表示"没有对象"，即该处不应该有值。
undefined 表示"缺少值"，就是此处应该有一个值，但是还没有定义。

## `object["someAttr"]`和 `object.someAttr` 的区别

1. 属性名称限制
2. 括号表示法的动态性

## Symbol 的使用场景

1. 框架作者防止自己的库写的一些属性方法被覆盖，使用 Symbol 作为属性
2. 消除魔术字符串，或者说用作枚举
3. 作为对象的私有方法

## JS 数据类型判断的九种方式

1. typeof
2. instanceof
3. constructor
4. Number.isNaN
5. Array.isArray
6. 与固定值进行比较
7. Object.prototype.toString
8. Object.prototype.isPrototypeOf：和 instanceof 类似

## for...of 循环可以使用的范围包括：

- 数组
- Set
- Map
- arguments 对象、DOM NodeList 对象
- Generator 对象
- 字符串

## HTTP2

HTTP/2（超文本传输协议第 2 版，最初命名为 HTTP 2.0），简称为 h2（基于 TLS/1.2 或以上版本的加密连接）或 h2c（非加密连接），是 HTTP 协议的的第二个主要版本，使用于万维网。

## 旧版本问题

多个 TCP 连接：虽然 HTTP/1.1 管线化可以支持请求并发，但是浏览器很难实现，主流浏览器厂商都禁用了管线化
队头阻塞：TCP 连接上只能发送一个请求，由于单连接上的串行请求，前面的请求未完成前，后续的请求都在排队等待
头部冗余：HTTP/1.x 采用文本格式传输，首部未压缩，无状态特性让每个请求都会带上 Cookie、User-Agent 等重复的信息
不支持服务端主动推送：HTTP/1.1 不支持服务推送消息，只能使用轮询的方式解决
新特性
在了解 HTTP/2 新特性前，可以通过 DEMO 直观感受 HTTP/1.1 与 HTTP/2 的差距：

HTTP/2: the Future of the Internet | Akamai

## 主要新特性

传输数据量大量减少
二进制分帧
标头压缩
多路复用及相关功能
多路复用
优先级与依赖性
服务器消息推送
服务器推送
其他
重置流
流量控制
HTTPS RFC 规范并没有要求 HTTP2 强制使用 TLS，但是目前世界所有浏览器和服务器实现都基于 HTTPS 来实现 HTTP2
