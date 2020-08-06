# babel

babel相关的知识点，包括babel配置和写个小插件.

## 常用的配置

### 插件

Babel 是一个编译器（输入源码 => 输出编译后的代码）;编译过程分为：解析、转换、和打印输出。这些插件用于转换你的代码。

```javascript
{
 "plugins": [
  "array-includes"
 ]
}
```

[常用的插件](https://www.babeljs.cn/docs/plugins)

### preset

预设是已经定义好的一组插件。

`@babel/preset-env`: 不需要指定es版本,直接支持到最新标准。
如果需要使用一些实验性质的`Presets`，需要安装`babel-preset-stage-x`

- stage-0-设想（Strawman）:只是一个想法，可能有Babel插件。
- stage-1-建议（Proposal）:值得跟进的。
- stage-2-草案（Draft）:初始规范。
- stage-3-候选（Candidate）:完成规范并在浏览器上初步实现。
- stage-4-完成（Finished）:将添加到下一个年度版本中的。

### Polyfills

> @babel/polyfill

在运行环境中并没有实现的一些方法，babel-polyfill 会给其做兼容。 但是这样做也有一个缺点，就是会污染全局变量，而且项目打包以后体积会增大很多，因为把整个依赖包也搭了进去。所以并不推荐在一些方法类库中去使用。

在babel7中，@babel/polyfill集成了`core-js/stable`，`core.js`使用了`es5`实现`es6，7，8，9，10`的功能，并且支持按需引入。
`regenerator-runtime/runtime`，则是一个转化器的补充。像`Promise or WeakMap`这样的方法。

### @babel/cli

babel-cli可以支持在命令行中对js进行转换。

```shell
babel xxx.js
```

#### 指定输出文件

```shell
npx babel script.js --out-file script-compiled.js
```

#### 监听文件

```shell
npx babel script.js --watch --out-file script-compiled.js
```

#### 加入Source Maps

```shell
npx babel script.js --out-file script-compiled.js --source-maps
```

### @babel/plugin-transform-runtime

每个Babel编译后的脚本文件，都以导入的方式使用Babel的帮助函数，而不是每个文件都复制一份帮助函数的代码。

- 提高代码重用性，缩小编译后的代码体积。
- 防止污染全局作用域。（启用corejs配置），babel-polyfill会将Promise等添加成全局变量，污染全局空间。但是@babel/polyfill并不会。
- 默认使用@babel/runtime，corejs配置为2时，改为使用@babel/runtime-corejs2。

几个包的包含关系

- babel-polyfill仅仅是引用core-js、regenerator-runtime这两个npm包
- @babel/runtime包含两个文件夹：helpers（定义了一些处理新的语法关键字的帮助函数）、regenerator（仅仅是引用regenerator-runtime这个npm包）。
- @babel/runtime-corejs2包含三个文件夹：core-js（引用core-js这个npm包）、helpers（定义了一些处理新的语法关键字的帮助函数）、regenerator（仅仅是引用regenerator-runtime这个npm包）。

@babel/runtime-corejs2 ≈ @babel/runtime + babel-polyfill;

@babel/runtime只能处理语法关键字，而@babel/runtime-corejs2还能处理新的全局变量（例如，Promise）、新的原生方法（例如，String.padStart

## babel插件编写

写个babel插件
