import { defineConfig } from 'vitepress'
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
        href: './favicon.png'
      }
    ]
  ],

  themeConfig: {
    logo: './logo.svg',
    nav: navList(),
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
      repo: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
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
      appId: 'test',
      apiKey: 'test',
      indexName: 'py'
    }
  }
})
