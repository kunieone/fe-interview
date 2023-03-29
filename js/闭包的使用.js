function closure() {
  let a = 1;
  return function () {
    a++;
    return a;
  };
}

const a = closure();

a();
