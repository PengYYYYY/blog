# vue3

## 新特性

### 性能提升

- 自定义渲染器，静态标记性能提升

- 编译时优化

- 更好的初始性能

2.tree-shaking支持，更小的文件大小
3.composition Api新语法
4.fragment,teleport,suspense新组件
5.更好的typescript支持
6.自定义渲染器

## compositionAPI

### setup

全局import

vue2中的data,methods,computed都是挂载在this上面，两个明显的缺点

1. 不利于类型推导
2. 没用到computed功能，代码也会被打包

vue3的手动import更利于Tree-shaking

### ref

reactive负责复杂数据结构，ref可以把基本的数据结构包装成响应式

```vue
<template>
  <div>
    <h1>{{state.count}} * 2 = {{double}}</h1>
    <h2>{{num}}</h2>
    <button @click="add"></button>
  </div>
</template>

<script>
import { reactive, computed, ref, method, onMounted } from 'vue'
export default {
  setup () {
    const state = reactive({
      count: 1
    })
    const num = ref(2)

    function add() {
      state.count++
      num += 20
    }

    const double = computed(() => state.count * 2)

    onMounted(( => {
      console.log('method')
    }))

    return {
      state,
      num,
      double,
      add
    }
  }
}
</script>
```
