# 白板项目总结

<script setup>
import FigmaContainer from '/components/FigmaContainer.vue'
</script>

## 白板项目介绍

是一款对标 `figjam`, `boardmix`, `miro` 的在线白板工具。

### 拥有的元素

<FigmaContainer url="https://www.figma.com/file/E2utI9rEseFTc7tJ3Bbl9o/blog?type=whiteboard&node-id=2914-3665&t=hzW5L5zaX1dMDGIz-4"/>

白板中有文本图形、画笔、连线、表格、便签、Section、图片、贴纸、纯文本、脑图等。

## 渲染引擎

Palette 核心是一个基于 Skia 的渲染引擎。Skia 是一个google开源的2d图形库，它是Chrome、Android、Flutter等知名产品的图形引擎。[Skia](https://skia.org/)

### pixi vs skia

为什么需要 skia，最开始 palette 是基于 pixi.js 做的。最开始的方向是对标 `figma`, pixi 有很多问题导致我们切换为 skia 渲染引擎，问题如下：

### skia 的问题

Skia 是一个维护了近 20 年的方案，也存在很多的历史包袱，在一些场景下很难满足包体和性能的进一步优化需求。在包体方面，可以针对 Skia 做了定制和裁剪，而在性能方面，由于 Skia 需要兼容历史遗留的 CPU 绘制模式，在 API 上暴露会比较保守，很多针对现代 GPU 绘制管线可以进一步优化的接口都没暴露出来。

[tgfx](https://github.com/Tencent/tgfx) 是腾讯 `PAG` 团队开发的跨平台的纯 GPU 绘图引擎，提供了完备的图片，矢量和文本的 2D 绘制能力。


#### 阴影和模糊性能以及清晰度的问题

模糊和阴影本质都是高斯模糊，pixi 目前是通过 filter 自定义 shader 来实现高斯模糊的，性能很差并且质量也很差。

<FigmaContainer url="https://www.figma.com/file/E2utI9rEseFTc7tJ3Bbl9o/blog?type=whiteboard&node-id=2914-3751&t=hzW5L5zaX1dMDGIz-4"/>

##### 自交图形切三角问题

<FigmaContainer url="https://www.figma.com/file/E2utI9rEseFTc7tJ3Bbl9o/blog?type=whiteboard&node-id=2914-3787&t=hzW5L5zaX1dMDGIz-4"/>

自交图形会导致路径内外关系颠倒，pixi使用的[切三角库](https://github.com/mapbox/earcut), 会错误的处理自交图形的切三角

##### 布尔运算问题

- 目前市面上存在的布尔运算算法库主要是基于svg的，例如 `paper.js`（Paper.js — Boolean Operations）。
- 布尔元算实现算法「Vatti clipping algorithm」和一篇92年发表在ACM上的论文，也叫「瓦蒂裁切算法」（https://dl.acm.org/doi/10.1145/129902.129906）。

#### 背景模糊（毛玻璃）问题

布尔运算+高斯模糊的问题，需要给低层级的图像创建一个副本并做高斯模糊，再和上层路径做布尔运算（交集）

<FigmaContainer url="https://www.figma.com/file/E2utI9rEseFTc7tJ3Bbl9o/blog?type=whiteboard&node-id=2914-3884&t=hzW5L5zaX1dMDGIz-4"/>

#### 曲线平滑度问题

pixi在渲染贝塞尔曲线时会将贝塞尔微分成非常多的直线，但他不会随着缩放比例微分的更细，导致视口放大的很大是曲线表现的不是很光滑。

<FigmaContainer url="https://www.figma.com/file/E2utI9rEseFTc7tJ3Bbl9o/blog?type=whiteboard&node-id=2914-3910&t=hzW5L5zaX1dMDGIz-4"/>

### 项目支持的渲染能力

Palette 支持的渲染能力如下：

- 填充：纯色、纹理、渐变
- 边框：内边框、外边框、居中边框、边框填纯色、边框填渐变、多边框、线帽、端点、虚线
- 阴影：内外阴影、多阴影、偏移、模糊系数、扩展
- 模糊：背景模糊、高斯模糊、模糊系数
- 通用能力：蒙版、布尔、编组、画板、层级、锁定、混合模式
- 文本：粗体、斜体、字号、字体、删除线、下划线、列表、对齐
- 路径：路径渲染、控制点操作
- 通用能力：历史记录、变换、端导出、palette 打开 sketch/figma 设计稿

## 项目架构

<FigmaContainer url="https://www.figma.com/file/E2utI9rEseFTc7tJ3Bbl9o/blog?type=whiteboard&node-id=1266-432&t=loY0TKO3kumeNLmD-4"/>

- skia: 2D 图形库，由 C++ 用于高性能和高质量地渲染文本、形状和图像。Chrome、Flutter 都使用其作为图形渲染引擎。
- canvaskit: 基于 Skia 的 WebAssembly 版本, 上层使用 WebGL 进行渲染，可以在 web 平台上提供 2D 和 3D 渲染。
- palette-canvaskit: 负责与 canvaskit 渲染接口的交互，提供画布中所有基础元素的渲染。
- palette-ink: 应用中的插件如基础图形、操作指针、笔、橡皮擦、bitmap、便签、文本等，解耦基础逻辑。
- palette-text: 应用中的文本渲染器，从富文本到 svg 文本。
- palette-vector: 几何相关的逻辑，用于钢笔工具等基础点，线逻辑。
- palette-renderer: 在基础渲染器上的一层，负责对插件的渲染实现。
- palette-handler: 核心控制器，管理上下游所有的控制器，图形操作等。
- palette-constants: 应用中所有的基础变量，类型定义等。
- palette-utils: 应用中所有的工具函数。

### 渲染引擎

### 坐标体系

<FigmaContainer url="https://www.figma.com/file/E2utI9rEseFTc7tJ3Bbl9o/blog?type=whiteboard&node-id=3508-4464&t=loY0TKO3kumeNLmD-4"/>

- global变换矩阵
- local变换矩阵
- 旋转中心
- 坐标体系

### 容器、图形、渲染队列

<FigmaContainer url="https://www.figma.com/file/E2utI9rEseFTc7tJ3Bbl9o/blog?type=whiteboard&node-id=3508-4617&t=loY0TKO3kumeNLmD-4"/>

### 渲染对象

业务侧的渲染对象，画布中的每一个元素都会对应一个渲染实例。

<FigmaContainer url="https://www.figma.com/file/E2utI9rEseFTc7tJ3Bbl9o/blog?type=whiteboard&node-id=3508-4935&t=loY0TKO3kumeNLmD-4"/>


## 数据结构设计

### Figma 数据结构

<FigmaContainer url="https://www.figma.com/file/E2utI9rEseFTc7tJ3Bbl9o/blog?type=whiteboard&node-id=2658-1361&t=lro20nPzgjXTpsNK-4"/>

Figma 的数据结构比较复杂，图形间关系如上图，不做太多赘述，需要注意的有以下几点：

- Figma [REST API](https://www.figma.com/developers/api) 与 [PLUGIN API](https://www.figma.com/plugin-docs/api/api-reference/) 数据结构存在差异
- 如何拿到 Figma 源数据，有以下几个方式
  - 可以使用下面这个服务：[figma-api-live](https://pengyyyyy.github.io/figma-api-live/#/figma)，原理是通过 rest api。
  - 通过 figma 插件，拿到画布上下文，
  - 直接解析 figma 的 fig 文件，开源的 [figma-to-json](https://github.com/yagudaev/figma-to-json)，Figma CTO 写的 [fig-file-parser](https://madebyevan.com/figma/fig-file-parser/)

## AI模版

在白板落地了 `AI模版` 的功能，从 `idea` 到上线仅用时 `10` 天，具体实现可以参考 [探索可视化分析模型](https://mp.weixin.qq.com/s/HrxQtfc8j-zD9kMRGhTn6w)

## 功能细节的实现

### 辅助线

<FigmaContainer url="https://www.figma.com/file/E2utI9rEseFTc7tJ3Bbl9o/blog?type=whiteboard&node-id=3865-1786&t=oyHf5qQSFlbfnhzh-4"/>

- 第一步：过滤 `视口内` 检测元素，X，Y 轴分区，构建分区元素组
- 第二步：元素对比策略，如 Step 2 所示
- 第三步：绘制辅助线，绘制模式如 Step 3 所示

### 历史记录模块

也就是 `undo` 和 `redo`

#### 指令模式

场景如下:

1. 删除A
2. 删除B
3. 新增group

撤销时的指令如下：

1. 删除group
2. 新增B
3. 新增A

#### 快照模式

核心就是保留现场，然后恢复现场。场景如下：

1. 录制开始
2. 用户操作元素 我会给元素做脏标记
3. 用户操作元素
4. 录制结束 把所有脏的元素拿出来序列化 记做一个快照
5. 进入撤销栈

撤销时：

1. 从栈顶拿出快照，恢复现场即可

## 性能优化

### 四叉树

TODO

## 协同编辑

协同编辑还没具体实现，后续复用现有组件，先了解几个概念。

### OT(Operational Transformation) 算法

<FigmaContainer url="https://www.figma.com/file/E2utI9rEseFTc7tJ3Bbl9o/blog?type=whiteboard&node-id=3865-2349&t=oyHf5qQSFlbfnhzh-4"/>

适用于文档，精细控制插入位置，核心是其流程中的 `Transform` 方法，没有固定的实现，需要根据实际情况来做。

### CRDT(Conflict-Free Replicated Data Type) 算法

冲突无关数据类型 CRDT（Conflict-Free Replicated Data Type）是一种解决分布式系统中数据同步问题的数据结构。CRDT的核心思想是确保所有副本之间的数据一致性，而无需进行复杂的操作转换。CRDT有两种主要类型：状态同步CRDT（State-based CRDT）和操作同步CRDT（Operation-based CRDT）。


### CRDT Like

<FigmaContainer url="https://www.figma.com/file/E2utI9rEseFTc7tJ3Bbl9o/blog?type=whiteboard&node-id=3865-1889&t=oyHf5qQSFlbfnhzh-4"/>

Figma 协同方案，细节协同可以参考这篇文章：https://www.figma.com/blog/how-figmas-multiplayer-technology-works/

核心原则：最后写入者胜利（树形引用特殊处理）

## 基于 path 的文本渲染

TODO
