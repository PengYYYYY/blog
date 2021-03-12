# 安全

![img](https://gitee.com/PENG_YUE/myImg/raw/master/uPic/wpJYkZ.png)

## 浏览器安全

浏览器的安全由浏览器控制，主要从浏览器运行机制的安全，同源策略体现出来

### 同源策略

[跨域](/network/crossDomain)

### 浏览器沙箱机制

Google Chrome 是第一个采取多进程架构的浏览器，其主要进程分为：浏览器进程、渲染进程、插件进程、扩展进程。

插件进程与浏览器进程严格隔离，互不影响。

渲染引擎由 Sandbox 隔离，网页代码要与浏览器内核进程通信、与操作系统通信都需要通过 IPC channel，在其中会进行一些安全检查。

Sandbox 目的：让不可信任的代码运行在一定的环境中，限制其访问隔离区外的资源，如果一定要跨域边界产生数据交换，则只能通过指定的数据通道，比如经过封装的 API 来完成，在这些 API 中会严格检查请求的合法性。

![img](https://gitee.com/PENG_YUE/myImg/raw/master/uPic/pPbQaA.png)

## 跨站脚本攻击（XSS）

XSS(Cross-Site Scripting)跨站脚本攻击，黑客通过“HTML注入”篡改了网页，插入了恶意的脚本，从而在用户浏览网页时，控制用户浏览器的一种攻击。
跨站脚本攻击有可能造成以下影响:

- 利⽤虚假输⼊表单骗取⽤户个⼈信息。
- 利⽤脚本窃取⽤户的Cookie值，被害者在不知情的情况下，帮助攻击者发送恶意请求。
- 显示伪造的⽂章或图⽚。

### 反射型XSS

也称“非持久型XSS”，简单的把用户输入的数据“反射”给浏览器，即黑客往往需要诱使用户“点击”一个恶意链接才能攻击成功。

### 存储型XSS

也称“持久型XSS”，把用户输入的数据“存储”在服务器，具有很强的稳定性。例如在富文本中加入一些 JavaScript 代码的博客文章，黑客把恶意脚本保存到服务端。

### XSS攻击的危害

利用脚本特性，干脚本能干的一切

- 获取⻚⾯数据
- 获取Cookies
- 劫持前端逻辑
- 发送请求
- 偷取⽹站的任意数据
- 获取用户信息
- 用户欺骗

### 防范手段

- 在 Set-Cookie 时给关键 Cookie 植入 HttpOnly 标识；
- 转译字符
- 把 Cookie 与客户端IP绑定
  - 构造 GET 和 POST 请求
  - XSS 钓鱼
  - 识别用户浏览器
  - 识别用户安装的软件
  - 获取用户的真实 IP 地址

#### CSP

内容安全策略 (CSP, Content Security Policy) 是⼀个附加的安全层，⽤于帮助检测和缓解某些类型的攻击，包括跨站脚本 (XSS) 和数据注⼊等攻击。 这些攻击可⽤于实现从数据窃取到⽹站破坏或作为恶意软件分发版本等⽤途。

CSP 本质上就是建⽴⽩名单，开发者明确告诉浏览器哪些外部资源可以加载和执⾏。我们只需要配置规则，如何拦截是由浏览器⾃⼰实现的。我们可以通过这种⽅式来尽量减少 XSS 攻击。

```js
// 只允许加载本站资源
Content-Security-Policy: default-src 'self'
// 只允许加载 HTTPS 协议图⽚
Content-Security-Policy: img-src https://*
// 不允许加载任何来源框架
Content-Security-Policy: child-src 'none'
```

### HttpOnly Cookie

这是预防XSS攻击窃取⽤户cookie最有效的防御⼿段。Web应 ⽤程序在设置cookie时，将其属性设为HttpOnly，就可以避免该⽹⻚的cookie被客户端恶意JavaScript窃取，保护⽤户cookie信息。

#### ⿊名单

⽤户的输⼊永远不可信任的，最普遍的做法就是转义输⼊输出的内容，对于引号、尖括号、斜杠进⾏转义

## csrf（Cross Site Request Forgery）

它利⽤⽤户已登录的身份，在⽤户毫不知情的情况下，以⽤户的名义完成⾮法操作。

1. ⽤户已经登录了站点 A，并在本地记录了 cookie
2. 在⽤户没有登出站点 A 的情况下（也就是 cookie ⽣效的情况下），访问了恶意攻击者提供的引诱危险站点 B (B 站点要求访问站点A)。
3. 站点 A 没有做任何 CSRF 防御

### CSRF攻击危害

- 利⽤⽤户登录态
- ⽤户不知情
- 完成业务请求
- 盗取⽤户资⾦（转账，消费）
- 冒充⽤户发帖背锅
- 损害⽹站声誉

### 防御

- 禁⽌第三⽅⽹站带Cookie
- Referer Check - Https不发送referer
- 加验证码
- Cookie加SameSite，用来防止 CSRF 攻击和用户追踪

## 点击劫持

点击劫持是⼀种视觉欺骗的攻击⼿段。攻击者将需要攻击的⽹站通过 iframe 嵌套的⽅式嵌⼊⾃⼰的⽹⻚中，并将 iframe 设置为透明，在⻚⾯中透出⼀个按钮诱导⽤户点击。

### 如何防御

X-FRAME-OPTIONS

X-FRAME-OPTIONS 是⼀个 HTTP 响应头，在现代浏览器有⼀个很好的⽀持。这个 HTTP 响应头 就是为了防御⽤ iframe 嵌套的点击劫持攻击。
该响应头有三个值可选，分别是

- DENY，表示⻚⾯不允许通过 iframe 的⽅式展示
- SAMEORIGIN，表示⻚⾯可以在相同域名下通过 iframe 的⽅式展示
- ALLOW-FROM，表示⻚⾯可以在指定来源的 iframe 中展示

## 请求劫持

- DNS劫持

顾名思义，DNS服务器(DNS解析各个步骤)被篡改，修改了域名解析的结果，使得访问到的不是预期的ip

- 请求劫持

运营商劫持，此时⼤概只能升级HTTPS了

## 其他

### 爬虫

- 针对爬虫机器，首先对应用加上防爬工具，比如利用debug

![img](https://gitee.com/PENG_YUE/myImg/raw/master/uPic/3wgpMw.png)

- 针对黄牛

黄牛是让人又爱又恨的一群人，一般防他们就是通过数据策略分析，然后判断是否是黄牛。
