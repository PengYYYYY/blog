# CSS

## 基础知识

### 选择符号

- id选择器: `#id`
- 类选择器: `.class`
- 标签选择器: `h1,p,div`
- 紧邻同胞选择器: `h1 + p`（选的是h1后紧跟的那个p）
- 一般同胞选择器: `h1 ~ p`（选择所有跟在h1后的p）
- 子选择器: `ul>li`
- 后代选择器: `ul li`
- 通配符选择器: `*`
- 属性选择器: `a[rel = "external"]`
- 伪类选择器: `a:hover, li:nth-child`

### CSS优先级算法

- 同权重下，权限由高到低:

1. 元素标签里（行内样式/内联样式）
2. 写在 `<style>` 标签里（嵌入样式）
3. 写在单独的 CSS 样式表中（链接样式）
4. 在样式表中链接其他样式表：@import url(css/styles2.css)

- 不同权重计算

!important >  id > class > tag

!important 优于一切

- 权重计算方法：

1. 行间样式的特殊性是1,0,0,0
2. ID选择器的特殊性值，加0,1,0,0。
3. 类选择器、属性选择器或伪类，加0,0,1,0。
4. 元素和伪元素，加0,0,0,1。
5. 通配选择器 * 对特殊性没有贡献，即0,0,0,0。

## flex布局和grid布局

### flex布局

采用 `Flex` 布局的元素，称为 `Flex` 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 `Flex` 项目（flex item），简称"项目"。

容器默认存在两根轴: 水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴开始的位置叫做 `main start`,结束位置叫做`main end`。交叉轴的开始位置叫做 `cross start`, 交叉位置开始位置叫做 `cross end`。

项目默认沿主轴排列。单个项目占据的主轴空间叫做`main size`，占据的交叉轴空间叫做`cross size`。

#### flex-direction属性

flex-direction属性决定主轴的方向

```css
.box {
  flex-direction: row | row-reverse | column | column-reverse
}
```

- row: 默认值，主轴为水平方向，起点在左端。
- row-reverse: 主轴为水平方向，起点在右端。
- column: 主轴为垂直方向，起点顶端。
- column-reverse: 主轴为垂直方向，起点为底端。

#### flex-wrap属性

项目下，子项目都排在一条线（又称"轴线"）上

```css
.box{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

- nowrap: 默认值，不换行
- wrap: 换行
- wrap-reverse: 换行，第一行在下方

#### flex-flow

`flex-direction` 和 `flex-flow` 的集合

#### justify-content属性

定义了项目在主轴上的对齐方式

```css
.box {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

- flex-start（默认值）：左对齐
- flex-end：右对齐
- center： 居中
- space-between：两端对齐，项目之间的间隔都相等。
- space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

#### align-items属性

定义项目在交叉轴上如何对齐。

```css
.box {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```

- flex-start：交叉轴的起点对齐。
- flex-end：交叉轴的终点对齐。
- center：交叉轴的中点对齐。
- baseline: 项目的第一行文字的基线对齐。
- stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

> 项目的属性

#### order属性

数值越小，排列越靠前，默认为0。

```css
.item {
  order: <integer>;
}
```

#### flex-grow属性

属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。

```css
.item {
  flex-grow: <number>; /* default 0 */
}
```

如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

#### flex-shrink属性

定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小,flex 元素仅在默认宽度之和大于容器的时候才会发生收缩，其收缩的大小是依据 flex-shrink 的值。设置为0时不缩小。

#### flex-basis属性

定义了在分配多余空间之前，项目占据的主轴空间（main size）。

#### flex属性

flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。

该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。

#### align-self属性

允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性

### Grid

#### display 属性

```css
div {
  display: grid | inline-grid;
}
```

#### grid-template-columns 属性、grid-template-rows 属性

`grid-template-columns`属性定义每一列的列宽, `grid-template-rows` 属性定义每一行的行高.

```css
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
}
```

- repeat()：在网格多的时候可以使用repeat()函数，简化重复的值。
- auto-fill：单元格的大小是固定的，但是容器的大小不确定。如果希望每一行（或每一列）容纳尽可能多的单元格，这时可以使用auto-fill关键字表示自动填充。

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
}
```

- fr:表示比例关系,网格布局提供了fr关键字,如果两列的宽度分别为1fr和2fr，就表示后者是前者的两倍。

```css
.container {
  display: grid;
  grid-template-columns: 1fr 2fr;
}
```

- minmax: 函数产生一个长度范围，表示长度就在这个范围之中。

```css
.container {
  display: grid;
  grid-template-columns:  1fr 1fr minmax(100px, 1fr);
}
```

minmax(100px, 1fr)表示列宽不小于100px，不大于1fr

- 网格线的名称: 可以使用方括号，指定每一根网格线的名字，方便以后的引用。

```css
.container {
  display: grid;
  grid-template-columns: [c1] 100px [c2] 100px [c3] auto [c4];
  grid-template-rows: [r1] 100px [r2] 100px [r3] auto [r4];
}
```

#### grid-row-gap 属性，grid-column-gap 属性，grid-gap 属性

- grid-row-gap: 行间距
- grid-column-gap: 列间隔
- grid-gap: `grid-column-gap` 和 `grid-row-gap`的合并简写形式, 如果省略了第二个值，则认为第二个值与第一个相同。

### grid-template-areas 属性

指定"区域"（area），一个区域由单个或多个单元格组成。子项可以指定所在区域。

```css
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
  grid-template-areas: 'a b c'
                       'd e f'
                       'g h i';
}
```

#### grid-auto-flow 属性

- 划分网格以后，容器的子元素会按照顺序，自动放置在每一个网格。默认的放置顺序是"先行后列"。

```css
{
  grid-auto-flow: column; | 表示先列在行
}
```

- 设置为row dense后，表示"先行后列"，并且尽可能紧密填满，尽量不出现空格。

```css
{
  grid-auto-flow: row dense;
}
```

#### justify-items 属性，align-items 属性，place-items 属性

`justify-items`属性设置单元格内容的水平位置（左中右），`align-items`属性设置单元格内容的垂直位置（上中下）

- start：对齐单元格的起始边缘。
- end：对齐单元格的结束边缘。
- center：单元格内部居中。
- stretch：拉伸，占满单元格的整个宽度（默认值）。

`place-items`是`justify-items和align-items`的合并简写形式. 如果省略第二个值则浏览器认为与第一个值相等。

#### justify-content 属性，align-content 属性，place-content 属性

整个内容区域在容器里面的位置

- start：对齐单元格的起始边缘。
- end：对齐单元格的结束边缘。
- center：单元格内部居中。
- stretch：拉伸，占满单元格的整个宽度（默认值）。
- space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与容器边框的间隔大一倍。
- space-between：项目与项目的间隔相等，项目与容器边框之间没有间隔。
- space-evenly：项目与项目的间隔相等，项目与容器边框之间也是同样长度的间隔。

#### grid-auto-columns 属性，grid-auto-rows 属性

`grid-auto-columns`属性和`grid-auto-rows`属性用来设置，浏览器自动创建的多余网格的列宽和行高。它们的写法与`grid-template-columns`和`grid-template-rows`完全相同。如果不指定这两个属性，浏览器完全根据单元格内容的大小，决定新增网格的列宽和行高。

> 项目（item）属性

#### grid-column-start 属性，grid-column-end 属性, grid-row-start 属性, grid-row-end 属性

- grid-column-start属性：左边框所在的垂直网格线（第几根）
- grid-column-end属性：右边框所在的垂直网格线（第几根）
- grid-row-start属性：上边框所在的水平网格线（第几根）
- grid-row-end属性：下边框所在的水平网格线（第几根）

可以通过上面四个属性指定项目所占的位置。

> span 关键字

表示"跨越"，即左右边框（上下边框）之间跨越多少个网格。

#### grid-column 属性，grid-row 属性

- grid-column属性是grid-column-start和grid-column-end的合并简写形式，
- grid-row属性是grid-row-start属性和grid-row-end的合并简写形式。

```css
.item-1 {
  grid-column: 1 / 3;
  grid-row: 1 / 2;
}
/* 等同于 */
.item-1 {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
}
```

斜杠后面的默认为1

#### grid-area 属性

- `grid-area`属性指定项目放在哪一个区域,需要配合父元素使用。

- `grid-area`属性还可用作`grid-row-start`、`grid-column-start`、`grid-row-end`、`grid-column-end`的合并简写形式，直接指定项目的位置。

```css
.item-1 {
  grid-area: 1 / 1 / 3 / 3;
}
```

#### justify-self 属性，align-self 属性，place-self 属性

- `justify-self`属性设置单元格内容的水平位置（左中右），跟`justify-items`属性的用法完全一致，但只作用于单个项目。
- `align-self`属性设置单元格内容的垂直位置（上中下），跟`align-items`属性的用法完全一致，也是只作用于单个项目。
- `place-self`属性是`align-self`属性和`justify-self`属性的合并简写形式。

## 水平垂直居中

```html
<div class="out">
  <div class="inner">content</div>
</div>
<style type="text/css">
.out{
  position: relative;
  width: 300px;
  height: 300px;
  background: green;
}
</style>
```

### absolute + 负margin

需要知道元素高度

```css
.inner{
  position: absolute;
  width: 100px;
  height: 100px;
  background: yellow;
  left: 50%;
  top: 50%;
  margin-left: -50px;
  margin-top: -50px;
}
```

### absolute + auto margin

```css
.inner{
  position: absolute;
  width: 100px;
  height: 100px;
  background: yellow;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
```

### absolute + calc

```css
.inner{
  position: absolute;
  width: 100px;
  height: 100px;
  background: yellow;
  left: calc(50% - 50px);
  right: calc(50% - 50px);
}
```

### absolute + transform

```css
.inner{
  position: absolute;
  width: 100px;
  height: 100px;
  background: yellow;
  left: 50%;
  right: 50%;
  transform: translate(-50%, -50%)
}
```

### table

```css
.outer {
  display: table-cell;
  text-align: center;
  vertical-align: center;
}
.inner {
  display: inline-block;
}
```

### flex

```css
.outer {
  display: flex;
  justify-content: center;
  align-items: center;
}
.inner {
  display: inline-block;
}
```

### grid

- 方法1：父元素指定子元素的对齐方式

```css
.out {
  width: 300px;
  height: 300px;
  display: grid;
  align-content: center;
  justify-content: center;
}
.inner {
  width: 100px;
  height: 100px;
}
```

- 方法2：父元素指定子元素的对齐方式

```css
.out {
  width: 300px;
  height: 300px;
  display: grid;
}
.inner {
  width: 100px;
  height: 100px;
  align-content: center;
  justify-content: center;
}
```

## 圣杯布局/双飞翼布局

## CSS盒子模型

### 基本概念

CSS盒模型本质上是一个盒子，封装周围的HTML元素，它包括：边距，边框，填充，和实际内容。

标准模型：`Box Model = margin + border + padding + content`

- IE模型：`width = content`
- 标准模型：`width = content + padding + border`

```css
//设置标准模型
box-sizing: content-box;
//设置IE模型
box-sizing: border-box;
```

### js获取盒模型的宽和高

```js
//只能获取内联样式设置的宽高
dom.style.width/height

//获取渲染后即时运行的宽高，值是准确的。但只支持 IE
dom.currentStyle.width/height

//获取渲染后即时运行的宽高，值是准确的。兼容性更好
window.getComputedStyle(dom).width/height;

//获取渲染后即时运行的宽高，值是准确的。兼容性也很好，一般用来获取元素的绝对位置，getBoundingClientRect()会得到4个值：left, top, width, height
dom.getBoundingClientRect().width/height;
```

### BFC(Block Formatting Context)

#### BOX：css布局的基本单位

Box 是 CSS 布局的对象和基本单位， 直观点来说，就是一个页面是由很多个 Box 组成的。元素的类型和 display 属性，决定了这个 Box 的类型。不同类型的 Box， 会参与不同的 Formatting Context（一个决定如何渲染文档的容器），因此Box内的元素会以不同的方式渲染。

- block-level box: display 属性为 block, list-item, table 的元素，会生成 block-level box。并且参与 block fomatting context；
- inline-level box: display 属性为 inline, inline-block, inline-table 的元素，会生成 inline-level box。并且参与 inline formatting context；

#### Formatting Context

指页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。
常见的Formatting context 有 Block fomatting context (简称BFC)和 Inline formatting context (简称IFC)。

> BFC的布局规则

- 内部的Box会在垂直方向，一个接一个地放置。
- Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠。
- 每个盒子（块盒与行盒）的margin box的左边，与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
- BFC的区域不会与float box重叠。
- BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
- 计算BFC的高度时，浮动元素也参与计算。

> 如何创建BFC

- float的值不是none。
- position的值不是static或者relative。
- overflow的值不是visible。
- display的值是inline-block、table-cell、flex、table-caption或者inline-flex。

> BFC的作用

- 利用BFC避免margin重叠
- 自适应两栏布局
- 清除浮动

## 平时积累

### 省略号

- 超出一行，省略号

```css
{
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}
```

- 超出多行，省略号

```css
{
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
```

### 三角形

- 正三角形

```css
/** 正三角 */
.triangle {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 25px 40px 25px;
  border-color: transparent transparent rgb(245, 129, 127) transparent;
}
```

- 倒三角

```css
/** 倒三角 */
.triangle {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 40px 25px 0 25px;
  border-color:  rgb(245, 129, 127) transparent transparent transparent;
}
```

### scroll

scroll:auto 时，内容超出时滑动条会自动呈现。

### 隐藏滑动条

```css
-webkit-scrollbar { width: 0; height: 0;  }
```

### 让div的宽度和高度相等

```css
.box {
  width: 25%;
}
.box::before {
  content: '';
  display: inline-block;
  padding-bottom: 100%;
  vertical-align: middle;
}
```

### 清除浮动

```css
.clearfix{
  clear:both;
  content:'';
  display:block;
  width: 0;
  height: 0;
  visibility:hidden;
}
```

### 移动端1px

```css
.border-1px {
  &:after {
      content: " ";
      width: 200%;
      position: absolute;
      border-top: 1px solid @color;
      left: 0;
      height: 0;
      transform: scale(0.5);
      transform-origin: 0 0;
      box-sizing: border-box;
  }
}
```

## css动画

### animation

- animation：时长|过渡方式|延迟|次数|方向|填充模式|是否暂停|动画名
- animation-duration(时长)：1S或者1000ms
- animation-timing-function(过渡方式)：同transition取值相同，如：linear
- animation-delay(延迟)：延迟
- animation-iteration-count(次数)：1或者2.5或者infinite
- animation-direction(方向)：reverse|alternate|alternate-reverse
- animation-fill-mode(填充模式)：none|forwards|backwards|both
- animation-play-state(是否暂停)：paused|running

### transition

- transition：属性名 时长 过渡方式 延迟。
- transition：left 200ms linear。
- 还可以用逗号分隔两个不同属性： transition：left 200ms，top 300ms。
- 也可以用all来代表所有属性： transition：all 1s；
- 过渡方式： linear | ease | ease-in | ease-out | ease-in-out | cubic-bezier | step-start | step-end | steps
