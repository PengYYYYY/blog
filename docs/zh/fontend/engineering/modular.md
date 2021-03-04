# 模块化

## CommonJS，ES module 的区别

它们都是一种模块规范，例如 Node 使用的就是 CommonJS 规范。ES module 则是语言标准上的模块规范。

- CommonJS 模块使用 require() 和 module.exports，ES6 模块使用 import和 export。
- CommonJS 模块输出的是一个值的浅拷贝，ES6 模块输出的是值的引用。
- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
- CommonJS 模块的 require() 是同步加载模块，ES6 模块的 import 命令是异步加载，有一个独立的模块依赖的解析阶段。
- ES6 模块之中，顶层的 this 指向 undefined；CommonJS 模块的顶层 this 指向当前模块，
- 对于循环加载的处理方法不同

第 3 个差异是因为 CommonJS 加载的是一个对象（即 module.exports 属性），该对象只有在脚本运行完才会生成。