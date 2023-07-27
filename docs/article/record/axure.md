# CoDesign Axure 项目总结

<script setup>
import FigmaContainer from '/components/FigmaContainer.vue'
</script>

## 项目架构图

<FigmaContainer url="https://www.figma.com/file/E2utI9rEseFTc7tJ3Bbl9o/blog?type=whiteboard&node-id=1266%3A465&t=VhmgWJhomfVcVNWz-1"/>

- Axure Client: Axure 客户端，包含 8、9、10 版本
- Axure Preview: Axure 客户端中 HTML 预览功能
- CoDesign Axure Electron: CoDesign 客户端插件，上传用户 Axure preview 的数据源
- Axure Html Zip: Axure 客户端生产的 Axure 源数据 zip 包
- CoDesign Web Uploader: CoDesign 资源文件上传接入组件
- Axure Resource Upload Plugin: Axure 资源上传插件，适配客户端 Axure preview 与 Axure zip 包。
- CoDesign Axure SDK: 控制 Axure 内容在 CoDesign 中的数据加载与用户交互
- CoDesign Web Axure: CoDesign 中产品原型 Axure 模块

:::tip
To be continued
::::

## Axure 数据源解析

描述 Axure 的数据源是怎么样的，Axure Preview 的运行原理是怎么样的。

### Axure 数据源

### 数据混淆与加密

## CoDesign 接入 Axure 模块

Axure 这个模块在 CoDesign 中如何接入，如何做这一块的设计。

### 容器设计

描述项目的容器结构设计

#### Axure 容器

...

#### Iframe 容器

...

#### 评论容器

...

### 如何运行

在 CoDesign 怎么跑起来

## Axure SDK

描述 Axure SDK 的作用，已经开发过程中遇到的问题

### 资源加载

如何加载资源

#### SDK 加载

...

#### js、css 资源加载

...

### 内容区域计算

...

### Axure 内置功能在 Web 端的实现

Axure 内置功能在web端游很多

#### Axure 评论

...

#### 点击热区高亮

...

### 画板模式

...

### Axure 8，9，10 兼容性如何处理

...

## 基于 Electron 的客户端上传插件

如何基于 Electron 构建 CoDesign Axure 客户端上传插件

### Electron 运行原理

...

### 数据源抓取

...

#### Electron 中多进程的构建

...

#### 如何进程间通信，进行页面的内容的抓取

...

### 上传算法设计

...

#### 老的上传算法

...

#### 新的上传算法

...

### 插件自动更新流程

...

### 插件打包与签名

...

## 内容安全加固

描述遇到的安全问题，以及如何解决的

### 为什么要做安全加固

...

### 通过 CSP 内容安全策略

...

### 基于 Blob 的 Iframe 数据加载

...