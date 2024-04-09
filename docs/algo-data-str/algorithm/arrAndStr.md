# 数组和字符串

## [合并两个有序数组](https://leetcode.cn/problems/merge-sorted-array)

```js
var merge = function(nums1, m, nums2, n) {
  let p1 = m - 1;
  let p2 = n - 1;
  let tail = nums1.length - 1;
  let cur
  while (p1 >= 0 || p2 >= 0) {
    if((nums1[p1] < nums2[p2]) || p1 === -1){
      cur = nums2[p2--]
    } else {
      cur = nums1[p1--];
    }
    nums1[tail--] = cur
}
};
```

## [移除元素](https://leetcode.cn/problems/remove-element/description)

```js
var removeElement = function(nums, val) {
  let tail = 0;
  let pre = 0;
  while (pre < nums.length) {
    if (nums[pre] !== val) {
      nums[tail] = nums[pre]
      tail++
    }
    pre++
  }
  return tail;
};
```

## [删除有序数组中的重复项](https://leetcode.cn/problems/remove-duplicates-from-sorted-array/description)

```js
var removeDuplicates = function(nums) {
  let first = 0;
  let slow = 0;
  while (first < nums.length) {
    if (nums[first] !== nums[first - 1]) {
      nums[slow] = nums[first]
      slow++
    }
    first++
  }
  return slow;
};
```

## [删除有序数组中的重复项 II](https://leetcode.cn/problems/remove-duplicates-from-sorted-array-ii/description)

```js
var removeDuplicates = function(nums) {
  let slow = 2;
  let fast = 2;
  while (fast < nums.length) {
    if (nums[slow - 2] != nums[fast]){
      nums[slow] = nums[fast];
      slow++
    }
    fast++
  }
  return slow
};
```

## [多数元素](https://leetcode.cn/problems/majority-element/description/)

```js
var majorityElement = function(nums) {
  const n = nums.length;
  const sumMap = new Map();
  for (let i of nums) {
    sumMap.set(i, (sumMap.get(i) || 0) + 1);
    if (sumMap.get(i) >= n / 2) {
      return i
    }
  }
};
```

## [买卖股票的最佳时机](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/description/)

```js
var maxProfit = function(prices) {
  if (prices.length == 0) return 0
  let min = prices[0]
  let max = 0;
  for (let i = 0; i < prices.length; i++) {
    min = Math.min(min, prices[i])
    max = Math.max(prices[i] - min, max)
  }
  return max;
};
```

## [买卖股票的最佳时机 II](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/description/)

```js
var maxProfit = function(prices) {
  let res = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      res += prices[i] - prices[i - 1]
    }
  }
  return res
};
```

## [罗马数字转整数](https://leetcode.cn/problems/roman-to-integer/description/)

```js
var romanToInt = function(s) {
  const map = {
    'I': 1,
    'V': 5,
    'X': 10,
    "L": 50,
    "C": 100,
    "D": 500,
    "M": 1000,
  }
  let ans = 0;
  const len = s.length;
  for (let i = 0; i < len; i++) {
    const value = map[s[i]];
    if (value < map[s[i + 1]]) {
      ans -= value
    } else {
      ans += value
    }
  }
  return ans
};
```

## [最长公共前缀](https://leetcode.cn/problems/longest-common-prefix/description/)

```js
var longestCommonPrefix = function(strs) {
  let res = strs[0] || "";
  if (strs.length === 1) {
    return strs[0];
  }
  for (let i = 1; i < strs.length; i++) {
    while (strs[i].slice(0, res.length) !== res) {
      res = res.slice(0, res.length - 1)
    }
  }
  return res;
};
```

## [找出字符串中第一个匹配项的下标](https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string/description/)

```js
var strStr = function(haystack, needle) {
  let pre = 0;
  let after = 0;
  while (after < needle.length && pre < haystack.length) {
    if (haystack[after + pre] === needle[after]) {
      after++;
    } else {
      pre++;
      after = 0;
    }
  }
  return after === needle.length ? pre : -1;
};
```

## [最后一个单词的长度](https://leetcode.cn/problems/length-of-last-word/description/)

```js
var lengthOfLastWord = function(s) {
    let index = s.length - 1;
    while (s[index] === ' ') {
        index--
    }
    let wordLength = 0;
    while (index >= 0 && s[index] !== ' ') {
        wordLength++;
        index--;
    }
    return wordLength;
};
```

## [跳跃游戏](https://leetcode.cn/problems/jump-game/description/)

```js
var canJump = function(nums) {
  let n = nums.length;
  let rightMost = 0;
  for (let i = 0; i < n; i++) {
    if (i <= rightMost) {
      rightMost = Math.max(rightMost, i + nums[i]);
      if (rightMost >= n - 1) {
        return true
      }
    }
  }
  return false
};
```

## [跳跃游戏 II](https://leetcode.cn/problems/jump-game-ii/description/)

```js
var jump = function(nums) {
  let end = 0;
  let maxPosition = 0;
  let steps = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    maxPosition = Math.max(maxPosition, i + nums[i]);
    if (i === end) {
      end = maxPosition;
      steps++
    }
  }
  return steps;
};
```

## [加油站](https://leetcode.cn/problems/gas-station/description/)

```js
var canCompleteCircuit = function(gas, cost) {
  const n = gas.length;
  for (let i = 0; i < n) {
    let j = 0;
    let left = 0;
    while (j < n) {
      const k = (i + j) % n;
      left += gas[k] - cost[k];
      if (left < 0) break;
      j++;
    }
    if (j === n) {
      return i;
    }
    i = i + j + 1;
  }
  return -1;
}
```

## [整数转罗马数字](https://leetcode.cn/problems/integer-to-roman/)

```js
var intToRoman = function(num) {
  let intArr = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  let RomanArr = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', "IX", 'V', 'IV', 'I'];
  let index = 0;
  let res = '';
  while(index < 13) {
    while(num >= intArr[index]) {
      res += RomanArr[index];
      num -= intArr[index];
    }
    index++;
  }
  return res;
};
```

## [反转字符串中的单词](https://leetcode.cn/problems/reverse-words-in-a-string/description/)

```js
var reverseWords = function(s) {
  let arr = s.trim().split(/\s+/);
  let i = 0;
  let j = arr.length - 1;
  while (i <= j) {
    [arr[i], arr[j]] = [arr[j], arr[i]]
    i++;
    j--;
  }
  return arr.join(' ')
};
```

## [轮转数组](https://leetcode.cn/problems/rotate-array/description/)

```js
var rotate = function(nums, k) {
  const reverse = (start, end) => {
    while (start < end) {
      const temp = nums[start];
      nums[start] = nums[end];
      nums[end] = temp;
      start++;
      end--;
    }
  }

  k = k % nums.length;
  reverse(0, nums.length - 1);
  reverse(0, k - 1);
  reverse(k, nums.length - 1);
};
```
