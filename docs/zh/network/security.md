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

黑客通过“HTML注入”篡改了网页，插入了恶意的脚本，从而在用户浏览网页时，控制用户浏览器的一种攻击。

### 反射型XSS

也称“非持久型XSS”，简单的把用户输入的数据“反射”给浏览器，即黑客往往需要诱使用户“点击”一个恶意链接才能攻击成功。

### 存储型XSS

也称“持久型XSS”，把用户输入的数据“存储”在服务器，具有很强的稳定性。例如在富文本中加入一些 JavaScript 代码的博客文章，黑客把恶意脚本保存到服务端。

### XSS Payload

XSS Payload 指完成各种攻击的恶意脚本，即 Javascript 脚本。

- cookie劫持

防范措施：

- 在 Set-Cookie 时给关键 Cookie 植入 HttpOnly 标识；
- 把 Cookie 与客户端IP绑定
  - 构造 GET 和 POST 请求
  - XSS 钓鱼
  - 识别用户浏览器
  - 识别用户安装的软件
  - 获取用户的真实 IP 地址
