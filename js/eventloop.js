// 使用 setImmediate() 方法添加任务
setImmediate(function () {
  console.log("Task 1")
})

// 使用 setTimeout() 方法添加任务
setTimeout(function () {
  console.log("Task 2")
}, 0)
