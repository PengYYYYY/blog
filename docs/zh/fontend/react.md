# React

- react
- react-router  
- redux
- mobx

## React逻辑复用

React中，组件是代码复用的基本单元，基于组合的组件复用机制非常优雅。对于`状态逻辑、行为逻辑`,复用起来不那么容易，一般通过以下方式来解决`状态逻辑复用`问题。

### Mixin

混入模式就是一些提供能够被一个或者一组子类简单,继承功能的类。

- 简单的mixin功能

```javascript
{
  const mixin = function(target,mixins) {
    const newObj = target;
    newOjb.prototype = Object.create(target.prototype);
    for(let prop in mixins) {
      if(mixins.hasOwnProperty(prop)) {
      newObj.prototype[prop] = mixins[prop];
      }
    }
    return newObj
  }
}
```

- React中的mixin

```javascript
{
  var Mixin1 = {
  getMessage() {
      return "hello react"
    }
  }
  var Mixin2 = {
    componentDidMount() {
      console.log('Mixin2.componentDidMount()');
    }
  }
  var MyComponent = React.createClass({
    mixins: [Mixin1, Mixin2],
    render() {
      return <div>{this.getMessage()}</div>;
    }
  })
}

```

#### Mixin带来的缺陷（Mixins introduce implicit dependencies）

引入了隐式的`依赖关系：在写一些有状态的组件的时候，mixin的使用方，可能读取mixin里的state.这样会带来隐式的依赖关系。隐式依赖导致依赖关系不透明，维护成本和理解成本迅速攀升。

##### 隐式依赖导致依赖关系不透明，维护成本和理解成本迅速攀升

- 难以快速理解组件行为，需要全盘了解所有依赖 Mixin 的扩展行为，及其之间的相互影响
- 组价自身的方法和state字段不敢轻易删改，因为难以确定有没有 Mixin 依赖它
- Mixin 也难以维护，因为 Mixin 逻辑最后会被打平合并到一起，很难搞清楚一个 Mixin 的输入输出

#### 命名冲突

在一个Mixin定义了getDefaultProps，另外的人写的另一个mixin又定义了同样的名称getDefaultProp.造成冲突。

#### Mixins 会导致滚雪球式的复杂性

Mixin，倾向于增加更多状态，这会降低应用的可预测性，导致复杂度剧增。

::: tip
React v0.13.0 放弃了 Mixin（继承），转而走向HOC（组合）
:::

### HOC高阶组件

HOC是React中用于逻辑复用的一种高级技巧。HOC自身不是React API的一部分。只是一直设计模式。

高阶组件可以看作是React对装饰者模式的一种实现，具体来说。高阶组件是参数为组件，返回值为新组件的函数。

```javascript
export default (WrappedComponent) => {
  class NewComponent extends React.Component {
    // 可以做很多自定义逻辑
    render () {
      return <WrappedComponent />
    }
  }
  return WrappedComponent
}
```

#### 装饰者模式

装饰者模式就是，动态的给类或者对象增加职责的设计模式，它能在不改变类或对象自身的基础上，在程序的运行期间动态的添加职责。

es7中的语法糖decorator就是用来实现装饰者模式的。

#### HOC的工厂实现

> Props Proxy

```javascript
function proxyHOC(WrappedComponent) {
  return class PP extends React.Component {
    render() {
      return <WrappedComponent {...this.props}/>
    }
  }
}
```

> 反向继承 (Inheritance Inversion)

反向继承是HOC去继承 WrappedComponent，这样我们获得了这个组件之后，能够从内部对它进行装饰和修改

```javascript
function inheritHOC(WrappedComponent) {
  return class extends WrappedComponent {
    render() {
      return super.render();
    }
  }
}
```

#### HOC可以做的事情

在HOC中可以读取、添加、编辑、删除传给 WrappedComponent 的 props(属性)。
在删除或者编辑重要的props时，应该通过命名空间确保高阶组件的 props 不会破坏 WrappedComponent。

```javascript
function proxyHOC(WrappedComponent) {
  return class PP extends React.Component {
    render() {
      const newProps = {
        user: currentLoggedInUser
      }
      return <WrappedComponent {...this.props} {...newProps}/>
    }
  }
}
```

- 通过refs访问到组件实例

```javascript
function refsHOC(WrappedComponent) {
  return class RefsHOC extends React.Component {
    proc(wrappedComponentInstance) {
      wrappedComponentInstance.method()
    }
    render() {
      const props = Object.assign({}, this.props, {ref: this.proc.bind(this)})
      return <WrappedComponent {...props}/>
    }
  }
}
```

Ref 的回调函数会在 WrappedComponent 渲染时执行，你就可以得到WrappedComponent的引用。这可以用来读取/添加实例的 props ，调用实例的方法。

但是如果WrappedComponent是个无状态组件，则在proc中的wrappedComponentInstance是null，因为无状态组件没有this，不支持ref。

- 提取state

可以通过传入 props 和回调函数把 state 提取出来，

```javascript
function proxyHOC(WrappedComponent) {
  return class PP extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        name: ''
      }
      this.onNameChange = this.onNameChange.bind(this)
    }
    onNameChange(event) {
      this.setState({
        name: event.target.value
      })
    }
    render() {
      const newProps = {
        name: {
          value: this.state.name,
          onChange: this.onNameChange
        }
      }
      return <WrappedComponent {...this.props} {...newProps}/>
    }
  }
}
```

使用时

```javascript
@proxyHOC
class Test extends React.Component {
  render() {
    return <input name="name" {...this.props.name}/>
  }
}
export default proxyHOC(Test);
```

- 用其他元素包裹WrappedComponent

就是将WrappedComponent组件外面包一层需要的嵌套结构

```javascript
function proxyHOC(WrappedComponent) {
  return class PP extends React.Component {
    render() {
      return (
        <div style={{display: 'block'}}>
          <WrappedComponent {...this.props}/>
        </div>
      )
    }
  }
}
```

- 渲染劫持(Render Highjacking)

HOC 控制了 WrappedComponent 的渲染输出，并且可以用它做各种各样的事情

在渲染中：

1. 读取，添加，编辑，删除渲染输出的任何 React 元素中的 props(属性)
2. 读取并修改 render 输出的 React 元素树
3. 有条件地渲染元素树
4. 把样式包裹进元素树（就像在 Props Proxy(属性代理) 中的那样）

```javascript
function inheritHOC(WrappedComponent) {
  return class Enhancer extends WrappedComponent {
    render() {
      const elementsTree = super.render()
      let newProps = {};
      // 一些逻辑操作
      if (elementsTree && elementsTree.type === 'input') {
        newProps = {value: 'may the force be with you'}
      }
      const props = Object.assign({}, elementsTree.props, newProps)
      const newElementsTree = React.cloneElement(elementsTree, props, elementsTree.props.children)
      return newElementsTree
    }
  }
}
```

### 如何优雅的使用HOC

- 组合compose

```javascript
function compose(...args) {
  return args.reduce((a, b) => (...args) => a(b(...args)))
}

compose(fn1, fn2, fn3)(...args) 相当于 fn1(fn2(fn3(...args)))
```

- 装饰器

```javascript
@proxyHOC
class Test extends React.Component {
  render() {
    return (
      <></>
    );
  }
}
```

### 使用HOC的注意事项

- 不要在 render 方法中使用 HOC
::: danger
React 的 diff 算法使用组件标识来确定它是应该更新现有子树还是将其丢弃并挂载新子树。 如果从 render 返回的组件与前一个渲染中的组件相同（===），则 React 通过将子树与新子树进行区分来递归更新子树。 如果它们不相等，则完全卸载前一个子树。
:::

```javascript
render() {  
  // 每次调用 render 函数都会创建一个新的 EnhancedComponent  
  // EnhancedComponent1 !== EnhancedComponent2  
  const EnhancedComponent = enhance(MyComponent); // 子树每次渲染都会进行卸载，和重新挂载的操作！
  return <EnhancedComponent />
}
```

重新挂载组件会导致该组件及其所有子组件的状态丢失。
如果在组件之外创建 HOC，这样一来组件只会创建一次。因此，每次 render 时都会是同一个组件。

- Refs 不会被传递

::: danger
ref 实际上并不是一个 prop - 就像 key 一样，它是由 React 专门处理的，如果将 ref 添加到 HOC 的返回组件中，则 ref 引用指向容器组件，而不是被包装组件
:::

### HOC的缺陷

- 扩展性限制：HOC 并不能完全替代 Mixin
- Ref 传递问题：Ref 被隔断,开发中需要专门去处理
- Wrapper Hell：HOC 泛滥，出现 Wrapper Hell

## React Hooks
