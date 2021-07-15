# css问题

## 概念

### 重置（resetting）CSS 和 标准化（normalizing）CSS 的区别是什么？你会选择哪种方式，为什么？

- 重置（Resetting）： 重置意味着除去所有的浏览器默认样式。对于页面所有的元素，像margin、padding、font-size这些样式全部置成一样。你将必须重新定义各种元素的样式。
- 标准化没有去掉所有的默认样式，而是保留了有用的一部分，同时还纠正了一些常见错误。

### CSS 选择器的优先级是如何计算的？

1. `a`表示是否使用内联样式（inline style）。如果使用，`a`为 1，否则为 0。
2. `b`表示 ID 选择器的数量。
3. `c`表示类选择器、属性选择器和伪类选择器数量之和。
4. `d`表示标签（类型）选择器和伪元素选择器之和。

!important > 内联样式 > id选择器 > 类选择器 = 伪类选择器 > 元素选择器 > 通配选择器 > 继承

开发时在使用选择器的时候，尽量去选择类选择器或者元素选择器，尽量不要选择优先级太高的!important或者内联样式，以便更好的控制元素样式。

### 格式化上下文（Block Formatting Context）及其工作原理

块格式上下文（BFC）是 Web 页面的可视化 CSS 渲染的部分，是块级盒布局发生的区域，也是浮动元素与其他元素交互的区域。
一个 HTML 盒（Box）满足以下任意一条，会创建块格式化上下文：

- float的值不是none.
- position的值不是static或relative.
- display的值是table-cell、table-caption、inline-block、flex、或inline-flex。
- overflow的值不是visible。

在 BFC 中，每个盒的左外边缘都与其包含的块的左边缘相接。
两个相邻的块级盒在垂直方向上的边距会发生合并（collapse）。

### 雪碧图

雪碧图是把多张图片整合到一张上的图片。它被运用在众多使用了很多小图标的网站上（Gmail 在使用）。实现方法：

- 使用生成器将多张图片打包成一张雪碧图，并为其生成合适的 CSS。
- 每张图片都有相应的 CSS 类，该类定义了background-image、background-position和background-size属性。
- 使用图片时，将相应的类添加到你的元素中。

好处：

- 减少加载多张图片的 HTTP 请求数（一张雪碧图只需要一个请求）。但是对于 HTTP2 而言，加载多张图片不再是问题。
- 提前加载资源，防止在需要时才在开始下载引发的问题，比如只出现在:hover伪类中的图片，不会出现闪烁。

缺点：

- 图片合并麻烦
- 维护麻烦，修改一个图片可能需要从新布局整个图片，样式

### 编写高效的 CSS 应该注意什么？

首先，浏览器从最右边的选择器，即关键选择器（key selector），向左依次匹配。根据关键选择器，浏览器从 DOM 中筛选出元素，然后向上遍历被选元素的父元素，判断是否匹配。选择器匹配语句链越短，浏览器的匹配速度越快。避免使用标签和通用选择器作为关键选择器，因为它们会匹配大量的元素，浏览器必须要进行大量的工作，去判断这些元素的父元素们是否匹配。

### 浏览器如何确定哪些元素与 CSS 选择器匹配

浏览器从最右边的选择器（关键选择器）根据关键选择器，浏览器从 DOM 中筛选出元素，然后向上遍历被选元素的父元素，判断是否匹配。选择器匹配语句链越短，浏览器的匹配速度越快。
例如，对于形如p span的选择器，浏览器首先找到所有<span>元素，并遍历它的父元素直到根元素以找到<p>元素。对于特定的<span>，只要找到一个<p>，就知道'`已经匹配并停止继续匹配。

### link与@import的区别

- link是HTML方式， @import是CSS方式
- link最大限度支持并行下载，@import过多嵌套导致串行下载，出现FOUC
- link可以通过rel="alternate stylesheet"指定候选样式
- 浏览器对link支持早于@import，可以使用@import对老浏览器隐藏样式
- @import必须在样式规则之前，可以在css文件中引用其他文件
- 总体来说：link优于@import

### 什么是FOUC?如何避免

Flash Of Unstyled Content：用户定义样式表加载之前浏览器使用默认样式显示文档，用户样式加载渲染之后再从新显示文档，造成页面闪烁。解决方法：把样式表放到文档的head

## 属性

### z-index

CSS 中的z-index属性控制重叠元素的垂直叠加顺序。z-index只能影响position值不是static的元素。
没有定义z-index的值时，元素按照它们出现在 DOM 中的顺序堆叠（层级越低，出现位置越靠上）。非静态定位的元素（及其子元素）将始终覆盖静态定位（static）的元素，而不管 HTML 层次结构如何。
层叠上下文是包含一组图层的元素。 在一组层叠上下文中，其子元素的z-index值是相对于该父元素而不是 document root 设置的。每个层叠上下文完全独立于它的兄弟元素。如果元素 B 位于元素 A 之上，则即使元素 A 的子元素 C 具有比元素 B 更高的z-index值，元素 C 也永远不会在元素 B 之上.

### Float定位的工作原理

浮动（float）是 CSS 定位属性。浮动元素从网页的正常流动中移出，但是保持了部分的流动性，会影响其他元素的定位（比如文字会围绕着浮动元素）。这一点与绝对定位不同，绝对定位的元素完全从文档流中脱离。
CSS 的clear属性通过使用left、right、both，让该元素向下移动（清除浮动）到浮动元素下面。
如果父元素只包含浮动元素，那么该父元素的高度将塌缩为 0。我们可以通过清除（clear）从浮动元素后到父元素关闭前之间的浮动来修复这个问题。

### 伪元素及其用途

CSS 伪元素是添加到选择器的关键字，去选择元素的特定部分。它们可以用于装饰（:first-line，:first-letter）或将元素添加到标记中（与 content:...组合），而不必修改标记（:before，:after）。

- :first-line和:first-letter可以用来修饰文字。
- 上面提到的.clearfix方法中，使用clear: both来添加不占空间的元素。
- 使用:before和after展示提示中的三角箭头。鼓励关注点分离，因为三角被视为样式的一部分，而不是真正的 DOM。如果不使用额外的 HTML 元素，只用 CSS 样式绘制三角形是不太可能的。

### display的属性值都有哪些？

`none`,`block`,`flex`,`inline-block`,`inline-flex`,`table`,`table-row`,`table-cell`,`list-item`

### 什么情况下，用translate()而不用绝对定位？什么时候，情况相反

`translate()`是transform的一个值。改变transform或opacity不会触发浏览器重新布局（reflow）或重绘（repaint），只会触发复合（compositions）。而改变绝对定位会触发重新布局，进而触发重绘和复合。transform使浏览器为元素创建一个 GPU 图层，但改变绝对定位会使用到 CPU。 因此translate()更高效，可以缩短平滑动画的绘制时间。

当使用translate()时，元素仍然占据其原始空间（有点像position：relative），这与改变绝对定位不同。

### css选择器有哪些

- `*` 通用选择器：选择所有元素，不参与计算优先级，兼容性IE6+
- `#X` id选择器：选择id值为X的元素，兼容性：IE6+
- `.X` 类选择器：选择class包含X的元素，兼容性：IE6+
- `X Y` 后代选择器：选择满足X选择器的后代节点中满足Y选择器的元素，兼容性：IE6+
- `X` 元素选择器：选择标所有签为X的元素，兼容性：IE6+
- `:link，：visited，：focus，：hover，：active链接状态` 选择特定状态的链接元素，顺序LoVe HAte，兼容性: IE4+
- `X + Y` 直接兄弟选择器,在X之后第一个兄弟节点中选择满足Y选择器的元素，兼容性： IE7+
- `X > Y` 子选择器：选择X的子元素中满足Y选择器的元素，兼容性： IE7+
- `X ~ Y` 兄弟：选择X之后所有兄弟节点中满足Y选择器的元素，兼容性： IE7+
- `[attr]` 选择所有设置了attr属性的元素，兼容性IE7+
- `[attr=value]`选择属性值刚好为value的元素
- `[attr~=value]`选择属性值为空白符分隔，其中一个的值刚好是value的元素
- `[attr|=value]`选择属性值刚好为value或者value-开头的元素
- `[attr^=value]`选择属性值以value开头的元素
- `[attr$=value]`选择属性值以value结尾的元素
- `[attr=value]*`选择属性值中包含value的元素
- `[:checked]`选择单选框，复选框，下拉框中选中状态下的元素，兼容性：IE9+
- `X:after, X::after`after伪元素，选择元素虚拟子元素（元素的最后一个子元素），CSS3中::表示伪元素。兼容性:after为IE8+，::after为IE9+
- `:hover`鼠标移入状态的元素，兼容性a标签IE4+， 所有元素IE7+
- `:not(selector)`选择不符合selector的元素。不参与计算优先级，兼容性：IE9+
- `::first-letter`伪元素，选择块元素第一行的第一个字母，兼容性IE5.5+
- `::first-line`伪元素，选择块元素的第一行，兼容性IE5.5+
- `:nth-child(an + b)`伪类，选择前面有an + b - 1个兄弟节点的元素，其中n >= 0， 兼容性IE9+
- `:nth-last-child(an + b)`伪类，选择后面有an + b - 1个兄弟节点的元素 其中n >= 0，兼容性IE9+
- `X:nth-of-type(an+b)`伪类，X为选择器，解析得到元素标签，选择前面有an + b - 1个相同标签兄弟节点的元素。兼容性IE9+
- `X:nth-last-of-type(an+b)`伪类，X为选择器，解析得到元素标签，选择后面有an+b-1个相同标签兄弟节点的元素。兼容性IE9+
- `X:first-child`伪类，选择满足X选择器的元素，且这个元素是其父节点的第一个子元素。兼容性IE7+
- `X:last-child`伪类，选择满足X选择器的元素，且这个元素是其父节点的最后一个子元素。兼容性IE9+
- `X:only-child`伪类，选择满足X选择器的元素，且这个元素是其父元素的唯一子元素。兼容性IE9+
- `X:only-of-type`伪类，选择X选择的元素，解析得到元素标签，如果该元素没有相同类型的兄弟节点时选中它。兼容性IE9+
- `X:first-of-type`伪类，选择X选择的元素，解析得到元素标签，如果该元素 是此此类型元素的第一个兄弟。选中它。兼容性IE9+

## 动画

### 贝塞尔曲线

②cubic-bezier() 函数
贝塞尔曲线曲线由四个点 P0，P1，P2 和 P3 定义。P0 和 P3 是曲线的起点和终点。P0是（0,0）并且表示初始时间和初始状态，P3是（1,1）并且表示最终时间和最终状态。
1
P0：默认值 (0, 0) P1：动态取值 (x1, y1) P2：动态取值 (x2, y2) P3：默认值 (1, 1)
我们需要关注的是 P1 和 P2 两点的取值，而其中 X 轴的取值范围是 0 到 1，当取值超出范围时 cubic-bezier 将失效；Y 轴的取值没有规定，当然也毋须过大。

最直接的理解是，将以一条直线放在范围只有 1 的坐标轴中，并从中间拿出两个点来拉扯（X 轴的取值区间是 [0, 1]，Y 轴任意），最后形成的曲线就是动画的速度曲线。

cubic-bezier() 可用于 animation-timing-function 和 transition-timing-function 属性。

语法：cubic-bezier(x1,y1,x2,y2)

③贝塞尔曲线的快慢
cubic-bezier(x1,y1,x2,y2)
快慢由斜率k决定，k1=y1/x1,k2=y2/x2, k>0 则为快，k<0则为慢
图解 <https://cubic-bezier.com/#.17,.67,.83,.67>

## flex

### 容器

flex-direction: row，row-reverse, column, column-reverse
flex-warp: warp, no-warp, warp-reverse
flex-flow: row nowarp
justify-content: flex-start, flex-end, center, space-between, space-around
align-item: flex-start, flex-end, center, stretch, baseline
align-content: flex-start | flex-end | center | space-between | space-around | stretch;

### 子项

order: 排序
flex-grow: 放大比例
flex-shrink: 缩小比例
align-self: 私有对其方式
