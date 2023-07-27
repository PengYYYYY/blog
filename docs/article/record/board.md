# 图形编辑器项目总结

<script setup>
import FigmaContainer from '/components/FigmaContainer.vue'
</script>

## 项目架构图

<FigmaContainer url="https://www.figma.com/file/E2utI9rEseFTc7tJ3Bbl9o/blog?type=whiteboard&node-id=1266%3A432&t=VhmgWJhomfVcVNWz-1"/>

- skia: 2D 图形库，由 C++ 用于高性能和高质量地渲染文本、形状和图像。Chrome、Flutter 都使用其作为图形渲染引擎。
- canvaskit: 基于 Skia 的 WebAssembly 版本, 上层使用 WebGL 进行渲染，可以在 web 平台上提供 2D 和 3D 渲染。
- palette-canvaskit: 负责与 canvaskit 渲染接口的交互，提供画布中所有基础元素的渲染。
- palette-ink: 应用中的插件如基础图形、操作指针、笔、橡皮擦、bitmap、便签、文本等，解耦基础逻辑。
- palette-text: 应用中的文本渲染器，从富文本到 svg 文本。
- palette-renderer: 在基础渲染器上的一层，负责对插件的渲染实现。
- palette-pen: 核心控制器，管理上下游所有的控制器，图形操作等。
- palette-constants: 应用中所有的基础变量，类型定义等。
- palette-utils: 应用中所有的工具函数。
- palette-vector: 几何相关的逻辑，用于钢笔工具等基础点，线逻辑。

:::tip
To be continued
::::

## skia 与 canvaskit

简单描述 skia 与 canvaskit 的关系，以及他们可以做的事情

### canvas 与 webgl

...

### skia 到 canvaskit

...

## 项目架构设计

...

### 数据结构设计

...

#### sketch 数据结构

...


#### figma 数据结构

...

### 核心模块间关系

...

## 渲染层

白板渲染流程

### 渲染流程

...

### 基础图形渲染

...

### 图形表现渲染

边框、填充、模糊 等渲染


### 服务器

## 编辑层

...

### 平移与变换

...

### 辅助线

...

### 四叉树

...

### 撤销重做

...

## 应用层

### 应用搭建与产品接入

### ToolBar 与 EditorBar

### [AI模版](https://mp.weixin.qq.com/s/HrxQtfc8j-zD9kMRGhTn6w)

## TODO

### 协同编辑

...

#### OT(Operational Transformation) 算法

...

#### CRDT(Conflict-Free Replicated Data Type) 算法

...

### 基于 path 的文本渲染