// 手写一个Promise 首先
class Promise {
  constructor(executor) {
    this.state = "pending";
    this.onFulfilledCallback = [];
    // 2.2.6.2. 如果 promise 处于 rejected 状态，所有相应的 onRejected 回调必须按照它们对应的 then 的原始调用顺序来执行。
    this.onRejectedCallback = [];
    const self = this;

    function resolve(value) {
      setTimeout(function () {
        if (self.state === "pending") {
          self.state = "fulfilled";
          self.data = value;
          // 2.2.6.1. 如果 promise 处于 fulfilled 状态，所有相应的 onFulfilled 回调必须按照它们对应的 then 的原始调用顺序来执行。
          for (let i = 0; i < self.onFulfilledCallback.length; i++) {
            self.onFulfilledCallback[i](value);
          }
        }
      });
    }

    function reject(reason) {
      setTimeout(function () {
        if (self.state === "pending") {
          self.state = "rejected";
          self.data = reason;
          // 2.2.6.2. 如果 promise 处于 rejected 状态，所有相应的 onRejected 回调必须按照它们对应的 then 的原始调用顺序来执行。
          for (let i = 0; i < self.onRejectedCallback.length; i++) {
            self.onRejectedCallback[i](reason);
          }
        }
      });
    }

    try {
      executor(resolve, reject);
    } catch (reason) {
      reject(reason);
    }
  }
}
