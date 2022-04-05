# 二分查找

二分查找（Binary Search）简单来说就是折半，步骤就是，找到中间值，然后查找左右区间，一直递归下去。
二分查找的时间复杂度是O(logn)

## 基本框架

```js
const binary = (arr) => {
  const left = 0, right = arr.length - 1
  where(left < right) {
    const mid = left + right) >> 2
    if (arr[mid] < arr[left]) {
      // condition1 
    } else if(arr[right] < arr[mid]) {
      // condition2
    } else {
      // condition3
    }
  }
  // 结束
}
```

## 局限性

- 二分查找依赖顺序表结构,二分查找针对的是有序数据
- 数据量太小不适合二分查找：直接顺序遍历即可，没有太大优势
- 数据量太大也不适合二分查找：如果查找1GB的数据，数组为了支持随机访问的特性，要求内存空间连续，对内存的要求比较苛刻。

## 实现indexOf

```js
// 非递归实现，利用指针
var search = function(nums, target) {
 let left = 0
 let right = nums.length - 1
 while(left <= right) {
  const mid =  left + (right - left >> 1)
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

// 递归实现
var search = function(nums, target, l = 0, r = l.length - 1) {
  if(l > r) {
    return - 1
  }
  const mid = l + (l - r >> 1)
  if(nums[mid] = target) {
    return mid
  } else if(target[mid] < target) {
    search(nums, target, l, mid)
  } else {
    search(nums, target, mid+1, r)
  }
}
```

## [二分搜索](https://leetcode-cn.com/problems/binary-search/description/)

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

## [搜索插入位置](https://leetcode-cn.com/problems/search-insert-position/description/)

```js
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
