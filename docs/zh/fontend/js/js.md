# JavaScript

## 语言基础

### symbol 有什么用处

可以用来表示一个独一无二的变量防止命名冲突。主要用来提供遍历接口，布置了 symbol.iterator 的对象才可以使用 for···of 循环，可以统一处理数据结构。调用之后回返回一个遍历器对象，包含有一个 next 方法，使用 next 方法后有两个返回值 value 和 done 分别表示函数当前执行位置的值和是否遍历完毕。Symbol.for() 可以在全局访问 symbol

## 原型相关

### new的过程

```js
function myNew() {
  const obj = {}
  const Con = [].shift.call(this)
  obj.__proto__ = Con
  const result = Con.apply(obj, arguments)
  return result instanceof Object ? result : obj
}
```

- 创造一个全新的对象
- 这个对象会被执行 [[Prototype]] 连接，将这个新对象的 [[Prototype]] 链接到这个构造函数.prototype 所指向的对象
- 这个新对象会绑定到函数调用的 this
- 如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象

## 判断数据类型

## typeof

返回数据类型，包含这7种： number、boolean、symbol、string、object、undefined、function。

- typeof null，返回object
- 引用类型，除了function返回function类型外，其他均返回object。

## Object.prototype.toString.call

toString() 是 Object 的原型方法，调用该方法，默认返回当前对象的 [[Class]] 。这是一个内部属性，其格式为 [object Xxx] ，其中 Xxx 就是对象的类型。
对于 Object 对象，直接调用 toString()  就能返回 [object Object] 。而对于其他对象，则需要通过 call / apply 来调用才能返回正确的类型信息。

```js
const dataType = Object.prototype.toString.call(data)
return dataType.slice(8, -1)
```

## constructor

constructor是原型prototype的一个属性，当函数被定义时候，js引擎会为函数添加原型prototype，并且这个prototype中constructor属性指向函数引用， 因此重写prototype会丢失原来的constructor。

null 和 undefined 无 constructor，这种方法判断不了。

## instanceof

用于判断两个对象是否属于实例关系

基本原理

```js
function myInstanceOf(left, right) {
  left = left.__proto__
  const prototype = right.prototype
  while(true) {
    if(left == prototype) return true
    if(left === undefined || left === null) return false
    left = left.__proto__
  }
}
```

## 异步编程

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

### js的特性

基于原型的动态语言，有this，原型和原型链。某种意义来说，js分为：语言标准部分（es）+ 苏州环境部分。

- 在浏览器宿主环境包括 DOM + BOM 等
- 在node中，宿主环境包括一些文件、数据库、网络、与操作系统的交互等

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

### 为什么 0.1 + 0.2 != 0.3

先说原因，因为 JS 采用 IEEE 754 双精度版本（64位），并且只要采用 IEEE 754 的语言都有该问题。

我们都知道计算机是通过二进制来存储东西的，那么 0.1 在二进制中会表示为

`0.1 = 2^-4 * 1.10011(0011)`

我们可以发现，`0.1` 在二进制中是无限循环的一些数字，其实不只是 `0.1`，其实很多十进制小数用二进制表示都是无限循环的。这样其实没什么问题，但是 JS 采用的浮点数标准却会裁剪掉我们的数字。

IEEE 754 双精度版本（64位）将 64 位分为了三段

- 第一位用来表示符号
- 接下去的 11 位用来表示指数
- 其他的位数用来表示有效位，也就是用二进制表示 0.1 中的 10011(0011)

这些循环的数字被裁剪了，就会出现精度丢失的问题，也就造成了 0.1 不再是 0.1 了，而是变成了 0.100000000000000002

> 怎么解决这个问题

```js
parseFloat((0.1 + 0.2).toFixed(10)) === 0.3 // true
```

### js指向问题

#### this的要点

- this 永远指向最后调用它的那个对象

`this`的作用域环境。直接从从执行栈的角度上来看，最后一个执行栈帧调用的就是

#### 箭头函数

箭头函数的 this 始终指向函数定义时的 this，而非执行时，箭头函数中没有this的绑定，必须通过查找作用域链的方式来决定他的值。如果箭头函数被非箭头函数包含，则 this 绑定的是最近一层非箭头函数的 this。

#### 如何改变this的指向

- 使用箭头函数
- 函数内部使用 _this = this做缓存
- 使用apply, call, bind

## js脚本加载问题，async、defer问题

如果依赖其他脚本和 DOM 结果，使用 defer
如果与 DOM 和其他脚本依赖不强时，使用 async

## js中求数组最大值

- 解构

```js
const res = Math.max(...[1,2,3,4])
```

- 利用apply

```js
const res = Math.max.apply(null, [1,2,3,4,5])
```

## 创建出没有原型的对象

Object.create( null )可以创建出没有原型的对象

```js
const myCreate = function(con) {
  const F = function() {}
  F.prototype = con
  return new F()
}
```
