// 防抖
function debounce(fn, delay) {
  let timer;
  return function () {
    clearTimeout(timer);
    const context = this;
    const args = arguments;
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}

// 节流
function throttle(func, delay) {
  let timer;
  return function () {
    const context = this;
    const args = arguments;
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(context, args);
        timer = null;
      }, delay);
    }
  };
}

function time(fn) {
  let name = fn.toString().match(/^function\s*([^\s(]+)/)[1];
  return function () {
    console.time(name);
    fn();
    console.timeEnd(name);
  };
}
// 柯里化
const curry = (fn) =>
  (judge = (...args) =>
    args.length === fn.length ? fn(...args) : (arg) => judge(...args, arg));

// 函数记忆
function memorize() {
  const cache = {};
  return function () {
    const key = Array.prototype.call(arguments, ",");
    if (key in cache) {
      return cache[key];
    }
    return (cache[key] = fn.apply(this, arguments));
  };
}

let pseudoArray = { length: 3 };
let pseudoArray2 = { ...new Array(3) };
console.log(new Array(3));
console.log(pseudoArray2);
let array = Array.from(pseudoArray);
console.log(array); // [2, 1, 1]
console.log(~~"213");
