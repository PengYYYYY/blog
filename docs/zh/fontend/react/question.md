# React常见问题

## React中的key的作用

1. 和type值一起来标记同级节点，当前元素的唯一性。
2. fiber架构的唯一性

## React生命周期

挂载时

## React Fiber

- 对于⼤大型项⽬目，组件树会很⼤大，这个时候递归遍历的成本就会很⾼高，会造成主线程被持续占⽤用，结果就是主线程上的布局、动画等周期性任务就⽆无法⽴立即得到处理理，造成视觉上的卡顿，影响⽤用户体验。
- 增量渲染(把渲染任务拆分成块，匀到多帧)
- 更新时能够暂停，终⽌，复⽤渲染任务
- 给不同类型的更新赋予优先级
- 并发⽅面新的基础能⼒

## 虚拟dom

### 为什么要使用虚拟dom对象

DOM操作很慢，轻微的操作都可能导致页面重新排版，非常耗性能。相对于DOM对象，js对象 处理起来更快，而且更简单。通过diff算法对比新旧vdom之间的差异，可以批量的、最小化的执行 dom操作，从而提高性能。

在获取原生的dom节点后，dom节点的属性极多，diff后的成本较高。在使用虚拟dom后，只需要对我们用到的属性做diff即可。

### dom的使用

React中用JSX语法描述视图，通过babel-loader转译后它们变为React.createElement(...)形 式，该函数将生成vdom来描述真实dom。将来如果状态变化，vdom将作出相应变化，再通过diff算法，对比新老vdom区别从而做出最终dom操作。

### jsx

React 使用 JSX 来替代常规的 JavaScript。JSX 是一个看起来很像 XML 的 JavaScript 语法扩展。使用 JSX 编写模板简单快速。JSX编译为 JavaScript 代码后进行了优化，执行更快。

## Component 和 PureComponent

React.Component 和 React.PureComponent很相似，两则的区别在于，PureComponent类帮我们以浅比较的方式对比props和state，实现了shouldComponentUpdate()函数，在某些情况下，使用PureComponent可以减少render函数的执行，提升性能。

PureComponent默认实现的shouldComponentUpdate()方法使用的是浅比较： 即值的比较或引用的比较, 不会进行深层次的对比，所以当props或state的值是引用类型时，即使对象的值改变了，但是对象的引用没变

PureComponent也会影响子组件

## 常见组件优化技术

### shouldComponentUpdate

通过对比新老参数，来达到优化效果

```js
shouldComponentUpdate(nextProps, nextState) {
  const { xxx } = this.props
  const { xxx: oldXxx } = nextProps
  if(xxx == oldXxx) return false
  return true
}
```

### pureComponentUpdate

内部执行了一个shouldComponentUpdate，进行了一个前后值的浅比较。但是只能用作类组件。

### React.memo

在函数组件中，原理是进行props比较

```js
const MemoComponent = memo(
  props => {
    return <div>123</div>
  },
  (prevProps, nextProps) => {
    return preveProps.xxx === nextProps.xxx
  }
)
```

### useMemo

原理也是进行第二个依赖参数的比较，类似于vue中的computed

```js
const xxx = useMemo(() => {
  return props * 2
}, [props])
```

### useCallback

函数版本的useMemo,依赖项的对比。

```js
const xxFn = useCallback(() => {

}, [propx])

```

## cloneElement

```js
const ProcessInput = () => React.cloneElement(<input />, {
  placeholder: 'xxxx'
})
```

原理

```js
const cloneElement = (element, config, ...children) => {
  const props = Object.assign({}, element.props)

  let defaultProps = {}
  if (element.type && element.type.defaultProps) {
    defaultProps = element.type.defaultProps
  }

  for (let propName in config) {
    if(propName !== "key" && propName !== "ref") {
      let val = config[propName] || defaultProps[propName]
      val && (props[propName] = val )
    }
  }

  props.children = children.map(child => 
    typeof child == 'object' ? children : createTextNode(child)
  )
    
  return {
    key: element.key || config.key || '',
    type: element.type,
    props,
  }
}
```

## react性能优化

### 减少不必要的性能渲染

- shouldComponentUpdate
- pureComponentUpdate
- React.memo

### 数据缓存

- useMemo 进行参数缓存
- useCallback 进行缓存函数

### router中的内联函数渲染

渲染的时候使用render或children,不要使用component,当使用component的时候Router会用你指定的组件和react,createElement创建一个新的react element.

## 函数组件和class组件的区别

函数组件无状态无生命周期。
