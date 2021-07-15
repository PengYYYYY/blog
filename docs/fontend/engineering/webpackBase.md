# webpack

![img](https://gitee.com/PENG_YUE/myImg/raw/master/uPic/6tEBVl.png)

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

使用 `html-webpack-plugin`

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

## 事件流

- webpack 通过 Tapable 来组织这条复杂的生产线。
- webpack 的事件流机制保证了插件的有序性，使得整个系统扩展性很好。
- webpack 的事件流机制应用了观察者模式，和 Node.js 中的 EventEmitter 非常相似。
