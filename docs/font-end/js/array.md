# 数组操作

## 遍历操作

### `for of` 循环

可以使用 `break` 随时停止循环

```js
const colors = ['blue', 'green', 'white'];

for (const color of colors) {
  console.log(color);
}
// 'blue'
// 'green'
// 'white'
```

### `for` 循环

可以使用 `break` 随时停止循环,需要维护 `index` 指针

```js
const colors = ['blue', 'green', 'white'];

for (let index = 0; index < colors.length; index++) {
  const color = colors[index];
  console.log(color);
}
// 'blue'
// 'green'
// 'white'

```

### Array.forEach

`array.forEach(callback)` 方法通过在每个数组项上调用 `callback` 函数来遍历数组项。
在每次遍历中，都使用以下参数调用 `callback(item [, index [, array]])`：当前遍历项，当前遍历索引和数组本身。

```js
const colors = ['blue', 'green', 'white'];
colors.forEach((e, index) => {
 console.log(e,index)
})
```

## 数组的映射

### Array.map

`array.map(callback)` 方法通过方法通过在每个数组项上使用 `callback` 调用结果来创建一个新数组。在每个遍历中的 `callback(item[, index[, array]])` 使用参数调用:当前项、索引和数组本身，并应该返回新项。

- `array.map` 创建一个新的映射数组，而不改变原始数组。

```js
const numbers = [0, 2, 4];

const newNumbers = numbers.map(function increment(number) {
  return number + 1;
});

newNumbers; // => [1, 3, 5]

```

### Array.from

`Array.from(arrayLike[, callback])` 方法通过在每个数组项上使用 `callback` 调用结果来创建一个新数组。

在每个遍历中 `callback(item[, index[, array]])` 使用参数调用: 当前项、索引和数组本身并且应该返回新项。

- `Array.from()` 创建一个新的映射数组，而不改变原始数组。
- `Array.from()` 更适合从类似数组的对象进行映射。

```js
const numbers = [0, 2, 4];

const newNumbers = Array.from(numbers,
  function increment(number) {
    return number + 1;
  }
);

newNumbers; // => [1, 3, 5]
```

## 数据的简化

### Array.reduce

`array.reduce(callback[, initialValue])` 通过调用 `callback` 函数来将数组简化为一个值。

在每次遍历中的 `callback(accumulator, item[, index[, array]])` 使用用参数调用的: 累加器，当前项，索引和数组本身且应该返回累加器。

对数字数组求和:

```js
const numbers = [2, 0, 4];

function summarize(accumulator, number) {
  return accumulator + number;
}

const sum = numbers.reduce(summarize, 0);

sum; // => 6
```

## 数据的连接

### Array.concat

`array.concat(array1[, array2, ...])` 将一个或多个数组连接到原始数组。如下所示，连接两个数组：

- `concat` 创建一个新数组，不改变原来的数组，
- `array.concat(array1 [，array2，...])` 接受多个要连接的数组。

```js
const heroes = ['a', 'b'];
const villains = ['c', 'd'];

const everyone = heroes.concat(villains);

everyone // ["a", "b", "c", "d"]
```

### 展开操作符号

咱们将展开操作符与数组字面量一起使用来连接数组：`[...array1, ...array2]`

```js
const heroes = ['a', 'b'];
const villains = ['c', 'd'];

const names = [...heroes, ...villains];

everyone // ["a", "b", "c", "d"]
```

## 获取数组的片段

### Array.slice

`array.slice` 创建一个新数组，不改变原来的数组

`array.slice([fromIndex [，toIndex]])` 返回数组的一个片段，该片段从 `fromIndex`, 开始，以 `toIndex` 结尾（不包括 `toIndex` 本身）。`fromIndex`可选参数默认为0，`toIndex` 可选参数默认为 `array.length`。

```js
const names = ["a", "b", "c", "d"]

const heroes = names.slice(0, 2)
const villains = names.slice(2)

heroes // ["a", "b"]
villains // ["c", "d"]
```

### Array.splice

该方法向或者从数组中添加或者删除项目，返回被删除的项目。

`splice（index,howmany,item1,...itemX)`

- index 参数：必须，整数，规定添加或者删除的位置，使用负数，从数组尾部规定位置。
- howmany 参数：必须，要删除的数量，如果为 0，则不删除项目。
- item1,...itemX 参数：可选，向数组添加的新项目。

> 删除指定位置元素

```js
var arr = [1,2,3,4,5];
arr.splice(1)
```

## 查找数组

### Array.includes

`array.includes(itemToSearch [，fromIndex])` 返回一个布尔值，`array` 是否包含 `itemToSearch`。 可选参数 `fromIndex`，默认为0，表示开始搜索的索引。

```js
const numbers = [1, 2, 3, 4, 5];

numbers.includes(2);  // => true
numbers.includes(99); // => false
```

### Array.find

如下所示，找到数组中的第一个偶数：

```js
const numbers = [1, 2, 3, 4, 5];

function isEven(number) {
  return number % 2 === 0;
}
const evenNumber = numbers.find(isEven);

evenNumber; // => 2

```

### Array.indexOf

`array.indexOf(itemToSearch[, fromIndex])` 返回 `array` 中第一个出现的 `itemToSearch` 的索引。默认为0的可选参数`fromIndex`表示开始搜索的索引。

如果找不到该项，则返回`-1`

## 查询数组

### Array.every

如果每个项都通过 `predicate` 检查,则 `array.every(predicate)` 返回 `true`。

在每个遍历 `predicate(item[, index[, array]])` 上，用参数调用 `predicate` 函数:当前遍历项、索引和数组本身。

如下所示，确定数组是否只包含偶数：

```js
const evens = [0, 2, 4, 6];
const numbers = [0, 1, 4, 6];

function isEven(number) {
  return number % 2 === 0;
}

evens.every(isEven); // => true
numbers.every(isEven); // => false
```

### Array.some

如果有一项通过 `predicate` 检查,则 `array.every(predicate)` 返回 `true`。

在每个遍历 `predicate(item[, index[, array]])` 上，用参数调用 `predicate` 函数:当前遍历项、索引和数组本身。

如下所示，确定数组是否只包含一个偶数：

```js
const evens = [1, 3, 3, 3];
const numbers = [1, 5, 7, 10];

function isEven(number) {
  return number % 2 === 0;
}

evens.some(isEven); // => false
numbers.some(isEven); // => true
```

## 数组的过滤

### Array.filter

`array.filter(predicate)` 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。
在每个遍历 `predicate(item[, index[, array]])` 上，用参数调用 `predicate` 函数:当前遍历项、索引和数组本身。

- `array.filter()` 创建一个新数组，而不改变原始数组。

```js
const numbers = [1, 5, 7, 10];

function isEven(number) {
  return number % 2 === 0;
}

const evens = numbers.filter(isEven);

evens; // => [10]
```

## 数组的插入

### Array.push

方法将一个或多个项追加到数组的末尾，并返回新的长度

- `array.push()` 会改变原数组
- `array.push(item1, item2, ..., itemN)` 可以添加多个元素。

### Array.unshift

方法将一个或多个项追加到数组的开头，并返回新的长度

- `array.unshift()` 会改变原数组
- `array.unshift(item1, item2, ..., itemN)` 可以添加多个元素。

### 展开操作符

```js
const a = ['a', 'b']
const b = ['c']
const c = [
  ...b,
  ...a
]
```

## 删除数组元素

### Array.pop

`array.pop()`方法从数组中删除最后一个元素，然后返回该元素。如下所示，删除`colors`数组的最后一个元素：

- `array.pop()`会改变原数组

### Array.shift

`array.shift()`方法从数组中删除第一个元素，然后返回该元素

- array.shift() 会改变原数组。
- array.shift() 具有O(n)复杂度。

### Array.splice

`array.splice(fromIndex[, removeCount[, item1[, item2[, ...]]]])`从数组中删除元素，并插入新的元素。

- array.splice() 会改变原数组

```js
// 从索引1处删除2个元素
const names = ['张三', '李四', '王五', '赵六']

names.splice(1, 2)

names // => ["张三", "赵六"]
```

### 利用展开操作符号

``` js
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

### Array.length

`array.length = 0` 删除数组中的所有项目：

### Array.splice

`array.splice(fromIndex[, removeCount[, item1[, item2[, ...]]]])`从数组中删除元素，并插入新的元素。

如果`removeCount`参数被省略，那么`array.splice()`将删除从`fromIndex`开始的数组的所有元素。咱们使用它来删除数组中的所有元素：

``` js
const colors = ['blue', 'green', 'black'];

colors.splice(0);

colors; // []
```

## 填充数组

### Array.fill

`array.fill(value[, fromIndex[, toIndex]])` 用从 `fromIndex` 到 `toIndex` 的值填充数组(不包括 `toIndex` 本身)。`fromIndex` 可选参数默认为0,`toIndex` 可选参数默认为 `array.length`。

- `array.fill()` 会改变原数组。

```js
const numbers = [1, 2, 3, 4];

numbers.fill(0);

numbers; // => [0, 0, 0, 0]

```

### Array.from

`Array.from()` 有助于初始化带有对象的特定长度的数组：

```js
const length = 4;
const emptyObjects = Array.from(Array(length), function() {
  return {};
});

emptyObjects; // [{}, {}, {}, {}]
```

## 数组的扁平化

### Array.flat

`array.flat([depth])` 方法通过递归扁平属于数组的项直到一定深度来创建新数组。 `depth`可选参数默认为1：

```js
const arrays = [0, [1, 3, 5], [2, 4, 6]];

const flatArray = arrays.flat();

flatArray; // [0, 1, 3, 5, 2, 4, 6]

```

- `array.flat()`创建一个新数组，而不会改变原始数组。

## 数组的排序

### `array.sort()`

`array.sort([compare])` 方法对数组的元素进行排序。

可选参数 `compare(a, b)` 是一个自定义排序顺的回调函数。如果比较 `compare(a, b)` 返回的结果

- 如果 `a` 小于 `b`，在排序后的数组中 `a` 应该出现在 `b` 之前，就返回一个小于0的值。
- 如果 `a` 等于 `b`，就返回 `0`。
- 如果 `a` 大于 `b`，就返回一个大于 `0` 的值。
- `array.sort()` 会改变原数组。

内部原理

对于 `JS` 来说，数组长度大于 `10` 会采用快排，否则使用插入排序。选择插入排序是因为虽然时间复杂度很差，但是在数据量很小的情况下和 `O(N * logN)` 相差无几，然而插入排序需要的常数时间很小，所以相对别的排序来说更快。

## 数组去重

```js
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
