# 手写源码系列

## 深拷贝和浅拷贝

### 浅拷贝

```js
let a = {
  age: 1
}
let b = Object.assign({}, a)
```

```js
let a = {
  age: 1
}
let b = { ...a }
```

## 深拷贝

deepCopy

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

利用`JSON.parse()` `JSON.stringify()`,

```js

let a = {
  age: 1,
  jobs: {
    first: 'FE'
  }
}

const b = JSON.parse(JSON.stringify(a))
```

此方法的局限性

- 会忽略 `undefined`
- 会忽略 `symbol`
- 不能序列化函数
- 不能解决循环引用的对象
- 当遇到函数、 undefined 或者 symbol 的时候，会被自动过滤掉

## Object.assign()与Object.create()实现原理

- assign实现原理

```js
if (typeof Object.assign != 'function' ) {
  Object.defineProperty(Object, 'assing', {
    value: function(target) {
      if (target == null) {
        throw new TypeError('目标对象不能为空')
      }
      var to = Object(target)
      for (var i = 1; index < arguments.length; i++) {
        var nextSource = arguments[i]
        if (nextSource != null) {
          for (let nextKey in nextSource) {
            if (Object.property.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey]
            }
          }
        }
      }
      return to
    }
  })
}
```

- create实现原理

```js
Object.create = function(obj) {
  function F() {}
  F.prototype = obj
  return = new F()
}

```

## 手写 `call`、`apply`、`bind`

call 与 apply 的差别在于参数

- call

```js
Function.prototype.call = function(context) {
  if(typeof this !== 'function') {
    throw new TypeError('Error')
  }
  context = context || window
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

## 防抖节流

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

## new

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

## Promise

手写promise， 符合promise A+ 规范

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

## async await实现

```javaScript
function asyncToGenerator(generatorFunc) {
 return function() {
  const gen = generatorFunc.apply(this, arguments)

 return new Promise((reslove, reject) => {
  function step(ket, arg) {
  let generatorResult
  try {
   generatorResult = gen[key](arg)
  } catch(e) {
   return reject(e)
  }
  const { value, done } = generatorResult
  if(done) {
   return resolve(value)
  } else {
   return Promise.reslove(value).then(val => step('next', val), err => step('throw', err))
  }
 }
 step('next')
  })
 }
}
```

## 类型判断函数

```js
function getType (data) {
  let type = typeof data
  if (type !== 'object') {
    return type
  }
  const objType = Object.prototype.toString.call(data)
  return objType.toLowerCase()
}
```

## 使用requestAnimationFrame实现setInterval

```js
function myInterval(fn, interval) {
  let timer
  const now = Date.now
  let startTime = now()
  let endTime = startTime
  const loop = () => {
    timer = windows.requestAnimationFrame(loop)
    endTime = now()
    if (endTime - startTime >= interval) {
      startTime = endTime = now()
      callback(timer)
    }
  }
  timer = window.requestAnimationFrame(loop)
  return timer
}
```

