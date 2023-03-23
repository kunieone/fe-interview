<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import List from "./components/List.vue";
</script>

<template>
  <HelloWorld msg="Vite + Vue" />
  <List :items="[1, 2, 3, 4, 5]" />
</template>
