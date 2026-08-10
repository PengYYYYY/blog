<template>
  <div class="ArticlePage">
    <ArticleHero>
      <template #title>写的一些东西</template>
      <template #lead>
        涵盖各个知识面的文章，有专业内容，也有工作记录。
      </template>
    </ArticleHero>

    <ArticleList :articles="data.top">
      <template #title>📌 置顶</template>
      <template #lead> 被选录的文章，置顶一下 </template>
    </ArticleList>

    <ArticleList :articles="data.article">
      <template #title>🔖 文章</template>
      <template #lead>
        写的一些文章，项目和知识总结，花了点心思的东西。
      </template>
    </ArticleList>

    <ArticleList :articles="data.project">
      <template #title>👷 搬砖记录</template>
      <template #lead>在日常工作中遇到的一些坑，主要是实战记录。</template>
    </ArticleList>

    <ArticleList :articles="data.personal">
      <template #title>👽️ 杂七杂八</template>
      <template #lead>
        一些杂七杂八的学习总结，踩坑记录等文字记录。
      </template>
    </ArticleList>
  </div>
</template>
<script setup lang="ts">
import ArticleHero from './ArticleHero.vue'
import ArticleList from './ArticleList.vue'
import { Article } from './interface'

const data: {
  [list: string]: Article[]
} = {
  top: [
    {
      bannerUrl: '/article/ai-template.svg',
      name: '面向 AI 编程：探索可视化分析模型',
      desc: '本文总结了在开发 LLM 相关需求时的功能拆解和实现思路，并分享了在利用 ChatGPT 生成结构化数据时遇到的问题及相应解决方案',
      linkUrl: 'https://mp.weixin.qq.com/s/HrxQtfc8j-zD9kMRGhTn6w',
      external: true,
      tip: '本文被鹅厂技术工程转发'
    }
  ],
  article: [
    {
      bannerUrl: '/article/cd-axure.svg',
      name: 'CoDesign Axure 项目总结',
      desc: '总结了在开发 CoDesign Axure 中的架构设计思路，安全加固、性能优化、Electron 插件开发，覆盖项目的整个开发周期',
      linkUrl: '../article/record/axure'
    },
    {
      bannerUrl: '/article/cd-board.svg',
      name: '白板项目总结',
      desc: '总结了在开发图形编辑器（白板）时的项目架构设计，相关模块介绍，性能优化',
      linkUrl: '../article/record/board'
    },
    {
      bannerUrl: '/article/td-custom.svg',
      name: '基于 TDesign 搭建一个业务组件库',
      desc: '本文讲述了如何基于 TDesign 搭建一个业务组件库 TDesign Custom。内容贯穿整个组件库搭建的全流程',
      linkUrl: '../article/record/td-custom'
    },
    {
      bannerUrl: '/article/td-composition-api.svg',
      name: 'TDesign CompositionAPI 重构之路',
      desc: '记录了 TDesign 在 CompositionAPI 组件重构的开始，推进过程与个人的的收获',
      linkUrl: '../article/record/vca-refactor'
    },
    {
      bannerUrl: '/article/td-component.svg',
      name: 'TDesign 组件开发范式',
      desc: '记录了 TDesign 的组件开发范式，在开源协同的过程中形成较为统一的开发规范',
      linkUrl: '../article/record/dev-paradigm'
    }
  ],
  project: [
    {
      bannerUrl: '/article/webpack-vite.svg',
      name: 'webpack 迁移 vite 实践',
      desc: '项目中切换vite的记录，对于webpack来说，vite是个实打实的杀手',
      linkUrl: '../article/record/webpack-vite'
    },
    {
      bannerUrl: '/article/td-vitest.svg',
      name: ' TDesign 在 vitest 的实践',
      desc: 'TDesign 从 Jest 套件迁移至 Vitest 的过程，执行效率提升60%',
      linkUrl: '../article/record/vitest-refactor'
    },
    {
      bannerUrl: '/article/vue-loader.svg',
      name: 'Vue Loader 是怎么运行的',
      desc: '本文描述了 vue 文件是如何被解析的，以及 vue-loader 在 webpack 工作流当中是如何运行的',
      linkUrl: '../article/record/vue-loader'
    }
  ],
  personal: [
    {
      bannerUrl: '/article/vite-press.svg',
      name: 'Blog 翻新记录',
      desc: '利用工作之余翻新了我的 blog, 使用了 vitepress 和 algolia, 记录一下整个流程',
      linkUrl: '../article/record/blog-refactor'
    },
    {
      bannerUrl: '/article/deploy.svg',
      name: '开源网站部署工具',
      desc: '用过 vercel, github pages, 腾讯云serverless, 微信云托管等部署工具，简单总结一下',
      linkUrl: '../article/record/deploy'
    },
    {
      bannerUrl: '/article/nat.svg',
      name: '几种内网穿透姿势',
      desc: '利用 frp 与 ngrok 进行内网穿透的实践记录及对比',
      linkUrl: '../article/record/nat'
    },
    {
      bannerUrl: '/article/js-prototype.svg',
      name: 'JavaScript 的原型与继承',
      desc: '读红宝书 JavaScript 中原型相关内容总结，简单讲讲 JavaScript 的原型、原型链和原型继承',
      linkUrl: '../article/record/js-prototype'
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
