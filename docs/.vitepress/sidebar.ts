export const navList = () => [
  {
    text: '文章',
    activeMatch: '/article/',
    link: '/article/'
  },
  {
    text: '学习记录',
    activeMatch: `^/(font-end|font-end-framework|algo-data-str|backend|basics)/`,
    items: [
      { text: '前端基础', link: '/font-end/index' },
      { text: '前端框架', link: '/font-end-framework/index' },
      { text: '数据结构与算法', link: '/algo-data-str/index' },
      { text: '后端与运维', link: '/backend/index' },
      { text: '基础知识', link: '/basics/index' },
      { text: '图形学', link: '/graphics/index' }
    ]
  },
  {
    text: '工作',
    activeMatch: '/work/',
    link: '/work/tencent/'
  }
]

export const sidebarGraphics = () => [
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
  }
]

export const sidebarWork = () => [
  {
    text: '腾讯',
    items: [
      { text: '2024 年', link: '/work/tencent/2024.md' },
      { text: '2023 年', link: '/work/tencent/2023.md' },
      { text: '2022 年', link: '/work/tencent/2022.md' },
      { text: '2021 年', link: '/work/tencent/2021.md' }
    ]
  },
  {
    text: '广告业务',
    items: [{ text: '广告业务名词', link: '/work/ams/noun-business.md' }]
  },
  {
    text: '同程旅行',
    collapsible: true,
    collapsed: true,
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
]

export const sidebarBasics = () => [
  {
    text: '网络',
    collapsible: true,
    items: [
      { text: 'Http', link: '/basics/network/http' },
      { text: 'Http状态码', link: '/basics/network/http-code' },
      { text: 'Https', link: '/basics/network/https' },
      { text: 'Http-next', link: '/basics/network/http-next' },
      { text: '网络缓存', link: '/basics/network/cache' },
      { text: '网络连接过程', link: '/basics/network/connectionProcess' },
      { text: '常见的网络问题', link: '/basics/network/network-question' }
    ]
  },
  {
    text: '计算机基础',
    collapsible: true,
    items: [
      {
        text: '计算机是怎样跑起来的笔记',
        link: '/basics/computer/howComputerRun'
      },
      {
        text: '线程和进程的区别',
        link: '/basics/computer/threadsAndProcesses'
      }
    ]
  },
  {
    text: '范式',
    collapsible: true,
    items: [
      { text: '设计模式', link: '/basics/thought/design-mode' },
      { text: '函数式编程', link: '/basics/thought/functional' }
    ]
  }
]

export const sidebarBackend = () => [
  {
    text: '数据库',
    collapsible: true,
    items: [
      { text: 'mysql', link: '/backend/db/mysql' },
      { text: 'redis', link: '/backend/db/redis' }
    ]
  },
  {
    text: '运维',
    collapsible: true,
    items: [
      { text: 'ali-node 监控', link: '/backend/devops/ali-node' },
      { text: 'docker', link: '/backend/devops/docker' },
      { text: 'git-flow', link: '/backend/devops/git-flow' },
      { text: 'linux 环境搭建', link: '/backend/devops/linux' },
      { text: 'nginx', link: '/backend/devops/nginx' }
    ]
  },
  {
    text: 'node',
    collapsible: true,
    items: [
      { text: 'koa', link: '/backend/node/koa' },
      { text: 'node 基础', link: '/backend/node/base' }
    ]
  }
]

export const sidebarAlgorithm = () => [
  {
    text: '数据结构',
    collapsible: true,
    items: [
      { text: '数据结构', link: '/algo-data-str/dataStructure/index' },
      { text: '链表', link: '/algo-data-str/dataStructure/linkedList' },
      { text: '树', link: '/algo-data-str/dataStructure/tree' }
    ]
  },
  {
    text: '算法',
    collapsible: true,
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
      {
        text: '限流算法',
        link: '/algo-data-str/algorithm/currentLimiting'
      },
      {
        text: '工具算法',
        link: '/algo-data-str/algorithm/utils'
      }
    ]
  }
]

export const sidebarFeFramework = () => [
  {
    text: 'vue',
    collapsible: true,
    items: [
      { text: '核心原理与概念', link: '/font-end-framework/vue/core' },
      { text: 'vue3', link: '/font-end-framework/vue/vue3' },
      { text: 'vue-router', link: '/font-end-framework/vue/router' },
      { text: 'vuex', link: '/font-end-framework/vue/vuex' },
      { text: 'vue-ssr', link: '/font-end-framework/vue/ssr' },
      { text: 'vue 通信', link: '/font-end-framework/vue/vue-protocol' },
      { text: '常见问题', link: '/font-end-framework/vue/question' }
    ]
  },
  {
    text: 'react',
    collapsible: true,
    items: [
      { text: '核心原理与概念', link: '/font-end-framework/react/core' },
      { text: 'redux', link: '/font-end-framework/react/redux' },
      { text: 'react-router', link: '/font-end-framework/react/router' },
      { text: '常见问题', link: '/font-end-framework/react/question' }
    ]
  },
  {
    text: 'UI框架对比',
    collapsible: true,
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
        text: 'Diff 过程',
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
      }
    ]
  },
  {
    text: '小程序',
    collapsible: true,
    items: [
      {
        text: '小程序原理',
        link: '/font-end-framework//mini-program/index'
      }
    ]
  }
]

export const sidebarFontEnd = () => [
  {
    text: 'Javascript',
    collapsible: true,
    items: [
      { text: 'JavaScript 的事件循环', link: '/font-end/js/event-loop' },
      { text: 'JavaScript 应用内存分析', link: '/font-end/js/oom' },
      { text: 'JavaScript 的执行机制', link: '/font-end/js/execute' },
      { text: '作用域与垃圾回收', link: '/font-end/js/scope-gc' },
      { text: 'TypeScript', link: '/font-end/js/type-script' },
      { text: '浏览器存储', link: '/font-end/js/storage' },
      { text: '数组操作', link: '/font-end/js/array' },
      { text: '字符操作', link: '/font-end/js/string' },
      { text: '工具类源码', link: '/font-end/js/utils' }
    ]
  },
  {
    text: '浏览器',
    collapsible: true,
    items: [
      { text: '浏览器原理', link: '/font-end/browser/base' },
      { text: '浏览器页面加载过程', link: '/font-end/browser/process' },
      { text: '跨域', link: '/font-end/browser/cross-domain' },
      { text: '安全', link: '/font-end/browser/security' },
      { text: 'AJAX', link: '/font-end/browser/ajax' },
      { text: 'Auth', link: '/font-end/browser/auth' }
    ]
  },
  {
    text: '工程化',
    collapsible: true,
    items: [
      { text: '模块化', link: '/font-end/engineering/modular' },
      { text: 'Babel', link: '/font-end/engineering/babel' },
      { text: 'Webpack', link: '/font-end/engineering/webpack' },
      { text: 'Vite', link: '/font-end/engineering/vite' },
      { text: '包管理', link: '/font-end/engineering/npm' },
      { text: 'JSBridge', link: '/font-end/engineering/bridge' },
      { text: '工程化演进', link: '/font-end/engineering/evolution' },
      { text: '前端监控', link: '/font-end/engineering/monitoring' }
    ]
  },
  {
    text: '性能优化',
    collapsible: true,
    items: [
      { text: '静态资源优化', link: '/font-end/optimize/base' },
      { text: '工程中的相关优化', link: '/font-end/optimize/engineering' },
      { text: '性能指标', link: '/font-end/optimize/indicators' }
    ]
  },
  {
    text: '表现层',
    collapsible: true,
    items: [
      { text: 'HTML 基础', link: '/font-end/html/html' },
      { text: 'CSS 基础', link: '/font-end/html/css' },
      { text: 'Load 与 DOMContentLoaded', link: '/font-end/html/load' },
      { text: 'CSS 中的 BEM 命名规范', link: '/font-end/html/bem' },
      { text: '移动端适配', link: '/font-end/html/mobile-adapter' }
    ]
  }
]
