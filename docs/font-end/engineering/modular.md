# 模块化

## 为什么需要模块化

- 污染全局作用域。容易有命名冲突问题
- 依赖关系不明显，不利于维护
- 开发和后期维护成本较高
- 无法做工程化

模块化有以下规范：

- CommonJS 规范
- AMD
- CMD
- UMD
- ES6 modules

## CommonJS 规范

`Node.js` 是 `commonJS` 规范的主要应用者

module、exports、require、global 是它的关键字

### 用法

通过 `require` 方法来同步加载所要依赖的其他模块，然后通过 `exports` 或者 `module.exports` 来导出需要暴露的接口

- a.js

```js
var x = 5;
var add = function (value) {
  return value + x;
};
module.exports.x = x;
module.exports.add = add;
```

- b.js

```js
var a = require('./a.js');
console.log(example.x); // 5
console.log(example.add(1)); // 6
```

### 实现

其实在编译的过程中，Node 对我们定义的 JS 模块进行了一次基础的包装

```js
(function(exports, require, modules, __filename, __dirname)) {
  ...
})
```

这样我们便可以访问这些传入的 `arguments` 以及隔离了彼此的作用域。
`CommonJS` 的一个模块，就是一个脚本文件。`require` 命令第一次加载该脚本，就会执行整个脚本，然后在内存生成一个对象。

```js
{
  id: '...',
  exports: { ... },
  loaded: true,
  ...
}
```

以后需要用到这个模块的时候，就会到 `exports` 属性上面取值。即使再次执行 `require` 命令，也不会再次执行该模块，而是到缓存之中取值。`CommonJS` 用同步的方式加载模块，只有在代码执行到 `require` 的时候，才回去执行加载。在服务端，模块文件都存在本地磁盘，读取非常快.

优点：`CommonJS` 规范完成了 `JavaScript` 的 模块化，解决了依赖、全局变量污染的问题
缺点：在浏览器端，限于网络原因，更合理的方案是使用异步加载。这就是 `AMD` 规范诞生的背景。

## AMD

异步加载模块：这里异步指的是不堵塞浏览器其他任务（ `dom` 构建，`css` 渲染等），而加载内部是同步的（加载完模块后立即执行回调）

### AMD用法

define() 定义模块，用 require() 加载模块

- define(id, [depends], callback)
- require([module], callback)

```js

// 定义 moduleA 依赖 a, b模块
define(['./a','./b'],function(a,b){
   a.doSomething()
   b.doSomething()
}) 

// 使用
require(['./moduleA'], function(moduleA) {
  // ...
})
```

优点：适合在浏览器环境中异步加载模块。 可以并行加载多个模块。

缺点：不能按需加载，而是必须提前加载所有的依赖。

## CMD 规范

按需加载，依赖就近，延迟执行

```js
define(function(require, exports, module) {
    var a = require('./a'); //在需要时申明
    a.doSomething();
    if (false) {
        var b = require('./b');
        b.doSomething();
    }
})
```

代码在运行时，首先是不知道依赖的，需要遍历所有的 require 关键字，找出后面的依赖。具体做法是将 function toString 后，用正则匹配出 require 关键字后面的依赖。牺牲性能来换取更多开发便利的方法。

而 AMD 是依赖前置的，换句话而 AMD是依赖前置的，在解析和执行当前模块之前，模块作者必须指明当前模块所依赖的模块。代码在一旦运行到此处，能立即知晓依赖。而无需遍历整个函数体找到它的依赖，因此性能有所提升，缺点就是开发者必须显式得指明依赖——这会使得开发工作量变大。

## UMD

不是一种规范,是结合 AMD 和 CommonJS 的一种更为通用的 JS 模块解决方案,在webpack打包的时候进行配置

## ES6 module

`ES6 Modules` 不是对象，`import` 命令会被 `JavaScript` 引擎静态分析，在编译时就引入模块代码，而不是在代码运行时加载，所以无法实现条件加载。也正因为这个，使得静态分析成为可能。

- 之前的几种模块化方案都是前端社区自己实现的，只是得到了大家的认可和广泛使用
- `ES6` 在语言标准的层面上，实现了模块功能，完全可以取代 `CommonJS` 和 `AMD` 规范，成为浏览器和服务器通用的模块解决方案。
- 由于 `ES6` 目前在部分浏览器无法执行，所以，我们只能通过 `babel` 将不被支持的 `import` 编译为当前受到广泛支持的 `require`。

在开发环境中使用众多。

[支持情况](http://kangax.github.io/compat-table/es6/)

## CommonJS，ES module 的区别

它们都是一种模块规范，例如 Node 使用的就是 CommonJS 规范。ES module 则是语言标准上的模块规范。

- CommonJS 模块使用 require() 和 module.exports，ES6 模块使用 import和 export。
- CommonJS 模块输出的是一个值的浅拷贝，ES6 模块输出的是值的引用。
- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
- CommonJS 模块的 require() 是同步加载模块，ES6 模块的 import 命令是异步加载，有一个独立的模块依赖的解析阶段。
- ES6 模块之中，顶层的 this 指向 undefined；CommonJS 模块的顶层 this 指向当前模块，
- 对于循环加载的处理方法不同

第 3 个差异是因为 CommonJS 加载的是一个对象（即 module.exports 属性），该对象只有在脚本运行完才会生成。
