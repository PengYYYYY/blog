export const navList = () => [
  {
    text: '文章',
    activeMatch: '/article/',
    link: '/article/'
  },
  {
    text: '学习记录',
    activeMatch: `^/(font-end|font-end-framework|algo-data-str|backend|basics|graphics)/`,
    items: [
      { text: '前端基础', link: '/font-end/index' },
      { text: '前端框架', link: '/font-end-framework/index' },
      { text: '图形学', link: '/graphics/index' },
      { text: '客户端', link: '/native/index' },
      { text: '数据结构与算法', link: '/algo-data-str/index' },
      { text: '后端与运维', link: '/backend/index' },
      { text: '基础知识', link: '/basics/index' }
    ]
  },
  {
    text: '成长',
    activeMatch: '/work/',
    link: '/work/me'
  }
]

export const sidebarGraphics = () => [
  {
    text: '渲染方式',
    items: [
      { text: 'svg 基础', link: '/graphics/render/svg.md' },
      { text: 'canvas 基础', link: '/graphics/render/canvas.md' },
      { text: 'webgl 基础', link: '/graphics/render/webgl.md' }
    ]
  },
  {
    text: '引擎',
    items: [
      { text: 'pixi', link: '/graphics/engine/pixi.md' },
      { text: 'skia', link: '/graphics/engine/skia.md' },
      { text: '物理引擎', link: '/graphics/engine/physics.md' }
    ]
  },
  {
    text: '数学',
    items: [{ text: '线性代数', link: '/graphics/math/linear-algebra.md' }]
  }
]

export const sidebarNative = () => [
  {
    text: '安卓',
    items: [{ text: '基础知识', link: '/native/android/index.md' }]
  },
  {
    text: 'iOS',
    items: [{ text: '基础知识', link: '/native/ios/index.md' }]
  },
  {
    text: '动态化',
    items: [{ text: '动态化', link: '/native/dynamic/index.md' }]
  }
]

export const sidebarRust = () => [
  {
    text: 'rust 基础',
    items: [{ text: '基础知识', link: '/rust/index.md' }]
  }
]

export const sidebarWork = () => [
  { text: '关于我', link: '/work/me.md' },
  {
    text: '腾讯',
    items: [
      { text: '2025 年', link: '/work/tencent/2025.md' },
      { text: '2024 年', link: '/work/tencent/2024.md' },
      { text: '2023 年', link: '/work/tencent/2023.md' },
      { text: '2022 年', link: '/work/tencent/2022.md' },
      { text: '2021 年', link: '/work/tencent/2021.md' }
    ]
  },
  {
    text: '广告业务',
    items: [
      { text: '广告系统总览', link: '/work/ams/ads-system.md' },
      { text: '广告业务名词', link: '/work/ams/noun-business.md' }
    ]
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
    text: '计算机网络',
    collapsible: true,
    items: [
      { text: 'Http', link: '/basics/network/http' },
      { text: 'Http状态码', link: '/basics/network/http-code' },
      { text: 'Https', link: '/basics/network/https' },
      { text: 'HttpNext', link: '/basics/network/http-next' },
      { text: '网络缓存', link: '/basics/network/cache' },
      { text: '网络连接过程', link: '/basics/network/connectionProcess' },
      { text: '常见的网络问题', link: '/basics/network/network-question' }
    ]
  },
  {
    text: '数学',
    collapsible: true,
    items: [
      { text: '数学应用', link: '/basics/math/math-application' },
      { text: '线性代数', link: '/basics/math/linear-algebra' }
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
  },
  {
    text: '场景',
    collapsible: true,
    items: [{ text: '限流算法', link: '/backend/scene/currentLimiting' }]
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
      { text: '算法思想', link: '/algo-data-str/algorithm/mind' },
      { text: '复杂度', link: '/algo-data-str/complexity' },
      { text: '数组和字符串', link: '/algo-data-str/algorithm/arrAndStr' },
      { text: '双指针', link: '/algo-data-str/algorithm/doublePointer' },
      { text: '滑动窗口', link: '/algo-data-str/algorithm/slidingWindow' },
      { text: '矩阵', link: '/algo-data-str/algorithm/matrix' },
      { text: '哈希表', link: '/algo-data-str/algorithm/hash' },
      { text: '区间', link: '/algo-data-str/algorithm/range' },
      { text: '栈', link: '/algo-data-str/algorithm/stack' },
      { text: '链表', link: '/algo-data-str/algorithm/linkedList' },
      { text: '树', link: '/algo-data-str/algorithm/tree' },
      { text: '回溯', link: '/algo-data-str/algorithm/backtrack' },
      { text: '二分查找', link: '/algo-data-str/algorithm/binarySearch' },
      { text: '分治', link: '/algo-data-str/algorithm/separateGovern' },
      { text: '排序', link: '/algo-data-str/algorithm/sort' },
      { text: '动态规划', link: '/algo-data-str/algorithm/dynamicPlan' },
      { text: '数学和位运算', link: '/algo-data-str/algorithm/math' }
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
      { text: '常见问题', link: '/font-end-framework/react/question' },
      { text: '深度好文', link: '/font-end-framework/react/article' }
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
      { text: 'TypeScript', link: '/font-end/js/typescript' },
      { text: '浏览器存储', link: '/font-end/js/storage' },
      { text: '数组操作', link: '/font-end/js/array' },
      { text: '字符操作', link: '/font-end/js/string' },
      { text: '工具类源码', link: '/font-end/js/utils' },
      { text: '场景实现', link: '/font-end/js/scene' }
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
    text: '基础知识',
    collapsible: true,
    items: [
      { text: 'HTML 基础', link: '/font-end/base/html' },
      { text: 'CSS 基础', link: '/font-end/base/css' },
      { text: 'Load 与 DOMContentLoaded', link: '/font-end/base/load' },
      { text: 'CSS 中的 BEM 命名规范', link: '/font-end/base/bem' },
      { text: '移动端适配', link: '/font-end/base/mobile-adapter' }
    ]
  }
]
