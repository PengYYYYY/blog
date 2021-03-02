# 柯里化

## 使用场景

### 实现一个add方法，使计算结果能够满足如下预期

add(1)(2)(3) = 6;
add(1, 2, 3)(4) = 10;
add(1)(2)(3)(4)(5) = 15;

```js
function add() {
  const _args = Array.prototype.slice.call(arguments)
  
  const _adder = function() {
    _args.push(...arguments);
    return _adder;
  };
  _adder.toString = function() {
    return _args.reduce((a, b) => {
      return a + b
    })
  }
}
```
