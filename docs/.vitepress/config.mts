import { defineConfig } from 'vitepress'
import mathjax3 from 'markdown-it-mathjax3'
import { customElements } from './constants'
import {
  navList,
  sidebarGraphics,
  sidebarAI,
  sidebarWork,
  sidebarBasics,
  sidebarBackend,
  sidebarAlgorithm,
  sidebarFeFramework,
  sidebarFontEnd
  // sidebarNative,
  // sidebarRust
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
      // '/native/': sidebarNative(),
      '/work/': sidebarWork(),
      '/ai/': sidebarAI(),
      '/font-end/': sidebarFontEnd(),
      '/algo-data-str/': sidebarAlgorithm(),
      '/basics/': sidebarBasics(),
      // '/rust/': sidebarRust(),
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

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索'
          },
          modal: {
            displayDetails: '显示详情',
            resetButtonTitle: '重置',
            backButtonTitle: '返回',
            noResultsText: '没有找到结果',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
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
