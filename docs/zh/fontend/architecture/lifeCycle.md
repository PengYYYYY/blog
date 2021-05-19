# 生命周期

## vue2.0的生命周期

- beforeCreate：执行时组件还未创建，通常用于插件开发中执行一些未初始化任务
- created：组件初始化完毕，各种数据可以使用，常用于异步数据获取（注意在ssr中会执行两次created）
- beforeMounted：未执行渲染，更新，dom未创建
- mounted：初始化结束，dom创建，可用于获取访问数据和dom元素
- beforeUpdate：更新前，可用于获取更新前各种状态
- updated：更新后，所有状态都是最新
- beforeDestory：销毁前，用于定时器或订阅的取消
- destoryed：组件已经销毁

## vue3.0的生命周期

### 生命周期2.x与Composition之间的映射关系

beforeCreate -> use setup()
created -> use setup()
beforeMount -> onBeforeMount
mounted -> onMounted
beforeUpdate -> onBeforeUpdate
updated -> onUpdated
beforeDestroy -> onBeforeUnmount
destroyed -> onUnmounted
errorCaptured -> onErrorCaptured

### setup执行时机

在beforeCreate之后，create之前执行.

## react生命周期
