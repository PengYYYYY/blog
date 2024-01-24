<template>
  <Vue3Lottie
    v-if="!isLoaded"
    :animation-data="AstronautJSON"
    :speed="1.5"
    :height="400"
    :width="200"
  />

  <iframe
    v-show="isLoaded"
    class="figmaFile"
    :src="fileSrc"
    allowfullscreen
    @load="handleLoaded"
  />
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { Vue3Lottie } from 'vue3-lottie'
import AstronautJSON from './figma-lottie.json'

const isLoaded = ref(false)

const props = defineProps({
  url: String
})

const fileSrc = computed(() => {
  return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(
    props.url as string
  )}`
})

const handleLoaded = () => {
  isLoaded.value = true
}
</script>

<style scoped>
.figmaFile {
  width: 100%;
  height: 400px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin: 20px 0;
}

.figmaLogo {
  margin: 170px auto;
}
</style>
