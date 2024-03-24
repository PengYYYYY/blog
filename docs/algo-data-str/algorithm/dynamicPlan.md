# 动态规划

重要点：

- 寻找状态转移方程
- 建立合适的数据结构表（多为类数组结构）
- 返回符合题意的结果

## [爬楼梯](https://leetcode-cn.com/problems/climbing-stairs/)

经典问题

```js
function climbStairs (n) {
    let dp1 = 0, dp2 = 1, res = 1
    for(let i = 1; i < n; i++) {
        dp1 = dp2
        dp2 = res
        res = dp1 + dp2
    }
    return res
}
```

## [打家劫舍](https://leetcode.cn/problems/house-robber/description/)

状态转换方程 `dp[n] = Max(dp[n-1], dp[n-2] + nums[n])`

```js
function rob (nums) {
    if (!nums.length) return 0
    if (nums.length == 1) return nums[0]
    if (nums.length == 2) return Math.max(nums[0],nums[1]);

    let dp = [nums[0], Math.max(nums[0], nums[1])]
    for (let i = 2; i < nums.length; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-2] + nums[i])
    }
    return Math.max(dp[num.length - 1]. dp[nums.length - 2])
}
```
