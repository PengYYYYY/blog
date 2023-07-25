# 工程中的相关优化

## 渲染相关

### 渲染流程

- 生成 dom-tree,
- 生成 css-tree
- 合成 css-dom-tree，也就是 render-tree
- 计算布局（layout）:根据生成的 render-tree,进行回流，以计算每个节点的几何信息（位置，大小，字体样式）。
- 绘制（painting）：根据渲染树和回流得到的几何信息，得到每个节点的绝对像素
- 展示（display）：将像素发送给图形处理器（GPU）,展示到页面上

### 页面渲染技术架构

#### 服务端渲染

- 后端同步渲染、同构直出页面

#### 客户端渲染

- js 渲染：静态化、前后端分离、单页应用
- web app：ang, vue, react

### lazy-load实现

```html
<image src='default.png' :data-src='xxx.png' class='lazy-load-img'>
```

```js
function throttle(fn, time) {
  let isRun = false
  return function() {
    if(isRun) return
    isRun = true
    setTimeout(() => {
      fn.call(this, arguments)
      isRun = false
    }, time);
  }
}
window.scroll = throttle(watchScroll, 200);
function watchScroll() {
  var bodyScrollHeight = document.body.scrollTop;
  var windowHeight =  window.innerHeight;
  var images = document.querySelectorAll("lazy-load-img")
  for (let i = 0; i < images.length; i++) {
    var imgHeight = images[i].offsetTop;
    if (imgHeight  < windowHeight  + bodyScrollHeight) {
       images[i].src = images[i].getAttribute('data-src');
       images[i].className = images[i].className.replace('lazy-load-img','')
    }
  }
}
```

### 预加载

实现方式

1. html 标签
2. image对 象
3. 使用 preload,prefetch,preconnect

```js
<link rel="preload" href="xxx.css">
<link rel="prefetch" href="scr/image.png">
<link rel="dns-prefetch" href="scr/image.png">
<link rel="preconnect" href="https://my.com" crossorigin>
```

## webview

### ios UIWebview

> 不足

1. 内存泄露
2. 极高内存峰值
3. Touch Delay(300ms延迟)
4. JavaScript 的运行性能还有通信限制

### ios wkWebview

> 优势

1. 苹果在 wwdc 2014 上推出的新一代 webview 组件
2. 内存开销变低
3. 在性能，稳定性，占有内存方面有很大的提升
4. 高达 60fps 的刷新率
5. 支持右滑返回
6. 更多的 html 属性

## 监控

### h5质量即时检测

- 页面错误
  - js 报错
  - 接口报错
  - 线上环境检测
  - 页面白屏

- 页面性能
  - 页面加载时间检测
  - 前端 html，css, js 压缩检测
  - js，css 个数检测
  - 服务器 gzip 检测
  - 服务器缓存设置检测

- 页面安全
  - http 和 https 检测
  - xss 检测

### 上线后h5性能和错误监控

- 页面性能监控
  - js 错误监控
  - API 接口监控
  - 日志详情
  - 用户轨迹

- 统计报表
  - 大盘走势
  - 地域
  - 运营商
  - 浏览器

- 页面管理
- 性能服务
- 报警服务

## 打包优化手段

### treeShaking

treeShaking 会在静态解析过程中将代码中的冗余代码去除。在 `production` 环境中默认开启。该功能借鉴自 `rollup`

### ScopeHoisting

scopeHoisting 主要用于处理构建过程中由于模块处理导致出现的大量匿名闭包函数，在 `ES6-` 中,通常会通过使用匿名闭包函数来构造模块。

`scopeHoisting` 的原理是通过分析代码中的模块执行顺序，替换变量名称来达到减少闭包产生的效果。闭包会形成大量的块级作用域，增加内存损耗。

### split chunk

对于大的应用来讲，将所有代码都放到一个文件中不够显示，需要对代码进行分割和懒加载(用到的时候才加载)。

懒加载 js 脚本的方式

- commonJS: require.ensure
- ES6:动态 import(目前原生未支持，需要babel转换) `@babel/plugin-syntax-dynamic-import`

### terser

压缩工具，uglify 在遇到 es6 时会报错，terser 可以进行处理。

## eslint

eslint 代码检查工具

### eslint 的落地

安装 husky，增加 npm script, 通过 lint-staged 增量检查修改方式

```json
"scripts": {
 "precommit": "lint-staged"
},
"lint-staged": {
 "linters": {
  "*.{js,css}": ["eslint --fix", "git add"]
 }
}
```

## webpack 打包基础库

webpack 打包基础库,满足以下条件

- 需要打包压缩版和非压缩版
- 支持AMD/CJS/ESM模块引入

webpack.config.js

### 服务端渲染

渲染：HTML+CSS+JS+Data->渲染后的HTML
服务端：

- 所有模板等资源都储存在服务端
- 内网机器拉取数据快
- 一个HTML返回数据

|  |客户端渲染｜ 服务端渲染｜
｜--｜--｜--｜
｜请求｜多个请求｜1个请求｜
｜加载过程｜HTML&数据串行加载｜1个请求返回HTML&数据｜
｜渲染｜前端渲染｜服务端渲染｜

服务端渲染的核心是减少请求，减少白屏时间，对SEO更加友好

#### 实现思路

- 服务端：使用库的 `renderToString` 方法将组件渲染成字符串，服务端返回对应的模版。

- 客户端：打包出针对服务端的组件

### 构建包配置

通用性

- 业务开发者无需关注构建配置
- 统一团队构建脚本

可维护性

- 构建配置合理拆分
- README 文档

质量

- 冒烟测试，单元测试，测试覆盖率
- 持续集成

## webpack优化

webpack 的优化分两块

- 速度优化
- 体积优化

### 性能分析

- 速度分析

分析整个打包总耗时,每个插件和 loader 的耗时情况

```js
const  speedMeasureWebpackPlugin = require("speed-measure-webpack-plugin")
const smp = new speedMeasureWebpackPlugin()
const webpackConfig = smp.warp({
  plugins: [
    xxx
  ]
})

```

- webpack-bundle-analyzer

依赖的第三方模块文件大小,业务里面的组件代码大小

```js
const wba = require("webpack-bundle-analyzer")
module.exports = {
  plugins: [
    new wba()
  ]
}
```

### 速度优化

- HappyPack 解析资源

每次 webpack 解析一个模块，HappyPack 会将它及它的依赖分配给 worker 线程中

- 使用 thread-loader 解析资源

每次 webpack 解析一个模块，thread-loader 会将它及它的依赖分配给 worker 线程中

- 并行压缩

方法一:使用 parallel-uglify-plugin 插件
方法二: uglifyjs-webpack-plugin 开启 parallel 参数
方法三: terser-webpack-plugin 开启 parallel 参数

### 分包:设置 Externals

- externals

将 vue 等基础包通过 cdn 引入，不打入 bundle 中。
使用 html-webpack-externals-plugin

### 预编译资源模块

将 vue, vuex、vue-router 基础包和业务基础包打包成一个文件

使用 DLLPlugin 进行分包，DllReferencePlugin 对 manifest.json 引用

使用 DllReferencePlugin 引用 manifest.json

### 缓存

目的:提升二次构建速度

- babel-loader 开启缓存
- terser-webpack-plugin 开启缓存
- 使用 cache-loader 或者 hard-source-webpack-plugin

### 缩小构建目标

目的:尽可能的少构建模块,比如 babel-loader 不解析 node_modules

### 减少文件搜索范围

- 优化 resolve.modules 配置(减少模块搜索层级)

- 优化 resolve.mainFields 配置

- 优化 resolve.extensions 配置

- 合理使用 alias

### 体积优化

- 删除掉无用的 CSS

PurifyCSS: 遍历代码，识别已经用到的 CSS class
uncss: HTML 需要通过 jsdom 加载，所有的样式通过PostCSS解析，通过document.querySelector 来识别在 html 文件里面不存在的选择器

使用 purgecss-webpack-plugin 和 mini-css-extract-plugin 配合使用。

- 动态 Polyfill

Polyfill Service 原理:
识别 User Agent，下发不同的 Polyfill

### loader 和 plugin

- loader
loader 是文件加载器，能够加载资源文件，并对这些文件进行一些处理，诸如编译、压缩等，最终一起打包到指定的文件中

  - 处理一个文件可以使用多个 loader，loader 的执行顺序是和本身的顺序是相反的，即最后一个 loader 最先执行，第一个 loader 最后执行。
  - 第一个执行的 loader 接收源文件内容作为参数，其他loader接收前一个执行的 loader 的返回值作为参数。最后执行的 loader 会返回此模块的 JavaScript 源码

loader 接收一个参数，并且 return 一个内容就 ok 了。

- plugin

在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。

