# 区间

## [汇总区间](https://leetcode.cn/problems/summary-ranges/description/)

```js
var summaryRanges = function(nums) {
  const res = [];
  let i = 0;
  const n = nums.length;
  while(i < n) {
    const low = i;
    i++;
    while(i < n && nums[i] === nums[i - 1] + 1) {
      i++;
    }
    const high = i - 1;
    let temp = `${nums[low]}`;
    if (low < high) {
      temp = `${nums[low]}->${nums[high]}`;
    }
    res.push(temp);
  }
  return res;
};
```
