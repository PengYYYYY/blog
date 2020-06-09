# 提高效率的语法

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
const mid = start + ((start + end) >> 1)
```
