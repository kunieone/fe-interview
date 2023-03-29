const fs = require("fs");

function blue(text) {
  return `\x1b[34m${text}\x1b[0m`;
}

function getIndex(index) {
  return `${(index + 1).toString().padStart(4, "0")}.`;
}
fs.readFile("readme.md", "utf-8", (err, data) => {
  if (err) throw err;

  // 使用正则表达式匹配所有标题及其后面的内容，并将它们存储在对象中
  const sections = {};
  const regex = /^##\s(.+)$/gm;
  let match;
  while ((match = regex.exec(data)) !== null) {
    const title = `## ${match[1]}`;
    const start = match.index + match[0].length + 1;
    const end = data.indexOf("\n## ", start);
    const content = end === -1 ? data.slice(start) : data.slice(start, end);
    sections[title] = content;
  }
  console.log(Object.keys(sections));
  // 按照标题排序输出每个分文的标题和内容
  const sortedTitles = Object.keys(sections).sort();
  let output = "";
  sortedTitles.forEach((title) => {
    // console.log(blue(title));
    // console.log(sections[title]);
    output += `${title}\n${sections[title]}\n\n`;
  });

  // 将结果输出到指定文件中
  const outputFilename = "output.md";
  fs.writeFile(outputFilename, output, (err) => {
    if (err) throw err;
    console.log(`Output written to ${outputFilename}`);
  });
});
