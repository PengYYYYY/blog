# 函数式编程

函数式编程是编程范式，也就是如何编写程序的方法论

## 特点

函数式编程具有五个鲜明的特点。

### 函数是一等公民

指的是函数与其他数据类型一样，处于平等地位，可以赋值给其他变量，也可以作为参数，传入另一个函数，或者作为别的函数的返回值。

### 只用"表达式"，不用"语句"

"表达式"（expression）是一个单纯的运算过程，总是有返回值；"语句"（statement）是执行某种操作，没有返回值；函数式编程要求，只使用表达式，不使用语句；每一步都是单纯的运算，而且都有返回值。

原因是函数式编程的开发动机，一开始就是为了处理运算（computation），不考虑系统的读写（I/O）。"语句"属于对系统的读写操作，所以就被排斥在外。

编程过程中，函数式编程只要求把I/O限制到最小，不要有不必要的读写行为，保持计算过程的单纯性。

### 没有"副作用"

指的是函数内部与外部互动（最典型的情况，就是修改全局变量的值），产生运算以外的其他结果。

函数式编程强调没有"副作用"，意味着函数要保持独立，所有功能就是返回一个新的值，没有其他行为，尤其是不得修改外部变量的值。

### 不修改状态

函数式编程只是返回新的值，不修改系统变量。不修改变量，也是它的一个重要特点。

### 引用透明

引用透明（Referential transparency），指的是函数的运行不依赖于外部变量或"状态"，只依赖于输入的参数，任何时候只要参数相同，引用函数所得到的返回值总是相同的。

有了前面的第三点和第四点，这点是很显然的。其他类型的语言，函数的返回值往往与系统状态有关，不同的状态之下，返回值是不一样的。这就叫"引用不透明"，很不利于观察和理解程序的行为。

## 意义

函数式编程到底有什么好处，为什么会变得越来越流行？

### 代码简洁，开发快速

函数式编程大量使用函数，减少了代码的重复，因此程序比较短，开发速度较快。

### 接近自然语言，易于理解

函数式编程的自由度很高，可以写出很接近自然语言的代码。

### 更方便的代码管理

函数式编程不依赖、也不会改变外界的状态，只要给定输入参数，返回的结果必定相同。因此，每一个函数都可以被看做独立单元，很有利于进行单元测试（unit testing）和除错（debugging），以及模块化组合。

### 易于"并发编程"

函数式编程不需要考虑"死锁"（deadlock），因为它不修改变量，所以根本不存在"锁"线程的问题。不必担心一个线程的数据，被另一个线程修改，所以可以很放心地把工作分摊到多个线程，部署"并发编程"（concurrency）。

### 代码的热升级

函数式编程没有副作用，只要保证接口不变，内部实现是外部无关的。所以，可以在运行状态下直接升级代码，不需要重启，也不需要停机
## 纯函数

- 可推测
- 可复用，模块化
- 无副作用
- 可读性强

```javascript
let double = value => value * 2

test("double 2 等于 4", () => {
  expect(double(2)).toBe(4)
})
```

## 不可变数据，纯数据

解决js的引用数据问题。

```javascript
const obj = {
  name: "A男"
}
obj = {
  name: "B男"
}
// error

obj.name = "B男"
// b男

数据可变
```

- 浅冻结

```javascript
Object.freeze(obj)
obj.myname = "b男"
//  error
```

- 深冻结

```javascript
function deepFreeze(obj) {
  Object.freeze(obj)
  for (let i in obj) {
    if (typeof obj[i] === "object") {
      deepFreeze(obj[i])
    }
  }
}
deepFreeze(obj);
obj.hobby.one = "足球"
//  error
```

## 高阶函数

以函数作为输入或者输出的函数被称为高阶函数

```javascript
function test(b) {
  cb && cb()
}

test(function() => {
  console.log('callback')
})
```

- 抽象
- 缓存
- 惰性加载

### 命令式编程

强调如何做

```javascript
let arr = [1,2,3];
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i])
}
```

### 声明式编程

强调做什么,把如何做抽象,增强了拓展性

```javascript
const forEach = function(arr, fn) {
  for (let i = 0; i < arr.lengthl; i++) {
    fn(arr[i]);
  }
}
```

原生实现，some,every,filter,reduce,map
抽象使用过程。

### 缓存特性

```javascript
let arr=  [true, false, true];

const every = (arr, fn) => {
  let result = true;
  for (let i = 0; i < arr.length; i++) {
    result = result && fn(arr[i])
  }
  return result
}
```

```javascript
const once = fn => {
  let done = false;
  return function() {
    if (!done) {
      fn();
    } else {
      console.log("函数已经执行过了")
    }
    done = true;
  }
}
```

### 柯里化

- 纯函数，让纯函数变得更纯;
- 把多元函数转化成一元函数;

```javascript
function test(x, y) {
  return x + y;
}

// 二元转换成一元
const curry = function(fn) {
  return function(x) {
    return function(y) {
      return fn(x, y)
    }
  }
}
let myfn = curry(test)
let res = myfn(1)(2);
console.log(res)
console.log(test(1, 2));
```

```javascript
let arr = [{
  name: "张三",
  age: 20
}, {
  name: "李四",
  age: 23
}, {
  name: "王五",
  age: 25
}]

const getObj = (name, item) => item.name === name;
let res = arr.filter(item => getObj("李四", item))
console.log(res)
```

## 单一原则,组合函数

```javascript
function afn(a) {
  return a * 2;
}
function bfn(b) {
  return b + 3;
}
// 2先乘2 然后乘三
let res = bfn(afn(2));
console.log()
```

函数式组合

```javascript
const compose = function(fn1, fn2) {
  return function(val) {
    return fn1(fn2(val));
  }
}
const myfn = compose(bfn, afn);
console.log(myfn(2));
```

多个函数组合

```javascript
const pipe = function(...fns) {
  return function(val) {
    return fn.reduce((total, fn) => {
      return fn(total)
    }, val)
  }
}

const compose = function(...fns) {
  return function(val) {
    return fn.reverse().reduce((total, fn) => {
      return fn(total)
    }, val)
  }
}
```
