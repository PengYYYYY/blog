<template />
<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  const ele = document.querySelector('.VPNavBarTitle')

  if (!ele) return
  ele.setAttribute('href', '/blog/')
  while (ele.hasChildNodes()) {
    ele.removeChild(ele.firstChild)
  }
  const node = document
    .createElement('div')
    .appendChild(document.createTextNode('PY'))
  const img = document.createElement('img')
  img.setAttribute('class', 'logo')
  // 设置 img 图片地址
  img.src = '/blog/logo.png'

  ele?.appendChild(img)
  ele?.appendChild(node)
})
</script>
<style>
.logo {
  width: 35px;
  border-radius: 35px;
  margin-right: 12px;
}
</style>
