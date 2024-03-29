# 哈希表

## [赎金信](https://leetcode.cn/problems/ransom-note/description)

```js
var canConstruct = function(ransomNote, magazine) {
  if (ransomNote.length > magazine.length) {
    return false;
  }
  const map = {};
  for (const c of magazine) {
    map[c] = (map[c] || 0) + 1
  }
  for (const c of ransomNote) {
    if (!map[c] || map[c] <= 0) return false;
    map[c] = map[c] - 1;
  }
  return true
};
```

## [两数之和](https://leetcode.cn/problems/two-sum/description)

```js
var twoSum = function(nums, target) {
  const hashMap = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (hashMap.has(target - nums[i])){
      return [hashMap.get(target - nums[i]), i]
    }
    hashMap.set(nums[i], i)
  }
};
```

## [存在重复元素 II](https://leetcode.cn/problems/contains-duplicate-ii/solutions/1218075/cun-zai-zhong-fu-yuan-su-ii-by-leetcode-kluvk)

```js
var containsNearbyDuplicate = function(nums, k) {
  const map = new Map();
  const length = nums.length;
  for (let i = 0; i < length; i++) {
    const num = nums[i];
    if (map.has(num) && i - map.get(num) <= k) {
      return true;
    }
    map.set(num, i);
  }
  return false
};
```

## [快乐数](https://leetcode.cn/problems/happy-number)

```js
var isHappy = function(n) {
  const getSum = function(n) {
    let sum = 0;
    while(n > 0) {
      sum += (n % 10) ** 2;
      n = Math.floor(n / 10);
    }
    return sum;
  }
  let hash = new Set();
  while(n !== 1) {
    n = getSum(n);
    if(hash.has(n)) return false;
    hash.add(n)
  }
  return n === 1
};
```

## [有效的字母异位词](https://leetcode.cn/problems/valid-anagram/description)

```js
var isAnagram = function(s, t) {
  if (s.length !== t.length) return false
  const map = {};
  for (let i = 0; i < s.length; i++) {
    map[s[i]] = (map[s[i]] || 0) + 1;
  }

  for (let i = 0; i < t.length; i++){
    if (!map[t[i]] || map[t[i]] <= 0) return false
    map[t[i]] = map[t[i]] - 1;
  }
  return true
};
```

## [同构字符串](https://leetcode.cn/problems/isomorphic-strings/description)

```js
var isIsomorphic = function(s, t) {
  const s2t = {};
  const t2s = {};
  const len = s.length
  for (let i = 0; i < len; ++i) {
    const x = s[i]
    const y = t[i];
    if ((s2t[x] && s2t[x] !== y) || (t2s[y] && t2s[y] !== x)) {
      return false
    }
    s2t[x] = y;
    t2s[y] = x;
  }
  return true;
};
```

## [单词规律](https://leetcode.cn/problems/word-pattern/description)

```js
var wordPattern = function(pattern, s) {
  const arr = s.split(' ');
  const map = new Map();
  const maps = new Map();
  if (pattern.length != arr.length) return false;

  for (let i = 0; i < pattern.length; i++) {
    if (maps.has(arr[i]) === false) {
      maps.set(arr[i], pattern[i])
    } else {
      if (maps.get(arr[i]) != pattern[i]) {
        return false
      }
    }

    if (map.has(pattern[i]) === false) {
      map.set(pattern[i], arr[i]);
    }  else {
      if (map.get(pattern[i]) != arr[i]) {
        return false
      }
    }
  }
  return true
};
```
