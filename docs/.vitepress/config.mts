import { defineConfig } from 'vitepress'
import mathjax3 from 'markdown-it-mathjax3'
import { customElements } from './constants'
import {
  navList,
  sidebarGraphics,
  sidebarWork,
  sidebarBasics,
  sidebarBackend,
  sidebarAlgorithm,
  sidebarFeFramework,
  sidebarFontEnd
} from './sidebar'

export default defineConfig({
  lang: 'zh-CN',
  title: 'PY',
  description: 'Vite & Vue powered static site generator.',
  lastUpdated: true,
  base: '/blog/',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/blog/favicon.png'
      }
    ]
  ],
  themeConfig: {
    logo: '/logo.svg',
    nav: navList(),
    outline: {
      level: [2, 4],
      label: '目录'
    },
    sidebar: {
      '/graphics/': sidebarGraphics(),
      '/work/': sidebarWork(),
      '/font-end/': sidebarFontEnd(),
      '/algo-data-str/': sidebarAlgorithm(),
      '/basics/': sidebarBasics(),
      '/backend/': sidebarBackend(),
      '/font-end-framework/': sidebarFeFramework()
    },
    editLink: {
      pattern: 'https://github.com/pengYYYYY/blog/edit/master/docs/:path',
      text: 'Edit this page on GitHub'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/pengYYYYY' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: `Powered By vitepress`
    },

    algolia: {
      appId: 'PXUFXUCGYX',
      apiKey: '8d01cc8eefc39c46b7940eaf926091a0',
      indexName: 'blog'
    }
  },
  markdown: {
    theme: 'material-theme-palenight',
    lineNumbers: true,
    config: (md) => {
      md.use(mathjax3)
    }
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => customElements.includes(tag)
      }
    }
  }
})
