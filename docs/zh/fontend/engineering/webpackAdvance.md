# webpack进阶

Webpack可以将其理解是一种基于事件流的编程范例，一系列的插件运行。

## webpack启动

- 查找入口 node_modules/webpack/bin/webpack.js
- 启动后，webpack 最终找到 webpack-cli，并且 执行 CLI。
- webpack-cli 做的事情

引入 yargs，对命令行进行定制，分析命令行参数，对各个参数进行转换，组成编译配置项，引用webpack，根据配置项进行编译和构建

webpack-cli对配置文件和命令行参数进行转换最终生成配置选项参数 options最终会根据配置参数实例化 webpack 对象，然后执行构建流程。

webpack的编译都按照下面的钩子调用顺序执行：

entry-option(初始化option) -> run(开始编译) -> make(从entry开始递归的 分析依赖，对每个 依赖模块进行build) -> before-resolve(对模块位置进行解析) -> build-module(开始构建某个模块) -> normal-module-loader(将loader加载完成的 module进行编译，生成 AST树) -> program(遍历AST，当遇到 require等一些调用表 达式时，收集依赖) -> seal(所有依赖build完 成，开始优化) -> emit(输出到dist目录)

## compiler和compilation

- Compiler:

Compiler 也是我们所说的 Tapable 实例，他就是webpack的整体环境。通过这种实现机制，我们可以理解为，它混合(mix)了 Tapable类，来使实例也具备注册和调用插件功能。
插件机制事实上就是通过注册在Complier上，在运行时Compier会根据各种事件钩子，从而触发插件的注册函数。

- Compilation:

Compilation 实例继承于 compiler。例如，compiler.compilation 是对所有 require 图(graph)中对象的字面上的编译。这个对象可以访问所有的模块和它们的依赖（大部分是循环依赖）。在编译阶段，模块被加载，封闭，优化，分块，哈希和重建等等。这将是任何编译操作中，重要的生命周期。

官方文档看起来比较难理解，compilation 对象代表了一次单一的版本构建和生成资源。当运行 webpack 开发环境中间件时，每当检测到一个文件变化，一次新的编译将被创建，从而生成一组新的编译资源。一个编译对象表现了当前的模块资源、编译生成资源、变化的文件、以及被跟踪依赖的状态信息。编译对象也提供了很多关键点回调供插件做自定义处理时选择使用。

两者之间的区别：

compiler 对象代表的是不变的webpack环境，是针对webpack的
compilation 对象针对的是随时可变的项目文件，只要文件有改动，compilation就会被重新创建。

## Tapable

其核心对象继承自Tapable，Tapable 是一个类似于 Node.js 的 EventEmitter 的库, 主要是控制钩子函数的发布 与订阅,控制着 webpack 的插件系统。Tapable库暴露了很多 Hook(钩子)类，为插件提供挂载的钩子。

```js
const {
  SyncHook, //同步钩子
  SyncBailHook, //同步熔断钩子
  SyncWaterfallHook, //同步流水钩子
  SyncLoopHook, //同步循环钩子
  AsyncParallelHook, //异步并发钩子
  AsyncParallelBailHook, //异步并发熔断钩子
  AsyncSeriesHook, //异步串行钩子
  AsyncSeriesBailHook,  //异步串行熔断钩子
  AsyncSeriesWaterfallHook //异步串行流水钩子
} = require("tapable");
```

hook 基本用法示例

```js
const hook1 = new SyncHook(["arg1", "arg2", "arg3"]);
hook1.tap('hook1', (arg1, arg2, arg3) => console.log(arg1, arg2, arg3)) //1,2,3
```

tabable提供了同步&异步钩子的方法，并且他们都有绑定事件和执行事件对应的方法。

## webpackHooks

### 流程相关

- (before-)run
- (before-/after-)compile ·make
- (after-)emit
- done

### 监听相关

- watch-run
- watch-close

## Compilation hooks

### 模块相关

- build-module
- failed-module
- succeed-module

### 资源生成相关

- module-asset
- chunk-asset

### 优化和 seal相关

- (after-)seal
- optimize
- optimize-modules(-basic/advanced)
- after-optimize-modules
- after-optimize-chunks
- after-optimize-tree
- optimize-chunk-modules (-basic/advanced)
- after-optimize-chunk-modules
- optimize-module/chunk-order
- before-module/chunk-ids
- (after-)optimize-module/ chunk-ids
- before/after-hash

## Chunk 生成算法

1. webpack 先将 entry 中对应的 module 都生成一个新的 chunk
2. 遍历 module 的依赖列表，将依赖的 module 也加入到 chunk 中
3. 如果一个依赖 module 是动态引入的模块，那么就会根据这个 module 创建一个 新的 chunk，继续遍历依赖
4. 重复上面的过程，直至得到所有的 chunks

## loader

loader 只是一个导出为函数的 JavaScript 模块。和glup类似。

### 执行顺序

多个 Loader 串行执行，顺序从后到前。

Compose(webpack采取的是这种)

```js
compose = (f, g) => (...args) => f(g(...args));
```

### loader 的参数获取

通过 loader-utils 的 getOptions 方法获取

```js
const loaderUtils = require("loader-utils");
module.exports = function(content) {
  const { name } = loaderUtils.getOptions(this);
};
```

### 调试

使用 `loader-runner` 调试 loader

## pulgin

pulgin,只能在 webpack 里面运行，通过导出apply函数，提供给webpack进行调用。

```js
module.exports = class DemoPlugin { 
  constructor(options) {
    this.options = options;
  }
  apply() {
    console.log("apply", this.options);
  }
};

```

## external
