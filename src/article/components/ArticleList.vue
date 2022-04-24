<template>
  <section class="ArticleList">
    <div class="container">
      <div class="info">
        <h2 class="title">
          <slot name="title" />
        </h2>
        <p class="lead">
          <slot name="lead" />
        </p>
      </div>

      <div class="articles">
        <div
          v-for="article in articles"
          :key="article.name"
          class="article"
        >
          <ArticleItem :article="article" />
        </div>
        <div class="building" v-if="articles.length === 0">
          🚧 建设中 🏗️
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import type { Article } from './interface'
import ArticleItem from './ArticleItem.vue'

defineProps<{
  articles: Article[]
}>()
</script>

<style scoped>
.ArticleList {
  padding-bottom: 32px;
}
@media (min-width: 768px) {
  .ArticleList {
    padding: 0 32px;
  }
}

.container {
  border-top: 1px solid var(--vt-c-divider-light);
  padding-top: 24px;
}

@media (min-width: 768px) {
  .container {
    margin: 0 auto;
    display: flex;
    align-items: flex-start;
    max-width: 960px;
  }
}

.info {
  flex-shrink: 0;
  padding: 0 24px;
  max-width: 300px;
}

@media (min-width: 768px) {
  .info {
    position: sticky;
    top: 32px;
    left: 0;
    padding: 0 24px 0 0;
    width: 256px;
  }
}

@media (min-width: 960px) {
  .info {
    top: 88px;
    padding: 0 64px 0 0;
    width: 384px;
  }
}

.title {
  font-size: 20px;
  font-weight: 500;
}

.lead {
  padding-top: 8px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vt-c-text-2);
}

.articles {
  padding-top: 24px;
}

@media (min-width: 768px) {
  .articles {
    flex-grow: 1;
    padding-top: 0;
  }
}

.article + .article {
  padding-top: 16px;
}

@media (min-width: 640px) {
  .article {
    margin: 0 auto;
    max-width: 592px;
  }
}

@media (min-width: 768px) {
  .article {
    margin: 0;
    max-width: 100%;
  }
}
.building {
  font-size: 30px;
  min-height: 200px;
  line-height: 100px;
}
</style>
