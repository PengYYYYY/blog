# 算法思想

## 递归

所有的递归问题都可以用递推公式来表示

### 递归需要满足的三个条件

- 一个问题的解可以分解为几个子问题的解

- 这个问题与分解之后的子问题，除了数据规模不同，求解思路完全一样

- 存在递归终止条件

### 递归框架

```js
const recursive = (level, x) => {
  // 结束条件
  if (endCondition) {
    return
  }

  // 当前层逻辑
  curLevelProcess()

  // 下一层逻辑
  recursive(level + 1)
}

```

## 贪心算法

取最大值，经典题目买卖股票的最佳时机

```js
// 终点代码
let max = 0

max = Math.max(prev, cur)
```

## 双指针法

前后双指针，有时也叫快慢指针，通常可实现O(n)级别的时间复杂度。用处很多，不做示例

## 归并

归并排序，自下而上，经典题归并排序

## 分治

大问题化解为小问题

## 滑动窗口

用于寻找字符串中的某些特性的子字符串

经典题目

```js
function lengthOfLongestSubstring(s) {
  let rk = -1
  const n = s.length
  for(let i = 0; i < n; i++) {
    while(rk + 1 < n && condition()) {
      // 不断地移动右指针
      ++rk;
    }
  }
}
```

## 回溯

可以理解为回归树

```js
let res = []
function backtrack(path, condition, ...) {
  if (judge(condition)) { //满足条件
    res.push(path)
    return
  }
  for (let select of selectList) {
    if(condition) break;
    path.push(select);  // 走某条路
    backtrack(path, newSelectList);
    path.pop(); //返回上一个十字路口
  }
}
```

## 哈希缓存

利用额外空间，空间换时间，将O(n^2)转换为O(n)。示例题目

### 示例：[两数之和](https://leetcode-cn.com/problems/two-sum/)

``` javascript
var twoSum = function(nums, target) {
 const temp = {}
 for (var i = 0; i < nums.length; i++) {
  var diff = target - nums[i];
  if (temp[diff] != undefined) {
   return [temp[diff], i]
  }
  temp[nums[i]] = i
 }
};
```

### 示例：[公平的糖果交换](https://leetcode-cn.com/problems/fair-candy-swap/description/)

``` javascript
var fairCandySwap = function(A, B) {
 let sumA = 0
 let sumB = 0
 for (const item of A) {
  sumA += item
 }
 const set = new Set()
 for (const item of B) {
  sumB += item
  set.add(item)
 }
 const target = sumA - sumB
 for (const j of A) {
  const myMap = j - target/2
  if(set.has(myMap)){
   return [j, myMap]
  }
 }
};
```
