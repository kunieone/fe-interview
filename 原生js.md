## instaneof 和 typeof 的区别？

## null 和 undefined?

## Promise 相关的内容

## 在挂载（mount）时，会做以下工作：

- 初始化 Vue 实例：Vue 实例会根据传入的选项（option）进行初始化，包括数据、计算属性、方法等。
- 创建虚拟 DOM：Vue 会根据模板（template）创建虚拟 DOM（Virtual DOM），并对虚拟 DOM 进行初始化。
- 编译模板：Vue 将模板编译成渲染函数，用于生成虚拟 DOM。
- 执行 beforeMount 钩子函数：在挂载开始之前，Vue 会执行 beforeMount 钩子函数，这个函数可以用于在挂载开始之前进行一些操作。
- 将虚拟 DOM 渲染为真实 DOM：Vue 会将虚拟 DOM 渲染成真实的 DOM 节点，并插入到页面中。
- 执行 mounted 钩子函数：在挂载完成后，Vue 会执行 mounted 钩子函数，这个函数可以用于在挂载完成后进行一些操作，例如 DOM 操作、网络请求等。
- 在挂载过程中，Vue 会根据数据的变化重新生成虚拟 DOM，并更新到真实的 DOM 节点中，从而实现了响应式的效果。

## 遗漏 commit 怎么做？

## Map 和 Object 的区别
