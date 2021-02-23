# Vue3.0

vue3.0代码结构 ![img](https://gitee.com/PENG_YUE/myImg/raw/master/uPic/tUoPsF.png)

## 优化

vue3.0带来的优化

### 源码优化

更好的代码管理方式：monorepo

Vue 2.x 的源码托管在 src 目录，然后依据功能拆分出了 compiler（模板编译的相关代码）、core（与平台无关的通用运行时代码）、platforms（平台专有代码）、server（服务端渲染的相关代码）、sfc（.vue 单文件解析相关代码）、shared（共享工具代码）

![img](https://gitee.com/PENG_YUE/myImg/raw/master/uPic/Q5GHQE.png)

Vue 3.0 ，整个源码是通过 monorepo 的方式维护的，根据功能将不同的模块拆分到 packages

![img](https://gitee.com/PENG_YUE/myImg/raw/master/uPic/vjReQ9.png)

monorepo 把这些模块拆分到不同的 package 中，每个 package 有各自的 API、类型定义和测试。这样使得模块拆分更细化，职责划分更明确，模块之间的依赖关系也更加明确。
另外一些 package（比如 reactivity 响应式库）是可以独立于 Vue.js 使用的，这样用户如果只想使用 Vue.js 3.0 的响应式能力，可以单独依赖这个响应式库而不用去依赖整个 Vue.js，减小了引用包的体积大小。

### 虚拟dom重写

针对不同类型对节点进行不同策略的处理。

### 性能提升

- 自定义渲染器，静态标记性能提升

- 编译时优化

- 更好的初始性能

2.tree-shaking支持，更小的文件大小
3.composition Api新语法
4.fragment,teleport,suspense新组件
5.更好的typescript支持
6.自定义渲染器

tree-shaking原理：依赖 ES2015 模块语法的静态结构（即 import 和 export），通过编译阶段的静态分析，找到没有引入的模块并打上标记。未被引入的 square 模块会被标记，然后压缩阶段会利用例如 uglify-js、terser 等压缩工具真正地删除这些没有用到的代码。
利用 tree-shaking技术，如果在项目中没有引入Transition、KeepAlive 等组件, 那么它们对应的代码就不会打包，这样也就间接达到了减少项目引入的 Vue.js 包体积的目的。

### 数据劫持优化

- vue1x与vue2x是利用Object.defineProperty这个 API 去劫持数据的 getter 和 setter：

```js
Object.defineProperty(data, 'a',{
  get() {
    // track
  },
  set() {
    // trigger
  }
})
```

这个 API 有一些缺陷，它必须预先知道要拦截的 key 是什么，它并不能检测对象属性的添加和删除。之前提供了 `$set` 和 `$delete` 实例方法，但是增加了一定对负担。

嵌套层级比较深的对象,需要递归遍历整个对象，执行 Object.defineProperty 把每一层对象数据都变成响应式的。

```js
export default {
  data: {
    a: {
      b: {
        c: {
          d: 1
        }
      }
    }
  }
}
```

- Vue.js 3.0 使用了 Proxy API 做数据劫持

```js
const observed = new Proxy(data, {
  get() {
    // track
  },
  set() {
    // trigger
  }
})
```

Proxy劫持的是整个对象，自然对于对象的属性的增加和删除都能检测到，Proxy API也不能监听到内部深层次的对象变化，因此 Vue.js 3.0 的处理方式是在 getter 中去递归响应式，这样的好处是真正访问到的内部对象才会变成响应式。

> Proxy的优势

- 可直接监听数组类型的数据变化
- 监听的目标为对象本身，不需要像Object.defineProperty一样遍历每个属性，有一定的性能提升
- 可拦截apply、ownKeys、has等13种对象方法，而Object.defineProperty不行
- 直接实现对象属性的新增/删除

### 编译优化

主要优化发生在patch阶段，也就是diff阶段。

- vue2.0的diff算法与模版的节点数量正相关，会造成大量的性能浪费。
- vue3.0的diff算法与模版的动态节点数正相关，避免了资源的浪费，其实现原理是通过Block tree，打补丁时将跳过这些属性不会改变的节点。

### 重构 Virtual DOM

- 模板编译时的优化，将一些静态节点编译成常量
- slot优化，将slot编译为lazy函数，将slot的渲染的决定权交给子组件
- 模板中内联事件的提取并重用（原本每次渲染都重新生成内联函数）

### 语法 API 优化：Composition API

- 增强了逻辑复用
- 增强了代码结构与可读性

## 新特性

### setup

全局import

vue2中的data,methods,computed都是挂载在this上面，两个明显的缺点

1. 不利于类型推导
2. 没用到computed功能，代码也会被打包

vue3的手动import更利于Tree-shaking

### ref

reactive负责复杂数据结构，ref可以把基本的数据结构包装成响应式

```vue
<template>
  <div>
    <h1>{{state.count}} * 2 = {{double}}</h1>
    <h2>{{num}}</h2>
    <button @click="add"></button>
  </div>
</template>

<script>
import { reactive, computed, ref, method, onMounted } from 'vue'
export default {
  setup () {
    const state = reactive({
      count: 1
    })
    const num = ref(2)

    function add() {
      state.count++
      num += 20
    }

    const double = computed(() => state.count * 2)

    onMounted(( => {
      console.log('method')
    }))

    return {
      state,
      num,
      double,
      add
    }
  }
}
</script>
```
