<template>
  <div class="ArticlePage">
    <ArticleHero>
      <template #title>写的一些东西</template>
      <template #lead
        >涵盖各个知识面的文章，有专业内入也有工作记录的，还有一些杂事</template
      >
    </ArticleHero>

    <ArticleList :articles="data.article">
      <template #title>🔖 专业文章</template>
      <template #lead>
        写的一些专业文章，理论总结。花了点心思的东西。
      </template>
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
      bannerUrl: 'article/ai-template.webp',
      name: '面向AI编程：探索可视化分析模型',
      desc: '本文总结了在开发ChatGPT相关需求时的功能拆解和实现思路，并分享了在利用ChatGPT生成结构化数据时遇到的问题及相应解决方案。',
      linkUrl: 'https://mp.weixin.qq.com/s/HrxQtfc8j-zD9kMRGhTn6w'
    },
    {
      bannerUrl: 'article/td-composition-api.svg',
      name: 'TDesign CompositionAPI 重构之路',
      desc: '记录了 TDesign 在 CompositionAPI 组件重构的开始，过程与收获',
      linkUrl: '../article/record/vca-refactor'
    },
    {
      bannerUrl: 'article/td-component.svg',
      name: 'TDesign 组件开发范式',
      desc: '记录了 TDesign 的组件开发范式，在开源协同的过程中形成较为统一的开发规范',
      linkUrl: '../article/record/dev-paradigm'
    }
    // {
    //   bannerUrl: 'article/graph.png',
    //   name: 'Canvas,Svg,Webgl,Webgpu 简介',
    //   desc: '介绍 Canvas, Svg, Webgl, Webgpu 的不同点及各自的发展历史'
    // },
    // {
    //   bannerUrl: 'article/figma.png',
    //   name: '🚧 从 Figma api 到设计软件',
    //   desc: '从 figma 数据结构为起点，剖设计软件基础图形的原理'
    // }
  ],
  project: [
    {
      bannerUrl: 'article/td-custom.svg',
      name: '基于 TDesign 搭建一个业务组件库',
      desc: '本文讲述了如何基于 TDesign 搭建一个业务组件库 TDesign Custom。内容贯穿整个组件库搭建的全流程。',
      linkUrl: '../article/record/td-custom'
    },
    {
      bannerUrl: 'article/webpack-vite.svg',
      name: 'webpack 迁移 vite 实践',
      desc: '项目中切换vite的记录，对于webpack来说，vite是个实打实的杀手',
      linkUrl: '../work/tencent/vite-build'
    },
    {
      bannerUrl: 'article/td-vitest.svg',
      name: ' TDesign 在 vitest 的实践',
      desc: 'TDesign 从 Jest 套件迁移至 Vitest 的过程，执行效率提升60%。',
      linkUrl: '../article/record/vitest-refactor'
    }
    // {
    //   bannerUrl: 'article/td-cd.png',
    //   name: '基于TDesign搭建业务组件库',
    //   desc: '记录如何基于TDesign低成本的搭建符合自身业务的高阶组件库',
    //   linkUrl: '../article/record/td-cd'
    // },
    // {
    //   bannerUrl: 'article/td-cd.png',
    //   name: 'Electron 自动更新',
    //   desc: '记录在做 electron 客户端自动更新时遇到的问题与解决方案',
    //   linkUrl: '../article/record/electron-updater'
    // }
  ],
  personal: [
    {
      bannerUrl: 'article/vite-press.webp',
      name: 'Blog 翻新记录',
      desc: '利用工作之余翻新了我的 blog, 使用了 vitepress 和 algolia, 记录一下整个流程',
      linkUrl: '../article/record/blog-refactor'
    },
    {
      bannerUrl: 'article/deploy.jpeg',
      name: '开源网站部署工具',
      desc: '用过 vercel, github pages, 腾讯云serverless, 微信云托管等部署工具，简单总结一下',
      linkUrl: '../article/record/deploy'
    },
    {
      bannerUrl: 'article/nat.jpeg',
      name: '几种内网穿透姿势',
      tip: '内网穿透',
      desc: 'liyong frp 与 ngrok 进行内网穿透的实践记录及对比',
      linkUrl: '../article/record/nat'
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
