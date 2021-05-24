# node基础知识

## node的特点

node 作为一个后端JavaScript的运行平台，保留了js的语法，基于作用域和原型链。

### 异步IO模型

![img](https://gitee.com/PENG_YUE/myImg/raw/master/uPic/O4PNgw.png)

### 事件与回调函数

在node中创建一个网络服务

```js
var http = require('http')

http.createServer(function(req, res) => {
  var postData = ''
  req.setEncoding('utf8');
  req.on('data', function (trunk) {
    postData += trunk;
  });
  req.on('end', function () {
    res.end(postData);
  });
}).listen(8080);
```

node采用事件的编程方式来进行具有轻量级，松耦合，只关注事物点等优势，但是在多个异步任务的场景下面，事件与事件是相互隔离的。从事件编程演进来的就是回调函数，从而在流程控制当中，会存在一些问题。

### 单线程

node保持了js在浏览器中的单线程特点。在node中，js无法与其余线程进行状态共享，没有死锁，也没有线程上下文交换所带来的性能上面的开销。

单线程的弱点：

- 无法利用多核CPU
- 大量计算占用CPU导致无法继续调用异步IO
- 错误会引起整个应用的退出

不过node可以通过child_process来传递进程间的消息。通过Master-worker的管理方式，也可以很好的管理各个工作进程，以达到更高的健壮性。

### node应用场景

- I/O密集型，擅长网络编程，node面向网络且擅长并行I/O,主要是利用了其事件循环的能力，资源占用极少。

## 模块机制

## 异步IO

## 内存控制

## 异步编程

## buffer

## 网络模块

## 进程
