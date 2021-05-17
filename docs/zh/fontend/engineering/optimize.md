# 性能优化

## 代码层面

编写代码阶段需要注意

### 精简HTML代码

- 减少HTML嵌套
- 减少DOM节点
- 减少无语义代码
- 减少重绘和重排

### 减少重排和重绘

> 浏览器渲染过程

- 解析HTML生成DOM树。
- 解析CSS生成CSSOM规则树。
- 将DOM树与CSSOM规则树合并在一起生成渲染树。
- 遍历渲染树开始布局，计算每个节点的位置大小信息。
- 将渲染树每个节点绘制到屏幕。

> 重排
当改变DOM元素位置或大小时，会导致浏览器重新生成渲染树，这个过程叫重排

> 重绘

当重新生成渲染树后，只要将渲染树每个节点绘制到屏幕，这个过程叫重绘。不是所有动作都会导致重排。重排导致重绘，重绘不会导致重排。

重排与重绘两个操作都非常昂贵，JavaScript引擎线程会与GUI渲染线程互斥，他们同时只能一个在工作。

什么操作会导致重排？

- 添加或删除可见的DOM元素
- 元素位置改变
- 元素尺寸改变
- 内容改变
- 浏览器窗口尺寸改变

如何减少重排重绘

- 用 JavaScript 修改样式时，最好不要直接写样式，而是替换 class 来改变样式。
- 如果要对 DOM 元素执行一系列操作，可以将 DOM 元素脱离文档流，修改完成后，再将它带回文档。推荐使用隐藏元素（display:none）或文档碎片（DocumentFragement），都能很好的实现这个方案。

### 使用事件委托

事件委托就是利用事件冒泡，只指定一个事件处理程序，就可以管理某一类的所有事件。所有用到按钮的事件（多数鼠标事件和键盘事件）都适合采用事件委托技术， 使用事件委托可以节省内存。

```html
<ul>
  <li>苹果</li>
  <li>香蕉</li>
  <li>凤梨</li>
</ul>
<script>
// good
document.querySelector('ul').onclick = (event) => {
  const target = event.target
  if (target.nodeName === 'LI') {
    console.log(target.innerHTML)
  }
}

// bad
document.querySelectorAll('li').forEach((e) => {
  e.onclick = function() {
    console.log(this.innerHTML)
  }
})
</script>
```

### 注意程序的局部性

一个编写良好的计算机程序常常具有良好的局部性，它们倾向于引用最近引用过的数据项附近的数据项，或者最近引用过的数据项本身，这种倾向性，被称为局部性原理。有良好局部性的程序比局部性差的程序运行得更快。
局部性通常有两种不同的形式

时间局部性：在一个具有良好时间局部性的程序中，被引用过一次的内存位置很可能在不远的将来被多次引用。
空间局部性 ：在一个具有良好空间局部性的程序中，如果一个内存位置被引用了一次，那么程序很可能在不远的将来引用附近的一个内存位置。

时间局部性示例

```js
function sum(arry) {
    let i, sum = 0
    let len = arry.length

    for (i = 0; i < len; i++) {
        sum += arry[i]
    }

    return sum
}
```

```js
// 二维数组 
function sum1(array, rows, cols) {
    let i, j, sum = 0

    for (i = 0; i < rows; i++) {
        for (j = 0; j < cols; j++) {
            sum += array[i][j]
        }
    }
    return sum
}
```

```js
// 二维数组 
function sum2(array, rows, cols) {
    let i, j, sum = 0

    for (j = 0; j < cols; j++) {
        for (i = 0; i < rows; i++) {
            sum += array[i][j]
        }
    }
    return sum
}
```

看一下上面的两个空间局部性示例，像示例中从每行开始按顺序访问数组每个元素的方式，称为具有步长为1的引用模式。 如果在数组中，每隔k个元素进行访问，就称为步长为k的引用模式。 一般而言，随着步长的增加，空间局部性下降。

这两个例子有什么区别？区别在于第一个示例是按行扫描数组，每扫描完一行再去扫下一行；第二个示例是按列来扫描数组，扫完一行中的一个元素，马上就去扫下一行中的同一列元素。

数组在内存中是按照行顺序来存放的，结果就是逐行扫描数组的示例得到了步长为 1 引用模式，具有良好的空间局部性；而另一个示例步长为 rows，空间局部性极差。

### 判断条件优化

当判断条件数量越来越多时，越倾向于使用switch而不是if-else

```js
if (color == 'blue') {

} else if (color == 'yellow') {

} else if (color == 'white') {

} else if (color == 'black') {

} else if (color == 'green') {

} else if (color == 'orange') {

} else if (color == 'pink') {

}

switch (color) {
    case 'blue':

        break
    case 'yellow':

        break
    case 'white':

        break
    case 'black':

        break
    case 'green':

        break
    case 'orange':

        break
    case 'pink':

        break
}
```

从使用时机来说，当条件值大于两个的时候，使用 switch 更好。不过 if-else 也有 switch 无法做到的事情，例如有多个判断条件的情况下，无法使用 switch。

```js
const results = ['blue', 'yellow', 'white', 'black', 'green', 'orange', 'pink']
return results[index]
const map = {
  condition1: result1,
  condition2: result2,
}
```

当条件语句特别多时，使用 switch 和 if-else 不是最佳的选择，这时不妨试一下查找表。查找表可以使用数组和对象来构建。

## 网络加载优化

### 减少 HTTP 请求

一个完整的 HTTP 请求需要经历 DNS 查找，TCP 握手，浏览器发出 HTTP 请求，服务器接收请求，服务器处理请求并发回响应，浏览器接收响应等过程。从头到尾：

- Queueing：在请求队列中的时间
- Stalled：从TCP连接建立完成，到真正可以传输数据之间的时间差，此时时间包括代理协商时间
- Proxy negotiation：与代理服务器连接进行协商所花费的时间
- DNS Lookup：执行DNS查找所花费的时间，页面上每个不同的域都需要进行DNS查找
- Initial Connection/Connecting：建立连接所花费的时间，包括TCP握手/重试和协商SSL
- SSL: 完成SSL握手所花费的时间。
- Request sent: 发出网络请求所花费的时间，通常为一毫秒的时间。
- Waiting(TFFB): TFFB 是发出页面请求到接收到应答数据第一个字节的时间。
- Content Download: 接收响应数据所花费的时间。

从这个例子可以看出，真正下载数据的时间占比为 13.05 / 204.16 = 6.39%，文件越小，这个比例越小，文件越大，比例就越高。这就是为什么要建议将多个小文件合并为一个大文件，从而减少 HTTP 请求次数的原因。

参考资料：<https://developers.google.com/web/tools/chrome-devtools/network/understanding-resource-timing>

### 使用HTTP2

HTTP2的优点

#### 解析速度加快

服务器解析HTTP1.1的请求时，必须不断地读入字节，直到遇到分隔符CRLF为止。而解析HTTP2的请求不用这么麻烦，HTTP2是基于帧的协议，每个帧都有表示帧长度的字段。

#### 多路复用

HTTP1.1如果同时发起多个请求，就得建立多个TCP连接，因为一个TCP连接同时只能处理一个HTTP1.1的请求。

在HTTP2上，多个请求可以共用一个TCP连接，这称为多路复用。同一个请求和响应用一个流来表示，并有唯一的流ID来标识。多个请求和响应在TCP连接中可以乱序发送，到达目的地后再通过流ID重新组建。

#### 首部压缩

HTTP2提供来首部压缩功能
例如有如下两个请求：

```tcp
// 请求1
:authority: unpkg.zhimg.com
:method: GET
:path: /za-js-sdk@2.16.0/dist/zap.js
:scheme: https
accept: */*
accept-encoding: gzip, deflate, br
accept-language: zh-CN,zh;q=0.9
cache-control: no-cache
pragma: no-cache
referer: https://www.zhihu.com/
sec-fetch-dest: script
sec-fetch-mode: no-cors
sec-fetch-site: cross-site
user-agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36

// 请求2
:authority: zz.bdstatic.com
:method: GET
:path: /linksubmit/push.js
:scheme: https
accept: */*
accept-encoding: gzip, deflate, br
accept-language: zh-CN,zh;q=0.9
cache-control: no-cache
pragma: no-cache
referer: https://www.zhihu.com/
sec-fetch-dest: script
sec-fetch-mode: no-cors
sec-fetch-site: cross-site
user-agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36
```

从上面两个请求可以看出来，有很多数据都是重复的。如果可以把相同的首部存储起来，仅发送他们之间不同的部分，就可以节省不少的流量，加速请求。

HTTP/2 在客户端和服务器端使用“首部表”来跟踪和存储之前发送的键－值对，对于相同的数据，不再通过每次请求和响应发送。

```http
Header1:foo
Header2:bar
Header3:bat
```

当客户端发送请求时，它会根据首部值创建一张表：

| 索引 | 首部名称 | 值 |
| - | - | - |
| 62 | Header1 | foo |
| 63 | Header2 | bar |
| 64 | Header3 | bat |

#### 优先级

HTTP2可以对比较紧急的请求设置一个较高的优先级，服务器在收到这样的请求后，可以优先处理。

#### 流量控制

由于一个 TCP 连接流量带宽（根据客户端到服务器的网络带宽而定）是固定的，当有多个请求并发时，一个请求占的流量多，另一个请求占的流量就会少。流量控制可以对不同的流的流量进行精确控制。

#### 服务器推送

HTTP2 新增的一个强大的新功能，就是服务器可以对一个客户端请求发送多个响应。换句话说，除了对最初请求的响应外，服务器还可以额外向客户端推送资源，而无需客户端明确地请求。
例如当浏览器请求一个网站时，除了返回 HTML 页面外，服务器还可以根据 HTML 页面中的资源的 URL，来提前推送资源。

参考资料 <https://github.com/woai3c/Front-end-articles/blob/master/http-https-http2.md>
http2简介 <https://developers.google.com/web/fundamentals/performance/http2/?hl=zh-cn>

### 静态资源使用 CDN

内容分发网络（CDN）是一组分布在多个不同地理位置的 Web 服务器。我们都知道，当服务器离用户越远时，延迟越高。CDN 就是为了解决这一问题，在多个位置部署服务器，让用户离服务器更近，从而缩短请求时间。

#### CDN 原理

当用户访问一个网站时，如果没有CDN，过程是这样的：

1. 浏览器要将域名解析为IP地址，所以需要向本地DNS发出请求。
2. 本地 DNS 依次向根服务器、顶级域名服务器、权限服务器发出请求，得到网站服务器的 IP 地址。
3. 本地 DNS 将 IP 地址发回给浏览器，浏览器向网站服务器 IP 地址发出请求并得到资源。

如果用户访问的网站部署了 CDN，过程是这样的：

1. 浏览器要将域名解析为 IP 地址，所以需要向本地 DNS 发出请求。
2. 本地 DNS 依次向根服务器、顶级域名服务器、权限服务器发出请求，得到全局负载均衡系统（GSLB）的 IP 地址。
3. 本地 DNS 再向 GSLB 发出请求，GSLB 的主要功能是根据本地 DNS 的 IP 地址判断用户的位置，筛选出距离用户较近的本地负载均衡系统（SLB），并将该 SLB 的 IP 地址作为结果返回给本地 DNS。
4. 本地 DNS 将 SLB 的 IP 地址发回给浏览器，浏览器向 SLB 发出请求。
5. SLB 根据浏览器请求的资源和地址，选出最优的缓存服务器发回给浏览器。
6. 浏览器再根据 SLB 发回的地址重定向到缓存服务器。
7. 如果缓存服务器有浏览器需要的资源，就将资源发回给浏览器。如果没有，就向源服务器请求资源，再发给浏览器并缓存在本地。

CDN是什么？使用CDN有什么优势？
CDN原理解析

### 将 CSS 放在文件头部，JavaScript 文件放在底部

所有放在 head 标签里的 CSS 和 JS 文件都会堵塞渲染。如果这些 CSS 和 JS 需要加载和解析很久的话，那么页面就空白了。所以 JS 文件要放在底部，等 HTML 解析完了再加载 JS 文件。

那为什么 CSS 文件还要放在头部呢？

因为先加载 HTML 再加载 CSS，会让用户第一时间看到的页面是没有样式的、“丑陋”的，为了避免这种情况发生，就要将 CSS 文件放在头部了。

另外，JS 文件也不是不可以放在头部，只要给 script 标签加上 defer 属性就可以了，异步下载，延迟执行。

### 善用缓存，不重复加载相同的资源

为了避免用户每次访问网站都得请求文件，我们可以通过添加 Expires 或 max-age 来控制这一行为。Expires 设置了一个时间，只要在这个时间之前，浏览器都不会请求文件，而是直接使用缓存。而 max-age 是一个相对时间，建议使用 max-age 代替 Expires 。

不过这样会产生一个问题，当文件更新了怎么办？怎么通知浏览器重新请求文件？

可以通过更新页面中引用的资源链接地址，让浏览器主动放弃缓存，加载新资源。

具体做法是把资源地址 URL 的修改与文件内容关联起来，也就是说，只有文件内容变化，才会导致相应 URL 的变更，从而实现文件级别的精确缓存控制。什么东西与文件内容相关呢？我们会很自然的联想到利用数据摘要要算法对文件求摘要信息，摘要信息与文件内容一一对应，就有了一种可以精确到单个文件粒度的缓存控制依据了。

### 压缩文件

压缩文件可以减少文件下载时间，让用户体验性更好。得益于 webpack 和 node 的发展，现在压缩文件已经非常方便了。

在 webpack 可以使用如下插件进行压缩：

- JavaScript：UglifyPlugin
- CSS ：MiniCssExtractPlugin
- HTML：HtmlWebpackPlugin

其实，我们还可以做得更好。那就是使用 gzip 压缩。可以通过向 HTTP 请求头中的 Accept-Encoding 头添加 gzip 标识来开启这一功能。当然，服务器也得支持这一功能。
gzip 是目前最流行和最有效的压缩方法。举个例子，我用 Vue 开发的项目构建后生成的 app.js 文件大小为 1.4MB，使用 gzip 压缩后只有 573KB，体积减少了将近 60%。`compression``compression-webpack-plugin`

### 图片优化

### JPEG（Joint Photographic Experts Group）

- JPEG是一种针对彩色照片而广泛使用的有损压缩图形格式
- 格栅图形，常用文件拓展名为.jpg，也有.jpeg、.jpe。JPEG在互联网上常用于存储和传输图片。
- 不适合: 线条图形和文字，图标图形，因为其算法不支持这类型的图形，并且不支持透明度。
- 非常合适：颜色丰富的照片，彩色图大焦点图，通栏banner图;结构不规则的图形。

### PNG（Portable Network Graphics）

- 便携式网络图形是一种无损压缩的位图图形格式，支持索引、灰度、RGB三种颜色方案已经Alpha通道特性
- 格栅图形，PNG最初是作为替代GIF来设计的，能够显示256色，文件比JPEG或者GIF大，但是PNG非常好的保留来图像质量，支持Alpha通道的半透明和透明特性，最高支持24位彩色图像（png-24）和8位灰度图像（png-8）
- 不适合：由于是无损存储，彩色图像体积太大，不太适合。
- 适合：纯色，透明，线条绘图，图标;边缘清晰，有大块相同颜色区域；颜色数较少，但需要半透明。

### GIF（Graphics Interchange Format）

- 图像互换格式是一种位图图形文件格式，以8位色（即256种颜色）重现真彩色的图像，采用LZW压缩算法进行编码
- 介绍：格栅图形。支持256色；仅支持完全透明和不透明；如果需要通用动画，GIF是唯一选择。
- 不适合：每个像素只要8比特，不适合存储彩色图片
- 非常适合：动画，图标

### webp

- 现代化的图像格式，可为图像提供有损压缩和无损压缩，使其非常灵活。
- 可以插入多帧，实现动画效果，可以设置透明度，采用8位压缩算法。无损的webp比png小26%，有损的webp比jpeg小25%-34%，比gif有更好的动画。
- 不适合：最多处理256色，不适合于彩色图片。
- 适合：适用于图形和半透明图像。

> 图片延迟加载

延迟加载图片即可

> 响应式图片

响应式图片的优点是浏览器能够根据屏幕大小自动加载合适的图片。
通过 `picture` 实现

```html
<picture>
    <source srcset="banner_w1000.jpg" media="(min-width: 801px)">
    <source srcset="banner_w800.jpg" media="(max-width: 800px)">
    <img src="banner_w800.jpg" alt="">
</picture>
```

```css
@media (min-width: 769px) {
    .bg {
        background-image: url(bg1080.jpg);
    }
}
@media (max-width: 768px) {
    .bg {
        background-image: url(bg768.jpg);
    }
}
```

> 调整图片大小

先展示缩略图，后展示大图。

> 降低图片质量

通过webpack插件`image-webpack-loader`

> 尽可能的利用css3效果代替图片

有很多图片使用 CSS 效果（渐变、阴影等）就能画出来，代码大小通常是图片大小的几十分之一

> 使用webp格式的图片

WebP 的优势体现在它具有更优的图像数据压缩算法，能带来更小的图片体积，而且拥有肉眼识别无差异的图像质量；同时具备了无损和有损的压缩模式、Alpha 透明以及动画的特性，在 JPEG 和 PNG 上的转化效果都相当优秀、稳定和统一。

> 用工具进行图片压缩

- png压缩工具

```bash
yarn add node-pngquant-native
```

跨平台，压缩比高，压缩png24非常好

- jpg压缩工具

```bash
yarn add jpegtran
```

- gif压缩

Gifsicel压缩工具

> 响应式图片

- js绑定事件检测窗口大小
- css媒体查询
- img标签属性

> 逐步加载图像

- 使用统一占位符
- 使用LQIP（低质量图片占位符）,`npm install lqip`
- 使用SQIP（基于SVG的图像占位符），`npm install sqip`

> 图片服务器自动优化解密

图片服务器自动化优化是可以在图片URL链接上增加不同特殊参数，服务器自动化生成。
不同格式，大小，质量的图片

> 处理方式

图片裁剪：按长边，短边，填充，拉伸等缩放。
图片格式转换：支持JPG,GIF,PNG,WEBP等，支持不同的图片压缩率。
图片处理：添加图片水印，高斯模糊，重心处理，裁剪边框等。
AI能力：鉴黄，智能抠图，智能配色，智能排版，智能合成等AI能力。

## 工程化优化

### 使用服务端渲染

客户端渲染: 获取 HTML 文件，根据需要下载 JavaScript 文件，运行文件，生成 DOM，再渲染。

服务端渲染：服务端返回 HTML 文件，客户端只需解析 HTML。

- 优点：首屏渲染快，SEO 好。
- 缺点：配置麻烦，增加了服务器的计算压力。

#### 通过webpack按需加载代码，提取第三方库代码，减少ES6转为ES5的冗余代码

懒加载或者按需加载，是一种很好的优化网页或应用的方式。这种方式实际上是先把你的代码在一些逻辑断点处分离开，然后在一些代码块中完成某些操作后，立即引用或即将引用另外一些新的代码块。这样加快了应用的初始加载速度，减轻了它的总体体积，因为某些代码块可能永远不会被加载。

> 根据文件内容生成文件名，结合import动态引入组件实现按需加载

通过配置output的filename属性可以实现这个需求，filename 属性的值选项中有一个 [contenthash]，它将根据文件内容创建出唯一 hash。当文件内容发生变化时，[contenthash] 也会发生变化。

```js
output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '../dist'),
},
```

> 提取第三方库

由于引入的第三方库一般都比较稳定，不会经常改变。所以将它们单独提取出来，作为长期缓存是一个更好的选择。 这里需要使用 webpack4 的 splitChunk 插件 cacheGroups 选项。

```js
optimization: {
    runtimeChunk: {
        name: 'manifest' // 将 webpack 的 runtime 代码拆分为一个单独的 chunk。
    },
    splitChunks: {
        cacheGroups: {
            vendor: {
                name: 'chunk-vendors',
                test: /[\\/]node_modules[\\/]/,
                priority: -10,
                chunks: 'initial'
            },
            common: {
                name: 'chunk-common',
                minChunks: 2,
                priority: -20,
                chunks: 'initial',
                reuseExistingChunk: true
            }
        },
    }
},
```

- test: 用于控制哪些模块被这个缓存组匹配到。原封不动传递出去的话，它默认会选择所有的模块。可以传递的值类型：RegExp、String和Function;
- priority：表示抽取权重，数字越大表示优先级越高。因为一个 module 可能会满足多个 cacheGroups 的条件，那么抽取到哪个就由权重最高的说了算；
- reuseExistingChunk：表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的。
- minChunks（默认是1）：在分割之前，这个代码块最小应该被引用的次数（译注：保证代码块复用性，默认配置的策略是不需要多次引用也可以被分割）
- chunks (默认是async) ：initial、async和all
- name(打包的chunks的名字)：字符串或者函数(函数可以根据条件自定义名字)

## 动画与页面优化

### 避免页面的卡顿

#### 60fps与设备刷新率

目前大多数设备的屏幕刷新率为 60 次/秒。因此，如果在页面中有一个动画或渐变效果，或者用户正在滚动页面，那么浏览器渲染动画或页面的每一帧的速率也需要跟设备屏幕的刷新率保持一致。 其中每个帧的预算时间仅比 16 毫秒多一点 (1 秒/ 60 = 16.66 毫秒)。但实际上，浏览器有整理工作要做，因此您的所有工作需要在 10 毫秒内完成。如果无法符合此预算，帧率将下降，并且内容会在屏幕上抖动。 此现象通常称为卡顿，会对用户体验产生负面影响。

> 举例

例如用JavaScript修改了DOM，并触发样式修改，经历重排重绘最后画到屏幕上，如果其中任意一项执行过长，都会导致渲染这一帧的时间过长，平均帧率下降。

对于一些长时间运行的 JavaScript，我们可以使用定时器进行切分，延迟执行。

```js
for (let i = 0, len = array.length; i < len; i++) {
    process(array[i])
}
```

如果上面的循环结构由于process()复杂度过高或数组元素太多，可以尝试切分。

```js
const todo = array.concat()
setTimeout(function(){
  process(todo.shift())
  if (todo.length) {
    setTimeout(arguments.callee, 25)
  } else {
    callback(aarry)
  }
}, 25)
```

渲染性能 <https://developers.google.com/web/fundamentals/performance/rendering>

### 使用 requestAnimationFrame 来实现视觉变化

保证 JavaScript 在帧开始时运行的唯一方式是使用 requestAnimationFrame

```js
function updateScreen(time) {
  // Make visual updates here.
}

requestAnimationFrame(updateScreen);
```

#### 使用 Web Worker

主线程阻塞是输入延迟的主要原因之一。`Web Workers` 可以让你在与主执行线程分离的后台线程上运行 `JavaScript`，这样做的好处是可以在一个单独的线程中执行费时的处理任务，从而允许主（通常是UI）线程运行而不被阻塞。将非 UI 操作移至单独的工作线程可以减少主线程的阻塞时间，从而改善 `FID`

创建一个新的 worker 很简单，指定一个脚本的 URI 来执行 worker 线程（main.js）：

```js
var myWorker = new Worker('worker.js');
// 你可以通过postMessage() 方法和onmessage事件向worker发送消息。
first.onchange = function() {
  myWorker.postMessage([first.value,second.value]);
  console.log('Message posted to worker');
}

second.onchange = function() {
  myWorker.postMessage([first.value,second.value]);
  console.log('Message posted to worker');
}
```

在 worker 中接收到消息后，我们可以写一个事件处理函数代码作为响应（worker.js）：

```js
onmessage = function(e) {
  console.log('Message received from main script');
  var workerResult = 'Result: ' + (e.data[0] * e.data[1]);
  console.log('Posting message back to main script');
  postMessage(workerResult);
}
```

在 worker 中接收到消息后，我们可以写一个事件处理函数代码作为响应（worker.js）：

```js
onmessage = function(e) {
  console.log('Message received from main script');
  var workerResult = 'Result: ' + (e.data[0] * e.data[1]);
  console.log('Posting message back to main script');
  postMessage(workerResult);
}
```

onmessage处理函数在接收到消息后马上执行，代码中消息本身作为事件的data属性进行使用。这里我们简单的对这2个数字作乘法处理并再次使用postMessage()方法，将结果回传给主线程。
回到主线程，我们再次使用onmessage以响应worker回传的消息：

```js
myWorker.onmessage = function(e) {
  result.textContent = e.data;
  console.log('Message received from worker');
}
```

## Core Web Vitals

新一代的web优化指标

- `Largest Contentful Paint (LCP)`：衡量加载体验：为了提供良好的用户体验， `LCP` 应该在页面首次开始加载后的 `2.5` 秒内发生
- `First Input Delay (FID)`：衡量可交互性，为了提供良好的用户体验，页面的 `FID` 应当小于 100毫秒。
- `Cumulative Layout Shift (CLS)`：衡量视觉稳定性，为了提供良好的用户体验，页面的CLS应保持小于 0.1。

### LCP较差的最常见原因是

- 服务器响应时间慢
- 阻断渲染的 Javascript 和 CSS
- 资源加载时间慢
- 客户端渲染

### 改善

#### 优化服务器

TTFB首字节相应时间（TTFB）是最初的网络请求被发起到从服务器接收到第一个字节这段时间，它包含了 TCP 连接时间，发送 HTTP 请求时间和获得响应消息第一个字节的时间

- 缓存 HTML 离线页面，缓存页面资源，减少浏览器对资源的请求
- 尽量减小资源阻断渲染：`CSS` 和 `JavaScript` 压缩、合并、级联、内联等等
- 对图片进行优化。转化图片的格式为 `JPG` 或者 `WEBP` 等等的格式，降低图片的大小，以加快请求的速度。
- 对 HTML 重写、压缩空格、去除注释等。减少 `HTML` 大小，加快速度。
- 使用 `preconnect` 尽快与服务器建立链接、使用 `dns-prefetch` 尽快进行 `DNS` 查找。
- 使用 CDN 加快请求速度

#### 优化阻断渲染的资源

`JavaScript` 和 `CSS` 都是会阻断页面渲染的资源，需要尽可能的对 `CSS` 和 `JavaScript` 文件进行压缩、延迟加载首屏无需使用的 JavaScript、内联关键的 CSS 等来减小阻断时间。

#### 优化资源加载时间

影响LCP的因素

- img元素
- image内的svg
- video元素
- 通过 url() 函数加载背景图片的元素
- 包含文本节点或其他内联文本元素子级的块级元素。

优化手段

- 降低资源大小
- 对重要的资源进行预加载
- 使用 Gzip 和 Brotli 压缩页面资源，降低传输时间
- 使用 service worker 缓存资源

#### 服务端渲染

使用服务端渲染可以确保首先在服务器上呈现页面内容，可以有效改善 LCP，但是相比客户端渲染的缺点是会加大页面从而影响 TTFB、服务端渲染需要等待所有 js 执行完毕后才能相应用户输入，这会使交互体验变差。

### FID（First Input Delay）

即记录用户和页面进行首次交互操作所花费的时间 。`FID` 指标影响用户对页面交互性和响应性的第一印象。 为了提供良好的用户体验，站点应努力使首次输入延迟小于 `100` 毫秒。

#### 减少 JavaScript 执行时间

- 缩小并压缩 JavaScript 文件
- 延迟加载首屏不需要的 JavaScript
- 尽量减少未使用的 polyfill

#### 分解耗时任务

任何阻塞主线程 50 毫秒或更长时间的代码段都可以称为“长任务”，我们可以将长的耗时任务拆分为较小的异步任务.

### CLS（Cumulative Layout Shift）

`CLS` 会测量在页面的整个生命周期中发生的每个意外的样式移动的所有单独布局更改得分的总和。布局的移动可能发生在可见元素从一帧到下一帧改变位置的任何时候。为了提供良好的用户体验，网站应努力使 `CLS` 分数小于 0.1

- 永远不要在现有内容之上插入内容，除非是响应用户交互。这确保了预期的布局变化
- 宁可转换动画，也不要转换触发布局变化的属性的动画。以一种提供从一个状态到另一个状态的上下文和连续性的方式动画转换
- 不要使用无尺寸元素

#### 提前给广告位预留空间

很多页面广告都是动态插入的，所以一定要提前为广告位预留一定空间。

#### 警惕字体变化

字体通常是大文件，需要一段时间才能加载，一些浏览器直到下载完字体后才呈现文本

## webpack性能优化

### treeShaking

tree-shaking 是一个术语，通常指在 JavaScript 上下文中移除未使用的代码(dead-code)。它依赖于 ES2015 模块语法中的静态结构特性，例如 import 和 export。这个术语和概念兴起于 ES2015 模块打包工具 rollup。
webpack 4 版本扩展了这个功能，通过 package.json 的 "sideEffects" 属性作为标记，向编译器提供了提示，表示项目中的哪些文件是“纯”的，因此在未使用时可以安全删除它们。
webpack 打包过程中，对 ES2015 模块代码能够进行 tree-shaking，减少无用代码缩小项目体积大小，起到优化项目的作用。

使用 tree-shaking 需要：

- 1、使用 ES6 模块语法，这样 webpack 能够标记出来未使用的代码（dead-code）,
- 2、使用 UglifyJSPlugin 这样的压缩工具来删除 tree-shaking 标记出来的无用代码。(webpack4 可以使用 mode 选项开启默认优化)

#### 擦除无用的 CSS

使用 PurgeCSS 来完成对无用 css 的擦除，它需要和 mini-css-extract-plugin 配合使用。

#### 图片压缩

image-webpack-loader，

#### 拆分代码

使用 splitChunksPlugin 把一个大的文件分割成几个小的文件，这样也可以有效的提升 webpack 的打包速度，详细的配置介绍大家可以看笔者写的 配置 SplitChunksPlugin，里面详细介绍了怎么配置 splitChunks。
