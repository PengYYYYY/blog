import { defineConfigWithTheme } from 'vitepress'
import type { Config as ThemeConfig } from '@vue/theme'
import baseConfig from '@vue/theme/config'
import { headerPlugin } from './headerMdPlugin'

const nav = [
  {
    text: '水文',
    activeMatch: `^/article/`,
    link: '/article/'
  },
  {
    text: '学习记录',
    activeMatch: `^/(graphics｜font-end|font-end-framework|algo-data-str|backend|basics)/`,
    items: [
      { text: '图形学', link: '/graphics/index' },
      { text: '前端基础', link: '/font-end/index' },
      { text: '前端框架', link: '/font-end-framework/index' },
      { text: '数据结构与算法', link: '/algo-data-str/index' },
      { text: '后端与运维', link: '/backend/index' },
      { text: '基础知识', link: '/basics/network/http' }
    ]
  },
  {
    text: '工作',
    activeMatch: `^/work/`,
    link: '/work/tencent/'
  }
]

export const sidebar = {
  '/graphics/': [
    {
      text: 'svg',
      items: [{ text: 'svg基础', link: '/graphics/svg/index.md' }]
    },
    {
      text: 'canvas',
      items: [{ text: 'canvas基础', link: '/graphics/canvas/index.md' }]
    },
    {
      text: 'webgl',
      items: [{ text: 'webgl基础', link: '/graphics/webgl/index.md' }]
    },
    {
      text: '图形学知识',
      items: [
        { text: '贝塞尔曲线', link: '/graphics/basics/bessel.md' },
        { text: '矩阵', link: '/graphics/basics/matrix.md' }
      ]
    }
  ],
  '/work/': [
    {
      text: '腾讯',
      items: [
        { text: '工作记录', link: '/work/tencent/index.md' },
        { text: 'Palette 工程优化', link: '/work/tencent/vite-build.md' }
      ]
    },
    {
      text: '同程',
      items: [
        { text: '工作记录', link: '/work/tc-travel/index' },
        {
          text: '页面搭建系统',
          link: '/work/tc-travel/business/low-code'
        },
        { text: '产品增长', link: '/work/tc-travel/business/growth' },
        { text: 'siskin按需加载', link: '/work/tc-travel/siskin/import' },
        { text: 'siskin样式包', link: '/work/tc-travel/siskin/style' },
        {
          text: 'siskin单元测试',
          link: '/work/tc-travel/siskin/unit-test'
        },
        {
          text: 'siskin文件上传组件',
          link: '/work/tc-travel/siskin/upload'
        }
      ]
    }
  ],
  '/basics/': [
    {
      text: '网络',
      items: [
        { text: 'http', link: '/basics/network/http' },
        { text: 'http状态码', link: '/basics/network/http-code' },
        { text: 'https', link: '/basics/network/https' },
        { text: 'http-next', link: '/basics/network/http-next' },
        { text: '网络缓存', link: '/basics/network/cache' },
        { text: '网络连接过程', link: '/basics/network/connectionProcess' }
      ]
    },
    {
      text: '计算机基础',
      items: [
        {
          text: '计算机是怎样跑起来的',
          link: '/basics/computer/howComputerRun'
        },
        {
          text: '线程和进程的区别',
          link: '/basics/computer/threadsAndProcesses'
        }
      ]
    },
    {
      text: '思维',
      items: [
        { text: '设计模式', link: '/basics/thought/design-mode' },
        { text: '函数式编程', link: '/basics/thought/functional' }
      ]
    }
  ],
  '/backend/': [
    {
      text: '数据库',
      items: [
        { text: 'mysql', link: '/backend/db/mysql' },
        { text: 'redis', link: '/backend/db/redis' }
      ]
    },
    {
      text: '运维',
      items: [
        { text: 'ali-node监控', link: '/backend/devops/ali-node' },
        { text: 'docker', link: '/backend/devops/docker' },
        { text: 'git-flow', link: '/backend/devops/git-flow' },
        { text: 'linux环境搭建', link: '/backend/devops/linux' },
        { text: 'nginx', link: '/backend/devops/nginx' }
      ]
    },
    {
      text: 'node',
      items: [
        { text: 'node基础', link: '/backend/node/base' },
        { text: 'koa', link: '/backend/node/koa' }
      ]
    }
  ],
  '/algo-data-str/': [
    {
      text: '数据结构',
      items: [
        { text: '数据结构', link: '/algo-data-str/dataStructure/index' },
        { text: '链表', link: '/algo-data-str/dataStructure/linkedList' },
        { text: '树', link: '/algo-data-str/dataStructure/tree' }
      ]
    },
    {
      text: '算法',
      items: [
        {
          text: '二分查找',
          link: '/algo-data-str/algorithm/binarySearch'
        },
        { text: '排序', link: '/algo-data-str/algorithm/sort' },
        { text: '双指针', link: '/algo-data-str/algorithm/doublePointer' },
        { text: '动态规划', link: '/algo-data-str/algorithm/dynamicPlan' },
        { text: '杂七杂八', link: '/algo-data-str/algorithm/grammar' },
        { text: '算法思想', link: '/algo-data-str/algorithm/mind' },
        { text: '复杂度', link: '/algo-data-str/complexity' },
        { text: '限流算法', link: '/algo-data-str/currentLimiting' }
      ]
    }
  ],
  '/font-end-framework/': [
    {
      text: 'vue',
      items: [
        { text: '核心原理与概念', link: '/font-end-framework/vue/core' },
        { text: 'vue3', link: '/font-end-framework/vue/vue3' },
        { text: 'vue-router', link: '/font-end-framework/vue/router' },
        { text: 'vuex', link: '/font-end-framework/vue/vuex' },
        { text: 'vue-loader', link: '/font-end-framework/vue/vue-loader' },
        { text: 'vue-ssr', link: '/font-end-framework/vue/ssr' },
        { text: 'vue 通信', link: '/font-end-framework/vue/vue-protocol' },
        { text: '常见问题', link: '/font-end-framework/vue/question' }
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
        {
          text: '生命周期',
          link: '/font-end-framework/architecture/lifeCycle'
        },
        {
          text: '逻辑复用',
          link: '/font-end-framework/architecture/logic-reuse'
        },
        {
          text: '组件数据流',
          link: '/font-end-framework/architecture/data'
        },
        {
          text: 'Diff过程',
          link: '/font-end-framework/architecture/diff'
        },
        {
          text: '组件化',
          link: '/font-end-framework/architecture/component'
        },
        {
          text: '事件机制',
          link: '/font-end-framework/architecture/event'
        },
        {
          text: '状态管理',
          link: '/font-end-framework/architecture/state'
        },
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
        { text: '闭包', link: '/font-end/js/closure' },
        {
          text: 'JavaScript的原型与继承',
          link: '/font-end/js/inheritance'
        },
        { text: 'JavaScript的事件循环', link: '/font-end/js/event-loop' },
        { text: '应用内存分析', link: '/font-end/js/oom' },
        { text: '浏览器存储', link: '/font-end/js/storage' },
        { text: '数组操作', link: '/font-end/js/array' },
        { text: '字符操作', link: '/font-end/js/string' },
        { text: '源码实现', link: '/font-end/js/handwritten' }
      ]
    },
    {
      text: '浏览器',
      items: [
        { text: '浏览器原理', link: '/font-end/browser/base' },
        { text: '浏览器页面加载过程', link: '/font-end/browser/process' },
        { text: 'JS的执行机制', link: '/font-end/browser/js-execute' },
        { text: '跨域', link: '/font-end/browser/cross-domain' },
        { text: '安全', link: '/font-end/browser/security' },
        { text: 'AJAX', link: '/font-end/browser/ajax' },
        { text: 'JWT', link: '/font-end/browser/jwt' }
      ]
    },
    {
      text: '工程化',
      items: [
        { text: '模块化', link: '/font-end/engineering/modular' },
        { text: 'Babel', link: '/font-end/engineering/babel' },
        { text: 'webpack', link: '/font-end/engineering/webpack' },
        { text: 'vite', link: '/font-end/engineering/vite' },
        { text: '包管理', link: '/font-end/engineering/npm' },
        { text: 'JSBridge', link: '/font-end/engineering/bridge' },
        { text: '工程化演进', link: '/font-end/engineering/evolution' },
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
      text: '表现层',
      items: [
        { text: 'HTML基础', link: '/font-end/html/html' },
        { text: 'CSS基础', link: '/font-end/html/css' },
        { text: 'Load 与 DOMContentLoaded', link: '/font-end/html/load' },
        { text: 'CSS中的BEM命名规范', link: '/font-end/html/bem' },
        { text: '移动端适配', link: '/font-end/html/mobile-adapter' }
      ]
    }
  ]
}

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,
  base: '/blog/',
  lang: 'zh-CN',
  title: 'PY',
  description: 'Blog',
  srcDir: 'src',
  scrollOffset: 'header',
  dist: '../dist',

  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/favicon.png'
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
      copyright: `Powered By vitepress && @vue/theme`
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
