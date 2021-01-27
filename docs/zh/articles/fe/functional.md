# 函数式编程

函数式编程是编程范式

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
