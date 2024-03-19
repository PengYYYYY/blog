# Vuex

`Vuex` 实现了一个单向数据流，在全局拥有一个 `State` 存放数据，当组件要更改 `State` 中的数据时，必须通过 `Mutation` 提交修改信息，`Mutation` 同时提供了订阅者模式供外部插件调用获取 `State` 数据的更新。

重点：

- 单例
- 集中式管理
- 可预测

核心特性：

- state
- getters
- commit(提交数据更新) -> mutations
- dispatch(触发异步操作方法) -> actions(异步操作数据更新)
- modules(模块化)

## 流程

`vuex` 本身是一颗状态树，组件使用 `store` 实例的 `state` 来访问这些状态，然后 `mutation` 方法来修改这些状态，并且只能用 `mutation` 来修改状态，在组件中调用 `commit` 方法提交 `mutation`；如果应用中有异步操作或者复杂逻辑组合，我们需要编写 `action`，执行结束如果有状态修改任然需要提交 `mutation`, 组件中调用这些 `action` 使用 `dispatch` 方法派发。最后就是模块化，通过`modules`来分模块。

## 基本原理

是借用了 `vue` 的数据响应化特性实现的，它会利用 `vue` 将 `state` 作为 `data` 对其进行响应化处理，从而使得这些状态发生变化的时，能够导致组件进行重新的渲染。

## Event bus

组件间传递参数可以使用 `event bus` 来做，实际上就是开了另外一个 `vue`，`vuex` 的本质也是如此。

### 创建 EventBus

#### 全局EventBus

```js
import Vue from 'Vue'
var EventBus = new Vue()
Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return EventBus
    }
  }
})

this.$bus.$emit('message','message from global bus')
this.$bus.$on('message', msg => {
 console.log('message',msg)
})

```

#### 单文件EventBus

```js
//event-bus.js
import Vue from 'Vue'

export const EventBus = new Vue()
```

- 组件A

```vue
<template>
  <div id="example">
    <button @click="sendMsg">send</button>
  </div>
</template>

<script>
import {EventBus} from '../event-bus'

export default {
  methods: {
    sendMsg () {
      EventBus.$emit('message', {name: 'kim', type: 'human'})
    }
  }
}
</script>
```

- 组件B

```vue
<template>
  <div id="example">
    {{msg}}
  </div>
</template>

<script>
import {EventBus} from '../event-bus'

export default {
  data () {
    return {
      msg: '123'
    }
  },
  mounted () {
    EventBus.$on('message', (msg) => {
      console.log('receive message', msg)
    })
  }
}
</script>
```

### eventBus原理

```js
class Bus {
  constructor() {
    this.callbacks = {}
  }
  $on(name, fn) {
    this.callbacks[name] = this.callbacks[name] || []
    this.callbacks[name].push(fn)
  }
  $emit(name, args) {
    if (this.callbacks[name]) {
      this.callbacks[name].forEach(cb => cb(args))
    }
  }
}
```

<!-- ### vuex核心原理的实现

```js

``` -->
