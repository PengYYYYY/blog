<template>
  <article class="ArticleItem" @click="handleClickNav">
    <figure class="banner">
      <img
        v-if="article.bannerUrl"
        class="banner-img"
        :src="article.bannerUrl"
      />
      <div v-else class="banner-tip">
        {{ article.tip }}
      </div>
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
import type { Article } from './interface'

const props = defineProps<{
  article: Article
}>()

const handleClickNav = () => {
  location.href = props.article.linkUrl
}
</script>
<style scoped>
.ArticleItem {
  position: relative;
  background-color: var(--vt-c-bg-soft);
  transition: background-color 0.5s;
  padding: 32px;
}
.ArticleItem:hover {
  cursor: pointer;
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
}
.banner-tip {
  width: 200px;
  background: #42b883;
  color: white;
  font-size: 25px;
  text-align: center;
  line-height: 100px;
  font-weight: bold;
  height: 100px;
}

.info {
  padding-left: 32px;
}
.name {
  font-size: 20px;
  font-weight: 500;
}
.desc {
  display: flex;
  margin-top: 12px;
}
</style>
