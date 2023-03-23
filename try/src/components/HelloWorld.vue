<template>
  <button>
    <div>{{ msg }}</div>
  </button>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss"></style>
