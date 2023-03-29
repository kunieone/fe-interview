<template>
  <div>
    <h3>Reactive Example</h3>
    <p>Message: {{ state.message }}</p>
    <p>Counter: {{ state.counter }}</p>
    <p @click="changeObj">Obj: {{ state.obj }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs } from "vue";

const state = reactive({
  message: "Hello, Vue 3!",
  counter: 0,
  obj: {
    name: "xiaoming",
    age: 18,
  },
});

const changeObj = () => {
  if (state.obj.name === "xiaoming") {
    state.obj = {
      name: "xiaohong",
      age: 19,
    };
  } else {
    state.obj["height"] = 163;
    state.message = "...";
  }
};
const increment = () => {
  state.counter++;
};
</script>
