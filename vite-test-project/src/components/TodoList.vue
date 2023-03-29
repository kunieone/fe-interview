<template>
  {{ $attrs }}
</template>

<script setup>
import { inject, useAttrs } from "vue";

const $attrs = useAttrs();
console.log($attrs);
</script>
