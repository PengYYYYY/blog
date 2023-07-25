# 移动端适配

## 视口 ViewPort

### 在移动端中有三种类型

1. layoutviewport: 大于实际屏幕，元素的宽度继承于 `layoutviewport`, 用于保证网站的外观特性与桌面浏览器一样。`layoutviewport` 每个浏览器不同。可以通过 `document.documentElement.clientWidth` 去获取
2. visualviewport：当前显示在屏幕上的页面，即浏览器可视区域的宽度。
3. idealviewport：浏览器定义的可完美适配移动端的理想 viewport，固定不变，可以认为是设备视口宽度。

### 设置 viewport

通过对几种 `viewport` 设置可以对网页的展示进行有效的控制，在移动端我们经常会在 `head` 标签中看到这段代码：

```html
<meta name='viewport' content='width=device-width,initial-scale=1,user-scale=no' />
```

通过对 `meta` 标签三个 `viewport` 的设置，最终使页面完美展示：

- width 设置的是 `layoutviewport` 的宽度
- initial-scale 设置页面的初始缩放值，并且这个初始缩放值是相对于 idealviewport 缩放的，最终得到的结果不仅会决定 visualviewport，还会影响到 layoutviewport
- user-scalable 是否允许用户进行缩放的设置

### 为什么要设置viewport

`viewport` 设置不会对 `PC` 页面产生影响，但对于移动页面却很重要。

- 媒体查询 `@media` 响应式布局中,会根据媒体查询功能来适配多端布局,必须对 `viewport` 进行设置,否则根据查询到的尺寸无法正确的匹配视觉宽度而导致布局混乱。如不设置 `viewport` 参数，移动端媒体查询的结果将是 `980px` 这个节点布局的参数。
- 目前多数手机的drp都不再是1，为了产出高保真页面，我们一般会给出 `750px` 的设计稿，就需要通过设置 viewport 的参数来进行整体换算。

## 设备像素比 dpr 与 1px 物理像素

### 物理像素（physical pixel）

手机屏幕上显示的最小单元，该最小单元具有颜色及亮度的属性可供设置，iPhone6、7、8 为：`750 * 1334`，iPhone6+、7+、8+ 为 `1242* 2208`

### 设备独立像素（density-indenpendent pixel）

此为逻辑像素，计算机设备中的一个点，`css` 中设置的像素指的就是该像素。老早在没有 `retina` 屏之前，设备独立像素与物理像素是相等的。简称DIPs。

### 屏幕密度

屏幕密度是指一个设备表面上存在的像素数量，它通常以每英寸有多少像素来计算(PPI)。

### 屏幕密度

屏幕密度是指一个设备表面上存在的像素数量，它通常以每英寸有多少像素来计算(PPI)。

### 设备像素比（device pixel ratio）

设备像素比(dpr) = 物理像素/设备独立像素。iPhone 6、7、8 的 dpr 为 2,一个设备独立像素便为 4 个物理像素, 因此在 css 上设置的 1px 在其屏幕上占据的是 2 个物理像素,0.5px 对应的才是其所能展示的最小单位。

### 1px 的物理像素的解决方案

对于 dpr=2 的屏幕，1px压缩一半便可与1px的设备像素比匹配，可以通过将缩放比 initial-scale 设置为 0.5=1/2 而实现。dpr=3的屏幕可以将 initial-scale设置为 0.33=1/3 来实现。

## 设备像素比 dpr 与 rem 的适配方案

### rem 如何设置

rem 是相对于根元素 html 的 font-size 来做计算，通常在页面初始化时加载时通过对document.documentElement.style.fontSize 设置来实现

### rem 适配规则

通过对 `initial-scale = 1/dpr` 的设置，已将对屏幕的描述从物理像素转化到了物理像素上了，这将是后续推导的基础，且设计稿为 `750px`。

1. 物理像素为 750 = 375 * 2，若屏幕等分为 10 份，那么 1rem = 75px，10rem = 750px;
2. 物理像素为 1125 = 375 * 3，若屏幕等分为 10 份，那么 1rem = 112.5px, 10rem = 1125px;
3. 物理像素为 1242 = 414 * 3, 若屏幕等分为 10 份，那么 1rem = 124.2px, 10rem = 1242px;

由此可知 `rem` 的设定方式:

```js
document.documentElement.style.fontSize = document.documentElement.clientWidth / 10 + 'px';
```

## 视口单位适配方案

将视口宽度 `window.innerWidth` 和视口高度 `window.innerHeight` 等分为 100 份，且将这里的视口理解成 `idealviewport` ，并不会随着 `viewport` 的不同设置而改变。

- vw: 1vw 为视口宽度的 1%
- vh: 1vh 为视口高度的 1%
- vmin: vw 和 vh 中的较小值
- vmax: vw 和 vh 中的较大值

如果设计稿为 750px，那么 1vw = 7.5px，100vw = 750px。使用 `pxtoviewport` 的库就可以帮我们转换。
