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
