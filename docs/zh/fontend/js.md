# JavaScript

## 相关文章

- [事件循环](/zh/articles/eventLoop/)
- [函数式编程](/zh/articles/functional/)
- [ssr](/zh/articles/ssr/)

## 基础语法原理

### 手写 `call`、`apply`、`bind`

call 与 apply 的差别在于参数

- call

```js
Function.prototype.call = function(context) {
  if(typeof this !== 'function') {
    throw new TypeError('Error')
  }
  context = context || windows
  context.fn = this
  const args = [...arguments].slice(1)
  const result = context.fn(args)
  delete contes.fn
  return result
}
```

- apply

```js
Function.prototype.apply = function(context) {
  if(typeof this !== 'function') {
    throw new TypeError('Error')
  }
  context = context || windows
  context.fn = this
  let result
  if (arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }
  delete contes.fn
  return result
}
```

- bind

```js
Function.prototype.bind = function(context) {
  if(typeof this !== 'function') {
    throw new TypeError('Error')
  }
  const _this = this
  const args = [...arguments].slice(1)
  return function F() {
    // 因为返回了一个函数，我们可以 new F()，所以需要判断
    if (this instanceof F) {
      return new _this(...args, ...arguments)
    }
    return _this.apply(context, args.concat(...arguments))
  }
}
```

- 防抖

```js
function debounce(func, ms = 500) {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, ms);
  };
}

```

- 节流

```js
function throttle(func, ms) {
  let canRun = true;
  return function (...args) {
    if (!canRun) return;
    canRun = false;
    setTimeout(() => {
      func.apply(this, args);
      canRun = true;
    }, ms);
  };
}
```

- new

```js
function myNew(Func) {
  const instance = {};
  if (Func.prototype) {
    Object.setPrototypeOf(instance, Func.prototype);
  }
  const res = Func.apply(instance, [].slice.call(arguments, 1));
  if (typeof res === "function" || (typeof res === "object" && res !== null)) {
    return res;
  }
  return instance;
}
```

- deepCopy

```js
function deepCopy(obj, cache = new WeakMap()) {
  if (!obj instanceof Object) return obj;
  // 防止循环引用
  if (cache.get(obj)) return cache.get(obj);
  // 支持函数
  if (obj instanceof Function) {
    return function () {
      obj.apply(this, arguments);
    };
  }
  // 支持日期
  if (obj instanceof Date) return new Date(obj);
  // 支持正则对象
  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags);
  // 还可以增加其他对象，比如：Map, Set等，根据情况判断增加即可，面试点到为止就可以了

  // 数组是 key 为数字素银的特殊对象
  const res = Array.isArray(obj) ? [] : {};
  // 缓存 copy 的对象，用于出来循环引用的情况
  cache.set(obj, res);

  Object.keys(obj).forEach((key) => {
    if (obj[key] instanceof Object) {
      res[key] = deepCopy(obj[key], cache);
    } else {
      res[key] = obj[key];
    }
  });
  return res;
}
```

### sort内部原理

## 异步

### Promise

手写promise

```js
const isFunction = variable => typeof variable === 'function'
// 三种状态
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class Promise {
  constructor(handle) {
    if(!isFunction(handle)) {
      throw new Error('promise must accept a function as parameter')
    }
    // 全局状态
    this.status = PENDING
    // 返回参数
    this.value = null
    // 成功回调函数队列
    this.fulfilledQueue = []
    // 失败回调函数队列
    this.rejectedQueue = []
    try {
      handle(this.resolve.bind(this), this.reject.bind(this))
    } catch(e) {
      this.reject(err)
    }
  }
   // resolve时执行的函数
  resolve(val) {
    const run = () => {
      if(this.status !== PENDING) return
      this.status = FULFILLED
      // 依次执行成功队列中的函数，并清空队列
      const runFulfilled = value => {
        let cb;
        while(cb = this.fulfilledQueue.shift()) {
          cb(value)
        }
      }
      // 依次执行失败队列中的函数，并清空队列
      const runRejected = (error) => {
        let cb;
        while (cb = this.rejectedQueues.shift()) {
          cb(error)
        }
      }
      /* 如果resolve的参数为Promise对象，则必须等待该Promise对象状态改变后,
        当前Promise的状态才会改变，且状态取决于参数Promise对象的状态
      */
      if (val instanceof Promise) {
        val.then(value => {
          this.value = value
          runFulfilled(value)
        }, err => {
          this.value = err
          runRejected(err)
        })
      } else {
        this.value = val
        runFulfilled(val)
      }
    }
    setTimeout(run, 0)
  }

  rejected(error) {
    if(this.status !== PENDING) return
    // 依次执行失败队列中的函数，并清空队列
    const run = () => {
      this.status = REJECTED
      this.value = error
    }
    setTimeout(run, 0)
  }

  runReject() {
    let cb;
    while (cb = this.rejectedQueues.shift()) {
      cb(error)
    }
  }

  then(onFulfilled, onRejected) {
    const { value, status } = this
    return new Promise((onFulfilledNext, onRejectedNext) => {
      // 成功时执行的函数
      let fulfilled = value => {
        try {
          if (!isFunction(onFulfilled)) {
            onFulfilledNext(value)
          } else {
            let res = onFulfilled(value);
            if (res instanceof MyPromise) {
              // 如果当前回调函数返回Promise对象，必须等待其状态改变后在执行下一个回调
              res.then(onFulfilledNext, onRejectedNext)
            } else {
              //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
              onFulfilledNext(res)
            }
          }
        } catch (err) {
          // 如果函数执行出错，新的Promise对象的状态为失败
          onRejectedNext(err)
        }
      }
      let rejected = error => {
        try {
          if (!isFunction(onFulfilled)) {
            onFulfilledNext(value)
          } else {
            let res = onRejected(value);
            if (res instanceof MyPromise) {
              // 如果当前回调函数返回Promise对象，必须等待其状态改变后在执行下一个回调
              res.then(onFulfilledNext, onRejectedNext)
            } else {
              //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
              onFulfilledNext(res)
            }
          }
        } catch (err) {
          // 如果函数执行出错，新的Promise对象的状态为失败
          onRejectedNext(err)
        }
      }
      switch(status) {
        case PENDING:
          this.fulfilledQueues.push(fulfilled)
          this.rejectedQueues.push(rejected)
          break
        case FULFILLED:
          fulfilled(value)
          break
        case REJECTED:
          rejected(value)
          break
      }
    })
  }

  catch (onRejected) {
    return this.then(undefined, onRejected)
  }

  static resolve (onRejected) {
    return this.then(undefined, onRejected)
  }

  static resolve (onRejected) {
    // 如果参数是Promise实例，直接返回这个实例
    if (value instanceof Promise) return value
    return new Promise(resolve => resolve(value))
  }

  // reject方法
  static reject (value) {
    return new Promise((resolve ,reject) => reject(value))
  }

  // all方法
  static all (list) {
    return new Promise((resolve, reject) => {
      let values = []
      let count = 0
      for (let [i, p] of list.entries()) {
        // 数组参数如果不是Promise实例，先调用Promise.resolve
        this.resolve(p).then(res => {
          values[i] = res
          count++
          // 所有状态都变成fulfilled时,状态就变成fulfilled
          if (count === list.length) resolve(values)
        }, err => {
          // 有一个被rejected时返回的Promise状态就变成rejected
          reject(err)
        })
      }
    })
  }

  // race方法
  static race (list) {
    return new MyPromise((resolve, reject) => {
      for (let p of list) {
        // 只要有一个实例率先改变状态，新的Promise的状态就跟着改变
        this.resolve(p).then(res => {
          resolve(res)
        }, err => {
          reject(err)
        })
      }
    })
  }

  // finally方法
  finally (cb) {
    return this.then(
      value  => MyPromise.resolve(cb()).then(() => value),
      reason => MyPromise.resolve(cb()).then(() => { throw reason })
    );
  }
}
```

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

## JavaScript解析过程

### 词法分析(Tokenizing/Lexing)

简单说，就是把字符串拆分

### 语法分析

将拆分过后的字符串流，转换成为一个由元素逐级嵌套的程序语法树(Abstract Syntax Tree，AST)

### 代码生成

将AST转换成可以执行的代码，此过程与平台和等信息相关

### JIT

任何 JavaScript 代码片段在执行前都要进行编译，
