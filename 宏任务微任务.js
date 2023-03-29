function printTaskType(taskType) {
  console.log(`Executing ${taskType}`);
}

console.log("Starting");

queueMicrotask(() => printTaskType("queueMicrotask 1"));
queueMicrotask(() => printTaskType("queueMicrotask 2"));

setTimeout(() => {
  printTaskType("setTimeout 1");
  queueMicrotask(() => printTaskType("queueMicrotask 3"));
}, 0);

setTimeout(() => printTaskType("setTimeout 2"), 0);

console.log("Ending");
