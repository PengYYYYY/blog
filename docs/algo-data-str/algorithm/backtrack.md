# 回溯

## 数组的组合

给一个数组 [1, 2, 3, 4, 5]，目标值为 6，输出 [ [ 1, 2, 3 ], [ 1, 5 ], [ 2, 4 ] ]

```js
function getAllArrays(arr, target) {
  function backtrack(start, target, path, res) {
    if (target === 0) {
      res.push(path);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      if (arr[i] > target) {
        break;
      }
      backtrack(i + 1, target - arr[i], path.concat(arr[i]), res);
    }
  }

  const res = [];
  backtrack(0, target, [], res);

  return res;
}

getAllArrays([1, 2, 3, 4, 5], 6)
// [ [ 1, 2, 3 ], [ 1, 5 ], [ 2, 4 ] ]
```

## [全排列](https://leetcode.cn/problems/permutations/)

```js

const permute = (nums) => {
  function backtrack(list, temp, nums) {
    if(temp.length === nums.length) {
        return list.push([...temp]);
    }
    for(let i = 0; i < nums.length; i++) {
        if(temp.includes(nums[i])) continue;

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
