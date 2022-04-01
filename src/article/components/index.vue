<script setup lang="ts">
import Card from './Card.vue'

const data = [{
  "name": "Evan You",
  "title": "Creator",
  "company": "Vue.js",
  "projects": [
    {
      "label": "vuejs/*",
      "url": "https://www.github.com/vuejs"
    },
    {
      "label": "vitejs/*",
      "url": "https://www.github.com/vitejs"
    }
  ],
  "website": {
    "label": "evanyou.me",
    "url": "https://evanyou.me"
  },
  "socials": {
    "github": "yyx990803",
    "twitter": "youyuxi"
  },
  "sponsor": true
}]
</script>

<template>
  <Card v-for="(item, index) in data" :key="index" :member="item" />
</template>