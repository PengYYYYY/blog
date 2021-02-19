# Vue

- [vue组件通信](/zh/articles/vueProtocol/)
- vuex
- vue-router
- [ssr](/zh/articles/ssr/)

## 生命周期图

vue 生命周期
![img](http://ww1.sinaimg.cn/large/006ekNqVgy1ghlnqv9uuxj323a2mptrz.jpg)

运行流程

![img](https://gitee.com/PENG_YUE/myImg/raw/master/uPic/8aggEe.png)

## 简易版的vue

运行原理
![img](http://ww1.sinaimg.cn/large/006ekNqVgy1ghlsb26al9j311c0lemz4.jpg)

```javascript

// 第一步初始化
class PYVue {
  constructor(options) {
    this.$options = options
    this.$data = options.data
    this.$methods = options.methods

    // 让数据成为响应式的数据
    observe(this.$data)

    //为$data做代理
    proxy(this, '$data')

    // 编译
    new Compile('#app', this)
  }
}
```

### 数组拦截操作

```javascript
const originalProto = Array.prototype
const arrProto = Object.create(originalProto)
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
methodsToPatch.forEach(method => {
  arrProto[method] = function() {
    originalProto[method].apply(this, arguments)
  }
})
```

### 数据响应式

```javascript
function defineReactive(obj, key, val) {
  // val是对象还需要递归处理
  observe(val)
  Object.defineProperty(obj, key, {
    get() {
      // 依赖收集
      Dep.target && dep.addDep(Dep.target)
      return val
    },
    set(newVal) {
      // 如果newVal是对象，也要做响应式处理
      if(val && val != newVal) {
        observe(newVal)
        val = newVal
        dep.notify()
      }
    }
  })
}

function observe(obj) {
  if (typeof obj !== 'object' || obj !== null) {
    return obj
  }
  if (Array.isArray(obj)) {
    obj.__proto__ = arrProto
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      observe(obj[i])
    }
  } else {
    new Observe(obj)
  }
}

function proxy(vm, key) {
  Object.keys(obj).forEach(k => {
    Object.defineProperty(vm, k, {
       get() {
        return vm[keys][k]
      },
      set(v) {
        vm[keys][k] = v
      }
    })
  })
}

class Observe {
  constructor(val) {
    this.val = val
    walk(this)
  }

  // 收集
  walk(obj) {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key])
    })
  }
}
```

### 依赖收集过程

![img](http://ww1.sinaimg.cn/large/006ekNqVgy1ghlttoly4qj30v40gk0uf.jpg)

```javascript
// 监听者
class Watcher {
  constructor(vm ,key, updaterFn) {
    this.vm = vm
    this.key = key
    this.updaterFn = updaterFn

    Dep.target = this
    this.vm[this.key]
    Dep.target = null
  }

  update() {
    this.updaterFn.call(this.vm, this.vm[this.key])
  }
}

// 收集者
class Dep {
  constructor() {
    this.deps = []
  }

  addDep(watcher) {
    this.deps.push(watcher)
  }

  notify() {
    this.deps.forEach(watcher => {
      watcher.update()
    })
  }
}
```

### 模版编译过程

![img](http://ww1.sinaimg.cn/large/006ekNqVgy1ghlu1kyiy3j31lk0j2q4z.jpg)

```JavaScript
class Compile {
  constructor(el, vm) {
    this.$el = document.querySelector(el)
    this.$vm = vm

    if (this.$el) {
      this.compile(this.$el)
    }
  }

  compile(el) {
    el.childNodes.forEach(node => {
      if (node.nodeType == 1) {
        this.compileElement(node)
      } else if (this.isInter(node)) {
        this.compileText(node)
      }

      if(node.childNodes && node.childNodes.length > 0) {
        this.compile(node)
      }
    })
  }

  isInter(node) {
    return node.nodeType === 3 &&  /\{\{(.*)\}\}/.test(node.textContent)
  }

  compileText(node) {
    this.update(node, RegExp.$1, 'text')
  }

  compileElement(node) {
    const nodeAttrs = node.attributes
    Array.from(nodeAttrs).forEach(attr => {
      const attrName = attr.name
      const exp = attr.value
      if (this.isDirective(attrName)) {
        const dir = attrName.substring(3)
        // 指令实际操作方法
        this[dir] && this[dir](node, exp)
        // 判断是否是事件,
      } else if(this.isEvent(attrName)) {
        const eventName = attrName.split('@')[1]
        node.addEventListener(eventName, () => {
          this.$vm.$methods[exp].bind(this.$vm)(e)
        })
      }
    })
  }

  isEvent(attr) {
    return attr.indexOf('@') === 0
  }

  isDirective(name) {
    return name.indexOf('py-') === 0
  }
  
  // 双向绑定
  model(node, exp) {
    this.update(node, exp, 'model')
    node.addEventListener('input', (e) => {
      this.$vm.$data[exp] = e.target.value
    })
  }

  // 处理事件派发
  modelUpdater(node, val) {
    node.value = val
  }
  
  // k-text对应操作函数
  text(node, exp) {
    this.update(node, exp, 'text')
  }

  textUpdater(node, val) {
    node.textContent = val
  }

  html(node, exp) {
    this.update(node, exp, 'html')
  }

  htmlUpdater(node, val) {
    node.innerHTML = val
  }

  // 更新
  update(node, exp, type) {
    const fn = this[dir + 'Updater']
    fn && fn(node, this.$vm[exp])

    new Watcher(this.$vm, exp, val => {
      fn && fn(node, val)
    })
  }
}
```

## 一些小技巧

开发过程中的一些`vue`的小技巧

### 内部监听生命周期函数

```javascript
{
  mounted() {
    window.addEventListener('resize', xxxFunction)
  },
 beforeDestroy() {
  window.removeEventListener('resize', xxxFunction)
 }
}
// 优化
{
  mounted() {
    window.addEventListener('resize', xxxFunction)
  this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('resize', this.$_handleResizeChart)
    })
  },
}
```

## vue常见问题

![img](https://gitee.com/PENG_YUE/myImg/raw/master/uPic/tUoPsF.png)

record## vue常见问题

### v-if与v-for哪个优先级更高？如果两个同时出现，应该怎么优化得到更好的性能

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

### Vue组件中的data为什么必须是函数，而根实例没有此限制
