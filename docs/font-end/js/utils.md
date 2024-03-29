# 源码实现

## 数组 API

### 数组去重

- 利用 set

```js
function unique(arr) {
  return Array.from(new Set(arr))
}
```

- 利用 indexOf

```js
function unique(arr) {
  const res = []
  for(let i = 0; i < arr.length; i++) {
    if(res.indexOf(arr[i]) === -1) {
      res.push(arr[i])
    }
  }
  return res
}
```

- 利用 filter

```js
function unique(arr) {
  return arr.filter((item, index) => {
    return arr.indexOf(item) === index
  })
}
```

- 利用 map

```js
function unique(arr) {
  const map = new Map()
  const res = []
  for(let i = 0; i < arr.length; i++) {
    if(!map.has(arr[i])) {
      map.set(arr[i], true)
      res.push(arr[i])
    }
  }
  return res
}
```

### flatten 的实现

- 利用 reduce

```js
function myFlatten(arr) {
  return arr.reduce((a, b) => {
    return a.concat(Array.isArray(b) ? myFlatten(b): b)
  }, [])
}
```

- 递归

```js
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
```

- 利用 toString

```js
function myFlatten3(arr) {
  return arr.toString().split(',').map(item => +item)
}
```

### 实现 findX 函数

```js
Array.property.findIndex = function(callback) {
  var arr = this;
  for (var i = 0; i < arr.length; i++) {
    if (callback(arr[i]), i) {
      return i
    }
  }
  return -1
}

```

### reduce 的实现

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

### filter 的实现

```js
Array.prototype.filter = function(cb) {
  let res = []
  let arr1 = Array.prototype.slice.call(this, 0)

  for (let i = 0; i < arr1.length; i++) {
    if (cb(this[i], i, this)) {
      res.push(arr1[i])
    }
  }
  return res
}
```

### map 的实现

```js
Array.prototype.myMap = function(cb) {
  let res = []
  let arr = Array.prototype.slice.call(this, 0)
  for (let i = 0; i < arr.length; i++) {
    console.log(this[0])
    const item = cb(this[i], i, this)
    res.push(item)
  }
  return res
}
```

### find 的实现

```js
Array.prototype.myFind = function(callback) {
  let curVal
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i])) {
      curVal = this[i]
      break
    }
  }
  return curVal
}
```

### some 的实现

```js
Array.prototype.mySome = function(callback) {
  let result = false
  for (let i = 0; i < this.length; i++) {
    result = callback && callback[this[i]]
  }
  return result
}
```

### every的实现

```js
Array.prototype.every = function(cb) {
  let result = true
  for(let i = 0; i < this.length; i++) {
    if(!cb(this[i])) {
      result = false
      break
    }
  }

  return result
}
```

### 类数组转换

arguments 和 dom 操作返回的结果都是类数组

- 利用 `Array.from`

```js
Array.from(arguments)
```

- 解构

```js
[...arguments]
```

- 利用 slice

```js
Array.prototype.slice.call(arguments)
```

- 利用 concat

```js
Array.prototype.concat.apply([], arguments)
```

## 对象API

- Object.assign 原理

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

- Object.create 实现原理

```js
Object.create = function(obj) {
  function F() {}
  F.prototype = obj
  return = new F()
}

```

## 常用API

### 类型判断函数

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

### 实现 parseInt

```js
function myParseInt(str) {
  if(typeof str == 'number') return str
  if(!str || typeof str !== 'string') return NaN
  let cur = 0
  for(let i = 0; i < str.length; i++) {
    const node = str.charAt(i)
    if (node <= '9' && node >= '0') {
      cur = (node - 0) + cur * 10
    } else {
      break
    }
  }
  return cur
}
```

### 利用 raf 实现 setInterval

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

### 深拷贝和浅拷贝

#### 浅拷贝

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

#### 深拷贝

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
  let res = Array.isArray(obj) ? [...obj] : { ...obj }
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

> mini版本

```js
function deepClone(data) {
  if (typeof data === 'object') {
    const result = Array.isArray(data) ? [] : {};
    for (let key in data) {
      if (typeof data[key] === 'object') {
        result[key] = deepClone(data[key]);
      } else {
        result[key] = data[key];
      }
    }
    return result;
  } else {
    return data;
  }
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

## 和 this 指向相关的

call 与 apply 的差别在于参数

### call

```js
Function.prototype.call = function(context) {
  if(typeof this !== 'function') {
    throw new TypeError('Error')
  }
  context = context || window
  context.fn = this
  const args = [...arguments].slice(1)
  const result = context.fn(...args)
  delete contes.fn
  return result
}
```

### apply

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

### bind

```js
Function.prototype.myBind = function(context) {
  var _this = this,
    args = Array.prototype.call(arguments, 1);
  return function() {
    return _this.apply(context, argst)
  }
}
```

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

### New 操作符实现

在调用 new 的过程中会发生以下四件事情：

- 创建一个新的空的对象
- 将构造函数的作用域赋给新对象（因此this就指向了这个新对象）
- 执行构造函数中的代码（为这个新对象添加属性）
- 如果这个函数有返回值，则返回；否则，就会默认返回新对象

```js
function myNew() {
  const obj = {}
  const Con = [].shift.call(arguments)
  obj.__proto__ = Con.prototype
  const result = Con.apply(obj, arguments)
  return result instanceof Object ? result : obj
}
```

以下是对实现的分析：

- 创建一个空对象
- 获取构造函数
- 设置空对象的原型
- 绑定 `this` 并执行构造函数
- 确保返回值为对象

## 原型有关的

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
subType.prototype = new superType() // 第二次调用
subType.prototype.constructor = subType //增强
```

- 寄生组合继承

```js
function SuperType(xxx) {
  this.xxx = xxx;
  this.passengers = [1, 2, 3, 4]
}
SuperType.prototype.getXXX = function() {
  return this.xxx
}
function SubType(xxx) {
  SuperType.call(this, arguments)
  this.xxx = xxx
}

var middleObj = Object.create(SuperType.prototype);
middleObj.constructor = NewCar;
NewCar.prototype = middleObj

function myCreate(proto) {
  function F(){}
  F.prototype = proto
  return new F()
}
```

### instanceOf原理

```js
function myInstanceof(left, right) {
  const prototype = right.property
  left = left.__proto__
  while(true) {
    if(left === undefined || left === null) return false
    if(left == prototype) return true
    left = left.__proto__
  }
}
```

## 一些场景问题

### 防抖节流

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

> 首节流

```js
function throttle(func, ms) {
  let last = 0
  return function() {
    let now = Date.now()
    if (now - last >= ms) {
      last = now
      fn.apply(this, arguments)
    }
  }
}
```

> 尾节流

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

### 解决 0.2 + 0.1 !== 0.3 的问题

```js
parseFloat(0.1 + 0.2).toFixed(10) == 0.3
```

### JSONP

```js
const jsonp = ({ url, params, callbackName }) => {
  const generateUrl = () => {
    let dataSrc = ''
    for(let key of params) {
      if(Object.prototype.hanOwnProperty.call(params, key)) {
        dataSrc += `${key}=${params[key]}&`
      }
    }
    dataSrc += `callback=${callbackName}`
    return `${url}?${dataSrc}`
  }
  return new Promise((resolve, reject) => {
    const scriptEle = document.createElement("script")
    scriptEle.src = generateUrl()
    document.appendChild(scriptEle)
    window[callbackName] = data => {
      resolve(data)
      document.removeChild(scriptEle)
    }
  })
}
```

### AJAX

```js
const getJSON = function(url) {
  return new Promise((resolve, reject) => {
    const xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHttp')
    xhr.open("GET", url, false)
    xhr.setRequestHeader("Accept", "application/json")
    xhr.onreadystatechange = function() {
      if(xhr.readyState !== 4) return
      if(xhr.status === 200 || xhr.status === 304) {
        resolve(xhr.responseText)
      } else {
        reject(new Error(xhr.responseText))
      }
    }
    xhr.send()
  })
}
```

### AJAX Hooks

```js
class XhrHook {
  constructor(beforeHooks = {}, afterHooks = {}) {
    this.XHR = window.XMLHttpRequest
    this.beforeHooks = beforeHooks
    this.afterHooks = afterHooks
    this.init()
  }
  // 初始化
  init() {
    let _this = this
    window.XMLHttpRequest = function() {
      this._xhr = new _this.XHR()
      _this.overWrite(this)
    }
  }
  // 重写
  overWrite(proxyXHR) {
    for(let key in proxyXHR) {
      if(typeof proxyXHR._xhr[key] == "function") {
          this.overWriteMethods(key, proxyXHR)
          continue;
      }
      this.overWriteAttributes(key, proxyXHR)
    }
  }

  // 重写方法
  overWriteMethods(key, proxyXHR) {
    let beforeHooks = this.beforeHooks
    let afterHooks = this.afterHooks
    proxyXHR[key] = (...args) => {
      if(beforeHooks[key]) {
        const res = beforeHooks[key].apply(proxyXHR, args)
        if(res === false) {
          return
        }
      }
      const res = beforeHooks[key].apply(proxyXHR._xhr, args)

      afterHooks[key] && afterHooks[key].call(proxyXHR._xhr, res)

      return res
    }
  }

  // 重写属性
  overWriteAttributes(key, proxyXHR) {
    Object.defineProperties(proxyXHR, key, this.setPropertyDescriptor(key, proxyXHR))
  }

  setPropertyDescriptor(key, proxyXHR) {
    let obj = Object.create(null)
    let _this = this
    obj.set = function (val) {
      if(!keys.startWith('on')) {
        proxyXHR['_' + key] = val
        return 
      }

      if(_this.beforeHooks[key]) {
        this._xhr[key] = function(...args) {
          _this.beforeHooks[key].apply(proxyXHR)
          val.apply(proxyXHR, args)
        }
        return
      }

      this._xhr[key] = val;
    }
    
    obj.get = function () {
      return proxyXHR['_' + key] || this._xhr[key]
    }

    return obj
  }
}

new XhrHook({
  open: function() {
    console.log("open")
  },
  onload: function() {
    console.log("onload")
  },
  onreadystatechange: function() {
    console.log("onreadystatechange")
  },
  onerror: function() {
    console.log("onerror")
  }
})
var xhr = new XMLHttpRequest()
xhr.open('GET', 'http://www.baidu.com', true)
xhr.send()
```

### Event Bus

```js
class EventEmitter {
   constructor(maxListeners) {
      this.events = {}
      this.maxListeners = maxListeners || Infinity
   }

   emit(event, ...args) {
     const cbs = this.events[event]
     if(!cbs) {
       console.log("无此事件")
     }
     cbs.forEach(cb => cb.apply(this, args));
   }

   on(event, cb) {
      if(!this.events[event]) {
        this.events[event] = []
      }
      if(this.maxListeners !== Infinity && this.events[event].length >= this.maxListeners) {
        console.log("长度过长")
        return this
      }
      this.events[event].push(cb)
      return this
   }

   once(event, cb) {
     const func = (...args) => {
       this.off(event, func)
       cb.apply(this, args)
     }
     this.on(event, func)
     return this
   }

   off(event, cb) {
     if(!cb) {
       this.events[event] = null
     } else {
       this.events[event] = this.events[event].filter((item) => item !== cb)
     }

     return this
   }
}
```

### 图片懒加载

```js
function lazyLoad() {
  const images = document.getElementByTagName('img')
  const len = images.length
  // 视口高度
  const viewHeight = document.body.clientHeight
  // 滚动条高度
  const scrollHeight = document.body.scrollTop
  for (let i = 0; i < len; i++) {
    const offsetHeight = images[i].offsetTop
    if (offsetHeight < viewHeight + scrollHeight) {
      const src = images[i].dataSet.src
      images[i].src = src
    }
  }
}
window.addEventListener("scroll", lazyLoad)
```

### 滚动加载

```js
window.addEventListener('scroll', () => {
  const clientHeight = document.body.clientHeight
  const scrollTop = document.body.scrollTop
  const scrollHeight = document.body.scrollHeight
  if(clientHeight + scrollTop >= scrollHeight) {
    // do someThing
  }
}, false)
```

### 大数据的渲染

```js
setTimeout(() => {
  const total = 10000
  const once = 20
  const loopCount = Math.ceil(total / once)
  let countOfRender = 0
  const ul = document.createElement("ul")
  document.body.appendChild(ul)
  function add() {
    const fragment = document.createDocumentFragment()
    for (let i = 0; i < once; i++) {
      const li = document.createElement("li")
      li.innerText = "123123"
      fragment.appendChild(li)
    }
    ul.appendChild(fragment)
    countOfRender++
    loop()
  }
  function loop() {
    if(countOfRender < loopCount) {
      window.requestAnimationFrame(add)
    } else {
      console.log('end')
      console.log(new Date().valueOf())
    }
  }
  console.log('start')
  console.log(new Date().valueOf())
  loop()
}, 0);
```

### 打印当前页面有多少元素

```js
function fn() {
  return [...new Set([...document.querySelectorAll("*")].map(el => el.tagName))].length
}
```

### 下划线与驼峰互相转换

> 下划线转驼峰

```js
function toHump(name) {
  return name.replace(/\_(\w)/g, function(all, letter) {
    return letter.toUpperCase()
  })
}
```

> 驼峰转下划线

```js
function toLine(name) {
  return name.replace(/([A-Z])/g, "_$1").toLowerCase()
}
```

### 判断是否支持webp

```js
function checkSupportWebp() {
  const isSupportWebp = 0 == document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp')
}
```

## 函数式编程

### 柯里化

指的是将一个接受多个参数的函数变为接收一个参数返回一个函数的固定形式，这样便于二次调用。如f(1)(2).

```js
function add() {
  const args = [...arguments]
  function fn() {
    args.push(...arguments)
    return fn
  }
  fn.toString = function() {
    return args.reduce((a, b) => a + b)
  }
  return fn
}
```

### 函数组合

函数组合就是将多次函数调用组合为单次的调用

```js
// 简易版
function compose(...args) {
  return args.reduce((a, b) => (...args) => a(b(args)))
}
```

### koa函数组合

```js
function compose(middlewares) {
  return function (ctx) {
    return dispatch(0)
    function dispatch(i) {
      let fn = middlewares[i]
      if (!fn) {
        return Promise.resolve()
      }
      return Promise.resolve(
        fn(ctx, function next() {
          return dispatch(i + 1)
        })
      )
    }
  }
}
```

## Promise

### promiseAll

```js
function PromiseAll(arr) {
  return new Promise((resolve, reject) => {
    if(Array.isArray(arr)) {
      return reject(new Error("需要传入数组"))
    }
    const res = []
    const length = arr.length
    let counter = 0
    for(let i = 0; i < length; i++) {
      Promise.resolve(arr[i]).then(value => {
        counter++
        res[i] = value
        if(counter == length) {
          resolve(res);
        }
      }).catch(res => {
        reject(res)
      })
    }
  })
}
```

### promise.race

```js
function PromiseRace(arr) {
  return new Promise((resolve, reject) => {
    arr.forEach(item => {
      Promise.resolve(item).then(res => resolve(res)).catch(e => reject(e))
    })
  })
}
```

### promise-limit

并发控制

```js
const limitLoad = function(urls, handler, limit) {
  const sequence = [].concat(urls)
  let promises = []

  promises = sequence.splice(0, limit).map((url, index) => {
    let count = 0
    return handler(url).then(() => {
      return index
    }).catch(() => {
      if(count == 3) return index
      count++
      return handler(url).then(() => {
        return index
      })
    })
  })

  let p = Promise.race(promises)
  for(let i = 0; i < sequence.length; i++) {
    p = p.then((res) => {
      promises[res] = handler(sequence[i]).then(() => {
        return res
      })
      return Promise.race(promises)
    })
  }
}
```

## 发布订阅

```js
class PubSub {
  constructor() {
    this.handlers = {}
  }

  addEventListener(type, fn) {
    if (!(type in this.handlers)) {
      this.handlers[type] = [] 
    }
    this.handlers[type].push(fn)
  }

  dispatch(type, ...parmas) {
    if (!(type in this.handlers)) {
      return new Error('no such event')
    }
    this.handlers.forEach(fn => {
      fn(...parmas)
    })
  }

  removeListener(type, fn) {
    if (!(type in this.handlers)) {
      return new Error('no such event')
    }
    if (!fn) {
      delete this.handlers[type]
    } else {
      const index = this.handlers[type].findIndex(item => fn === item)
      if (!index) {
        return new Error('no such event')
      }
      this.handlers[type].splice(index, 1)
      if (this.handler[type].length === 0) {
        delete this.handlers[type]
      }
    }
  }
}
```

## LRU

```js
class LRUCache {
  constructor(capacity) {
    this.size = capacity;
    this.cache = new Map();
  }
  put(key, value) {
    if (this.cache.includes(key)){
      this.cache.delete(key)
      this.cache.set(key, value)
      return;
    }
    if (this.cache.size >= this.size) {
      const firstKey = this.data.keys().next().value;
      this.cache.delete(firstKey)
    }
    this.cache.set(key, value)
  }
  get(key) {
    if (!this.cache.has(key)){
      return false;
    }
    const data = this.cache.get(key);
    this.cache.delete(key); // 移除数据
    this.cache.set(key, data);
    return data;
  }
}
```

## 并发控制算法

```js
async asyncPool(poolLimit, array, iteratorFn) {
  const tasks = []; // 存储所有的异步任务
  const executing = []; // 存储正在执行的异步任务
  for (const item of array) {
    const p = Promise.resolve().then(() => iteratorFn(item, array)); // 调用iteratorFn函数创建异步任务
    tasks.push(p); // 保存新的异步任务

    // 当poolLimit值小于或等于总任务个数时，进行并发控制，否则先填满任务队列
    if (poolLimit <= array.length) {
      // 当任务完成后，从正在执行的任务数组中移除已完成的任务
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e); // 保存正在执行的异步任务
      if (executing.length >= poolLimit) {
        await Promise.race(executing); // 等待较快的任务执行完成
      }
    }
  }
  return Promise.all(tasks);
}
```

## Event Bus

```js
class EventBus {
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = []
    }
    this.events[eventName].push(callback);
  }

  off(eventName, callback) {
    if (this.events[eventName]) {
      const index = this.events[eventName].indexOf(callback);
      if (index !== -1) {
        this.events[eventName].splice(index, 1);
      }
    }
  }

  emit(eventName, ...args){
    if (this.events[eventName]) {
      this.events[eventName].forEach(callback => {
        callback(...args);
      })
    }
  }
}
```