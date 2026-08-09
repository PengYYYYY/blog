<template>
  <ClientOnly>
    <Vue3Lottie
      v-if="!isLoaded"
      :animation-data="AstronautJSON"
      :speed="1.5"
      :height="400"
      :width="200"
    />
    <template #fallback>
      <div class="lottiePlaceholder" />
    </template>
  </ClientOnly>

  <iframe
    v-show="isLoaded"
    class="figmaFile"
    :src="fileSrc"
    allowfullscreen
    @load="handleLoaded"
  />
</template>
<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue'
import AstronautJSON from './figma-lottie.json'

// lottie-web 依赖 DOM(访问 document),只能在客户端加载,否则 SSR 构建会崩溃
const Vue3Lottie = defineAsyncComponent(() =>
  import('vue3-lottie').then((mod) => mod.Vue3Lottie)
)

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

.lottiePlaceholder {
  width: 200px;
  height: 400px;
}
</style>
