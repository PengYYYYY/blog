# 数组操作

## 遍历操作

### `for of`循环

可以使用break随时停止循环

```JavaScript
const colors = ['blue', 'green', 'white'];

for (const color of colors) {
  console.log(color);
}
// 'blue'
// 'green'
// 'white'
```

### `for`循环

可以使用break随时停止循环,需要维护`index`指针

```JavaScript
const colors = ['blue', 'green', 'white'];

for (let index = 0; index < colors.length; index++) {
  const color = colors[index];
  console.log(color);
}
// 'blue'
// 'green'
// 'white'

```

### `array.forEach()` 方法

`array.forEach(callback)`方法通过在每个数组项上调用`callback`函数来遍历数组项。
在每次遍历中，都使用以下参数调用`callback(item [, index [, array]])`：当前遍历项，当前遍历索引和数组本身。

```JavaScript
const colors = ['blue', 'green', 'white'];
colors.forEach((e, index) => {
 console.log(e,index)
})
```

## 数组的映射

### Array.map

`array.map(callback)`方法通过方法通过在每个数组项上使用`callback`调用结果来创建一个新数组。在每个遍历中的`callback(item[, index[, array]])`使用参数调用:当前项、索引和数组本身，并应该返回新项。

- `array.map`创建一个新的映射数组，而不改变原始数组。

```JavaScript
const numbers = [0, 2, 4];

const newNumbers = numbers.map(function increment(number) {
  return number + 1;
});

newNumbers; // => [1, 3, 5]

```

### Array.from

`Array.from(arrayLike[, callback])`方法通过在每个数组项上使用`callback`调用结果来创建一个新数组。

在每个遍历中`callback(item[, index[, array]])`使用参数调用:当前项、索引和数组本身并且应该返回新项。

- `Array.from()`创建一个新的映射数组，而不改变原始数组。
- `Array.from()`更适合从类似数组的对象进行映射。

```JavaScript
const numbers = [0, 2, 4];

const newNumbers = Array.from(numbers,
  function increment(number) {
    return number + 1;
  }
);

newNumbers; // => [1, 3, 5]
```

## 数据的简化

### `Array.reduce()` 方法

`array.reduce(callback[, initialValue])`通过调用`callback`函数来将数组简化为一个值。

在每次遍历中的`callback(accumulator, item[, index[, array]])`使用用参数调用的:累加器，当前项，索引和数组本身且应该返回累加器。

对数字数组求和：

```JavaScript
const numbers = [2, 0, 4];

function summarize(accumulator, number) {
  return accumulator + number;
}

const sum = numbers.reduce(summarize, 0);

sum; // => 6
```

## 数据的连接

### `array.concat()` 方法

`array.concat(array1[, array2, ...])`将一个或多个数组连接到原始数组。如下所示，连接两个数组：

- `concat`创建一个新数组，不改变原来的数组，
- `array.concat(array1 [，array2，...])`接受多个要连接的数组。

```JavaScript
const heroes = ['a', 'b'];
const villains = ['c', 'd'];

const everyone = heroes.concat(villains);

everyone // ["a", "b", "c", "d"]
```

### 展开操作符号

咱们将展开操作符与数组字面量一起使用来连接数组：`[...array1, ...array2]`

```JavaScript
const heroes = ['a', 'b'];
const villains = ['c', 'd'];

const names = [...heroes, ...villains];

everyone // ["a", "b", "c", "d"]
```

## 获取数组的片段

### `array.slice()`

`array.slice`创建一个新数组，不改变原来的数组

`array.slice([fromIndex [，toIndex]])`返回数组的一个片段，该片段从`fromIndex`,开始，以`toIndex`结尾（不包括`toIndex`本身）。`fromIndex`可选参数默认为0，`toIndex`可选参数默认为`array.length`。

```javascript
const names = ["a", "b", "c", "d"]

const heroes = names.slice(0, 2)
const villains = names.splice(2)

heroes // ["a", "b"]
villains // ["c", "d"]
```

## 数组的拷贝

### 浅拷贝

- `[...array]` 创建一个浅拷贝

- `[].concat(array)`创建一个浅拷贝

- `array.slice()` 创建一个浅拷贝

### 深拷贝

- 巧用JSON.parse(JSON.stringify(Obj))
- 使用递归的方式实现深拷贝

```javascript
var arr =[{name:'yf',students:{name:'zs',age:10,course:{name:'english'}}}]
var deepCopy = function(o) {
    if (o instanceof Array) {
        var n = [];
        for (var i = 0; i < o.length; ++i) {
            n[i] = deepCopy(o[i]);
        }
        return n;

    } else if (o instanceof Object) {
        var n = {}
        for (var i in o) {
            n[i] = deepCopy(o[i]);
        }
        return n;
    } else {
        return o;
    }
}
var cloneArr = deepCopy(arr);
cloneArr[0].students.course.name ='aaaaaaaaaaaa';
```

instance 原理

```javascript
function instance_of(L, R) {//L 表示左表达式，R 表示右表达式
 var O = R.prototype;// 取 R 的显示原型
 L = L.__proto__;// 取 L 的隐式原型
 while (true) {
   if (L === null)  //表示已经取到了原型链的最顶端
     return false;
   if (O === L)// 这里重点：当 O 严格等于 L 时，返回 true
     return true;
   L = L.__proto__;
 }
}

```

[] instanceof Object比较过程

``` javascript
//而上面说的 [] instanceof Object 返回结果为true
var arr = [1,2,3];
arr instanceof Object
//首先取出arr.__proto__ = Array.prototype,
arr.__proto__ === Object.prototype //第一轮比较返回false
arr.__proto__.__proto__ === Object.prototype //第二轮比较返回true
// 等于
Array.prototype.__proto__ === Object.prototype //返回true
```

## 查找数组

### array.includes()

`array.includes(itemToSearch [，fromIndex])`返回一个布尔值，`array` 是否包含`itemToSearch`。 可选参数`fromIndex`，默认为0，表示开始搜索的索引。

```javascript
const numbers = [1, 2, 3, 4, 5];

numbers.includes(2);  // => true
numbers.includes(99); // => false
```

#### array.find()

如下所示，找到数组中的第一个偶数：

```javascript
const numbers = [1, 2, 3, 4, 5];

function isEven(number) {
  return number % 2 === 0;
}
const evenNumber = numbers.find(isEven);

evenNumber; // => 2

```

### array.indexOf()

`array.indexOf(itemToSearch[, fromIndex])` 返回`array`中第一个出现的`itemToSearch`的索引。默认为0的可选参数`fromIndex`表示开始搜索的索引。

如果找不到该项，则返回`-1`

## 查询数组

### `array.every()` 方法

如果每个项都通过`predicate`检查,则`array.every(predicate)`返回`true`。

在每个遍历`predicate(item[, index[, array]])`上，用参数调用`predicate`函数:当前遍历项、索引和数组本身。

如下所示，确定数组是否只包含偶数：

```javascript
const evens = [0, 2, 4, 6];
const numbers = [0, 1, 4, 6];

function isEven(number) {
  return number % 2 === 0;
}

evens.every(isEven); // => true
numbers.every(isEven); // => false
```

### `array.some()` 方法

如果有一项通过`predicate`检查,则`array.every(predicate)`返回`true`。

在每个遍历`predicate(item[, index[, array]])`上，用参数调用`predicate`函数:当前遍历项、索引和数组本身。

如下所示，确定数组是否只包含一个偶数：

```javascript
const evens = [1, 3, 3, 3];
const numbers = [1, 5, 7, 10];

function isEven(number) {
  return number % 2 === 0;
}

evens.some(isEven); // => false
numbers.some(isEven); // => true
```

## 数组的过滤

### `array.filter()`方法

`array.filter(predicate)`方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。
在每个遍历`predicate(item[, index[, array]])`上，用参数调用`predicate` 函数:当前遍历项、索引和数组本身。

- `array.filter()` 创建一个新数组，而不改变原始数组。

```javascript
const numbers = [1, 5, 7, 10];

function isEven(number) {
  return number % 2 === 0;
}

const evens = numbers.filter(isEven);

evens; // => [10]

```

## 数组的插入

### array.push()

方法将一个或多个项追加到数组的末尾，并返回新的长度

- `array.push()` 会改变原数组
- `array.push(item1, item2, ..., itemN)` 可以添加多个元素。

### array.unshift()

方法将一个或多个项追加到数组的开头，并返回新的长度

- `array.unshift()` 会改变原数组
- `array.unshift(item1, item2, ..., itemN)` 可以添加多个元素。

### 展开操作符

```javascript
const a = ['a', 'b']
const b = ['c']
const c = [
  ...b,
  ...a
]
```

## 删除数组元素

### array.pop()

`array.pop()`方法从数组中删除最后一个元素，然后返回该元素。如下所示，删除`colors`数组的最后一个元素：

- `array.pop()`会改变原数组

### array.shift()

`array.shift()`方法从数组中删除第一个元素，然后返回该元素

- array.shift() 会改变原数组。
- array.shift() 具有O(n)复杂度。

### array.splice()

`array.splice(fromIndex[, removeCount[, item1[, item2[, ...]]]])`从数组中删除元素，并插入新的元素。

- array.splice() 会改变原数组

```javascript
// 从索引1处删除2个元素
const names = ['张三', '李四', '王五', '赵六']

names.splice(1, 2)

names // => ["张三", "赵六"]
```

### 利用展开操作符号

``` javascript
const names = ['张三', '李四', '王五', '赵六']
const fromIndex = 1
const removeCount = 2

const newNames = [
   ...names.slice(0, fromIndex),
   ...names.slice(fromIndex + removeCount)
]

newNames // ["张三", "赵六"]

```

## 清空数组

### array.length

array.length = 0删除数组中的所有项目：

### 利用array.splice()

`array.splice(fromIndex[, removeCount[, item1[, item2[, ...]]]])`从数组中删除元素，并插入新的元素。

如果`removeCount`参数被省略，那么`array.splice()`将删除从`fromIndex`开始的数组的所有元素。咱们使用它来删除数组中的所有元素：

``` javascript
const colors = ['blue', 'green', 'black'];

colors.splice(0);

colors; // []
```

## 填充数组

### `array.fill()`

`array.fill(value[, fromIndex[, toIndex]])`用从`fromIndex` 到`toIndex`的值填充数组(不包括`toIndex`本身)。`fromIndex`可选参数默认为0,`toIndex`可选参数默认为`array.length`。

- `array.fill()`会改变原数组。

```javascript
const numbers = [1, 2, 3, 4];

numbers.fill(0);

numbers; // => [0, 0, 0, 0]

```

### `Array.from()`

`Array.from()`有助于初始化带有对象的特定长度的数组：

```javascript
const length = 4;
const emptyObjects = Array.from(Array(length), function() {
  return {};
});

emptyObjects; // [{}, {}, {}, {}]
```

## 数组的扁平化

### `array.flat()`

`array.flat([depth])`方法通过递归扁平属于数组的项直到一定深度来创建新数组。 `depth`可选参数默认为1：

```javascript
const arrays = [0, [1, 3, 5], [2, 4, 6]];

const flatArray = arrays.flat();

flatArray; // [0, 1, 3, 5, 2, 4, 6]

```

- `array.flat()`创建一个新数组，而不会改变原始数组。

## 数组的排序

### `array.sort()`

`array.sort([compare])`方法对数组的元素进行排序。

可选参数`compare(a, b)`是一个自定义排序顺的回调函数。如果比较`compare(a, b)`返回的结果

- 如果`a`小于`b`，在排序后的数组中`a`应该出现在`b`之前，就返回一个小于0的值。
- 如果`a`等于`b`，就返回`0`。
- 如果`a`大于`b`，就返回一个大于`0`的值。
- `array.sort()` 会改变原数组。

内部原理

对于 JS 来说，数组长度大于 10 会采用快排，否则使用插入排序。选择插入排序是因为虽然时间复杂度很差，但是在数据 量很小的情况下和 O(N * logN) 相差无几，然而插入排序需要的常数时间很小，所以相对别的排序来说更快。

## 数组去重

```javascript
// set法
Array.from(new Set([1,2,3,3,4,4])) //[1,2,3,4]
[...new Set([1,2,3,3,4,4])] //[1,2,3,4]

// 元素法
Array.prototype.distinct = () => {
  const result = []
  for (const n of this) {
      if (result.indexOf(n) == -1) {
          map[n] = 1
          result.push(n)
      }
  }
  return result
}
[1,2,3,3,4,4].distinct(); //[1,2,3,4]
```

## 原理

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

### reduce的实现

```js
Array.prototype.myReduce = function(fn, value) {
  if (getType(fn) !== "function") {
    console.log("第一个参数需要为函数")
    return
  }
  const acc = value || 0
  const startIndex = value ? 0 : 1

  for(let i = startIndex; i < this.length; i++) {
    acc = fn(acc, this[i], i, this)
  }
  return acc
}
```

### filter实现

```js
Array.prototype.myFilter = function(fn) {
  let arr = []
  let arr1 = Array.prototype.slice.call(this, 0, this.length)
  for(let i = 0; i < this.length; i++) {
    if(fn(this[i], i, this)) {
      arr.push(arr1[i])
    }
  }
  return arr
}
```

### map实现

```js
Array.prototype.myMap = function(callback) {
  let newArr = []
  for (let i = 0; i < this.length; i++) {
    newArr.push(callback && callback[this[i]])
  }
  return newArr
}
```

### find的实现

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

### some的实现

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
