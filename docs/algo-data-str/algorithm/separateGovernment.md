# 分治

## [Pow(x, n)](https://leetcode.cn/problems/powx-n/description/)

```js
var myPow = function(x, n) {
  if(n == 0 || n == 1) {
    return n == 0 ? 1 : x;
  } else if(n < 0) {
    return myPow(1 / x, Math.abs(n));
  } else {
    return n % 2 === 0 ? myPow(x * x, n / 2) : myPow(x * x, Math.floor(n / 2)) * x;
  }
}
```
