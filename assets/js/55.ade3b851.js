(window.webpackJsonp=window.webpackJsonp||[]).push([[55],{406:function(t,s,a){"use strict";a.r(s);var n=a(25),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"node基础知识"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#node基础知识"}},[t._v("#")]),t._v(" node基础知识")]),t._v(" "),a("p",[t._v("读深入浅出node.js笔记与总结")]),t._v(" "),a("h2",{attrs:{id:"node的特点"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#node的特点"}},[t._v("#")]),t._v(" node的特点")]),t._v(" "),a("p",[t._v("node 作为一个后端JavaScript的运行平台，保留了js的语法，基于作用域和原型链。")]),t._v(" "),a("h3",{attrs:{id:"异步io模型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#异步io模型"}},[t._v("#")]),t._v(" 异步IO模型")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://gitee.com/PENG_YUE/myImg/raw/master/uPic/O4PNgw.png",alt:"img"}})]),t._v(" "),a("h3",{attrs:{id:"事件与回调函数"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#事件与回调函数"}},[t._v("#")]),t._v(" 事件与回调函数")]),t._v(" "),a("p",[t._v("在node中创建一个网络服务")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" http "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'http'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\nhttp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("createServer")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("req"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" res")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" postData "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("''")]),t._v("\n  req"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setEncoding")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'utf8'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  req"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("on")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'data'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("trunk")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    postData "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+=")]),t._v(" trunk"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  req"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("on")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'end'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    res"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("end")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("postData"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("listen")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("8080")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br")])]),a("p",[t._v("node采用事件的编程方式来进行具有轻量级，松耦合，只关注事物点等优势，但是在多个异步任务的场景下面，事件与事件是相互隔离的。从事件编程演进来的就是回调函数，从而在流程控制当中，会存在一些问题。")]),t._v(" "),a("h3",{attrs:{id:"单线程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#单线程"}},[t._v("#")]),t._v(" 单线程")]),t._v(" "),a("p",[t._v("node保持了js在浏览器中的单线程特点。在node中，js无法与其余线程进行状态共享，没有死锁，也没有线程上下文交换所带来的性能上面的开销。")]),t._v(" "),a("p",[t._v("单线程的弱点：")]),t._v(" "),a("ul",[a("li",[t._v("无法利用多核CPU")]),t._v(" "),a("li",[t._v("大量计算占用CPU导致无法继续调用异步IO")]),t._v(" "),a("li",[t._v("错误会引起整个应用的退出")])]),t._v(" "),a("p",[t._v("不过node可以通过child_process来传递进程间的消息。通过Master-worker的管理方式，也可以很好的管理各个工作进程，以达到更高的健壮性。")]),t._v(" "),a("h3",{attrs:{id:"node应用场景"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#node应用场景"}},[t._v("#")]),t._v(" node应用场景")]),t._v(" "),a("ul",[a("li",[t._v("I/O密集型，擅长网络编程，node面向网络且擅长并行I/O,主要是利用了其事件循环的能力，资源占用极少。")])]),t._v(" "),a("h2",{attrs:{id:"模块机制"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#模块机制"}},[t._v("#")]),t._v(" 模块机制")]),t._v(" "),a("h3",{attrs:{id:"commonjs规范"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#commonjs规范"}},[t._v("#")]),t._v(" CommonJS规范")]),t._v(" "),a("ul",[a("li",[t._v("模块引用")])]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" math "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'math'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("ul",[a("li",[t._v("模块导出")])]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 单个导出")]),t._v("\nexports"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("add")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  xxx\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 模块导出")]),t._v("\nmodule"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br")])]),a("h3",{attrs:{id:"node中的模块实现"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#node中的模块实现"}},[t._v("#")]),t._v(" Node中的模块实现")]),t._v(" "),a("p",[t._v("node中的模块实现经历了以下三个过程")]),t._v(" "),a("ol",[a("li",[t._v("路径分析")]),t._v(" "),a("li",[t._v("文件定位")]),t._v(" "),a("li",[t._v("编译执行")])]),t._v(" "),a("p",[t._v("在node中，模块分为两类：一类是node提供的模块，称为核心模块；另外一类是用户编写的模块，称为文件模块。")]),t._v(" "),a("ul",[a("li",[t._v("核心模块部分在Node源码过程中，编译进了二进制执行文件。在node进程启动时，部分核心模块被直接加载进了内存，这部分核心模块引入的时候，速度会非常快。")]),t._v(" "),a("li",[t._v("文件模块则是在运行时动态加载，需要完整的进行路径分析，文件定位，编译执行，速度要慢。")])]),t._v(" "),a("h4",{attrs:{id:"优先从缓存加载"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#优先从缓存加载"}},[t._v("#")]),t._v(" 优先从缓存加载")]),t._v(" "),a("p",[t._v("node对引入的模块都会进行缓存，以减少二次引入时的开销。浏览器缓存的是文件，node缓存的是编译和执行后的对象。")]),t._v(" "),a("h4",{attrs:{id:"模块编译"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#模块编译"}},[t._v("#")]),t._v(" 模块编译")]),t._v(" "),a("p",[t._v("node中，每个文件模块都是一个对象")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("Module")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("id"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" parent")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("id "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" id\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("parent "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" parent\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("parent "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" parent"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("children"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    parent"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("children"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("push")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("filename "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("loaded "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("children "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br")])]),a("h2",{attrs:{id:"异步io"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#异步io"}},[t._v("#")]),t._v(" 异步IO")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://gitee.com/PENG_YUE/myImg/raw/master/uPic/MPtFEE.png",alt:"img"}})]),t._v(" "),a("ol",[a("li",[t._v("利用单线程，远离多线程死锁，状态同步等问题。")]),t._v(" "),a("li",[t._v("利用异步I/O，让单线程远离阻塞，可以更好的使用CPU")])]),t._v(" "),a("h3",{attrs:{id:"异步i-o和非阻塞i-o"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#异步i-o和非阻塞i-o"}},[t._v("#")]),t._v(" 异步I/O和非阻塞I/O")]),t._v(" "),a("blockquote",[a("p",[t._v("阻塞I/O")])]),t._v(" "),a("p",[t._v("阻塞I/O的特点是调用之后一定要等到系统内核层面完成所有操作后，调用才结束。")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://gitee.com/PENG_YUE/myImg/raw/master/uPic/qEcHIB.png",alt:"img"}})]),t._v(" "),a("blockquote",[a("p",[t._v("非阻塞I/O")])]),t._v(" "),a("h3",{attrs:{id:"轮询技术"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#轮询技术"}},[t._v("#")]),t._v(" 轮询技术")]),t._v(" "),a("ul",[a("li",[t._v("read：通过重复调用来检查I/O的状态来完成完整数据的读取。在得到最终数据之前，CPU一直耗用在等待上。")])]),t._v(" "),a("p",[a("img",{attrs:{src:"https://gitee.com/PENG_YUE/myImg/raw/master/uPic/wHAQo9.png",alt:"img"}})]),t._v(" "),a("ul",[a("li",[t._v("select: 它是在read的基础上改进的一种方案，通过对文件描述符上的事件状态来进行判断。")])]),t._v(" "),a("p",[a("img",{attrs:{src:"https://gitee.com/PENG_YUE/myImg/raw/master/uPic/Ow2JID.png",alt:"img"}})]),t._v(" "),a("ul",[a("li",[t._v("epoll：该方案是Linux下效率最高的I/O事件通知机制，在进入轮询的时候如果没有检查到I/O事件，将会进行休眠，直到事件发生将其唤醒。它真实的利用了事件通知、执行回调的方式。")])]),t._v(" "),a("p",[a("img",{attrs:{src:"https://gitee.com/PENG_YUE/myImg/raw/master/uPic/4zSGA0.png",alt:"img"}})])])}),[],!1,null,null,null);s.default=e.exports}}]);