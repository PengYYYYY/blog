# svg 基础

可缩放矢量图形（Scalable Vector Graphics，SVG），是一种用于描述二维的矢量图形。

## 坐标定位

### 网格

![img](../images/gride.png)

计算机绘图都差不多使用网格系统。这种系统以页面的左上角为(0,0)坐标点，坐标以像素为单位，x轴正方向是向右，y轴正方向是向下.

```html
<!-- 定义一个矩形，即从左上角开始，向右延展50px，向下延展50px，形成一个50*50大的矩形。 -->
<svg width="50" height="50">
  <rect width="50" height="50" fill="#42b883" />
</svg>
```

<svg width="50" height="50">

  <rect width="50" height="50" fill="#42b883" />
</svg>

### 像素

基本上，在 SVG 文档中的1个像素对应输出设备（比如显示屏）上的1个像素。SVG也可以定义绝对大小，来实现svg中可缩放的特性。只需给出数字，不标明单位，输出时就会采用用户的单位。

- 定义了一个50*50px的SVG画布，这里1用户单位等同于1屏幕单位。

```html
<svg width="50" height="50">
  <rect width="50%" height="50%" fill="#42b883" />
</svg>
```

<svg width="50" height="50">

  <rect width="100%" height="100%" fill="#42b883" />
</svg>

- 这里定义的画布尺寸是 `100*100px`。但是，`viewBox` 属性定义了画布上可以显示的区域：从(0,0)点开始，`50宽*50` 高的区域。这个`50*50`的区域，会放到`100*100`的画布上显示。于是就形成了放大两倍的效果。

```html
<svg width="100" height="100" viewBox="0 0 50 50">
  <rect width="100%" height="100%" fill="#42b883" />
</svg>
```

<svg width="100" height="100" viewBox="0 0 50 50">

  <rect width="100%" height="100%" fill="#42b883" />
</svg>

## 基本形状

svg 有不同的形状，并且使用不同的属性来定义图形的大小和位置

### 矩形

`rect` 元素会在屏幕上绘制一个矩形 。其6个基本属性就可以控制它在屏幕上的位置和形状。

- x: 矩形左上角的x位置
- y: 矩形左上角的y位置
- width: 矩形的宽度
- height: 矩形的高度
- rx: 圆角的x方位的半径
- ry: 圆角的y方位的半径

```html
<svg width="50" height="50">
  <rect x="10" y="10" width="30" height="30" fill="#42b883"/>
  <rect x="60" y="10" rx="10" ry="10" width="30" height="30" fill="#42b883"/>
</svg>

```html
<svg width="100" height="100">
  <rect x="10" y="10" width="30" height="30" fill="#42b883"/>
  <rect x="60" y="10" rx="10" ry="10" width="30" height="30" fill="#42b883"/>
</svg>

### 圆形

`circle` 只有3个属性用来设置圆形。

- r: 圆的半径
- cx: 圆心的x位置
- cy: 圆心的y位置

```html
<svg width="50" height="50">
  <circle cx="25" cy="75" r="20" fill="#42b883"/>
</svg>
```

<svg width="50" height="50">

  <circle cx="25" cy="25" r="25" fill="#42b883"/>
</svg>

### 椭圆

`Ellipse` 是 `circle` 元素更通用的形式,以分别缩放圆的x半径和y半径（通常称之为长轴半径和短轴半径）。

- rx: 椭圆的x半径
- ry: 椭圆的y半径
- cx: 椭圆中心的x位置
- cy: 椭圆中心的y位置

```html
<svg width="50" height="50">
  <ellipse cx="25" cy="25" rx="25" ry="20" fill="#42b883"/>
</svg>
```

<svg width="50" height="50">

  <ellipse cx="25" cy="25" rx="25" ry="20" fill="#42b883"/>
</svg>

### 线条

`Line` 绘制直线。它取两个点的位置作为属性，指定这条线的起点和终点位置。

- x1: 起点的x位置
- y1: 起点的y位置
- x2: 终点的x位置
- y2: 终点的y位置

```html
<svg width="50" height="50">
  <line x1="10" x2="50" y1="110" y2="150" fill="#42b883"/>
</svg>
```

<svg width="50" height="50">

  <line x1="10" x2="50" y1="10" y2="50" stroke="#42b883" stroke-width="5"/>
</svg>

### 折线

`Polyline` 是一组连接在一起的直线。因为它可以有很多的点，折线的的所有点位置都放在一个 `points` 属性中：

```html
<svg width="50" height="50">
  <polyline points="10 10, 10 20, 20 30, 30 20, 50 50" stroke="#42b883" stroke-width="2" fill="transparent"/>
</svg>
```

<svg width="50" height="50">

  <polyline points="10 10, 10 20, 20 30, 30 20, 50 50" stroke="#42b883" stroke-width="2" fill="transparent"/>
</svg>

### 多边形

polygon和折线很像，它们都是由连接一组点集的直线构成。不同的是，polygon的路径在最后一个点处自动回到第一个点。需要注意的是，矩形也是一种多边形，如果需要更多灵活性的话，你也可以用多边形创建一个矩形。

```html
<svg width="50" height="50">
  <polyline points="0 0, 0 50, 50 50, 50 0, 0 0" stroke="#42b883" stroke-width="5" fill="transparent"/>
</svg>

```

<svg width="50" height="50">

  <polyline points="0 0, 0 50, 50 50, 50 0, 0 0" stroke="#42b883" stroke-width="5" fill="transparent"/>
</svg>


## 路径

`path` 可能是 `SVG` 中最强大的基本形状。你可以用 `path` 元素绘制任何形状。另外，path只需要设定很少的点，就可以创建平滑流畅的线条（比如曲线）。`path` 元素的形状是通过属性 `d` 定义的，属性d的值是一个“命令+参数”的序列。

### 直线命令

元素里有5个画直线的命令：

#### M

画笔当前位于一个点，在使用M命令移动画笔后，只会移动画笔，但不会在两点之间画线

```text
M x y 或者 m dx dy
```

#### L & H & V

L命令将会在当前位置和新位置（L前面画笔所在的点）之间画一条线段。L需要两个参数，分别是一个点的x轴和y轴坐标，L命令将会在当前位置和新位置（L前面画笔所在的点）之间画一条线段。

```text
L x y (or l dx dy)
```

另外还有两个简写命令，用来绘制水平线和垂直线。H，绘制水平线。V，绘制垂直线。这两个命令都只带一个参数，标明在x轴或y轴移动到的位置，因为它们都只在坐标轴的一个方向上移动。

```text
H x (or h dx)
V y (or v dy)
```

```html
<!-- 从 10，10开始，绘制一条 到50的水平线，再绘制一条到50的垂直线，再绘制一条到10的水平线，最后z命令图形绘制回到起点 -->
<svg width="60" height="60">
  <path d="M10 50 H 90 V 50 H 10 Z" fill="transparent" stroke="#42b883"/>
</svg>
```

<svg width="60" height="60">

  <path d="M10 10 H 50 V 50 H 10 Z" fill="transparent" stroke="#42b883"/>
</svg>

### 曲线命令

绘制平滑曲线的命令有三个，其中两个用来绘制贝塞尔曲线，另外一个用来绘制弧形或者说是圆的一部分。

三次贝塞尔曲线需要定义一个点和两个控制点，所以用C命令创建三次贝塞尔曲线，需要设置三组坐标参数：

#### C命令

```text
C x1 y1, x2 y2, x y (or c dx1 dy1, dx2 dy2, dx dy)
```

这里的最后一个坐标(x,y)表示的是曲线的终点，另外两个坐标是控制点，(x1,y1)是起点的控制点，(x2,y2)是终点的控制点。如果你熟悉代数或者微积分的话，会更容易理解控制点，控制点描述的是曲线起始点的斜率，曲线上各个点的斜率，是从起点斜率到终点斜率的渐变过程.

![img](../images/bessel.png)

```html
<svg width="190px" height="160px" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 10 C 20 20, 40 20, 50 10" stroke="black" fill="transparent"/>
  <path d="M70 10 C 70 20, 120 20, 120 10" stroke="black" fill="transparent"/>
  <path d="M130 10 C 120 20, 180 20, 170 10" stroke="black" fill="transparent"/>
  <path d="M10 60 C 20 80, 40 80, 50 60" stroke="black" fill="transparent"/>
  <path d="M70 60 C 70 80, 110 80, 110 60" stroke="black" fill="transparent"/>
  <path d="M130 60 C 120 80, 180 80, 170 60" stroke="black" fill="transparent"/>
  <path d="M10 110 C 20 140, 40 140, 50 110" stroke="black" fill="transparent"/>
  <path d="M70 110 C 70 140, 110 140, 110 110" stroke="black" fill="transparent"/>
  <path d="M130 110 C 120 140, 180 140, 170 110" stroke="black" fill="transparent"/>
</svg>
```

<svg width="190px" height="160px" version="1.1" xmlns="http://www.w3.org/2000/svg">

  <path d="M10 10 C 20 20, 40 20, 50 10" stroke="black" fill="transparent"/>
  <path d="M70 10 C 70 20, 120 20, 120 10" stroke="black" fill="transparent"/>
  <path d="M130 10 C 120 20, 180 20, 170 10" stroke="black" fill="transparent"/>
  <path d="M10 60 C 20 80, 40 80, 50 60" stroke="black" fill="transparent"/>
  <path d="M70 60 C 70 80, 110 80, 110 60" stroke="black" fill="transparent"/>
  <path d="M130 60 C 120 80, 180 80, 170 60" stroke="black" fill="transparent"/>
  <path d="M10 110 C 20 140, 40 140, 50 110" stroke="black" fill="transparent"/>
  <path d="M70 110 C 70 140, 110 140, 110 110" stroke="black" fill="transparent"/>
  <path d="M130 110 C 120 140, 180 140, 170 110" stroke="black" fill="transparent"/>

</svg>

#### S

S命令可以用来创建与前面一样的贝塞尔曲线，但是，如果S命令跟在一个C或S命令后面，则它的第一个控制点会被假设成前一个命令曲线的第二个控制点的中心对称点。果S命令单独使用，前面没有C或S命令，那当前点将作为第一个控制点。相当于C的快捷命令。

```html
<svg width="190px" height="160px" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80" stroke="black" fill="transparent"/>
</svg>
```

<svg width="190px" height="160px" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80" stroke="black" fill="transparent"/>
</svg>

### Q

二次贝塞尔曲线Q，它比三次贝塞尔曲线简单，只需要一个控制点，用来确定起点和终点的曲线斜率。因此它需要两组参数，控制点和终点坐标。

```html
<svg width="190px" height="160px" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 80 Q 95 10 180 80" stroke="black" fill="transparent"/>
</svg>
```

<svg width="190px" height="160px" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 80 Q 95 10 180 80" stroke="black" fill="transparent"/>
</svg>

### T

快捷命令T会通过前一个控制点，推断出一个新的控制点。在你的第一个控制点后面，可以只定义终点，就创建出一个相当复杂的曲线。需要注意的是，T命令前面必须是一个Q命令，或者是另一个T命令，才能达到这种效果。
如果T单独使用，那么控制点就会被认为和终点是同一个点，所以画出来的将是一条直线。

```html
<svg width="190px" height="160px" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 80 Q 52.5 10, 95 80 T 180 80" stroke="black" fill="transparent"/>
</svg>
```

<svg width="190px" height="160px" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 80 Q 52.5 10, 95 80 T 180 80" stroke="black" fill="transparent"/>
</svg>

## Fill 和 Stroke 属性

大多数基本的涂色可以通过在元素上设置两个属性来搞定：`fill` 属性和 `stroke` 属性。

- `fill` 属性设置对象内部的颜色
- `stroke` 属性设置绘制对象的线条的颜色

```html
<svg width="190px" height="160px" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="10" width="100" height="100" stroke="black" fill="red" fill-opacity="0.5" stroke-opacity="0.9"/>
</svg>
```

<svg width="190px" height="160px" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="10" width="100" height="100" stroke="black" fill="red" fill-opacity="0.5" stroke-width="1" stroke-opacity="0.9"/>
</svg>

### Fill

`fill-opacity` 控制填充色的不透明度，属性 `stroke-opacity` 控制描边的不透明度。

### Stroke

- `stroke-width` 属性定义了描边的宽度.

#### stroke-linecap

属性控制边框终点的形状,有三个值：

- `butt` 用直边结束线段，它是常规做法，线段边界90度垂直于描边的方向、贯穿它的终点。
- `square` 的效果差不多，但是会稍微超出实际路径的范围，超出的大小由stroke-width控制。
- `round` 表示边框的终点是圆角，圆角的半径也是由stroke-width控制的。

```html
<svg width="160" height="140" xmlns="http://www.w3.org/2000/svg" version="1.1">
  <line x1="40" x2="120" y1="20" y2="20" stroke="black" fill="red" stroke-width="10" stroke-linecap="butt"/>
  <line x1="40" x2="120" y1="60" y2="60" stroke="black" stroke-width="10" stroke-linecap="square"/>
  <line x1="40" x2="120" y1="100" y2="100" stroke="black" stroke-width="10" stroke-linecap="round"/>
</svg>
```

<svg width="160" height="140" xmlns="http://www.w3.org/2000/svg" version="1.1">
  <line x1="40" x2="120" y1="20" y2="20" stroke="black" stroke-width="10" stroke-linecap="butt"/>
  <line x1="40" x2="120" y1="60" y2="60" stroke="black" stroke-width="10" stroke-linecap="square"/>
  <line x1="40" x2="120" y1="100" y2="100" stroke="black" stroke-width="10" stroke-linecap="round"/>
</svg>

#### stroke-linejoin

用来控制两条描边线段之间，用什么方式连接。每条折线都是由两个线段连接起来的，连接处的样式由 `stroke-linejoin` 属性控制，它有三个可用的值:

- miter是默认值，表示用方形画笔在连接处形成尖角
- round表示用圆角连接，实现平滑效果。
- bevel，连接处会形成一个斜接。

```html
<svg width="160" height="280" xmlns="http://www.w3.org/2000/svg" version="1.1">
  <polyline points="40 60 80 20 120 60" stroke="black" stroke-width="20" stroke-linecap="butt" fill="none" stroke-linejoin="miter"/>

  <polyline points="40 140 80 100 120 140" stroke="black" stroke-width="20" stroke-linecap="round" fill="none" stroke-linejoin="round"/>

  <polyline points="40 220 80 180 120 220" stroke="black" stroke-width="20" stroke-linecap="square" fill="none" stroke-linejoin="bevel"/>
</svg>
```

<svg width="160" height="280" xmlns="http://www.w3.org/2000/svg" version="1.1">
  <polyline points="40 60 80 20 120 60" stroke="black" stroke-width="20" stroke-linecap="butt" fill="none" stroke-linejoin="miter"/>

  <polyline points="40 140 80 100 120 140" stroke="black" stroke-width="20" stroke-linecap="round" fill="none" stroke-linejoin="round"/>

  <polyline points="40 220 80 180 120 220" stroke="black" stroke-width="20" stroke-linecap="square" fill="none" stroke-linejoin="bevel"/>
</svg>


##### stroke-dasharray

通过指定 `stroke-dasharray` 属性，将虚线类型应用在描边上。`stroke-dasharray` 是一组用逗号分割的数字组成的数列, 和path不一样，这里的数字必须用逗号分割（空格会被忽略）。每一组数字，第一个用来表示填色区域的长度，第二个用来表示非填色区域的长度。第二个路径会先做5个像素单位的填色，紧接着是5个空白单位，然后又是5个单位的填色。如果你想要更复杂的虚线模式，你可以定义更多的数字。第一个例子指定了3个数字，这种情况下，数字会循环两次，形成一个偶数的虚线模式（奇数个循环两次变偶数个）。所以该路径首先渲染5个填色单位，10个空白单位，5个填色单位，然后回头以这3个数字做一次循环，但是这次是创建5个空白单位，10个填色单位，5个空白单位。通过这两次循环得到偶数模式，并将这个偶数模式不断重复。

```html
<svg width="200" height="150" xmlns="http://www.w3.org/2000/svg" version="1.1">
  <path d="M 10 75 Q 50 10 100 75 T 190 75" stroke="black" stroke-linecap="round" stroke-dasharray="5,10,5" fill="none"/>
  <path d="M 10 75 L 190 75" stroke="red" stroke-linecap="round" stroke-width="1" stroke-dasharray="5,5" fill="none"/>
</svg>
```

<svg width="200" height="150" xmlns="http://www.w3.org/2000/svg" version="1.1">
  <path d="M 10 75 Q 50 10 100 75 T 190 75" stroke="black" stroke-linecap="round" stroke-dasharray="5,10,5" fill="none"/>
  <path d="M 10 75 L 190 75" stroke="red" stroke-linecap="round" stroke-width="1" stroke-dasharray="5,5" fill="none"/>
</svg>

## 渐变

### 线性渐变

线性渐变沿着直线改变颜色，要插入一个线性渐变，你需要在 `SVG` 文件的 `defs` 元素内部，创建一个 `<linearGradient>` 节点。

#### 基础示例

下面是一个应用了线性渐变的 `<rect>` 元素的示例。线性渐变内部有几个 `<stop>` 结点，这些结点通过指定位置的 `offset`（偏移）属性和 `stop-color`（颜色中值）属性来说明在渐变的特定位置上应该是什么颜色；可以直接指定这两个属性值，该示例中指明了渐变开始颜色为红色，到中间位置时变成半透明的黑色，最后变成蓝色。渐变的方向可以通过两个点来控制，它们分别是属性 `x1、x2、y1、y2`，这些属性定义了渐变路线走向。

```html
<svg width="120" height="120" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="Gradient1" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stop-color="red"/>
      <stop offset="50%" stop-color="black" stop-opacity="0"/>
      <stop offset="100%" stop-color="blue"/>
    </linearGradient>
  </defs>

  <rect id="rect1" x="10" y="10" rx="15" ry="15" width="100" height="100" fill="url(#Gradient1)"/>
</svg>
```

<svg width="120" height="120" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="Gradient1" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stop-color="red"/>
      <stop offset="50%" stop-color="yellow" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="blue"/>
    </linearGradient>
  </defs>

  <rect id="rect1" x="10" y="10" rx="15" ry="15" width="100" height="100" fill="url(#Gradient1)"/>
</svg>

### 径向渐变

径向渐变与线性渐变相似，只是它是从一个点开始发散绘制渐变。创建径向渐变需要在文档的 `defs` 中添加一个 `<radialGradient>` 元素, 中值（stops）的使用方法与之前一致，但是现在这个对象的颜色是中间是红色的，且向着边缘的方向渐渐的变成蓝色。跟线性渐变一样，`<radialGradient>` 节点可以有多个属性来描述其位置和方向，但是它更加复杂。径向渐变也是通过两个点来定义其边缘位置，两点中的第一个点定义了渐变结束所围绕的圆环，它需要一个中心点，由 `cx` 和 `cy` 属性及半径 `r` 来定义，通过设置这些点我们可以移动渐变范围并改变它的大小。

```html
<svg width="120" height="240" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="RadialGradient1">
      <stop offset="0%" stop-color="red"/>
      <stop offset="100%" stop-color="blue"/>
    </radialGradient>
    <radialGradient id="RadialGradient2" cx="0.25" cy="0.25" r="0.25">
      <stop offset="0%" stop-color="red"/>
      <stop offset="100%" stop-color="blue"/>
    </radialGradient>
  </defs>

  <rect x="10" y="10" rx="15" ry="15" width="100" height="100" fill="url(#RadialGradient1)"/>
  <rect x="10" y="120" rx="15" ry="15" width="100" height="100" fill="url(#RadialGradient2)"/>
</svg>

```

<svg width="120" height="240" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="RadialGradient1">
      <stop offset="0%" stop-color="red"/>
      <stop offset="100%" stop-color="blue"/>
    </radialGradient>
    <radialGradient id="RadialGradient2" cx="0.25" cy="0.25" r="0.25">
      <stop offset="0%" stop-color="red"/>
      <stop offset="100%" stop-color="blue"/>
    </radialGradient>
  </defs>

  <rect x="10" y="10" rx="15" ry="15" width="100" height="100" fill="url(#RadialGradient1)"/>
  <rect x="10" y="120" rx="15" ry="15" width="100" height="100" fill="url(#RadialGradient2)"/>
</svg>

### 中心和焦点

```html
<svg width="120" height="120" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <defs>
      <radialGradient id="Gradient" cx="0.5" cy="0.5" r="0.5" fx="0.25" fy="0.25">
        <stop offset="0%" stop-color="red"/>
        <stop offset="100%" stop-color="blue"/>
      </radialGradient>
  </defs>

  <rect x="10" y="10" rx="15" ry="15" width="100" height="100" fill="url(#Gradient)" stroke="black" stroke-width="2"/>

  <circle cx="60" cy="60" r="50" fill="transparent" stroke="white" stroke-width="2"/>
  <circle cx="35" cy="35" r="2" fill="white" stroke="white"/>
  <circle cx="60" cy="60" r="2" fill="white" stroke="white"/>
  <text x="38" y="40" fill="white" font-family="sans-serif" font-size="10pt">(fx,fy)</text>
  <text x="63" y="63" fill="white" font-family="sans-serif" font-size="10pt">(cx,cy)</text>

</svg>
```

<svg width="120" height="120" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <defs>
      <radialGradient id="Gradient" cx="0.5" cy="0.5" r="0.5" fx="0.25" fy="0.25">
        <stop offset="0%" stop-color="red"/>
        <stop offset="100%" stop-color="blue"/>
      </radialGradient>
  </defs>

  <rect x="10" y="10" rx="15" ry="15" width="100" height="100" fill="url(#Gradient)" stroke="black" stroke-width="2"/>

  <circle cx="60" cy="60" r="50" fill="transparent" stroke="white" stroke-width="2"/>
  <circle cx="35" cy="35" r="2" fill="white" stroke="white"/>
  <circle cx="60" cy="60" r="2" fill="white" stroke="white"/>
  <text x="38" y="40" fill="white" font-family="sans-serif" font-size="10pt">(fx,fy)</text>
  <text x="63" y="63" fill="white" font-family="sans-serif" font-size="10pt">(cx,cy)</text>
</svg>

<!-- ## Patterns 图案

## Texts 文字 -->
