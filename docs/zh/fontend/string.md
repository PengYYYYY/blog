# 字符操作

## JavaScript 中的字符操作

### 搜索

- indexOf() 检索字符串，返回字符串开始位置的索引
- match() 找到一个或多个正则表达式的匹配。
- lastIndexOf() 从后向前搜索字符串，返回索引值
- search() 检索与正则表达式相匹配的值(大小写敏感)，未找到输出-1。

### 指定位置

- charAt() 返回指定位置的字符
- charCodeAt() 返回指定位置字符的Unicode编码
- fromCharCode() 从字符编码创建一个字符串
- concat() 连接字符串
- replace() 替换与正则表达式匹配的子串。

### 截取和片段

- substr(a,b) 截取字符串，从a索引开始，截取b个字符，将截取的字符返回，不改变原来的字符串。

```javascript
let str = "abcdefg";
console.log(str.substr(2,3));
//cde
```

- substring(a,b)截取字符串，从索引a开始，到索引b结束，不包括索引b的字符。返回截取字符。

```javascript
let str = "abcdefg";
console.log(2,4);
//cd
```

- slice() 截取字符串，类似substring(),slice(),可以接受参数为负数，从后往前截取。

```javascript
let str = "abcdefg";
console.log(str.slice(-3,-1));
//ef
```

- split() 用指定的字符分割字符串，返回一个数组，对原来的字符串没有改变。

```javascript
let str = "123456@qq.com";
console.log(str.split('@'));
//ef
```

### 过滤

- trim(),去除开头和结尾处的空白字符，返回一个字符串副本，不改变原字符串本身。

```javascript
let str = " 123 @qq.com ";
console.log(str.trim());
//ef
```

### 大小写

- toLowerCase() 将大写字母的字符改为小写，不改变原来的字符。
- toUpperCase() 将小写字母的字符改为大写，不改变原来的字符。
