# 源码实现

## 数组 API

### 数组去重

- re利用 set

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
function reduce(array, reducer, initialValue) {
  let accumulator = initialValue;

  for (let i = 0; i < array.length; i++) {
    accumulator = reducer(accumulator, array[i], i, array);
  }

  return accumulator;
}
```

### filter 的实现

```js
function filter(arr, callback) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (callback(array[i], i, array)) {
      result.push(array[i]);
    }
  }
  return result;
}
```

### map 的实现

```js
function map(arr, callback) {
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    const item = callback(arr[i], i, arr); 
    res.push(item)
  }
  return res
}
```

### find 的实现

```js
function map(arr, callback) {
  let curVal;
  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[i])) {
      curVal = arr[i];
      break;
    }
  }
  return curVal;
}
```

### some 的实现

```js
function some(arr, callback) {
  let result = false;
  for (let i = 0; i < arr.length; i++) {
    result = callback && callback[this[i]];
  }
  return result;
}
```

### every的实现

```js
function every(array, callback) {
  let result = true;
  for (let i = 0; i < array.length; i++) {
    if(!callback(array[i])) {
      result = false;
      break;
    }
  }

  return result;
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

## 对象 API

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

## 常用 API

### 类型判断函数

```js
function getType(data) {
  let type = typeof data
  if (type !== 'object') {
    return type
  }
  const objType = Object.prototype.toString.call(data)
  return objType.toLowerCase()
}
```

### 实现 ParseInt

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