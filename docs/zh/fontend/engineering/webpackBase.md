# webpack

![img](https://gitee.com/PENG_YUE/myImg/raw/master/uPic/k7xwFY.png)

## webpack的文件监听以及热更新

文件监听原理，轮询判断文件的最后编辑时间是否发生变化

某个文件发生了变化，并不会立即告诉监听者，而是先缓存起来，等aggregateTimeout

### 热更新

- webpack-dev-server + HotModuleReplacementPlugin插件: 热跟新不输出文件，直接放在内存中。

- webpack-dev-middleware:将webpack输出等文件传输给服务器：较为灵活。

### 热更新原理

[从零实现webpack热更新HMR](https://juejin.cn/post/6844904020528594957)

## 文件指纹

通常用于文件的版本管理

- Hash:和整个项目的构建目录有关，只要项目文件有修改，整个项目构建的hash值就会变。
- chunkHash: 和webpack打包的chunk有关，不同的entry会生成不同的chunkHash值。
- contentHash: 根据文件内容来定义hash,文件内容不变，则contentHash不变

- css指纹设置：通过miniCssExtractPlugin来做

## 代码压缩

代码压缩处理

### js压缩

js内置了`uglifyjs-webpack-plugin`进行压缩

### css压缩

使用`optimize-css-assets-webpack-plugin`
同时使用`cssnano`

```js
plugins:[
  new OptimizeCssAssetsPlugin({
    assetNameRegExp: /\.css$/g,
    cssProcessor: require('cssnano')
  })
]
```

### 压缩

使用html-webpack-plugin，设置参数即可。

## 资源内连

通过资源内连优化性能

### 代码层面

- 页面框架的初始化脚本
- 上报相关的打点
- css内连避免页面的闪动

### 请求层面

减少http请求

- 小图片或者字体内嵌

### 如何内连

raw-loader内连html，js

css内连：

- 借助：style-loader,设置选项options
- 借助：html-inline-css-webpack-plugin

## 多页面应用打包（MPA）

多页面通用打包方案

动态获取entry和设置html-webpack-plugin数量

利用glob.sync

```javascript
entry: glob.sync(path.join(__dirname,'./src/*/index.js'))
```

## 打包优化手段

### treeShaking

treeShaking会在静态解析过程中将代码中的冗余代码去除。在`production`环境中默认开启。该功能借鉴自`rollup`

### ScopeHoisting

scopeHoisting主要用于处理构建过程中由于模块处理导致出现的大量匿名闭包函数，在`ES6-`中,通常会通过使用匿名闭包函数来构造模块。

`scopeHoisting`的原理是通过分析代码中的模块执行顺序，替换变量名称来达到减少闭包产生的效果。闭包会形成大量的块级作用域，增加内存损耗。

### split chunk

对于大的应用来讲，将所有代码都放到一个文件中不够显示，需要对代码进行分割和懒加载(用到的时候才加载)。

懒加载js脚本的方式

- commonJS:require.ensure
- ES6:动态import(目前原生未支持，需要babel转换) `@babel/plugin-syntax-dynamic-import`

### terser

压缩工具，uglify在遇到es6时会报错。terser可以进行处理。

## eslint

eslint代码检查工具

### eslint的落地

安装husky，增加npm script,通过lint-staged增量检查修改方式

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

## webpack打包基础库

webpack打包基础库,满足以下条件

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

- 服务端：使用库的renderToString方法将组件渲染成字符串，服务端返回对应的模版。

- 客户端：打包出针对服务端的组件

### 构建包配置

通用性

- 业务开发者无需关注构建配置
- 统一团队构建脚本

可维护性

- 构建配置合理拆分
- README文档

质量

- 冒烟测试，单元测试，测试覆盖率
- 持续集成

## webpack优化

webpack的优化分两块

- 速度优化
- 体积优化

### 性能分析

- 速度分析

分析整个打包总耗时,每个插件和loader的耗时情况

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

- HappyPack解析资源

每次 webapck 解析一个模块，HappyPack 会将它及它的依赖分配给 worker 线程中

- 使用 thread-loader 解析资源

每次 webpack 解析一个模块，thread- loader 会将它及它的依赖分配给 worker 线程中

- 并行压缩

方法一:使用 parallel-uglify-plugin 插件
方法二:uglifyjs-webpack-plugin 开启 parallel 参数
方法三:terser-webpack-plugin 开启 parallel 参数

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

Polyfill Service原理:
识别 User Agent，下发不同的 Polyfill
