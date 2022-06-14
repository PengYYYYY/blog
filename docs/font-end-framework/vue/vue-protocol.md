# Vue组件通信

做个关于组件库通信总结。

## 父子组件通信

### props

父子之间的传递，常用的API,简单说一下。

> 父组件

```vue
<template>
    <son msg="py"/>
</template>
```

> 子组件

```vue
<template>
    <div >msg from parent {{foo}}</div>
</template>
<script>
export default {
    // 第一种书写方式
    props: ['msg']
    // 第二种书写方式
    props: ['msg': String]
    // 第三种书写方式
    props: {
        msg: {
            type: String,//类型不匹配会警告
            default: 0, // 默认值
            required: true, // 是否
            validator(val) { return val === 'msg'} // 参数条件校验
        }
    }
}
</script>
```

### $emit/$on

自定义事件，用于子到父节点之间的信息传递,不能隔代。

> 父组件

```vue
<template>
    <son @myClick="sonEmit"/>
</template>
<script>
export default {
    methods: {
        sonEmit(data) {
            console.log(data) // msg from son
        }
    }
}
</script>
```

> 子组件

```vue
<template>
    <button @click="handleEmit"></button>
</template>
<script>
export default {
    methods: {
        handleEmit() {
            this.emit('myClick', 'msg from son')
        }
    }
}
</script>
```

### v-model

`v-model` 其实是 `props` 与 `emit` 的结合，可以看作是个语法糖。

> 父组件

```vue
<template>
    <son v-model="myVal"/>
</template>
<script>
export default {
    data() {
        return {
            myVal: false
        }
    }
    methods: {
        sonEmit(data) {
            console.log(data) // msg from son
        }
    }
}
</script>
```

> 子组件

```vue
<template>
    <button @click="handleEmit"></button>
</template>
<script>
export default {
    props: {
        value: {
            type: String
        }
    }
    methods: {
        handleEmit() {
            this.emit('input', !this.value)
        }
    }
}
</script>
```

### $parent 和 $children

直接操作父子组件的实例，`$parent` 就是父组件的实例对象，`$children` 就是当前实例的子组件实例。

## 隔代通信

### $attrs/$listeners

非属性的特性，也称为不被声明的属性。用于高级组件向下派发属性，也叫做组件二次封装。只能隔代传一代。

应用场景：在做弹窗组件时，通常会有一个基础组件，用来控制各种场景的弹窗，我们叫做`popup`，它会有一些基础参数，比如是否有蒙层，蒙层是否可点击，弹窗位置等等。通常基于此组件还会进行`actionSheet`这样的下拉框封装。这时候就可以使用`$attrs，$listens`向下透传自定义事件和属性了，非常方便。

> popup

```vue
<template>
    <button @click="handleEmit"></button>
</template>
<script>
export default {
    methods: {
        props:{
            hasMask: ['hasMask']
        },
        handleEmit() {
            this.emit('myClick', 'msg from son')
        }
    }
}
</script>
```

> actionSheet

```vue
<template>
    <popup v-bind="$attrs" v-on="$listens"></popup>
</template>
<script>
export default {
    props: {
        height: {
            type: Number,
            default: 200
        }
    },
    methods: {
        handleEmit() {
            this.emit('myClick', 'msg from son')
        }
    }
}
</script>
```

> custom

```vue
<template>
    <action-sheet :has-mask="false" :height="100"/>
</template>
<script>
export default {
    methods: {
        handleEmit() {
            this.emit('myClick', 'msg from son')
        }
    }
}
</script>
```

### provide/inject

实现提供和注入，用于隔代传参数。只要两个组件存在于`vue`实例中即可，通常在组件库中使用较多，(组件库不能依赖vueX等状态管理库)

> provide

```js
export default {
    provide() {
        return {
            py: 'py'
        }
    }
}

// 实现provide的响应式
export default {
    provide() {
        return {
            py: reactivePy
        }
    },
    data() {
        return {
            reactivePy: 'foo'
        }
    }
}
```

> inject

```js
export default {
    inject: ['py']
}

// 为防止命名冲突
export default {
    inject: {
        myPy: {
            from: 'foo'
        }
    }
}
```

#### dispatch 和 broadcast

在 `Vue 1.0` 中主要用来实现基于组件树结构的事件流通信 —— 通过向上或向下以冒泡的形式传递事件流，以实现嵌套父子组件的通信。在 `Vue 2.0` 中就被移除了官方推荐使用`vueX`,但是这个特性在UI库中还是可以带来一些作用的。下面是`dispatch`和`broadcast` 的实现。

```js
dispatch(componentName, eventName, params) {
    var parent = this.$parent || this.$root;
    var name = parent.$options.componentName;
    while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
            name = parent.$options.componentName;
        }
    }
    if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
    }
}
broadcast(componentName, eventName, params) {
    this.$children.forEach(child => {
    var name = child.$options.componentName;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
```

#### event bus

适用于小项目中，状态管理并不复杂，不需要用到 `vueX` 的情况下使用

发布订阅者模式的实践，通常我们会直接创建一个`vue`实例来作为`event bus`,下面是原理实现。

```js
class EventBus {
    constructor() {
        this.callbacks = {}
    }
    $on(name, fn) {
        this.callbacks[name] = this.callbacks[name] || []
        this.callbacks[name].push(fn)
    }
    $emit(name, args) {
        if(this.callbacks[name]) {
            this.callbacks[name].forEach(cb => cb(args))
        }
    }
}
```

### vueX

[传送门](https://vuex.vuejs.org/zh/guide/)

## 插槽

### 匿名插槽

```html
// parent
<comp-slot>hello</comp-slot>

// comp
<div>
    <slot></slot>
</div>
```

### 具名插槽

```html
// parent
<comp-slot>
    <div slot="title"><div>
</comp-slot>

// comp
<div>
    <slot name="title"></slot>
</div>
```

### 作用域插槽

用于分发内容要用到子组件的数据,让组件的插槽能拿到使用方的数据。

```html
<div>
    <slot :py='py'><slot>
</div>
```

```vue
<template>
    <comp-slot>
        <template v-slot:default="slotData">
            {{slotData.py}} //使用子组件
        </template>
    </comp-slot>
</template>
```

> 不带参数会使用默认作用域插槽

``` vue
<template>
    <comp-slot>
        <template v-slot="slotData">
            {{slotData.py}} //使用子组件
        </template>
    </comp-slot>
<template>
```

> 解构插槽prop

```vue
<template>
    <comp-slot v-slot="{ user }">
    {{ user.firstName }}
    </comp-slot>
</template>
```
