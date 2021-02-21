# JS中的事件循环

`JS` 中的事件循环机制

## 进程与线程

`JS` 是单线程执行的，讲到线程，那么也得说一下进程，本质上来说，两个名词都是 `CPU` 工作时间片的一个描述。

进程描述了 `CPU` 在运行指令及加载和保存上下文所需的时间，放在应用上来说就代表了一个程序。线程是进程中的更小单位，描述了执行一段指令所需的时间。

当你打开一个 Tab 页时，其实就是创建了一个进程，一个进程中可以有多个线程，比如渲染线程、JS 引擎线程、HTTP 请求线程等等，当你发起一个请求时，其实就是创建了一个线程，当请求结束后，该线程可能就会被销毁。

## 浏览器中的 Event Loop

![img](https://gitee.com/PENG_YUE/myImg/raw/master/uPic/Lgi6hI.png)

Event Loop 执行顺序:

1. 首先执行同步代码，这属于宏任务
2. 当执行完所有同步代码后，执行栈为空，查询是否有异步代码需要执行
3. 执行所有微任务
4. 当执行完所有微任务后，如有必要会渲染页面
5. 然后开始下一轮 Event Loop，执行宏任务中的异步代码，也就是 setTimeout 中的回调函数

微任务包括: `process.nextTick`，`promise` ，`MutationObserver`，其中 `process.nextTick` 为 `Node` 独有。
宏任务包括 `script`,`setTimeout`, `setInterval`,`setImmediate`,`I/O`,`UI rendering`。

## Node 中的 Event Loop

![img](https://gitee.com/PENG_YUE/myImg/raw/master/uPic/OIprvT.png)

![img](https://gitee.com/PENG_YUE/myImg/raw/master/uPic/yeag8u.png)

Node 中的 Event Loop 和浏览器中的是完全不相同的东西。
Node 的 Event Loop 分为 6 个阶段，它们会按照顺序反复运行。每当进入一个阶段的时候，都会从对应的回调队列中取出函数去执行。当队列为空或者执行的回调函数数量达到系统的阀值，就会进入下一个阶段。

### timer

`timers` 阶段会执行 `setTimeout` 和 `setInterval` 的回调，并且是由 poll 阶段控制的。
所以在node中的定时器指定的时间也不是准确时间，只能是尽快执行。

### I/O，callback阶段

执行除了`close`事件的`callbacks`、被`timers`设定的`callbacks`,`setImmediate()`设定的`callbacks`这些之外的`callbacks`，`I/O`阶段会执行上一轮循环中少数未执行的`I/O`回调.

### idle,prepare

仅供 `node` 内部使用.

### poll

这一阶段中，系统会做两件事情

1. 回到 `timer` 阶段执行回调
2. 执行 `I/O` 回调

- 如果 `poll` 队列不为空，会遍历回调队列并同步执行，直到队列为空或者达到系统限制
- 如果 `poll` 队列为空时，会有两件事发生
  - 如果有 `setImmediate` `回调需要执行，poll` 阶段会停止并且进入到 check 阶段执行回调
  - 如果没有 `setImmediate` 回调需要执行，会等待回调被加入到队列中并立即执行回调，这里同样会有个超时时间设置防止一直等待下去

当然设定了 timer 的话且 poll 队列为空，则会判断是否有 timer 超时，如果有的话会回到 timer 阶段执行回调。

### check

`check` 阶段执行 `setImmediate`

### close callbacks

执行socket.on('close', ....)这些callbacks

### NodeJS中宏队列主要有4个

由上面的介绍可以看到，回调事件主要位于4个 `macrotask queue` 中：

1. Timers Queue
2. IO Callbacks Queue
3. Check Queue
4. Close Callbacks Queue

不同类型的 `macrotask queue` 会被放入不同的宏任务队列中。在浏览器中

NodeJs的微任务队列主要有2个：

`Next Tick Queue`：是放置process.nextTick(callback)的回调任务的
`Other Micro Queue`：放置其他microtask，比如Promise等

node在11版本之后的eventloop执行与浏览器一致了
