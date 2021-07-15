const { getFontEndBar, getBackendBar, getNetWorkBar, getAlgorithmBar, getArticlesBar } = require('./slider')
const { cnNav } = require('./nav')

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
        // lastUpdated: '上次更新',
        sidebar: {
          '/fontend/': getFontEndBar(),
          '/backend/': getBackendBar(),
          '/network/': getNetWorkBar(),
          '/conclusion/': getArticlesBar(),
          '/algorithm/': getAlgorithmBar(),
        },
        nav : cnNav,
      },
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
