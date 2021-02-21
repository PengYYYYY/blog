# 算法思想

## 二分法

时间复杂度O(logn), 空间复杂度O(n)

### 示例：[二分搜索](https://leetcode-cn.com/problems/binary-search/description/)

``` javascript
// 递归
function binarySearch(nums, target) {
    return executiveFn(nums, 0, nums.length - 1, target)
}

function executiveFn(nums, l, r, target) {
    // 找到中间点
    const m = parseInt(l + (r - l) / 2)
    // 判断返回条件
    if (nums[m] == target) {
        return m
    }
    // 递归左边或者右边
    if (nums[m] < target) {
        return executiveFn(nums, m + 1, l, target)
    }
    if (nums[m] > target) {
        return executiveFn(nums, r, m - 1, target)
    }
}

// 双指针
var search = function(nums, target) {
    let left = 0
    let right = nums.length - 1
    let mid
    if(nums.length == 1) {
        return nums[0] == target ? 0 : -1
    }
    while(left <= right) {
        mid =  left + parseInt((right - left)/2)
        if(nums[mid] == target) {
            return mid
        }
        if(nums[mid] < target) {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
    return -1
};
```

### [搜索插入位置](https://leetcode-cn.com/problems/search-insert-position/description/)

```javascript
function searchInsert(nums, target) {
    const len = nums.length
    if (!len || target < nums[0]) {
        return 0
    } else if (target > nums[len - 1]) {
    return len
    }
    let start = 0, end = len - 1
    while (start < end) {
        const mid = (start + end) >> 1
        if (target > nums[mid]) {
            start = mid + 1
        } else {
            end = mid
        }
    }
    return start
}
```

## 归并

### 示例：[合并K个排序链表] (<https://leetcode-cn.com/problems/merge-k-sorted-lists/description/)>

```javascript
var mergeKLists = function(lists) {
    if(!lists || lists.length == 0) return null;
    let arr = [];
    let res = new ListNode(0);
    lists.forEach(list => {
        let cur = list;
        while(cur){
            arr.push(cur.val);
            cur = cur.next;
        }
    })
    let cur = res;
    // 快排
    arr.sort((a,b) => a-b).forEach(val => {
        let node = new ListNode(val);
        cur.next = node;
        cur = cur.next;
    })
    return res.next;
};
```

## 贪心算法

## 动态规划

## 双指针法

前后双指针，有时也叫快慢指针，通常可实现O(n)级别的时间复杂度。用处很多，不做示例

## 分治

## 空间换时间

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

## 数字反转

时间复杂度O(n), 空间复杂度O(1)

``` javascript
const x = 123
let absNum = Math.abs(x)
let num = 0
while (newNum) {
    num = num * 10 + absNum % 10
    newNum = Math.floor(absNum / 10)
}
```

## 数组中的位置交换

i，j两个位置的交换

``` javascript
arr[i] = arr[i] + arr[j]
arr[j] = arr[i] - arr[j]
arr[i] = arr[i] - arr[j]
```
