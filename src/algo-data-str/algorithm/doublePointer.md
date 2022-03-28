# 双指针

## [删除有序数组中的重复项](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/)

快慢指针

```js
const removeRepeat = function(arr) {
  let j = 0
  for(let i = 0; i < arr.length; i++) {
    if(arr[j] !== arr[i]) {
      arr[++j] = arr[i]
    }
  }
  return arr.slice(0, j+1)
}
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

## [字符串相加](https://leetcode-cn.com/problems/add-strings/)

```js
var addStrings = function(num1, num2) {
  const ans = []
  let i = num1.length -1, j = num2.length - 1, add = 0
  while(i >= 0 || j >= 0 || add != 0) {
    const x = i >= 0 ? (num1.charAt(j) - '0') : 0
    const y = j >= 0 ? (num2.charAt(j) - '0') : 0;
    const result = x + y + add;
    ans.push(result % 10);
    add = Math.floor(result / 10)
    i--
    j--
  }
  return ans.reverse().join('')
}
```

## [字符串相乘](https://leetcode-cn.com/problems/multiply-strings/)

```js
var multiply = function(num1, num2) {
  if (num1 === '0' || num2 === '0') {
    return '0'
  }
  var l1 = num1.length, l2 = num2.length, p = new Array(l1 + l2).fill(0)
  for (var i = l1; i--;) {
    for (var j = l2; j--;) {
      var tmp = num1[i] * num2[j] + p[i + j + 1]
      p[i + j + 1] = tmp % 10
      p[i + j] += 0 | tmp / 10
    } 
  }
  while(p[0] === 0) {
    p.shift()
  }
  return p.join('')
};
```

```js
const multiply = function(num1, num2) {
  if (num1 == '0' || num2 == '0') {
    return '0'
  }
  var l1 = num1.length, l2 = num2.length, p = new Array(l1 + l2).fill(0)
  for(var i = l1; i--;) {
    for(var j = l2; j--;) {
      var tmp = num1[i] * num2[j] + p[i + j + 1]
      p[i + j + 1] = tmp % 10
      p[i + j] += 0 | tmp / 10
    }
  }
  while(p[0] == 0) {
    p.shift()
  }
  return p.join('')
}
```
