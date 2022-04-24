<template>
  <img :src="props.url">
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps({
  url: String,
})
</script>

<style scoped>
.figmaFile {
  width: 100%;
  height: 400px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
