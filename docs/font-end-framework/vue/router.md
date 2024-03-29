# vue-router

## 核心思想

- 策略1，监听哈希变化，触发变化
- 利用 history API, 监听 hash 变化。

监听路由变化，找到对应的组件，然后渲染。

## 简易的 vue-router

理解了核心思想之后，来实现一个简易版的 `vue-router`。vue-router 的入口和核心的两个组件 `router-link`, `router-view`。

混入插件，执行 `install` 函数，在 `beforeCreated` 钩子中，挂载 `options` 中的 `router`。实例在创建时即可访问到 `router`，另外就是 `install` 时挂载 `router-link` 和 `router-view` 组件。

### 第一步vue-router的使用

```js
import router from 'vue-router'
new Vue({
  router
})
```

```js
let _vue
class Router {
  constructor(options) {
    this.$options = options
    this.current = window.location.hash.slice(1) || '/'
    // 缓存path和route映射关系
    this.routeMap = {}
    this.$options.routes.forEach(
      route => {
        this.routeMap[route.path] = route
      }
    )

    // 监控url变化
    window.addEventListener('hashchange', this.onHashChange.bind(this))
    window.addEventListener('load', this.onHashChange.bind(this))
  }

  onHashChange() {
    this.current = window.location.hash.slice(1)
  }
}
Router.install = function(Vue) {
  _vue = Vue
  Vue.mixin({
    beforeCreated() {
      if(this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
    }
  })
  Vue.component('router-link', {
    props: {
      to: {
        type: String,
        required: true
      }
    },
    render(h) {
      return h('a',{
        attrs: {
          href: '#' + this.to
        }
      }, this.$slots.default)
    }
  })
  Vue.component('router-view', {
    render(h) {
      let component = null
      const route = this.$router.$options.routes.find(route => route.path == this.router.current)
      if (route) {
        component = route
      }
      h(component)
    }
  })
}
export default VueRouter
```

## 一些常见问题

### vue-router 有哪些组件？

`<router-link>` `<router-view>` `<keep-alive>`

### active-class 是哪个组件的属性？

`<router-link>`，终端属性，用来做选中样式的切换，当router-link标签被点击时将会应用这个样式

### 动态路由与传值

```js
{
  path: '/details/:id'
  name: 'Details'
  component:() => import('xxxxx')
}
```

### vue-router 有哪几种导航钩子？

#### 全局前置守卫

```js
const router = new VueRouter({})
router.beforeEach((to, from, next) = {
  // to do somethings
})
```

- to:Route, 代表要进入的目标
- from:Route, 代表当前正要离开的路由
- next:Function, 必须需要调用的方法，具体的执行效果则依赖 next 方法调用的参数
- next(): 进入管道中的下一个钩子，如果全部的钩子执行完了，则导航的状态就是 confirmed（确认的）

#### 全局后置钩子

```js
router.afterEach((to, from) = {
 // to do somethings
})
```

- 后置钩子并没有 next 函数，也不会改变导航本身。
- 路由独享钩子

```js
const router = new VueRouter({
  routes: [
    {
      path: '/home',
      component: Home，
      beforeEnter: (to, from, next) = {
        // to do somethings
        // 参数与全局守卫参数一样
     }
    }
  ]
})
```

#### $route 和 $router 的区别是什么？

- router 为 VueRouter 的实例，是一个全局路由对象，包含了路由跳转的方法、钩子函数等。
- route 是路由信息对象||跳转的路由对象，每一个路由都会有一个 route 对象，是一个局部对象，包含 path,params,hash,query,fullPath,matched,name 等路由信息参数。

#### vue-router 响应路由参数的变化

- 用 watch 检测

```js
// 监听当前路由发生变化的时候执行
watch: {
  $route(to, from){
    console.log(to.path)
    // 对路由变化做出响应
  }
}
```

- 组件内导航钩子函数

```js
beforeRouteUpdate(to, from, next){
  // to do somethings
}
```

#### vue-router 的两种模式

- hash

原理是 onhashchage 事件，可以在 window 对象上监听这个事件

```js
window.onhashchange = function(event){
  console.log(event.oldURL, event.newURL)
  let hash = location.hash.slice(1)
}
```

- history
- 利用了 HTML5 History API 中新增的 pushState() 和 replaceState() 方法。
- 需要后端配置支持。

#### vue-router 实现路由懒加载

把不同路由对应的组件分割成不同的代码块，然后当路由被访问时才加载对应的组件即为路由的懒加载，可以加快项目的加载速度，提高效率

```js
const router = new VueRouter({
  routes: [
    {
      path: '/home',
      name: 'Home'，
      component:() => import('xxxxx')
    }
  ]
})
```

## vue-router 执行顺序

1. 导航被触发
2. 在失活的组件里调用离开守卫
3. 调用全局的`beforeEach`组件
4. 在重用的组件里调用`beforeRouteUpdate`组件
5. 在路由配置里调用`beforeEnter`组件
6. 解析异步路由组件
7. 在被激活的组件里面调用`beforeRouterEnter`
8. 调用全局的`beforeResolve`守卫
9. 导航被确认
10. 调用全局的`afterEach`钩子
11. 触发DOM更新
12. 用创建好的实例调用`beforeRouterEnter`守卫中传给 `next`的回调函数
