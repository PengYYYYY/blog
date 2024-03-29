# 数据响应式

## vue2.0

数据响应式过程
![img](../images/bUZGGg.png)

- MyVue：框架构造函数
- Observer：执⾏数据响应化（分辨数据是对象还是数组）
- Compile：编译模板，初始化视图，收集依赖（更新函数、watcher创建）
- Watcher：执⾏更新函数（更新dom）
- Dep：依赖，管理多个Watcher，批量更新

### 流程描述

#### 数据劫持

1. 将data做响应式处理,走reactive
2. 递归的对对象做处理
3. 创建依赖对象，每一个key一个依赖对象

#### 代理data

1. 代理data，将data的值映射到vm上

#### 编译过程

1. 指令编译，遍历子元素等
2. 遇到响应式对象，确认update函数，创建wathcer，并将watcher添加到相应key到依赖队列中

#### 响应式处理

1. 修改响应式数据后，触发依赖对象的notify，遍历执行watcher中的更新函数，达到更新效果

### 响应式核心代码

```js
function defineReactive(obj, key, val) {
  // 如果val是对象，需要递归处理之
  observe(val)

  Object.defineProperty(obj, key, {
    get() {
      return val
    },
    set(newVal) {
      if(val !== newVal) {
        // 如果newVal是对象，也要做响应式处理
        observe(newVal)
        val = newVal
      }
    }
  })
}

// 遍历指定数据对象每个key，拦截他们
function observe(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
}
```

```js

// 第一步初始化
class PYVue {
  constructor(options) {
    this.$options = options
    this.$data = options.data
    this.$methods = options.methods

    // 让数据成为响应式的数据，观察者
    observe(this.$data)

    //为$data做代理
    proxy(this, '$data')

    // 编译
    new Compile('#app', this)
  }
}
```

### 数据响应式原理

```js

// 响应式
function defineReactive(obj, key, val) {
  // val是对象还需要递归处理
  observe(val)

  const dep = new Dep()
  
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
        return vm[key][k]
      },
      set(v) {
        vm[key][k] = v
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

![img](../images/5JEIym.png)

```js
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

![img](../images/gukPCa.png)

```js
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

## vue3.0

![img](../images/xy5F2N.png)

### 大致的流程

#### proxy

1. 代理对象，set，get，deleteProperty

#### 副作用

1. 副作用函数执行，执行过程中，先将副作用函数推入一个栈中
2. 执行过程中，如果遇到响应式对象，会触发proxy中的get，get触发track
3. tack过程中，会建立，响应式数据的key与副作用函数的关系，通过WeakMap,Map,Set三级关系
4. weakMap管理的是总的依赖收集对应到traget,Map对应的是target中的key,set对应的是当前key对应的副作用列表，此时就建立了，target.key到effect的连接
5. 副作用函数第一次执行完毕，函数从副作用函数栈中弹出，结束收集过程

#### 副作用触发过程

- 修改响应式数据，触发proxy中的set，set触发trigger，
- trigger获取对象target的depsMap，然后拿到依赖depsMap中key的副作用数组，全部执行一遍

### 核心代码

```js
const isObject = val => val !== null && typeof val === 'object'

function reactive(obj) {
  if (!isObject(obj)) {
    return obj
  }
  // Proxy相当于在对象外层加拦截
  const observed = new Proxy(obj, {
    get(target, key, receiver) {
      // Reflect用于执行对象默认操作，更规范、更友好
      // Proxy和Object的方法Reflect都有对应
      const res = Reflect.get(target, key, receiver)
      console.log(`获取${key}:${res}`)
      // 依赖收集
      track(target, key)
      return isObject(res) ? reactive(res) : res
    },
    set(target, key, value, receiver) {
      const res = Reflect.set(target, key, value, receiver)
      console.log(`设置${key}:${value}`)
      trigger(target, key)
      return res
    },
    deleteProperty(target, key) {
      const res = Reflect.deleteProperty(target, key)
      console.log(`删除${key}:${res}`)
      trigger(target, key)
      return res
    }
  })
  return observed
}

const effectStack = []

function effect(fn) {
  const rxEffect = function() {
    // 1.捕获异常
    try {
      // 2.入栈
      effectStack.push(rxEffect)
      // 3.触发依赖收集
      return fn()
    } finally {
      // 4.出栈
      effectStack.pop()
    }
  }

  rxEffect()

  return rxEffect
}

// 依赖收集，建立target，key和上面的effect函数之间映射关系
// 需要一个数据结构存储该关系
// {target: {key: [cb1, cb2, ...]}}
let targetMap = new WeakMap()
function track(target, key) {
  // 获取effect存入的函数
  const effect = effectStack[effectStack.length - 1]

  if (effect) {
    // 获取target对应Map
    let depsMap = targetMap.get(target)
    if (!depsMap) {
      depsMap = new Map()
      targetMap.set(target, depsMap)
    }
    // 获取depsMap中key和其值，也就是Set
    let deps = depsMap.get(key)
    if (!deps) {
      // 首次deps不存在，创建之
      deps = new Set()
      depsMap.set(key, deps)
    }

    // 将传入effect，添加到Set里面
    deps.add(effect)
    console.log(deps)
  }
}

function trigger(target, key) {
  // 获取映射关系
  const depsMap = targetMap.get(target)
  if (depsMap) {
    // 获取函数集合
    const deps = depsMap.get(key)
    deps.forEach(effect => {
      effect()
    })
  }
}

const state = reactive({
  foo: 'foo',
  bar: { a: 1 }
})

effect(() => {
  console.log('effect:', state.foo)
})

```
