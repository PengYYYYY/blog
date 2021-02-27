# JavaScript

## 相关文章

- [事件循环](/zh/articles/eventLoop/)
- [函数式编程](/zh/articles/functional/)

## 基础

### Generator函数

Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同。

1. function关键字与函数名之间有一个*
2. 函数体内部使用yield表达式，定义不同状态的内部状态。
3. yield 表达式只能在Generator函数里使用，在其他地方会报错。

```js
function* helloWorldGenerator() {
  yield 'hello'
  yield 'world'
  return 'ending'
}
const hw = helloWorldGenerator()

// 执行
console.log(hw.next()); // {value:”hello“, done: false}
console.log(hw.next()); // {value:”world“, done: false}
console.log(hw.next()); // {value:”ending“, done: true}
console.log(hw.next()); // {value:undefined, done: true}
```

惰性求值

```js
var a = 0;
function* fun() {
  let aa = yield (a = 1 + 1);
  return aa;
}
console.log("fun0", a); //0
let b = fun();
console.log("fun", b.next()); //2
console.log("fun1", a); //2
```

### Async

## JavaScript 中的特性

### delete

关于`JavaScript`中的`delete`操作符，只是执行一段代码的引用而已,如果是引用类型，则解开引用，他并不能正真的删除数据本身，以下例子可以看出。

``` javascript
delete 1 // true

const a = 1
delete c // false

let b = 1
delete b

const c = {
 a: 1,
 b: 2
}
delete c.b // true c {a: 1}

x = 100
delete x // true
```

### 范式引用

#### 声明语句

- let：词法声明，变量
- const：词法声明，常量
- var：变量声明，存在变量提升，会在作用域顶部创建一个变量并赋值`undefined`
- function
- class
- import
- for (var|let|const x...)
- try ... catch (x)

严格来说，声明不是语句

``` javascript
var a = 100;
x = 200;

// `a`和`x`都是 global 的属性
> Object.getOwnPropertyDescriptor(global, 'a');
{ value: 100, writable: true, enumerable: true, configurable: false }
> Object.getOwnPropertyDescriptor(global, 'x');
{ value: 200, writable: true, enumerable: true, configurable: true }

// `a`不能删除, `x`可以被删除
> delete a
false
> delete x
true

// 检查
> a
100
> x
ReferenceError: x is not defined
```

```javascript
// #使用eval声明
> eval('var b = 300');

// 它的性质是可删除的
> Object.getOwnPropertyDescriptor(global, 'b').configurable;
true

//  检测与删除 9>b
300
> delete b
true
> b
ReferenceError: b is not define
```

## CommonJS，ES module 的区别

它们都是一种模块规范，例如 Node 使用的就是 CommonJS 规范。ES module 则是语言标准上的模块规范。

- CommonJS 模块使用 require() 和 module.exports，ES6 模块使用 import和 export。
- CommonJS 模块输出的是一个值的浅拷贝，ES6 模块输出的是值的引用。
- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
- CommonJS 模块的 require() 是同步加载模块，ES6 模块的 import 命令是异步加载，有一个独立的模块依赖的解析阶段。
- ES6 模块之中，顶层的 this 指向 undefined；CommonJS 模块的顶层 this 指向当前模块，
- 对于循环加载的处理方法不同

第 3 个差异是因为 CommonJS 加载的是一个对象（即 module.exports 属性），该对象只有在脚本运行完才会生成。

## 为什么 0.1 + 0.2 != 0.3

先说原因，因为 JS 采用 IEEE 754 双精度版本（64位），并且只要采用 IEEE 754 的语言都有该问题。

我们都知道计算机是通过二进制来存储东西的，那么 0.1 在二进制中会表示为

`0.1 = 2^-4 * 1.10011(0011)`

我们可以发现，`0.1` 在二进制中是无限循环的一些数字，其实不只是 `0.1`，其实很多十进制小数用二进制表示都是无限循环的。这样其实没什么问题，但是 JS 采用的浮点数标准却会裁剪掉我们的数字。

IEEE 754 双精度版本（64位）将 64 位分为了三段

- 第一位用来表示符号
- 接下去的 11 位用来表示指数
- 其他的位数用来表示有效位，也就是用二进制表示 0.1 中的 10011(0011)

这些循环的数字被裁剪了，就会出现精度丢失的问题，也就造成了 0.1 不再是 0.1 了，而是变成了 0.100000000000000002

### 怎么解决这个问题

```js
parseFloat((0.1 + 0.2).toFixed(10)) === 0.3 // true
```

### 给localStorage加上过期时间

```js
class myStorage {
  constructor(props) {
    this.props = props || {}
    this.source = this.props.source || window.localStorage
    this.init();
  }

  set(key, value, expired) {
    let source = this.source
    source[key] = JSON.stringify(value);
    if (expired) {
      source[`${key}__expires__`] = Date().now() + 1000 * 60 * expired
    }
    return value
  }

  get(key) {
    const source = this.source,expired = source[`${key}__expires__`]||Date.now+1;
    const now = Date.now();
    if ( now >= expired ) {
      this.remove(key);
      return;
    }
    const value = source[key] ? JSON.parse(source[key]) : source[key];
    return value
  }

  remove(key) {
    const data = this.source, value = data[key];
    delete data[key];
    delete data[`${key}__expires__`];
    return value;
  }

  init() {
    const reg = new RegExp("__expires__");
    let data = this.source;
    let list = Object.keys(data);
    if(list.length > 0) {
      list.map((k, v) => {
        if(!reg.test(v)) {
          let now = Date.now();
          let expires = data[`${key}__expires__`]||Date.now+1;
          if (now >= expires ) {
            this.remove(key);
          };
        }
        return key
      })
    }
  }
}
```
