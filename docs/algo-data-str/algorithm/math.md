# 数学

## [x 的平方根](https://leetcode.cn/problems/sqrtx/)

```js
var mySqrt = function(x) {
  let left = 0;
  let right = x;
  while (left <= right) {
    let mid = left + (right - left) >> 1
    if (mid * mid <= x) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return right;
};
```

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

## [整数反转](https://leetcode-cn.com/problems/reverse-integer/)

```js
var reverse = function(x) {
  let ord = Math.abs(x);//去符号
  let now = 0;
  while(ord > 0){
    now = now * 10 + ord % 10;
    ord = Math.floor(ord / 10);
  }
  if(x < 0){
    return now <= Math.pow(2,31) ? -now : 0;
  }else{
    return now < Math.pow(2,31) ? now : 0;
  }
};
```

### [字符串相加](https://leetcode-cn.com/problems/add-strings/)

```js
var addStrings = function(num1, num2) {
  const ans = []
  let i = num1.length -1, j = num2.length - 1, add = 0
  while(i >= 0 || j >= 0 || add != 0) {
    const x = i >= 0 ? parseInt(num1.charAt(i)) : 0;
    const y = j >= 0 ? parseInt(num2.charAt(j)) : 0;
    const result = x + y + add;
    ans.push(result % 10);
    add = Math.floor(result / 10)
    i--
    j--
  }
  return ans.reverse().join('')
}
```

### [字符串相乘](https://leetcode-cn.com/problems/multiply-strings/)

```js
const multiply = (num1, num2) => {
  if(num1 == '0' || num2 == '0') return 0
  let len1 = num1.length; 
  let len2 = num2.length;
  let arr = new Array(len1 + len2).fill(0)
  let i = len1, j = len2
  while(i) {
    i--
    while(j) {
      j--
      let sum = num1[i]*num2[j] + arr[i+j+1]
      arr[i+j] += 0 | sum / 10
      arr[i+j+1] = sum % 10
    }
    j=len2;
  }
  while(arr[0] == 0) {
    arr.shift()
  }
  return arr.join('')
}
```

## 进制转换方程

```js
// 10进制转n进制
function ten2x(num, n){
  var res = [];
  while(num > 0){
    res.push(num % n);
    x = Math.floor(num / n);
  }
  return res.reverse().join('');
}
```

## [七进制](https://leetcode.cn/problems/base-7/submissions/511414313/)

```js
var convertToBase7 = function(num) {
    if (num === 0) {
        return "0"
    }
    let negative = num < 0;
    num = Math.abs(num);
    const digits = []
    while(num > 0) {
        digits.push(num % 7);
        num = Math.floor(num / 7);
    }
    if(negative) {
        digits.push('-')
    }
    return digits.reverse().join('')
};
```

## [二进制求和](https://leetcode.cn/problems/add-binary/description/)

```js
var addBinary = function(a, b) {
  let cur = '';
  let index1 = a.length - 1;
  let index2 = b.length - 1;
  let carry = 0;
  while(index1 >= 0 || index2 >= 0 || carry > 0) {
    const value1 = a[index1] ? Number(a[index1]) : 0;
    const value2 = b[index2] ? Number(b[index2]) : 0;

    const sum = value1 + value2 + carry;

    cur = sum % 2 + cur;
    carry = Math.floor(sum / 2);
    index1--
    index2--
  }
  return cur;
};
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
