# 回溯

## 数组的组合

给一个数组 [1, 2, 3, 4, 5]，目标值为 6，输出 [ [ 1, 2, 3 ], [ 1, 5 ], [ 2, 4 ] ]

```js
function getAllArrays(arr, target) {
  function backtrack(start, target, path) {
    if (target === 0) {
      res.push(path);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      if (arr[i] > target) {
        break;
      }
      backtrack(i + 1, target - arr[i], path.concat(arr[i]));
    }
  }

  const res = [];
  backtrack(0, target, []);

  return res;
}

getAllArrays([1, 2, 3, 4, 5], 6)
// [ [ 1, 2, 3 ], [ 1, 5 ], [ 2, 4 ] ]
```

## [电话号码的字母组合](https://leetcode.cn/problems/letter-combinations-of-a-phone-number/solutions/388979/shou-hua-tu-jie-liang-chong-jie-fa-dfshui-su-bfsya/)

```js
var letterCombinations = function(digits) {
  if (digits.length == 0) return [];
  const res = [];
  const map = {
    2: 'abc',
    3: 'def',
    4: 'ghi',
    5: 'jkl',
    6: 'mno',
    7: 'pqrs',
    8: 'tuv',
    9: 'wxyz'
  }
  const backtrack = (curStr, i) => {
    if (i > digits.length - 1) {
      res.push(curStr)
      return;
    }
    const letters = map[digits[i]];
    for (const letter of letters) {
      backtrack(curStr + letter, i + 1);
    }
  }
  backtrack('', 0);
  return res;
};
```

## [全排列](https://leetcode.cn/problems/permutations/)

```js
const permute = (nums) => {
  function backtrack(list, temp, nums) {
    if (temp.length === nums.length) {
        return list.push([...temp]);
    }
    for (let i = 0; i < nums.length; i++) {
        if (temp.includes(nums[i])) continue;
        temp.push(nums[i]);
        backtrack(list, temp, nums); // 执行递归公式
        temp.pop();
    }
  }

  let list = [];
  backtrack(list, [], nums);
  return list;
};
```
