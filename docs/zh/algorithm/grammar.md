# 提高效率的语法

## 尾递归调用

函数调用会在内存形成一个"调用记录"，又称"调用帧"（call frame），保存调用位置和内部变量等信息。

![img](https://gitee.com/PENG_YUE/myImg/raw/master/uPic/svPCPR.png)

在递归中，如果尾调用自身，就称为尾递归。递归非常消耗内存，因为需要同时保存成千上百个调用记录，很容易发生"栈溢出"错误（stack overflow）。对于尾递归来说，由于只存在一个调用记录，所以永远不会发生"栈溢出"错误。

```js
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}
```

上面代码是一个阶乘函数，计算n的阶乘，最多需要保存n个调用记录，复杂度 O(n) 。
如果改写成尾递归，只保留一个调用记录，复杂度 O(1) 。

```js
function factorial(n, total) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}
```

## 运算符技巧

### 交换两个数

```javascript
// 常规
int tmp = x;
x = y;
y = tmp;

// 位运算
x = x ^ y   // （1）
y = x ^ y   // （2）
x = x ^ y   // （3）
```

### 判断奇偶数

```javascript
// 普通判断
if(n % 2 == 1) {
 // n 是个奇数。
}
// 位运算
if(n & 1 == 1){
  // n 是个奇数。
}
```

### ^= 异或

二进制对比，在两次对比以后会是原来的值

4 ^= 5

```javascript
100 //4
101 //5
001 //异或后得到
```

#### 示例：[只出现一次的数字](https://leetcode-cn.com/problems/single-number/)

``` javascript
let ans = 0
 for (const num of nums) {  
  ans ^= num;
 }
 return ans
```

### 移位>>和>>>

`>>>` 是无符号的
`>>` 是有符号的

#### 示例

通过寻找二分的中间点

```javascript
const mid = (start + end) >> 1
```

## 智力题

### 一个三升的水桶和一个五升的水桶如何得到4升水

倒两次得到1升水，然后倒空五升水，将一升水倒入五升水，再把三升水倒入五升水的桶子里，得到四升水。
