# 笔试题

## html

### 1.请手写一个SVG效果，SVG大小是300*150，然后

1. 已SVG元素的中心为圆心绘制出一个圆形，圆形的半径是60px，填充色是deepskyblue;
2. 在圆形的中心位置绘制文字“阅文集团”，字号大小是14px，文字颜色是白色；

请写出满足上述要求的SVG代码。

> 答案

```html
<svg>
  <circle cx="150" cy="75" r="60" fill="deepskyblue"></circle>
  <text x="50%" y="50%" font-size="14" fill="white" text-anchor="middle" dominant-baseline="middle">阅文集团</text>
</svg>
```

#### 2. Canvas基础测试，请实现

1. 在页面中创建一个300*150大小的Canvas画布；
2. 以画布中心点为圆心绘制一个圆，圆的半径大小是60，圆的填充色是deepskyblue;
3. 在上述圆的中心绘制文字“阅文集团”，字号大小是14px，字体任意，文字颜色是白色。

> 答案

```html
var canvas = document.createElement('canvas');
document.body.append(canvas);

var context = canvas.getContext('2d');
context.fillStyle = 'deepskyblue';
context.arc(150, 75, 60, 0, 2 * Math.PI);
// 也可以使用下面的椭圆函数
// context.ellipse(150, 75, 60, 60, 0, 0, 2 * Math.PI);
context.fill();

context.fillStyle = 'white';
context.font = '14px sans-serif';
context.textAlign = 'center';
context.textBaseline = 'middle';
context.fillText('阅文集团', 150, 75)
```

## css

css 计数器

## js

### Dom

#### 已知HTML如下

```html
<style>
a { display: block; }
h1 { background: url(logo.png); }
</style>

<header>
<a href="./" class="logo">
<h1>hr门户系统</h1>
</a>
<nav>
<a href accesskey="1">导航1</a>
<a href class="active" accesskey="2">导航2</a>
<a href accesskey="3">导航3</a>
</nav>
</header>

```

- 请使用JS代码获得<h1>标签里面的文字内容;

```js
document.querySelector('h1').textContent
```

- 请使用JS代码获得类名为.active元素的accesskey属性值;

```js
document.querySelector('.active').getAttribute('accesskey')
```

- 请使用JS代码获得<header>元素的高度（包括border大小）;

```js
document.querySelector('header').offsetHeight
```

- 请使用JS代码获得<h1>元素的背景图片;

```js
getComputedStyle(document.querySelector('h1')).backgroundImage
```

- 请使用JS判断<header>元素是否在浏览器窗口内;

```js
let bound = document.querySelector('header').getBoundingClientRect();
看 bound.top/right/bottom/left值是否是正值
```

- 请使用JS在<nav>元素后面插入<a href accesskey="4">导航4</a>结构;

```js
document.querySelector('nav').insertAdjacentHTML('beforeend', '<a href accesskey="4">导航4</a>')
```

- 请使用JS删除.logo类名对应的DOM元素;

```js
document.querySelector('.logo').remove()
```

- 请使用JS实现点击页面上任意链接都不刷新;

```js
document.addEventListener('click', function (event) {
  if (event.target.matches('a')) {
    event.preventDefault();
  }
});
```

### Bom

#### 使用原生JavaScript把页面中所有的<a>元素的链接地址和<img>元素的图片地址都替换成当前完整的绝对地址

```js
const replaceArr = () => {
  document.querySelectorAll('a, img').forEach(e => {
    if (e.href) {
      ele.href = ele.href;
    } else if(e.src) {
      ele.src= ele.src;
    }
  })
}
```

#### 请实现给当前页面的URL地址增加或替换 uid=1 的查询内容

即：
如果当前URL地址是：<https://www.yuewen.com#aaa，则处理后的URL地址是：https://www.yuewen.com?uid=1#aaa>
如果当前URL地址是：<https://www.yuewen.com?f=qidian> ，则处理后的URL地址是：<https://www.yuewen.com?f=qidian&uid=1>
如果当前URL地址是：<https://www.yuewen.com?uid=2> ，则处理后的URL地址是：<https://www.yuewen.com?uid=1>

```js
let parmas = new URLSearchParams(location.search)
params.set('userid', 1)
let hash = location.hash;
console.log(location.href.split('?')[0] + '?' + params.toString() + hash);
```

### Web Storage

分为两种：

1，sessionStorage

session，指的是一次会话，其时间作用于你访问开始一个网站到你关闭这个网站。

所以你用sessionStorage保存的数据在你关闭网站页面的时候就会被销毁，一般用于临时的数据保存

2，localStorage

local，指的是本地，它会把数据保存到你的硬盘中，即是浏览器被关闭了，下次访问也能读取到已经保存了的数据。

值得注意的是，由于不同浏览器数据存储的位置不一样，所以每个浏览器所存储的数据都是独立的，不能在其他浏览器中获取

### 字符串处理

#### 已知用户输入手机号的时候可能是通过粘贴输入，此时就会带上不需要的信息，例如

let tel ='132 0803 3621';
或者是短横线：
let tel ='132-0803-3621';
或是其他的连接字符。

然后空格或短横线的位置也不固定，例如可能是下面这样：
let tel ='132 080 33621';

请实现，无论变量tel使用什么字符分隔，无论分隔位置在哪里，都过滤成连续的11位数字，类似'13208033621'。

```js
tel.replace('/\D/g', '')
```

#### 已知一段表示用户信息的数组数据，结构如下所示

```js
let data = [{
    userId: '001',
    userName: '张三(zhangsan)'
}, {
    userId: '002',
    userName: '李四(lisi)'
}, {
    userId: '003',
    userName: '王二(wanger)'
}, {
    userId: '004',
    userName: '麻子(mazi)'
}];
```

请实现数组按照数组项中userName中的姓名拼音排序。

```js
data.sort((a, b) => {
  return a.userName.split('(')[1] > b.userName.split('(')[1]
})
```

#### 已知有一串用户数据是这样的

```js
let data = [{
  id: '1',
  username: '张三'
}, {
  id: '2',
  username: '李四'
}, {
  id: '3',
  username: '王二'
}];
```

请实现，如果数组中有id值是'233'的数据项，则将此数组项在数组中置顶（数组第1位），如果没有匹配的数组项，则数组顺序不变。

```js
data.forEach(item => {
  if (item.id == '233') {
    let tem = item
    data.pop(item)
    data.unshift(tem)
  }
})
```

### 有如下字符串

var str = 'CanvasRenderingContext2D';

1. 字符串去重，返回新的不重复字符串，假设变量名是str2。

2. 字符串反向排列，返回str2的反向排列字符串，假设变量名是str3。

3. 返回str3字符串中大写字母的个数。

```js
str2 = [...new Set(str.split(''))].join('')
str3 = str2.split('').reverse().join('')
str3.match(/[A-Z]/g).length
```

#### 关于字符串处理

1. 写一个名为toCamelCase的方法，实现把类似'abc-def-ghi'的字符转换成'abcDefGhi'。

2. 写一个名为toDashJoin的方法，实现把驼峰形式字符串'abcDefGhi'转换成'abc-def-ghi'。

3. 写一个名为toCapitalize的方法，实现首字母大写功能（原来字母就是大写的不处理），如'i like css'转换成'I Like Css'。

4. 写一个名为toBetterUrl的方法，实现把类似'CSS value type'转换成'css-value-type'（只需考虑空格和大小写处理）。

```js
function toCamelCase(str){
    return str.replace(/-(.)/g,function($0,$1){
        return $1.toUpperCase()
    })
}    
console.log(toCamelCase("abc-def-ghi"));

function toDashJoin(str){
    return str.replace(/[A-Z]/g,function($0){
        return '-'+$0.toLowerCase()
    })
}
console.log(toDashJoin("abcDefGhi"));

function toCapitalize(str){
    return str.replace(/(\s+|^)(\w)/g,function($0,$1,$2){
        return $1+$2.toUpperCase()
    })
}
console.log(toCapitalize('i like css'));

function toBetterUrl(str){
    return str.replace(/[A-Z]/g,function($0){
        return $0.toLowerCase()
    }).replace(/\s+/g,'-')
}
console.log(toBetterUrl('CSS value type'));
```
