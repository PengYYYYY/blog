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

## Axure 数据源解析

### Axure 数据源

### 数据混淆与加密

## CoDeign 接入 Axure 模块

### Axure 容器

### Iframe 容器

### 评论容器

## Axure SDK

### 资源加载

### Axure 内置功能在 Web 端的实现

## 基于 Electron 的 CoDesign Axure 插件

### 数据源抓取

### 上传算法设计

### 插件的自动更新

一个流程图

### 打包与签名

可以把 electron 的经验单独提取出来

## 内容安全加固

### 为什么要做安全加固

### 基于 Blob 的 Iframe 数据加载
