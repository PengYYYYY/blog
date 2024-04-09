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
var rob = function(nums) {
    const len = nums.length;
    if (len === 0) {
        return 0;
    }
    const dp = new Array(len + 1);
    dp[0] = 0;
    dp[1] = nums[0];
    for (let i = 2; i <= len; i++) {
        dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i - 1]);
    }
    return dp[len];
};
```

## [最大子数和](https://leetcode.cn/problems/maximum-subarray/description/)

```js
var maxSubArray = function(nums) {
    let pre = 0, maxAns = nums[0];
    for (let i = 0; i < nums; i++) {
        pre = Math.max(pre + x, x);
        maxAns = Math.max(maxAns, pre);
    }
    return maxAns;
};
```

## [零钱兑换](https://leetcode.cn/problems/coin-change/)

```js
var coinChange = function(coins, amount) {
    const dp = new Array(amount + 1).fill(amount + 1)
    dp[0] = 0
    for (let i = 1; i <= amount; i++) {
        for (let j = 0; j < coins.length; j++) {
            // 如果以 coins[j]为步长，前面不存在台阶，继续下一次（如果步长有序，则可 break
            if (i < coins[j]) continue
            dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1)
        }
    }
    return dp[amount] > amount ? -1 : dp[amount]
};
```

## [最长递增子序列](https://leetcode.cn/problems/longest-increasing-subsequence/description/)

```js
var lengthOfLIS = function(nums) {
    if (nums.length <= 1) {
        return nums.length;
    }
    let n = nums.length;
    let maxLength = 0;
    let dp = [];
    dp[0] = 1;
    for (let i = 1; i < n; i++) {
        let max = 0;
        for (let j = i - 1; j >= 0; j--) {
            if (nums[j] < nums[i]) {
                max = Math.max(dp[j], max);
            }
        }
        dp[i] = max + 1;
        maxLength = Math.max(maxLength, dp[i]);
    }
    return maxLength;
};
```

## [零钱兑换](https://leetcode.cn/problems/coin-change/description/)

```js
var coinChange = function(coins, amount) {
    const maxCount = amount + 1;
    const dp = new Array(maxCount).fill(maxCount);
    dp[0] = 0;
    for (let i = 1; i <= amount; i++) {
        for (let j = 0; j < coins.length; j++) {
            if (coins[j] <= i) {
                dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1);
            }
        }
    }
    return dp[amount] > amount ? -1 : dp[amount]
};
```

## [最长回文子串](https://leetcode.cn/problems/longest-palindromic-substring/description/)

TODO

## [最大正方形](https://leetcode.cn/problems/maximal-square/solutions/)

TODO
