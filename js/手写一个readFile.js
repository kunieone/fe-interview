const fs = require("fs")
const path = require("path")
const { open } = fs.promises

function myReadFile(filePath, encoding, callback) { }

// 使用示例
myReadFile("./key", "utf-8", (err, data) => {
  if (err) throw err
  console.log(data)
})
