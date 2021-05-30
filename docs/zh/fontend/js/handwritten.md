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

去抖动，方法是在函数触发时，设定一个周期延迟执行函数，若在周期内函数再次执行、则刷新延迟时间，直到最后执行函数，这里函数收集到的结果是最后一次操作的结果

```js
function debounce(func, ms = 500) {
  let timer;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, argument);
    }, ms);
  };
}
```

- 节流

节流的概念是设定一个周期，周期内只执行一次，若有新的事件触发则不执行，周期结束后又有新的事件触发开始新的周期。

```js
function throttle(func, ms) {
  let canRun = true;
  return function () {
    if (!canRun) return;
    canRun = false;
    setTimeout(() => {
      func.apply(this, argument);
      canRun = true;
    }, ms);
  };
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

## New 操作符实现

在调用 new 的过程中会发生以下四件事情：

- 创建一个新的空的对象
- 将构造函数的作用域赋给新对象（因此this就指向了这个新对象）
- 执行构造函数中的代码（为这个新对象添加属性）
- 如果这个函数有返回值，则返回；否则，就会默认返回新对象

```js
function myNew() {
  var Con = Array.prototype.shift.call(arguments);
  var obj = Object.create(Con.prototype);
  var result = Con.apply(obj, arguments);
  return result instanceof Object ? result : obj
}
```

以下是对实现的分析：

- 创建一个空对象
- 获取构造函数
- 设置空对象的原型
- 绑定 `this` 并执行构造函数
- 确保返回值为对象

```js
function myNew() {
  const Con = Array.prototype.shift.call(arguments)
  const obj = Objeact.create(Con.prototype)
  const result =  Con.apply(obj, arguments)
  return result instanceof Object ? result : obj
}
```

## 与原型有关的

### 创建对象的三种方式

- 工厂模式

```js
function factory(xx) {
  const obj = {}
  obj.xx = xx
  return obj
}
```

- 构造函数

```js
function create(xxx) {
  this.xxx = xxx
}
```

- 原型链模式

```js
function myCar() {}
myCar.prototype.xx = "A"
myCar.prototype.myName = function() {}
```

- 组合构造函数

```js
function Car(color,brand){
    this.color = color;
    this.brand = brand;
    this.passengers = ["a","b","c"];
}
Car.prototype = {
  constructor: Car,
  myName: function() {}
}
```

### js继承

- 原型链继承

```js
function superType(xxx) {
  this.xxx = xxx
}
function subType(){
  this.color = "blue";
}
superType.prototype = new superType()
```

- 借用构造函数

```js
function superType(xxx) {
  this.xxx = xxx
}
function subType(xxx) {
  OldCar.call(this, xxx);
}
```

- 组合继承

```js
function superType(xxx) {
  this.xxx = xxx
}
function subType(xxx){
  superType.call(this, name)  //第一次调用
  this.xxx = xxx;
} 
subType.prototype = new superType()
subType.prototype.constructor = subType
```

- 寄生组合继承

```js

```

## 数组API

### flatten

```js
function myFlatten(arr) {
  return arr.reduce((a, b) => {
    return a.push(Array.isArray(b) ? myFlatten(b): b)
  }, [])
}
function myFlatten2(arr) {
  const res = []
  for(let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      res = res.concat(myFlatten2(arr[i]))
    } else {
      res.push(arr[i])
    }
  }
  return res
}
function myFlatten3(arr) {
  return arr.toString().split(',').map(item => +item)
}
```

### reduce

```js
Array.prototype.reduce = function(fn, value) {
  if(typeof fn !== 'function') {
    console.log("第一个参数需要为函数")
    return
  }
  let cur = value
  const startIndex = 0
  if(cur === undefined) {
    cur = this[0]
    startIndex = 1
  }
  for(let i = startIndex; i < this.length; i++) {
    cur = fn(acc, this[i], i, this)
  }
  return acc
}
```

### filter

```js
Array.prototype.filter = function(fn) {
  let arr = []
  let arr1 = Array.prototype.slice.call(this, 0)

  for (let i = 0; i < arr1.length; i++) {
    if (fn(this[i], i, this)) {
      arr.push(arr1[i])
    }
  }
  return arr
}
```

## 解决0.2 + 0.1 !== 0.3的问题

```js
parseFloat(0.1 + 0.2).toFixed(10) == 0.3
```
