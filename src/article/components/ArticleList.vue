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
          v-for="article in showList"
          :key="article.name"
          class="article"
        >
          <ArticleItem :article="article" />
        </div>
        <div v-if="showList.length === 0" class="building">
          🚧 建设中 🏗️
        </div>
        <div class="pagination">
          <div @click="handlePaginationChange(2)">
            <div v-show="current > 1" class="item">
              <VTIconChevronLeft class="icon" />
              上一页
            </div>
          </div>
          <div @click="handlePaginationChange(1)">
            <div v-show="isNextShow" class="item">
              下一页
              <VTIconChevronRight class="icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { VTIconChevronLeft, VTIconChevronRight } from '@vue/theme'
import type { Article } from './interface'
import ArticleItem from './ArticleItem.vue'

const pageSize = 5
const props = defineProps<{
  articles: Article[]
}>()

const current = ref(1)
const showList = computed(() => {
  const begin = (current.value - 1) * pageSize
  return props.articles.slice(begin, begin + pageSize)
})

const isNextShow = computed(() => {
  return current.value * pageSize < props.articles.length
})

const handlePaginationChange = (type: number) => {
  current.value += type === 1 ? 1 : -1
}
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
  text-align: center;
}
.pagination {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  padding: 0 8px;
}
.pagination .item {
  width: 50px;
  font-size: 11px;
  color: var(--vt-c-text-2);
  display: block;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pagination .icon {
  width: 11px;
  height: 11px;
  fill: var(--vt-c-text-3);
  transition: fill 0.25s;
}
.pagination:hover .item {
  cursor: pointer;
  color: var(--vt-c-brand);
  font-weight: bold;
}
.pagination:hover .icon {
  cursor: pointer;
  fill: var(--vt-c-brand);
}
</style>
