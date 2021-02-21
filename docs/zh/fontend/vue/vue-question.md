# vue常见问题

## v-if与v-for哪个优先级更高？如果两个同时出现，应该怎么优化得到更好的性能

在`vue`源码中的`compiler/codegen/index.js`中可以找到答案。

- 解决方案1

```js
<p v-for="child in children" v-if="isFolder">{{child.title}}</p>
```

由于在生成渲染函数的时候 `v-for` 的优先级高于 `v-if`,`v-if`会在`v-for`生成渲染子项的内部。循环会在外面先执行,浪费了性能。

- 解决方案2

```js
<template v-if="isFolder">
  <p v-for="child in children" >{{child.title}}</p>
</template>
```

先判断函数再循环，当condition成立的时候才会去执行渲染列表，否则是个empty函数

::: tip
如果和渲染子项的数据有关,则把渲染数据放到`computed`里面做一次`filter`,留下需要渲染的项目即可。
:::

::: tip
如果条件出现在循环内部，可通过计算属性提前过滤掉那些不需要显示的项
:::

## Vue组件中的data为什么必须是函数，而根实例没有此限制

此过程发生在initData函数中。

Vue 组件可能会存在多个实例，如果使用对象形式定义data，则会导致它们共用一个data对象，状态的更新会影响所有组件实例。

当采用函数形式定义，在initData时会将其作为工厂函数返回全新data对象，每次都会创建新的对象，有效规避多实例之间状态污染问题。

而在Vue根实例创建过程中则不存在该限制，是单例的，也是因为根实例只能有一个，不需要担心这种情况。

在初始化过程中，会判断data的类型走不同的方式。根实例与组件实例走的逻辑不一样

```js

// 根例
mergeDataOrFn(parentVal, childVal, vm)

// 组件实例
mergeDataOrFn(parentVal, childVal )

function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}
```

## vue中 key 的工作原理

key的作用主要应用在更新阶段。有以下几点用处：

- key的作用主要是为了高效的更新虚拟DOM，其原理是vue在patch过程中通过key可以精准判断两个节点是否是同一个，从而避免频繁更新不同元素，使得整个patch过程更加高效，减少DOM操作量，提高性能。
- vue中在使用相同标签名元素的过渡切换时，也会使用到key属性，其目的也是为了让vue可以区分它们，否则vue只会替换其内部属性而不会触发过渡效果。

总而言之就是为了在patch阶段更加高效。

实验流程，对diff算法走两遍即可，一遍带key，一遍不带key。即可看出差别。

## 怎么理解vue中的diff算法

- 为什么要diff算法

精确比较，当data发生变化，可能存在多个key,执行新旧两次虚拟DOM的diff。
vue 2.x中为了降低Watcher粒度，每个组件只有一个Watcher与之对应，只有引入diff才能精确找到 发生变化的地方。

- 怎么执行

`patchVNode`是diff发生的地方，整体策略：深度优先同层遍历。
vue中diff执行的时刻是组件实例执行其更新函数时，它会比对上一次渲染结果oldVNode和新的渲染 结果newVNode

- 高效

双路比较。发生在`updateChildren`

- diff算法是虚拟DOM技术的必然产物：通过新旧虚拟DOM作对比（即diff），将变化的地方更新在真 实DOM上；另外，也需要diff高效的执行对比过程，从而降低时间复杂度为O(n)。
- diff过程整体遵循深度优先、同层比较的策略；两个节点之间比较会根据它们是否拥有子节点或者文本节点做不同操作；比较两组子节点是算法的重点，首先假设头尾节点可能相同做4次比对尝试，如果没有找到相同节点才按照通用方式遍历查找，查找结束再按情况处理剩下的节点；借助key通常可以非常精确找到相同节点，因此整个patch过程非常高效。

## 组件化的理解

- 组件定义

### 自定义模式

```js
vue.component('comp', {
  template: '<div>my component</div>'
})
```

- 组件化性能高，执行效率变高，`watcher`粒度化, `patch` 范围变小。
- 组件是独立和可复用的代码组织单元。组件系统是 Vue 核心特性之一，它使开发者使用小型、独立和通常可复用的组件构建大型应用。
- 组件化开发能大幅提高应用开发效率、测试性、复用性等。
- 组件使用按分类有：页面组件、业务组件、通用组件；
- vue的组件是基于配置的，我们通常编写的组件是组件配置而非组件，框架后续会生成其构造函数。
- 合理的划分组件，有助于提升应用性能
- 组件应该是高内聚、低耦合的
- 遵循单向数据流的原则
- vue中常见组件化技术有：属性prop，自定义事件，插槽等，它们主要用于组件通信、扩展等。

## vue设计原则的理解

框架定义

- 渐进式JavaScript框架
- 易用、灵活和高效

渐进式：
由点到面，vue被设计为自底向上的应用。Vue核心库只关注视图层，易于上手，也便于与第三方库融合。

数据响应式：
数据变化带动视图更新

另外简单易上手是vue最大的特点之一。

## vue性能优化

- 路由懒加载

```js
const router = new VueRouter({ 
  routes: [ 
    { path: '/foo', component: () => import('./Foo.vue') }   ] 
})
```

- keep-alive缓存页面

```vue
<template> 
  <div id="app"> 
    <keep-alive> 
      <router-view/>
    </keep-alive> 
  </div> 
</template>
```

- 使用v-show复用DOM

```vue
<template> 
  <div class="cell"> 
    <!--这种情况用v-show可以复用DOM-->
    <div v-show="value" class="on"> 
      <Heavy :n="10000"/> 
    </div> 
    <section v-show="!value" class="off"> 
      <Heavy :n="10000"/> 
    </section> 
  </div> 
</template>
```

- 数据冻结

不变的大数据使用`object.freeze()`让数据变成不可响应，增加性能。

- 事件销毁

vue组件销毁时，会自动解绑它的全部指令和事件监听器，但是仅限于组件本身的事件。

- 无状态的组件标记为函数组件

```vue
<template functional>
  <div class="cell"></div>
</template>
<script>
export default {

}
</script>
```
