<template>
  <ul>
    <li v-for="item in items">{{ item }}</li>
  </ul>
</template>

<style scoped></style>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    items: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
});
</script>
