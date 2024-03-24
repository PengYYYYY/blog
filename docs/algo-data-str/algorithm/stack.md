# 栈

## [有效的括号](https://leetcode.cn/problems/valid-parentheses/description)

```js
var isValid = function(s) {
  let stack = []
  for (let i = 0; i < s.length; i++) {
    const cur = s[i];
    switch(cur) {
      case '{':
      case '[':
      case '(':
        stack.push(cur);
        break;
      case "}":
        if(stack.pop() !== '{') return false;
        break;
      case ']':
        if(stack.pop() !== '[') return false;
        break;
      case ')':
        if(stack.pop() !== '(') return false;
        break;
    }
  }
  return stack.length === 0
};
```
