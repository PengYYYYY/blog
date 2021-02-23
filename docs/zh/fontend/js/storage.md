# 浏览器存储

cookie、localStorage、sessionStorage与IndexedDB的对比与特点

## cookie

第一次访问网站的时候，浏览器发出请求，服务器响应请求后，会在响应头里面添加一个Set-Cookie选项，将cookie放入到响应请求中，在浏览器第二次发请求的时候，会通过Cookie请求头部将Cookie信息发送给服务器，服务端会辨别用户身份，另外，Cookie的过期时间、域、路径、有效期、适用站点都可以根据需要来指定。

cookie的生成方式有两种：

- 生成方式一：
  http response header中的set-cookie

- 生成方式二：
  js中可以通过document.cookie可以读写cookie，以键值对的形式展示

### cookie的缺陷

- Cookie 不够大

Cookie的大小限制在4KB左右，对于复杂的存储需求来说是不够用的。当 Cookie 超过 4KB 时，它将面临被裁切的命运。这样看来，Cookie 只能用来存取少量的信息。此外很多浏览器对一个站点的cookie个数也是有限制的。

每一个name=value的value值大概在4k，，所以4k并不是一个域名下所有的cookie共享的,而是一个name的大小。

- 过多的 Cookie 会带来巨大的性能浪费

Cookie 是紧跟域名的。同一个域名下的所有请求，都会携带 Cookie，Cookie 虽然小，请求却可以有很多，随着请求的叠加，这样的不必要的 Cookie 带来的开销将是无法想象的。

- cookie是用来维护用户信息的，而域名(domain)下所有请求都会携带cookie

但对于静态文件的请求，携带cookie信息根本没有用，此时可以通过cdn（存储静态文件的）的域名和主站的域名分开来解决。

由于在HTTP请求中的Cookie是明文传递的，所以安全性成问题，除非用HTTPS。

### cookie安全

cookie安全性
|属性|作用|
|-|-|
|value|需要对其进行加密|
|http-only|不能通过js访问cookie,减少xss攻击|
|secure|只能在协议为Https的请求携带|
|same-site|规定浏览器不能在跨域请求携带Cookie,减少CSRF攻击|

## webStorage

### localStorage

- 保存的数据长期存在，下一次访问该网站的时候，网页可以直接读取以前保存的数据。
- 大小为5M
- 仅在客户端使用，不和服务端进行通信
- 接口封装较好

LocalStorage可以作为浏览器本地缓存方案，用来提升网页首屏渲染速度

### sessionStorage

sessionStorage保存的数据用于浏览器的一次会话，当会话结束（通常是该窗口关闭），数据被清空；相同域名下的两个页面，只要它们不在同一个浏览器窗口中打开，那么它们的 sessionStorage 内容便无法共享;localStorage 在所有同源窗口中都是共享的；cookie也是在所有同源窗口中都是共享的; SessionStorage 的属性和方法与 LocalStorage 完全一样。

- 会话级别的浏览器存储
- 大小为5M左右
- 仅在客户端使用，不和服务端进行通信
- 接口封装较好

基于上面的特点，sessionStorage 可以有效对表单信息进行维护，比如刷新时，表单信息不丢失。

#### 使用场景

sessionStorage 更适合用来存储生命周期和它同步的会话级别的信息。这些信息只适用于当前会话，当你开启新的会话时，它也需要相应的更新或释放。

### indexDB

本地数据库，它可以被网页脚本创建和操作。IndexedDB 允许储存大量数据，提供查找接口，还能建立索引。接近 NoSQL 数据库。用于客户端存储大量结构化数据(包括文件和blobs)。该API使用索引来实现对该数据的高性能搜索。

## 他们的区别

共同点：都是保存在浏览器端，且都遵循同源策略。
不同点：在于生命周期与作用域的不同

作用域：localStorage只要在相同的协议、相同的主机名、相同的端口下，就能读取/修改到同一份localStorage数据。sessionStorage比localStorage更严苛一点，除了协议、主机名、端口外，还要求在同一窗口（也就是浏览器的标签页）下。

生命周期：localStorage 是持久化的本地存储，存储在其中的数据是永远不会过期的，使其消失的唯一办法是手动删除；而 sessionStorage 是临时性的本地存储，它是会话级别的存储，当会话结束（页面被关闭）时，存储内容也随之被释放。

Web Storage 是一个从定义到使用都非常简单的东西。它使用键值对的形式进行存储，这种模式有点类似于对象，却甚至连对象都不是——它只能存储字符串，要想得到对象，我们还需要先对字符串进行一轮解析。

说到底，Web Storage 是对 Cookie 的拓展，它只能用于存储少量的简单数据。

| 特性 | cookie | localStorage | sessionStorage | indexDB|
| - | - | - | - | - |
| 数据生命周期 | 一般由服务器生成，可以设置过期实际 | 除非被清理，否则一直存在 | 页面关闭就清理 | 除非被清理，否则一直存在 |
| 数据存储大小 | 4k | 5M | 5M | 无限 |
| 与服务端通信 | header中对请求性能影响 | 无 | 无 | 无 |
