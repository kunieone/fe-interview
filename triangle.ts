const printTriangle = (rows: number): void => {
  let spaces = 2 * (rows - 1);
  for (let i = 0; i < rows; i++) {
    console.log(" ".repeat(spaces) + "* ".repeat(2 * i) + "*");
    spaces -= 2;
  }
};

// 输出五行的三角形
printTriangle(5);

type Arr = (number | string | any[])[];
type OutArr = (number | string)[];
const filterNonArrayElements = (arr: Arr): OutArr =>
  arr.filter((item) => typeof item !== "object") as OutArr;

// 羊空空空空空羊
//  <-向左填充 填充终点:1
// 羊羊空空空空空
