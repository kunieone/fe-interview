<template>
  <div>
    <p>计时器：{{ count }} 毫秒</p>
    <button @click="start">开始计时</button>
    <button @click="stop">停止计时</button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const count = ref(0);
let startTime;
let timerId;

function start() {
  startTime = Date.now();
  timerId = setInterval(() => {
    const currentTime = Date.now();
    count.value = currentTime - startTime;
  }, 100);
}

function stop() {
  clearInterval(timerId);
  count.value = 0;
}

onMounted(() => {
  console.log("mounted");
});

onUnmounted(() => {
  console.log("unmounted");
});
</script>
