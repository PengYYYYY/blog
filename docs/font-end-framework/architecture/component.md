# 组件化

## 插槽对比

### vue

- 插槽

```vue
// 组件
<template>
  <div class="myComponent">
    <slot></slot>
  </div>
</template>
```
<!-- 调用方 -->
```vue
<template>
  <Child>
    xxxx
  </Child>
</template>
```

- 具名插槽

```vue
// 组件
<template>
  <slot name="title"></slot>
</template>
```
<!-- 调用方 -->
```vue
<template>
  <Child>
    <div slot="title"></div>
  </Child>
</template>
```

### react

- 插槽

<!-- 组件 -->
```js
export default class child extends Component {
  render() {
    const { children } = this.props
    return (
      <Layout>
        {children}
      </Layout>
    )
  }
}
```

<!-- 页面 -->
```js
export default class myPage extends Component {
  render() {
    return (
      <child>
        <div />
      </child>
    )
  }
}
```

- 具名插槽

<!-- 组件 -->
```js
export default class child extends Component {
  render() {
    const { children } = this.props
    return (
      <Layout>
        {children.title}
      </Layout>
    )
  }
}
```

<!-- 页面 -->
```js
export default class myPage extends Component {
  render() {
    return (
      <child>
        {{
            title: (<div>myTitle</div>)
        }}
      </child>
    )
  }
}
```

## 组件复用

### vue组件复用

### vue3.0组件复用

compositionAPI

抽离逻辑，在setUp中形成函数，类似hook编程

### react组件复用

- HOC
- Hook
- mixin

## 组件通信

### vue组件通信

- vuex
- 父子组件通信，emit
- Vue 则可以使用 `provide/inject` 来实现跨层级注入数据red

### react组件通信

- redux
- pros调用
- React 可以通过 `React.context` 来进行跨层级通信
