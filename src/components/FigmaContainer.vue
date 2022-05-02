<template>
  <iframe class="figmaFile" :src="fileSrc" allowfullscreen></iframe>
</template>
<script setup lang="ts">
import { defineProps, computed } from 'vue'

const props = defineProps({
  url: String
})

const fileSrc = computed(() => {
  return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(
    props.url as string
  )}`
})
</script>

<style scoped>
.figmaFile {
  width: 100%;
  height: 400px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
