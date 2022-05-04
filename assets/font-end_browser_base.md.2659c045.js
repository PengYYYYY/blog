import{_ as e,c as a,o as i,a as r}from"./app.7ddba1ed.js";const d='{"title":"浏览器原理","description":"","frontmatter":{},"headers":[{"level":2,"title":"单进程浏览器与多进程浏览器","slug":"单进程浏览器与多进程浏览器"},{"level":3,"title":"进程与线程","slug":"进程与线程"},{"level":3,"title":"单进程浏览器","slug":"单进程浏览器"},{"level":3,"title":"多进程浏览器","slug":"多进程浏览器"},{"level":3,"title":"最新的多进程架构","slug":"最新的多进程架构"},{"level":3,"title":"多进程架构带来的问题","slug":"多进程架构带来的问题"},{"level":3,"title":"未来面向服务的架构","slug":"未来面向服务的架构"}],"relativePath":"font-end/browser/base.md"}',l={},h=[r('<h1 id="浏览器原理" tabindex="-1">浏览器原理 <a class="header-anchor" href="#浏览器原理" aria-hidden="true">#</a></h1><h2 id="单进程浏览器与多进程浏览器" tabindex="-1">单进程浏览器与多进程浏览器 <a class="header-anchor" href="#单进程浏览器与多进程浏览器" aria-hidden="true">#</a></h2><h3 id="进程与线程" tabindex="-1">进程与线程 <a class="header-anchor" href="#进程与线程" aria-hidden="true">#</a></h3><p>一个进程就是一个程序的运行实例。启动一个程序的时候，操作系统会为该程序创建一块内存，用来存放代码，运行中的数据和一个执行任务的主线程，一个这样的运行环境叫进程。</p><p>线程是依附于进程的，而进程中使用多线程并行处理能提升运算效率。</p><p>进程与线程之间的关系：</p><ul><li>进程中的任意一线程执行出错，都会导致整个进程崩溃</li><li>线程之间共享进程中的数据</li><li>当一个进程关闭之后，操作系统会回收进程所占用的内存</li><li>进程之间的内容相互隔离，如果需要进程中的通信，就需要使用用于进程间通信(IPC)的机制了。</li></ul><h3 id="单进程浏览器" tabindex="-1">单进程浏览器 <a class="header-anchor" href="#单进程浏览器" aria-hidden="true">#</a></h3><p>单进程浏览 器是指浏览器的所有功能模块都是运行在同一个进程里，这些模块包含了网络、插件、 JavaScript 运行环境、渲染引擎和页面等。导致浏览器<code>不稳定</code>、<code>不流畅</code>和<code>不安全</code>。</p><ul><li><p>不稳定：浏览器插件容易出问题，出问题以后会导致整个进程的崩溃。渲染引擎模块在引入一些复杂的JavaScript代码时也会崩溃。</p></li><li><p>不流畅：由于单进程模型，在同一时刻中，只能有一个模块运行。在耗时脚本中，在其执行过程中，会独占整个线程，导致其他任务无法执行，会造成卡顿的现象。页面的内存泄漏也是单进程变慢的一个重要原因。运行一个复杂点的页面再关闭页面，会存在 内存不能完全回收的情况，这样导致的问题是使用时间越长，内存占用越高，浏览器会变得 越慢。</p></li><li><p>不安全：通过插件可以获取到操作系统的任意资源，所以当运行一个插件时，也就意味着这个插件能完全操控操作系统。如果是恶意插件，则会引起安全问题。同样的，页面的恶意脚本也可以进行此类操作</p></li></ul><h3 id="多进程浏览器" tabindex="-1">多进程浏览器 <a class="header-anchor" href="#多进程浏览器" aria-hidden="true">#</a></h3><p>多进程浏览器架构中，页面是运行在单独的渲染进程中的，同时页面中的插件也运行在单独的插件进程中，进程之间通过<code>ipc(inter-Process Communication)</code>机制进行通信</p><h4 id="如何解决不稳定的问题" tabindex="-1">如何解决不稳定的问题 <a class="header-anchor" href="#如何解决不稳定的问题" aria-hidden="true">#</a></h4><p>由于进程是相互隔离的，所以当一个页面或者插件崩溃 时，影响到的仅仅是当前的页面进程或者插件进程，并不会影响到浏览器和其他页面，这就 完美地解决了页面或者插件的崩溃会导致整个浏览器崩溃，也就是不稳定的问题。</p><h4 id="如何解决不流畅问题" tabindex="-1">如何解决不流畅问题 <a class="header-anchor" href="#如何解决不流畅问题" aria-hidden="true">#</a></h4><p>JavaScript 也是运行在渲染进程中 的，所以即使 JavaScript 阻塞了渲染进程，影响到的也只是当前的渲染页面，而并不会影 响浏览器和其他页面，因为其他页面的脚本是运行在它们自己的渲染进程中的</p><p>对于内存泄漏的解决方法那就更简单了，因为当关闭一个页面时，整个渲染进程也会被关闭，之后该进程所占用的内存都会被系统回收。</p><h4 id="如何解决安全问题" tabindex="-1">如何解决安全问题 <a class="header-anchor" href="#如何解决安全问题" aria-hidden="true">#</a></h4><p>采用多进程架构的额外好处是可以使用<code>安全沙箱</code>，你可以把沙箱看成是操作系统给进程上了一把锁，沙箱里面的程序可以运行，但是不能在你的硬盘上写入任何数据，也不能在敏感位置读取任何数据。Chrome 把插件进程和渲染进程锁在沙箱里面，这样即使在渲染进程或者插件进程里 面执行了恶意程序，恶意程序也无法突破沙箱去获取系统权限。</p><h3 id="最新的多进程架构" tabindex="-1">最新的多进程架构 <a class="header-anchor" href="#最新的多进程架构" aria-hidden="true">#</a></h3><p>最新的 Chrome 浏览器包括:1 个浏览器(Browser)主进程、1 个 GPU 进程、1 个网络(NetWork)进程、多个渲染进程和多个插件进程。</p><ul><li>浏览器进程: 主要负责界面显示、用户交互、子进程管理，同时提供存储等功能.</li><li>渲染进程: 核心任务是将 HTML、CSS 和 JavaScript 转换为用户可以与之交互的网页， 排版引擎 Blink 和 JavaScript 引擎 V8 都是运行在该进程中，默认情况下，Chrome 会 为每个 Tab 标签创建一个渲染进程。出于安全考虑，渲染进程都是运行在沙箱模式下.</li><li>GPU 进程: 其实，Chrome 刚开始发布的时候是没有 GPU 进程的。而 GPU 的使用初衷 是为了实现 3D CSS 的效果，只是随后网页、Chrome 的 UI 界面都选择采用 GPU 来绘 制，这使得 GPU 成为浏览器普遍的需求。最后，Chrome 在其多进程架构上也引入了 GPU 进程。</li><li>网络进程: 主要负责页面的网络资源加载，之前是作为一个模块运行在浏览器进程里面 的，直至最近才独立出来，成为一个单独的进程。</li><li>插件进程: 主要是负责插件的运行，因插件易崩溃，所以需要通过插件进程来隔离，以保 证插件进程崩溃不会对浏览器和页面造成影响。</li></ul><p>打开一个chrome页面：最少需要 1 个网络进程、1 个浏览器进程、1 个 GPU 进程以及 1 个渲染进程，如果有运行插件的话，还需要一个插件进程。</p><h3 id="多进程架构带来的问题" tabindex="-1">多进程架构带来的问题 <a class="header-anchor" href="#多进程架构带来的问题" aria-hidden="true">#</a></h3><ul><li>更高的资源占用： 因为每个进程都会包含公共基础结构的副本(如 JavaScript 运行环 境)，这就意味着浏览器会消耗更多的内存资源。</li><li>更复杂的体系架构： 浏览器各模块之间耦合性高、扩展性差等问题，会导致现在的架构已 经很难适应新的需求了。</li></ul><h3 id="未来面向服务的架构" tabindex="-1">未来面向服务的架构 <a class="header-anchor" href="#未来面向服务的架构" aria-hidden="true">#</a></h3><p>面向服务的架构(Services Oriented Architecture，简称SOA)，把 UI、数据库、文件、设备、网络等模块重构为基础服务，类似操作系统 底层服务。如果把Chrome抽象为<code>便携式操作系统</code>，Chrome 基础服务便可以被视为该操作系统的<code>基础</code>系统服务层。</p><p>同时<code>Chrome</code>还提供灵活的弹性架构，在强大性能设备上会以多进程的方式运行基础服 务，但是如果在资源受限的设备上，Chrome 会将很多服务整合到一个进程中，从而节省内存占用。</p>',28)];var t=e(l,[["render",function(e,r,d,l,t,c){return i(),a("div",null,h)}]]);export{d as __pageData,t as default};