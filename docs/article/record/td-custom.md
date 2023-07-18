# 基于 TDesign 搭建一个业务组件库

本文讲述了如何利用 TDesign 基础组件库的能力，基于 TDesign 搭建一个业务组件库 TDesign Custom。包含组件库官网搭建，业务组件开发，Design Token 定制，单元测试，打包构建。覆盖整个组件库搭建流程。
许多前端团队都有搭建业务组件库的需求，那么如何基于 TDesign 搭建一个业务组件库呢？在本文中，我将向大家介绍使用 TDesign 搭建一个业务组件库的过程。

许多前端团队都有搭建业务组件库的需求，那么如何基于 TDesign 搭建一个业务组件库呢？在本文中，我将向大家介绍使用 TDesign 搭建一个业务组件库 [TDesign Custom ](https://pengyyyyy.github.io/tdesign-custom/#/vue/getting-started) 的过程。

<script setup>
import FigmaContainer from '/components/FigmaContainer.vue'
</script>

<FigmaContainer url="https://www.figma.com/file/E2utI9rEseFTc7tJ3Bbl9o/blog?type=whiteboard&node-id=1337%3A484&t=0UGDHRMQ2OaGJaKW-1"/>

## 如何开始

### 基于源码修改

<FigmaContainer url="https://www.figma.com/file/E2utI9rEseFTc7tJ3Bbl9o/blog?type=whiteboard&node-id=1337%3A530&t=0UGDHRMQ2OaGJaKW-1"/>

这一路线就是直接 fork 源码，然后进行修改，这样做的优势是：可以做任何想做的定制。但是缺点也非常明显：TDesign 每周都在进行迭代，fork 源码很难同步最新的 TDesign 的 feature 和 bugfix，长此以往，业务组件库将变得难以维护。从上图可以看出，这样做就像开了一个 git 新分支一样，如果不做好这个分支的同步，肯定有一天会跟主版本的 TDesign 存在冲突。

### 基于 TDesign NPM 包

最理想的方式当然是最大程度的利用 TDesign 能力，构建一个标准的便于维护和迭代的业务组件库。目前 TDesign 的迭代和发布是稳定的，业务组件库只需要聚焦于业务组件的开发，其余能力完全复用 TDeisgn 即可。那一个业务组件库需要那些东西呢？

<FigmaContainer url="https://www.figma.com/file/E2utI9rEseFTc7tJ3Bbl9o/blog?type=whiteboard&node-id=1337-500&t=0UGDHRMQ2OaGJaKW-4"/>

从上图可以看出，一个业务组件库需要以下内容：
- 基础组件，依赖 TDesign 的 NPM 包，自主选择 TDesign 版本
- 组件库官网：所有组件的预览能力（包括 TDesign 本身提供的组件）
- 业务组件开发：业务组件的编写，API文档等
- 样式定制：跟随业务特性等样式定制
- 单元测试：组件的单元测试，质量保证
- 构建与发布：发布和构建业务组件库 NPM 包

<FigmaContainer url="https://www.figma.com/file/E2utI9rEseFTc7tJ3Bbl9o/blog?type=whiteboard&node-id=1337%3A549&t=0UGDHRMQ2OaGJaKW-1"/>

上文基于源码方案的潜在冲突问题也会引刃而解，对 TDesign 版本的选择控制权在业务组件库。

## 组件库官网

业务组件库的官网包含以下几点：

- 可以基于 TDesign 风格进行一定的个性化定制
- 对业务组件示例进行预览
- 对 TDesign 本身提供的组件进行预览

### 站点构建

组件库的官网可以通过很多方式构建，比如：storybook，vitepress, dumi。TDesign 也有自己的组件库文档工具。tdesign-site-components 是 TDesign 组件库官网的底座，基于 web-component，可以通过其搭建出 TDesign 风格的官网。

文件目录

```text
site
 - docs // 使用 MD 文档存放，也可以用来展示一些团队知识库，如开发规范。
 - plugin-tdoc // tdoc 的 vite 插件
 - src
   - components
     - stackblitz // stackblitz 在线代码示例
     - base-usage // live demo 实现
     - demo-page // 组件示例页面
     - page // 页面框架
   - router.js // 路由
 - site.config.mjs // 路由配置文件
```

可以按以上的文件目录从 TDesign 源码中 site 部分复用即可。

### 组件示例

上文说到组件官网示例代码分为两部：

- 业务组件示例代码
- TDesign 的示例代码（因为涉及到对 TDesign 的一些样式修改，需要进行预览）

业务组件的示例代码是新开发的，可以直接在 site.config.mjs 路由配置文件中引用即可。但是 TDesign 的示例代码该怎么处理呢?

<FigmaContainer url="https://www.figma.com/file/E2utI9rEseFTc7tJ3Bbl9o/blog?type=whiteboard&node-id=1337-488&t=0UGDHRMQ2OaGJaKW-4"/>

这里可以用到 git submodule，直接将 github 上 TDeisgn 的仓库作为子仓库。结构如上图所示。在 site.config.mjs 路由配置中链接到子仓库的源码。这样就可以直接依赖子仓库来做示例展示了。

此外还需要做几件事情：

- 在 plugin-tdoc 中需要将原来 common 仓库的引用地址修改到 TDeisgn 子仓库的 common 子仓库的链接。
- 拉新仓库时需要安装 TDeisgn 子仓库以及 TDeisgn 子仓库的 common 子仓库。

这边不对 common 子仓库进行单独的提取，为的是不破坏 TDeisgn 子仓库原有的结构，降低维护成本。所以形成了一个两层子仓库的结构。在 TDesign 版本更新时，直接将子仓库的版本切换到对应的 tag 就可以保持同步。

## 业务组件开发

业务组件的开发完全遵循 TDesign 的开发规范即可，目录如下：

```text
src
 - custom-component
   - __tests__ // 单元测试文件
   - _example
     - base.vue // 示例代码 
   - style // 组件样式目录
   - custom-component.md // 组件文档
   - custom-component.tsx
   - index.ts // 组件出口
   - type.ts // ts 文件
   - props.ts // 组件的 props
```

### 逻辑开发

在 TDesign 中，单个组件开发需要遵循以下规范：

- 全部使用 tsx 来进行组件开发
- 组件命名：推荐使用业务相关前缀对组件进行命名：如 tcustom-title。
- 抽离 props 和 types，并对组件进行合理拆分子组件
- 在 index.ts 中需要导出 props 和 types，以及组件，供统一入口进行组件安装

### 样式开发

```text
- style
 - _index.less
 - css.js
 - index.js
```

样式开发的目录如上，css.js 和 index.js 中为打包约定的文件，需要按此规范进行配置。在 _index.less 中进行 css 的编码即可。在 TDesign 中，由于样式文件为多个框架复用，less 文件统一放置在 tdesign-common 中。

### API 文档

```text
---
title: 业务组件
description: 业务组件
isComponent: true
usage: { title: '', description: '' }
spline: base
---

:: BASE_DOC ::

### 基础类型

{{ base }}

## API

### xxx Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
onClick | Function |  | TS 类型：`(e: MouseEvent) => void`<br/>点击时触发 | N
```

组件API文档的入口文件由 `custom-component.md` 提供。此 MD 文档由 tdoc 进行解析，由三部分组成：

- 文档的约定配置项。
- :: BASE_DOC :: 后面的组件示例文件
- 组件的 API 表格型文档。

### 组件库的安装

组件的入口提供了组件库安装方法和所有组件的模块，在安装 TDesign Custom 的同时，可以自动安装所有的 TDesign 组件。在 TDesign 源码中，src/components.ts 中集合了所有的组件，并在 src/index.ts 做安装函数的集成和各组件的导出。

```js
// src/components.ts
export * from 'tdesign-vue/esm' // 导出 tdesign 提供的所有组件
export * from './custom' // 导出业务组件
```

```js
// src/index.ts
import * as components from './components';
import PKG from '../package.json'

function install() {
  .... // 组件安装
}
export * from './components';

export default {
  install,
  version: PKG.version // 业务组件库版本
};
```

## Design Token 定制

### Css variable

<FigmaContainer url="https://www.figma.com/file/E2utI9rEseFTc7tJ3Bbl9o/blog?type=whiteboard&node-id=1337-482&t=0UGDHRMQ2OaGJaKW-4"/>

组件库全局的主题定制可以在官网的主题定制器中实时预览组件的主题，支持以下组件修改：

- 色彩：主题色，中性色，成功色，错误色，警告色
- 字体：字体大小，字体行高，字体颜色
- 圆角
- 阴影
- 尺寸

进行实时预览时，可以直接导出 css 文件在项目中使用。

### less 变量

css variable 在已经能够满足大部分场景中的定制工作。但是如果需要更精细化的定制。比如在业务中 Button 的主题色为黑色，但是其他组件的主题色还是蓝色。Css variable 显然无法满足。TDesign 也提供组件级别的 less 变量，可以使用 less 变量针对组件进行精细化定制。

以 Button 为例子，可以从 TDesign-common 中查看到每一个组件的 less 变体。[Button 组件所有 Design Token](https://github.com/Tencent/tdesign-common/blob/develop/style/web/components/button/_var.less) 。可以在项目中导出一个针对此类需求的 `modifyVars` 对象。

```js
export const modifyVars = {
  '@btn-color-primary': '#222324',
  '@btn-color-primary-hover': '#383838',
}
```

[TDesign 主题定制](https://tdesign.tencent.com/vue/custom-theme) 中也对这两种样式定制方式进行了详细的描述。

## 单元测试

TDesign 的单元测试使用 vitest 来进行构建。vitest 的配置非常简单，很多配置可以跟 vite 共用。所以可以将 vite 相关的共用配置抽离出来。

单元测试的配置主要分为两部分：组件单元测试、组件快照集成测试。

<FigmaContainer url="https://www.figma.com/file/E2utI9rEseFTc7tJ3Bbl9o/blog?type=whiteboard&node-id=1337-514&t=0UGDHRMQ2OaGJaKW-4"/>

### 单元测试目录

```
- src
  - x-component
    - __tests__
      - index.test.jsx // 组件单元测试
- test
  - snap
    - csr.test.js // 客户端渲染快照集成测试
    - ssr.test.js // 服务端渲染快照集成测试
  - test-setup.js
  - vitest.config.js
```

- 单元测试配置可以参考： [TDeisgn vitest 配置](https://github.com/PengYYYYY/tdesign-custom/blob/master/test/vitest.config.js)
- 单元测试规范可以参考：[TDesign 单元测试规范](https://github.com/Tencent/tdesign-vue-next/wiki/TDesign-%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95%E8%A7%84%E8%8C%83)
- 关于 TDesign 在 vitest 的实践可以参考：[TDesign 在 vitest 的实践](./vitest-refactor.md)

## 打包构建与发布

### 构建

TDesign Custom 底层基于 TDesign ，将 TDesign 作为 peerDependencies ，但是也需要构建一个 npm 包。打包构建脚本可以完全复用 TDesign 的打包流程。使用 rollup 进行产物的构建，具体的配置不做过多的赘述，可以直接参考源码。也有很多文档介绍组件库的构建相关。

- 关于各类构建产物的差别可以参考 ：[TDesign 产物构建介绍](https://github.com/Tencent/tdesign-common/blob/develop/develop-install.md)
- 具体的打包配置可以参考：[rollup 配置](https://github.com/PengYYYYY/tdesign-custom/blob/master/scripts/vite.base.config.js)

### 发布

组件库的发布就是将构建出的产物发布在 npm 上或者公司内部的源上。在 github 上的话可以利用 github actions 自动发布。TDesign 在 github actions 拥有非常 workflow。

- 自动发布的配置可以参考：[auto-release](https://github.com/Tencent/tdesign-vue-next/blob/develop/.github/workflows/auto-release.yml)。

## 总结

通过上述对组件库官网搭建，业务组件开发，Design Token 定制，单元测试，打包构建的阐述。我们可以充分利用 TDesign 基础组件库的能力高效的去搭建一个业务组件库。[TDesign Custom ](https://pengyyyyy.github.io/tdesign-custom/#/vue/getting-started)基于 vue2。其他技术栈的业务组件库搭建也可参考本文的流程。

