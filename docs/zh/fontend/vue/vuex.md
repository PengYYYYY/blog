# vuex

Vuex实现了一个单向数据流，在全局拥有一个State存放数据，当组件要更改State中的数据时，必须通过Mutation提交修改信息，Mutation同时提供了订阅者模式供外部插件调用获取State数据的更新。

重点：

- 单例
- 可预测

## 流程

vuex本身是一颗状态树，组件使用store实例的state来访问这些状态，然后`mutation`方法来修改这些状态，并且只能用`mutation`来修改状态，在组件中调用`commit`方法提交`mutation`；如果应用中有异步操作或者复杂逻辑组合，我们需要编写`action`，执行结束如果有状态修改任然需要提交`mutation`,组件中调用这些`action`使用`dispatch`方法派发。最后就是模块化，通过`modules`来分模块。

## 基本原理

是借用了vue的数据响应化特性实现的，它会利用Vue将state作为data对其进行响应化处理，从而使得这些状态发生变化的时，能够导致组件进行重新的渲染。

## event bus
