# 工程相关优化

## 渲染相关

### 渲染流程

- 生成dom-tree,
- 生成css-tree
- 合成css-dom-tree，也就是render-tree
- 计算布局（layout）:根据生成的render-tree,进行回流，以计算每个节点的几何信息（位置，大小，字体样式）。
- 绘制（painting）：根据渲染树和回流得到的几何信息，得到每个节点的绝对像素
- 展示（display）：将像素发送给图形处理器（GPU）,展示到页面上

### 页面渲染技术架构

#### 服务端渲染

- 后端同步渲染、同构直出页面

#### 客户端渲染

- js渲染：静态化、前后端分离、单页应用
- web app：ang, vue, react

### lazy-load实现

```html
<image src='default.png' :data-src='xxx.png' class='lazy-load-img'>
```

```js
function throttle(fn, time) {
  let isRun = false
  return function() {
    if(isRun) return
    isRun = true
    setTimeout(() => {
      fn.call(this, arguments)
      isRun = false
    }, time);
  }
}
window.scroll = throttle(watchScroll, 200);
function watchScroll() {
  var bodyScrollHeight = document.body.scrollTop;
  var windowHeight =  window.innerHeight;
  var images = document.querySelectorAll("lazy-load-img")
  for (let i = 0; i < images.length; i++) {
    var imgHeight = images[i].offsetTop;
    if (imgHeight  < windowHeight  + bodyScrollHeight) {
       images[i].src = images[i].getAttribute('data-src');
       images[i].className = images[i].className.replace('lazy-load-img','')
    }
  }
}
```

### 预加载

实现方式

1. html标签
2. image对象
3. 使用preload,prefetch,preconnect

```js
<link rel="preload" href="xxx.css">
<link rel="prefetch" href="scr/image.png">
<link rel="dns-prefetch" href="scr/image.png">
<link rel="preconnect" href="https://my.com" crossorigin>
```

## webview

### ios UIWebview

> 不足

1. 内存泄露
2. 极高内存峰值
3. Touch Delay(300ms延迟)
4. JavaScript的运行性能还有通信限制

### ios wkWebview

> 优势

1. 苹果在wwdc 2014上推出的新一代webview组件
2. 内存开销变低
3. 在性能，稳定性，占有内存方面有很大的提升
4. 高达60fps的刷新率
5. 支持右滑返回
6. 更多的html属性

## 监控

### h5质量即时检测

- 页面错误
  - js报错
  - 接口报错
  - 线上环境检测
  - 页面白屏

- 页面性能
  - 页面加载时间检测
  - 前端html，css, js压缩检测
  - js，css个数检测
  - 服务器gzip检测
  - 服务器缓存设置检测

- 页面安全
  - http和https检测
  - xss检测

### 上线后h5性能和错误监控

- 页面性能监控
  - js错误监控
  - API接口监控
  - 日志详情
  - 用户轨迹

- 统计报表
  - 大盘走势
  - 地域
  - 运营商
  - 浏览器

- 页面管理
- 性能服务
- 报警服务

