<template>
  <div class="ArticlePage">
    <ArticleHero>
      <template #title>写的一些东西</template>
      <template #lead
        >涵盖各个知识面的文章，有专业内入也有工作记录的，还有一些杂事儿</template
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
      <template #title>👽️ 杂七杂八</template>
      <template #lead>在日常工作中遇到的一些坑，主要是实战记录。</template>
    </ArticleList>
  </div>
</template>
<script setup lang="ts">
import ArticleHero from './ArticleHero.vue'
import ArticleList from './ArticleList.vue'

const data = {
  article: [
    {
      bannerUrl: 'article/figma.png',
      name: '🚧 从 Figma api 到设计软件',
      desc: '从 figma 数据结构为起点剖析设计软件基础图形的原理，图形学基础入门'
    },
    {
      bannerUrl: 'article/composition-api.jpeg',
      name: '🚧 TDesign CompositionAPI 重构',
      desc: '记录了 TDesign 在 CompositionAPI 组件重构的开始，过程与收获'
    },
    {
      bannerUrl: 'article/vitest-td.png',
      name: '🚧 TDesign Vitest 测试方案',
      desc: 'TDesign 从 Jest 套件迁移至 Vitest 的过程，建设组件库工程化测试方案'
    }
  ],
  project: [
    {
      bannerUrl: 'article/vite.webp',
      name: 'webpack 迁移 Vite 实践',
      desc: '项目中切换vite的记录，对于webpack来说，vite是个实打实的杀手',
      linkUrl: '../work/tencent/vite-build'
    }
    // {
    //   bannerUrl: 'article/td-cascader.png',
    //   name: '🚧 TDesign Cascader 组件的演进',
    //   desc: 'TDesign Cascader 的演进，vue2，vue3，react的维护总结'
    // }
  ],
  personal: [
    {
      bannerUrl: 'article/vite-press.webp',
      name: 'Blog 翻新记录',
      desc: '利用工作之余翻新了我的blog, 翻新的也差不多了,记录一下整个流程',
      linkUrl: '../article/record/blog-refactor'
    }
  ]
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
