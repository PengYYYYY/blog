# 场景实现

## 实现链式调用

实现一个链式调用的类，满足以下需求

```js
new Task("初始化");
// ...初始化
```

```js
new Task("初始化").log('日志一').sleep(3000).log('日志二').sleep(2000).log('日志三');
// ...初始化
// 日志一
// wait 3000ms
// 日志二
// wait 2000ms
// 日志三
```

```js
new Task("初始化").firstSleep(3000).log('日志一').sleep(3000).log('日志二').sleep(2000).log('日志三');
// wait 3000ms
// ...初始化
// 日志一
// wait 3000ms
// 日志二
// wait 2000ms
// 日志三
```

```js
class Task {
  constructor(name) {
    this.list = [];

    const fn = () => {
      console.log('init', name);
      this.next()
    }

    this.list.push(fn);

    setTimeout(() => {
      this.next();
    }, [])
  }

  log(parmas) {
    this.list.push(() => {
      console.log(parmas);
      this.next();
    })
    return this;
  }

  sleep(n) {
    const fn = () => {
      setTimeout(() => {
        this.next();
      }, n)
    }
    this.list.push(fn);
    return this;
  }
  
  firstSleep(n) {
    const fn = () => {
      setTimeout(() => {
        this.next();
      }, n)
    }
    this.list.unshift(fn);
    return this;
  }

  next() {
    const fn = this.list.shift();
    fn && fn();
  }
}

const task = new Task("初始化");

task.firstSleep(3000).log('日志一').sleep(3000).log('日志二').sleep(2000).log('日志三');
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
      const firstKey = this.cache.keys().next().value;
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

  emit(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(callback => {
        callback(...args);
      })
    }
  }
}
```

## 防抖节流

### 防抖

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

### 节流

节流的概念是设定一个周期，周期内只执行一次，若有新的事件触发则不执行，周期结束后又有新的事件触发开始新的周期。

> 首节流

```js
function throttle(func, ms) {
  let last = 0
  return function() {
    let now = Date.now()
    if (now - last >= ms) {
      last = now
      func.apply(this, arguments)
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

## 解决 0.2 + 0.1 !== 0.3 的问题

```js
parseFloat(0.1 + 0.2).toFixed(10) == 0.3
```

## 请求相关

### 实现 JSONP

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


## 图片懒加载

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

## 滚动加载

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

## 大数据的渲染

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

## 打印当前页面有多少元素

```js
function fn() {
  return [...new Set([...document.querySelectorAll("*")].map(el => el.tagName))].length
}
```

## 下划线与驼峰互相转换

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

## 判断是否支持webp

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

### Koa 函数组合

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

### promise.all

```js
function PromiseAll(arr) {
  return new Promise((resolve, reject) => {
    if (！Array.isArray(arr)) {
      return reject(new Error("需要传入数组"))
    }
    const res = []
    const length = arr.length
    let counter = 0
    for (let i = 0; i < length; i++) {
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
