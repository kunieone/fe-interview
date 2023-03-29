// ts内的infer:

type Arr = ["a", "b", "c"];

type pop<T extends any[]> = T extends [infer first, ...infer rest, unknown]
  ? rest
  : [];

type a = pop<Arr>;
console.log(a);

type Nums = [1, 2, 3, 4];
// 递归infer：
type ReverseNums<T extends any[]> = T extends [infer First, ...infer rest]
  ? [...ReverseNums<rest>, First]
  : [];

let re: ReverseNums<Nums> = [4, 3, 2, 1];
