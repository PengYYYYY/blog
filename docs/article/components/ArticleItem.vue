<template>
  <div class="article-wrapper">
    <div v-if="article.tip" class="banner-tip">
      {{ article.tip }}
    </div>
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
        <img
          v-if="article.bannerUrl"
          class="banner-img"
          :src="withBase(article.bannerUrl)"
        />
      </figure>

      <div class="info">
        <h1 class="name">{{ article.name }}</h1>

        <section class="desc">
          {{ article.desc }}
        </section>
      </div>
    </article>
  </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import { withBase } from 'vitepress'
import type { Article } from './interface'

const props = defineProps({
  article: {
    type: Object as PropType<Article>,
    required: true
  }
})

const handleClickNav = () => {
  if (!props.article.linkUrl) return
  if (props.article.external) {
    window.open(props.article.linkUrl)
  } else {
    window.location.href = props.article.linkUrl
  }
}
</script>
<style scoped>
.ArticleItem {
  position: relative;
  transition: background-color 0.5s;
  padding: 32px;
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

.article-wrapper {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  overflow: hidden;
}

.banner {
  flex-shrink: 0;
}

.banner-img {
  width: 200px;
  border-radius: 5px;
  margin-right: 32px;
}
.banner-tip {
  width: 100%;
  color: var(--vp-custom-block-tip-text);
  background-color: var(--vp-custom-block-tip-bg);
  font-weight: bold;
  border: 1px solid var(--vp-custom-block-tip-border);
  padding: 8px;
  font-size: 14px;
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
