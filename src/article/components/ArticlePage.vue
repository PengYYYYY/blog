<template>
  <div class="ArticlePage">
    <ArticleHero>
      <template #title>写的一些东西</template>
      <template #lead
        >涵盖各个知识面的文章，有个人感悟也有比较专业的，还有一些杂事儿</template
      >
    </ArticleHero>

    <ArticleList :articles="data.article">
      <template #title>🔖 专业文章</template>
      <template #lead
        >写的一些专业文章，理论总结。花了点心思的东西。</template
      >
    </ArticleList>

    <ArticleList :articles="data.project">
      <template #title>👷 搬砖记录</template>
      <template #lead>在日常工作中遇到的一些坑，主要是实战记录。</template>
    </ArticleList>

    <ArticleList :articles="data.personal">
      <template #title>👽️ 个人感悟</template>
      <template #lead>在日常工作中遇到的一些坑，主要是实战记录。</template>
    </ArticleList>
  </div>
</template>
<script setup lang="ts">
import ArticleHero from './ArticleHero.vue'
import ArticleList from './ArticleList.vue'

const data = {
  article: [],
  project: [
    {
      bannerUrl:
        'https://blog.slashgear.dev/static/c20149934693e773dc7e6cf7619d7b04/99238/vitejs.webp',
      tip: 'vite',
      name: 'vite 工程优化',
      desc: '项目中切换vite的记录,对于webpack来说，vite是个实打实的杀手',
      linkUrl: '../work/tencent/vite-build'
    }
  ],
  personal: []
}
</script>

<style scoped>
.ArticlePage {
  padding-bottom: 16px;
  min-height: calc(100vh - 144px);
}

@media (min-width: 768px) {
  .ArticlePage {
    padding-bottom: 96px;
  }
}

.ArticleList + .ArticleList {
  padding-top: 64px;
}
</style>
