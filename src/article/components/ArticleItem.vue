<template>
  <article
    :class="[
      'ArticleItem',
      {
        disabled: !article.linkUrl
      }
    ]"
    @click="handleClickNav"
  >
    <figure class="banner">
      <img class="banner-img" :src="withBase(article.bannerUrl)" />
    </figure>

    <div class="info">
      <h1 class="name">{{ article.name }}</h1>

      <section class="desc">
        {{ article.desc }}
      </section>
    </div>
  </article>
</template>
<script setup lang="ts">
import { withBase } from 'vitepress'
import type { Article } from './interface'

const props = defineProps<{
  article: Article
}>()

const handleClickNav = () => {
  if (!props.article.linkUrl) return
  window.location.href = props.article.linkUrl
}
</script>
<style scoped>
.ArticleItem {
  position: relative;
  background-color: var(--vt-c-bg-soft);
  transition: background-color 0.5s;
  padding: 32px;
  margin: 0 16px;
}

.ArticleItem:hover {
  cursor: pointer;
}
.ArticleItem.disabled {
  opacity: 0.8;
}

.ArticleItem.disabled:hover {
  cursor: not-allowed;
}

@media (min-width: 512px) {
  .ArticleItem {
    display: flex;
  }
}
@media (min-width: 640px) {
  .ArticleItem {
    border-radius: 8px;
  }
}

.banner {
  flex-shrink: 0;
}

.banner-img {
  width: 200px;
  border-radius: 5px;
  margin-right: 32px;
}

.name {
  font-size: 20px;
  font-weight: bold;
}
.desc {
  margin-top: 10px;
}
@media (max-width: 512px) {
  .banner-img {
    width: 100%;
    margin-right: 0px;
    margin-bottom: 24px;
  }
}
</style>
