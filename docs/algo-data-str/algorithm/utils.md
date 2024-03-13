# 常用的算法

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
