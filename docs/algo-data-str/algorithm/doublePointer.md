# 双指针

## [删除有序数组中的重复项](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/)

```js
const removeRepeat = function(arr) {
  let first = 0;
  let slow = 0;
  while(first < nums.length) {
      if(nums[first] !== nums[first - 1]) {
          nums[slow] = nums[first]
          slow++
      }
      first++
  }
  return slow;
}
```

## [删除有序数组中的重复项 II](https://leetcode.cn/problems/remove-duplicates-from-sorted-array-ii/description/)

```js
var removeDuplicates = function(nums) {
    let slow = 2;
    let fast = 2;
    while(fast < nums.length) {
        if(nums[slow - 2] != nums[fast]){
            nums[slow] = nums[fast];
            slow++
        }
        fast++
    }
    return slow
};
```

## [移动零](https://leetcode-cn.com/problems/move-zeroes/)

```js
var moveZeroes = function(nums) {
  let j = 0
  for(let i = 0; i < nums.length; i++) {
    if(nums[i] !== 0) {
      nums[j] = nums[i]
      if(j !== i) {
        nums[i] = 0
      }
      j++
    }
  }
  return nums
};
```

## [盛最多水的容器](https://leetcode-cn.com/problems/container-with-most-water/)

```js
const maxArea = function(arr) {
  let max = 0, l = 0, r = arr.length - 1
  while(l < r) {
    max = Math.max(max, Math.min(arr[l], arr[r]) * ( r - l))
    if (arr[l] < arr[r]) {
      l++
    } else {
      r--
    }
  }
  return max
}
```

## [三数之和](https://leetcode.cn/problems/3sum/description/)

```js
var threeSum = function(nums) {
  const len = nums.length;
  let res = [];
  if(len < 3) return res
  nums.sort((a, b) => a - b);

  for(let i = 0; i < nums.length; i++) {
    if(nums[i] > 0) break;
    if(i > 0 && nums[i] === nums[i - 1]) continue;
    let left = i + 1;
    let right = len - 1;
    while(left < right) {
      const sum = nums[left] + nums[right] + nums[i];
      if(sum === 0) {
        res.push([nums[i], nums[left], nums[right]])

        while(left < right && nums[left] === nums[left + 1]) {
          left++
        }
        while(left < right && nums[right] === nums[right - 1]) {
          right--
        }
        left++
        right--
      } else if(sum < 0) {
        left++
      } else {
        right--
      }
    }
  }
  return res
};
```

## [验证回文串](https://leetcode.cn/problems/valid-palindrome/description/)

```js
var isPalindrome = function(s) {
  s = s.replace(/([^a-zA-Z0-9])/g, '');
  s = s.toLocaleLowerCase();
  let l = 0;
  let r = s.length - 1;
  while(l < r) {
    if(s[l] !== s[r]) {
      return false
    }
    l++
    r--
  }
  return true;
};
```

## [判断子序列](https://leetcode.cn/problems/is-subsequence/description/)

```js
var isSubsequence = function(s, t) {
  let slow = 0;
  let first = 0;
  while(first < t.length) {
    if(s[slow] === t[first]) {
      slow++
    }
    if(slow >= s.length) return true 
    first++
  } 
  return slow >= s.length
};
```
