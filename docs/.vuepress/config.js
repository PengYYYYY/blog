const { getFontEndBar, getNodeBar, getNetWorkBar, getOthersBar, getAlgorithmBar, getArticlesBar } = require('./slider')
const { cnNav, nav } = require('./nav')

module.exports = {
  base: '/my-blog/',
  dest: 'dist',
  locales: {
    '/': {
      label: '简体中文',
      selectText: '选择语言',
      ariaLabel: '选择语言',
      lang: 'zh-CN',
      title: 'Super-YUE Blog',
      description: '日常学习和技术积累'
    },
    // '/en/': {
    //   lang: 'en-US',
    //   title: 'Super-YUE Blog',
    //   description: 'Daily learning and technology accumulation'
    // }
  },
  markdown: {
    lineNumbers: true
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@alias': '../public'
      }
    }
  },
  themeConfig: {
    editLinks: false,
    docsDir: 'docs',
    editLinks: true,
    smoothScroll: true,
    locales: {
      '/': {
        label: '简体中文',
        selectText: '选择语言',
        ariaLabel: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        sidebar: {
          '/zh/fontend/': getFontEndBar('前端'),
          '/zh/node/': getNodeBar('Node'),
          '/zh/network/': getNetWorkBar('网络'),
          '/zh/algorithm/': getAlgorithmBar('算法与数据结构'),
          '/zh/others/': getOthersBar('其他'),
          '/zh/articles/': getArticlesBar('文章'),
        },
        nav : cnNav,
      },
      // '/en/': {
      //   label: 'English',
      //   selectText: 'Languages',
      //   ariaLabel: 'Select language',
      //   editLinkText: 'Edit this page on GitHub',
      //   lastUpdated: 'Last Updated',
      //   sidebar: {
      //     '/en/fontend/': getFontEndBar('FontEnd'),
      //     '/en/node/': getNodeBar('Node'),
      //     '/en/network/': getNetWorkBar('Network'),
      //     '/en/algorithm/': getAlgorithmBar('Algorithm'),
      //     '/en/interest/': getInterestBar('Interest'),
      //   },
      //   nav : nav
      // },
    }
  },
  extraWatchFiles: [
    '.vuepress/nav.js',
    '.vuepress/slider.js'
  ],
  plugins: [
    '@vuepress/nprogress',
    ['@vuepress/back-to-top', true],
    ['@vuepress/google-analytics', {
      ga: 'UA-163627658-1'
    }],
  ]
}
