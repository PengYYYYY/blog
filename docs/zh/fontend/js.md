# JavaScript

## TypeScript

![img](https://gitee.com/PENG_YUE/myImg/raw/master/uPic/HTCSeb.png)

[xmind](https://gitee.com/PENG_YUE/myImg/raw/master/uPic/TypeScript.xmind)

## JavaScript 中的特性

### delete

关于`JavaScript`中的`delete`操作符，只是执行一段代码的引用而已,如果是引用类型，则解开引用，他并不能正真的删除数据本身，以下例子可以看出。

``` javascript
delete 1 // true

const a = 1
delete c // false

let b = 1
delete b

const c = {
 a: 1,
 b: 2
}
delete c.b // true c {a: 1}

x = 100
delete x // true
```

### 范式引用

#### 声明语句

- let：词法声明，变量
- const：词法声明，常量
- var：变量声明，存在变量提升，会在作用域顶部创建一个变量并赋值`undefined`
- function
- class
- import
- for (var|let|const x...)
- try ... catch (x)

严格来说，声明不是语句

``` javascript
var a = 100;
x = 200;

// `a`和`x`都是 global 的属性
> Object.getOwnPropertyDescriptor(global, 'a');
{ value: 100, writable: true, enumerable: true, configurable: false }
> Object.getOwnPropertyDescriptor(global, 'x');
{ value: 200, writable: true, enumerable: true, configurable: true }

// `a`不能删除, `x`可以被删除
> delete a
false
> delete x
true

// 检查
> a
100
> x
ReferenceError: x is not defined
```

```javascript
// #使用eval声明
> eval('var b = 300');

// 它的性质是可删除的
> Object.getOwnPropertyDescriptor(global, 'b').configurable;
true

//  检测与删除 9>b
300
> delete b
true
> b
ReferenceError: b is not define
```

## JavaScript解析过程

### 词法分析(Tokenizing/Lexing)

简单说，就是把字符串拆分

### 语法分析

将拆分过后的字符串流，转换成为一个由元素逐级嵌套的程序语法树(Abstract Syntax Tree，AST)

### 代码生成

将AST转换成可以执行的代码，此过程与平台和等信息相关

### JIT

任何 JavaScript 代码片段在执行前都要进行编译，
