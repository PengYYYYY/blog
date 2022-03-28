import { defineConfigWithTheme } from 'vitepress'
import type { Config as ThemeConfig } from '@vue/theme'
import baseConfig from '@vue/theme/config'
import { headerPlugin } from './headerMdPlugin'

const nav = [
  {
    text: '博客',
    activeMatch: `^/blog/`,
    link: '/blog/'
  },
  {
    text: '学习记录',
    activeMatch: `^/(font-end-framework|font-end|cookbook|examples)/`,
    items: [
      { text: '前端框架', link: '/font-end-framework/vue/core' },
      { text: '前端基础', link: '/font-end/js/core' },
      { text: '算法', link: '/algo-data-str/index' },
      { text: '后端', link: '/backend/index' },
      { text: '网络', link: '/network/index' },
      { text: '总结', link: '/conclusion/index' }
    ]
  }
]

export const sidebar = {
  '/backend/': [
    {
      text: '数据库',
      items: [
        { text: 'mysql', link: '/backend/db/mysql' },
        { text: 'redis', link: '/backend/db/redis' },
      ]
    },
    {
      text: '运维',
      items: [
        { text: 'aliNode监控', link: '/backend/devops/binarySearch' },
        { text: 'docker', link: '/backend/devops/sort' },
        { text: 'git-flow', link: '/backend/devops/doublePointer' },
        { text: 'linux搭建环境', link: '/backend/devops/dynamicPlan' },
        { text: 'nginx', link: '/backend/devops/grammar' },
      ]
    },
    {
      text: 'node',
      items: [
        { text: 'node基础', link: '/backend/node/base' },
        { text: 'koa', link: '/backend/node/koa' },
      ]
    }
  ],
  '/algo-data-str/': [
    {
      text: '数据结构',
      items: [
        { text: '数据结构', link: '/algo-data-str/dataStructure/index' },
        { text: '链表', link: '/algo-data-str/dataStructure/linkedList' },
        { text: '树', link: '/algo-data-str/dataStructure/tree' },
      ]
    },
    {
      text: '算法',
      items: [
        { text: '二分查找', link: '/algo-data-str/algorithm/binarySearch' },
        { text: '排序', link: '/algo-data-str/algorithm/sort' },
        { text: '双指针', link: '/algo-data-str/algorithm/doublePointer' },
        { text: '动态规划', link: '/algo-data-str/algorithm/dynamicPlan' },
        { text: '杂七杂八', link: '/algo-data-str/algorithm/grammar' },
        { text: '算法思想', link: '/algo-data-str/algorithm/mind' },
      ]
    }
  ],
  '/font-end-framework/': [
    {
      text: 'vue',
      items: [
        { text: '核心原理与概念', link: '/font-end-framework/vue/core' },
        { text: 'vue3', link: '/font-end-framework/vue/vue3' },
        { text: 'vue-outer', link: '/font-end-framework/vue/router' },
        { text: 'vuex', link: '/font-end-framework/vue/vuex' },
        { text: '常见问题', link: '/font-end-framework/vue/question' },
        { text: 'vite', link: '/font-end-framework/vue/vite' }
      ]
    },
    {
      text: 'react',
      items: [
        { text: '核心原理与概念', link: '/font-end-framework/react/core' },
        { text: 'redux', link: '/font-end-framework/react/redux' },
        { text: 'react-router', link: '/font-end-framework/react/router' },
        { text: '常见问题', link: '/font-end-framework/react/question' }
      ]
    },
    {
      text: '主流UI框架对比',
      items: [
        { text: '生命周期', link: '/font-end-framework/architecture/lifeCycle' },
        { text: '组件数据流', link: '/font-end-framework/architecture/data' },
        { text: 'Diff过程', link: '/font-end-framework/architecture/diff' },
        { text: '组件化', link: '/font-end-framework/architecture/component' },
        { text: '事件机制', link: '/font-end-framework/architecture/event' },
        { text: '状态管理', link: '/font-end-framework/architecture/state' },
        { text: '小程序原理', link: '/font-end-framework/architecture/mp' }
      ]
    }
  ],
  '/font-end/': [
    {
      text: 'Javascript',
      items: [
        { text: 'JavaScript核心', link: '/font-end/js/core' },
        { text: 'TypeScript', link: '/font-end/js/typeScript' },
        { text: '数组操作', link: '/font-end/js/array' },
        { text: '字符操作', link: '/font-end/js/string' },
        { text: '浏览器存储', link: '/font-end/js/storage' },
        { text: '源码实现', link: '/font-end/js/handwritten' }
      ]
    },
    {
      text: '工程化',
      items: [
        { text: 'webpack', link: '/font-end/engineering/webpack' },
        { text: '包管理', link: '/font-end/engineering/npm' },
        { text: '模块化', link: '/font-end/engineering/modular' },
        { text: 'Babel', link: '/font-end/engineering/babel' },
        { text: '前端监控', link: '/font-end/engineering/monitoring' }
      ]
    },
    {
      text: '性能优化',
      items: [
        { text: '概览', link: '/font-end/optimize/overview' },
        { text: '静态资源优化', link: '/font-end/optimize/base' },
        {
          text: '工程中的相关优化',
          link: '/font-end/optimize/engineering'
        },
        { text: '性能指标', link: '/font-end/optimize/indicators' }
      ]
    },
    {
      text: '浏览器',
      items: [
        { text: '浏览器原理', link: '/font-end/browser/base' },
        { text: '浏览器页面加载过程', link: '/font-end/browser/process' },
        { text: 'js的执行机制', link: '/font-end/browser/jsExecute' }
      ]
    },
    {
      text: '表现层',
      items: [
        { text: 'HTML基础', link: '/font-end/html/html' },
        { text: 'CSS基础', link: '/font-end/html/css' },
        { text: 'Load 与 DOMContentLoaded', link: '/font-end/html/load' },
        { text: 'CSS中的BEM命名规范', link: '/font-end/html/bem' }
      ]
    }
  ]
}

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,

  lang: 'zh-CN',
  title: 'Vue.js',
  description: 'PY Blog',
  srcDir: 'src',
  srcExclude: ['tutorial/**/description.md'],
  scrollOffset: 'header',

  head: [
    [
      'link',
      {
        rel: 'icon',
        href: 'https://pengyyyyy.github.io/blog/PY.png'
      }
    ]
  ],

  themeConfig: {
    nav,
    sidebar,

    algolia: {
      indexName: 'vuejs',
      appId: 'PXUFXUCGYX',
      apiKey: 'f6c9afb2b1e4b5b361c63c9b6b6f9f03'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/pengYYYYY' }
    ],

    footer: {
      license: {
        text: 'MIT License',
        link: 'https://opensource.org/licenses/MIT'
      },
      copyright: `Copyright © 2018-${new Date().getFullYear()} PY`
    }
  },

  markdown: {
    config(md) {
      md.use(headerPlugin)
    }
  },

  vite: {
    define: {
      __VUE_OPTIONS_API__: false
    },
    optimizeDeps: {
      include: ['gsap', 'dynamics.js'],
      exclude: ['@vue/repl']
    },
    // @ts-ignore
    ssr: {
      external: ['@vue/repl']
    },
    server: {
      host: true,
      fs: {
        // for when developing with locally linked theme
        allow: ['../..']
      }
    },
    build: {
      minify: 'terser',
      chunkSizeWarningLimit: Infinity
    },
    json: {
      stringify: true
    }
  },

  vue: {
    reactivityTransform: true
  }
})
