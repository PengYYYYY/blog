module.exports = {
  base: '/my-blog/',
  dest: 'dist',
  title: 'super-YUE blogs',
  description: 'Hello FE!',
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
    nav : [ // 添加导航栏
      {
        text: '前端',
        link: '/fontend/'
      },
      {
        text: 'Node',
        link: '/node/'
      },
      {
        text: '网络',
        link: '/network/'
      },
      {
        text: '其他',
        link: '/other/'
      },
      {
        text: 'GitHub',
        link: 'https://github.com/super-YUE'
      }
    ],
    sidebar: {
      '/fontend/': getFontEndBar(),
      '/node/': getNodeBar(),
      '/network/': getNetWorkBar(),
      '/other/': getOtherBar(),
    }
  },
  plugins: ['@vuepress/nprogress']
}

function getFontEndBar() {
  return [
    {
      title: 'Font-end',
      collapsable: false,
      children: [
        ['/fontend/', 'Mind mapping'],
        '/fontend/install',
        '/fontend/start',
      ]
    },
  ]
}

function getNodeBar() {
  return [
    {
      title: 'node',
      collapsable: false,
      children: [
        ['/node/', 'Mind mapping'],
      ]
    },
  ]
}

function getNetWorkBar() {
  return [
    {
      title: 'network',
      collapsable: false,
      children: [
        ['/network/', 'Mind mapping'],
      ]
    },
  ]
}

function getOtherBar() {
  return [
    {
      title: 'other',
      collapsable: false,
      children: [
        ['/other/', 'Mind mapping'],
      ]
    },
  ]
}