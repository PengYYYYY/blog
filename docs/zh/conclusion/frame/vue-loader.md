# vue-loader是怎么运行的

## 特性

vue-loader提供给webpack使用。主要提供以下的几点特性

- 允许对Vue组件的每个部分使用其他webpack加载器，例如，对于`<style>`是Sass预处理器，对于`<template>`可以是Pug模版引擎
- 允许.vue文件中定制区块，这些定制块可以应用定制的加载程序链

```vue
<template>
  <div></div>
</template>

<script>
export default {
  
}
</script>

<style>
</style>

```

- 将`<style>`和`<template>`中引用的静态资产视为模块依赖项，并使用webpack加载器处理它们；
- 模拟每个组件的作用域CSS；
- 在开发过程中保持状态的热重载。
`vue-loader`与`webpack`的结合为我们提供了强大的工作流

## 如何工作

接下来看看他是如何工作的

### 第一步

使用 `@vue/component-compiler-utils` 将SFC源代码解析为SFC描述符，然后，它为每种语言块生成一个导入，因此实际返回的模块代码如下所示

```js
// code returned from the main loader for 'source.vue'

// import the <template> block
import render from 'source.vue?vue&type=template'
// import the <script> block
import script from 'source.vue?vue&type=script'
export * from 'source.vue?vue&type=script'
// import <style> blocks
import 'source.vue?vue&type=style&index=1'

script.render = render
export default script

```

代码都是从source.vue中导入的，但是域不同。

### 第二步，针对不同语言

如果我们想指定对应区块内的语言，比如`<script lang="ts">`, 这时候`VueLoaderPlugin`派上用场，对于webpack配置中的每个模块规则，它都会创建一个针对相应Vue语言块请求的修改后的克隆。

假设已经为所有* .js文件配置了babel-loader。该规则将被克隆并应用于Vue SFC `<script>`块。在webpack内部，类似于下面的请求

```js
import script from 'source.vue?vue&type=script'
```

将被转换为

```js
import script from 'babel-loader!vue-loader!source.vue?vue&type=script'
```

如果你为为* .scss文件配置了style-loader + css-loader + sass-loader。

```html
<style scoped lang="scss">
```

`vue-loader` 将其转换为

```js
import 'source.vue?vue&type=style&index=1&scoped&lang=scss'
```

`webpack` 将其转换为

```js
import 'style-loader!css-loader!sass-loader!vue-loader!source.vue?vue&type=style&index=1&scoped&lang=scss'
```

### 第三步

处理扩展的请求时， `vue-loader`会被再次调用，这次`webpack`加载程序会注意到请求具有查询并且仅针对特定的块，选择目标块的内部内容，并将其传递给匹配的目标装载程序。

### 第四步，转换

对于`<script`>块，转换基本结束，对于`<template>` 和 `<style>` 块来说，还有一些额外的任务需要执行。

- 需要使用Vue模板编译器来编译模板

- 需要在`css-loader`执行前, 对`<style scoped>`块进行处理

从技术上讲，这些是额外的装载机（templateLoader，stylePostLoader），需要注入扩展的加载程序链中，如果最终用户必须自己配置，那将非常复杂，所以 `VueLoaderPlugin`也注入了全局的加载器来拦截`<template>`和 `<style>` 的块请求，并注入必要的装载机最终请求如下所示。

```js
// <template lang="pug">
import 'vue-loader/template-loader!pug-loader!vue-loader!source.vue?vue&type=template'

// <style scoped lang="scss">
import 'style-loader!css-loader!vue-loader/style-post-loader!sass-loader!vue-loader!source.vue?vue&type=style&index=1&scoped&lang=scss'
```
