# Vue初始化

## 生命周期图

- vue 生命周期

![img](https://gitee.com/PENG_YUE/myImg/raw/master/uPic/OQur4K.png)

- beforeCreate：执行时组件还未创建，通常用于插件开发中执行一些未初始化任务
- created：组件初始化完毕，各种数据可以使用，常用于异步数据获取
- beforeMounted：未执行渲染，更新，dom未创建
- mounted：初始化结束，dom创建，可用于获取访问数据和dom元素
- beforeUpdate：更新前，可用于获取更新前各种状态
- updated：更新后，所有状态都是最新
- beforeDestory：销毁前，用于定时器或订阅的取消
- destoryed：组件已经销毁

- 运行流程

![img](https://gitee.com/PENG_YUE/myImg/raw/master/uPic/pLy7Yp.png)

## 实例化与入口

流程图

![img](https://gitee.com/PENG_YUE/myImg/raw/master/uPic/YandLr.png)
![img](https://gitee.com/PENG_YUE/myImg/raw/master/uPic/2uKe5C.png)

源码入口文件，做了初始化工作，`/instance/index`为vue实例, `initGlobalAPI`中为初始化流程。

```js
// src/core/index.js
import Vue from './instance/index'
import { initGlobalAPI } from './global-api/index'
import { isServerRendering } from 'core/util/env'
import { FunctionalRenderContext } from 'core/vdom/create-functional-component'

initGlobalAPI(Vue)

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
})
Object.defineProperty(Vue.prototype, '$ssrContext', {
  get () {
    return this.$vnode && this.$vnode.ssrContext
  }
})
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
})
Vue.version = '__VERSION__'

export default Vue
```

实例文件中定义了一个 Vue Class，然后调用了一系列的 init、mixin这样的方法来初始化功能，这里导出的就是一个vue的功能类。

```js
// core/instance/index
import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
```

再来看全局API

```js
export function initGlobalAPI (Vue: GlobalAPI) {
  // config
  const configDef = {}
  configDef.get = () => config
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = () => {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      )
    }
  }
  Object.defineProperty(Vue, 'config', configDef)

  // 这些工具方法不视作全局API的一部分，除非你已经意识到某些风险，否则不要去依赖他们
  Vue.util = {
    warn,
    extend,
    mergeOptions,
    defineReactive
  }
  // 这里定义全局属性
  Vue.set = set
  Vue.delete = del
  Vue.nextTick = nextTick

  Vue.options = Object.create(null)
  ASSET_TYPES.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })
  Vue.options._base = Vue
  extend(Vue.options.components, builtInComponents)

  // 定义全局方法
  initUse(Vue)
  initMixin(Vue)
  initExtend(Vue)
  initAssetRegisters(Vue)
}
```

GlobalAPI 列表

- 【Vue.config】 各种全局配置项
- 【Vue.util】 各种工具函数，还有一些兼容性的标志位
- 【Vue.set/delete】
- 【Vue.nextTick】
- 【Vue.options】
- 【Vue.use】通过initUse方法定义
- 【Vue.mixin】 通过initMixin方法定义
- 【Vue.extend】通过initExtend方法定义

## 初始化与流程

在引入vue的时候有一系列的混入功能，我们先来研究一下 `initMixin` 中发生了什么。

```js
// core/instance/init.js
export function initMixin (Vue: Class<Component>) {
  Vue.prototype._init = function (options?: Object) {
    const vm: Component = this
    vm._uid = uid++

    let startTag, endTag
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = `vue-perf-start:${vm._uid}`
      endTag = `vue-perf-end:${vm._uid}`
      mark(startTag)
    }

    // 如果是Vue的实例，则不需要被observe
    vm._isVue = true
    // 内部组件的话直接处理
    if (options && options._isComponent) {
      initInternalComponent(vm, options)
    } else {
      // 根组件走mergeOptions
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }

   // 第二步： 初始化组件的代理
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
    
    vm._self = vm
    
    // 第三步： 初始化生命周期
    initLifecycle(vm)

    // 第四步：初始化事件监听
    initEvents(vm)

    // 初始化渲染函数
    initRender(vm)

    // beforeCreate生命周期
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props

    // 初始化state
    initState(vm)
    initProvide(vm) // resolve provide after data/props

    // created生命周期
    callHook(vm, 'created')

    // 组件挂载
    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
}
```

mergeOptions的实现,根示例与非根示例走不同的逻辑

```js
export function mergeOptions (
  parent: Object,
  child: Object,
  vm?: Component
): Object {
  //...

  // 统一props格式
  normalizeProps(child)
  // 统一directives的格式
  normalizeDirectives(child)

  // 针对不同的键值，采用不同的merge策略
  const options = {}
  let key
  for (key in parent) {
    mergeField(key)
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key)
    }
  }
  function mergeField (key) {
    const strat = strats[key] || defaultStrat
    options[key] = strat(parent[key], child[key], vm, key)
  }
  return options
}
```

options.data经过merge之后，实际上是一个function,在真正调用function才会进行真正的merge,其它的merge都会根据自身特点而又不同的操作.

### renderProxy

`renderProxy` 是后期为render做准备的，一般而言，vm._renderProxy是等于vm的，在非生产环境中，Vue动用了Proxy，也是vue3的核心理念之一。

### initLifecycle

合并完参数之后继续往下走流程，initLifecycle。

```js
export function initLifecycle (vm: Component) {
  const options = vm.$options

  // 这里判断是否存在父示例，如果存在，则通过 while 循环，建立所有组建的父子关系
  let parent = options.parent
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent
    }
    parent.$children.push(vm)
  }

  /**
   * 为组件实例挂载相应属性，并初始化
   */

  vm.$parent = parent
  vm.$root = parent ? parent.$root : vm

  vm.$children = []
  vm.$refs = {}

  vm._watcher = null
  vm._inactive = null
  vm._directInactive = false
  vm._isMounted = false
  vm._isDestroyed = false
  vm._isBeingDestroyed = false
}
```

这边分两步，一步是建立组件的父子关系，另一部分是初始化组件示例。

### initEvents

我们常用的事件`$on, $once,  $off, $emit,` 都在此进行挂载

```js
export function initEvents (vm: Component) {
  vm._events = Object.create(null)
  vm._hasHookEvent = false
  // init parent attached events
  const listeners = vm.$options._parentListeners
  if (listeners) {
    updateComponentListeners(vm, listeners)
  }
}
```

### initRender

initRender挂载了_render私有方法，它用来把实例渲染成一个vNode。初始化一些渲染属性，比如 `$slots` 和 `$createElement` 等。

渲染过程

```js
<div id="app">
  {{ message }}
</div>
```

通过render函数

```js
render: function (createElement) {
  return createElement('div', {
     attrs: {
        id: 'app'
      },
  }, this.message)
}
```

### initInjections 和 initProvide

initInjections 和 initProvide的执行顺序：

```js
initInjections(vm) // resolve injections before data/props
initState(vm)
initProvide(vm) // resolve provide after data/props
```

### initState

这里的主要工作主要是定义的数据进行defineReactive. 主要是 `props` 和 `data`
