const list: Set<Function> = new Set();
const autoRun = (cb: Function) => {
  if (!list.has(cb)) list.add(cb);
};
const observable = <T extends object>(params: T) => {
  return new Proxy(params, {
    set(t, k, v, r) {
      const result = Reflect.set(t, k, v, r);
      list.forEach((fn) => fn());
      return result;
    },
  });
};

let p = { name: "person", age: 18 };
let personObserver = observable(Object(1));
personObserver = 1;
autoRun(() => {
  console.log("changed!");
});
