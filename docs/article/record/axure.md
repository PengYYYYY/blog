# CoDesign Axure 项目总结

<script setup>
import FigmaContainer from '/components/FigmaContainer.vue'
</script>

## 项目介绍

Axure 是产品经理用来做原型设计的软件，CoDesign 已经上线过一版产品原型，但是存在以下问题：

- Axure Html 框架的 UI 与 CD 的 UI 不统一
- 无法接入 CD 通用的协作能力
- 没有对 Axure 文件做解析，无法深度定制
- 存在安全合规隐患
- 上传速度慢，无法进行差量上传
- 寄存在设计稿模块中，非单独模块

### Axure 产品原型对比

<FigmaContainer url="https://www.figma.com/file/E2utI9rEseFTc7tJ3Bbl9o/blog?type=whiteboard&node-id=4915-3033&t=oyHf5qQSFlbfnhzh-4"/>

支持的能力如下：

- 通用功能：
  - 历史版本，操作记录
  - 资料库，源文件
  - 原型分享，页面搜索
  - 页面评论，协作通知
- Axure 拓展功能：
  - 备注说明
  - 热区交互
  - 画布缩放模式

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

首先需要对 axure 的数据进行解析，并做混淆处理。

### 为什么要混淆

混淆处理的目的是为了能够把 `axure` 的渲染控制权集成在 axure sdk 中，这样可以保证站外不能引用改页面。Axure 的产物是一个 HTML 的 `zip` 包。

老版本的策略是，直接将 `zip` 包的内容传到 `cos` `上面，然后在CoDesign` 中的 `iframe` 嵌入，所以可以直接在站外访问这个页面。相当于一个静态资源在线化了。

### Axure 数据源

axure 产物目录结构如下

```txt
py-test
├── 7c0714f53210a7de0049487bdbe1b360.html // hash后的页面（需要修改内部内容）
├── 9a0dd486e186bcc473ac51b757c96834.html // hash后的页面（需要修改内部内容）
├── meta  // 生成的页面 meta.json, 前端页面加载对应资源链接（hash生成）
│   ├── 7c0714f53210a7de0049487bdbe1b360.json
│   └── 9a0dd486e186bcc473ac51b757c96834.json
├── data
│   ├── document.js
│   └── styles.css
├── files
│   ├── page_1
│   │   ├── data.js // 页面对应的资源文件（需要修改内部内容）
│   │   └── styles.css
│   └── page_1_1
│       ├── data.js // 页面对应的资源文件（需要修改内部内容）
│       └── styles.css
├── images
│   ├── page_1
│   │   └── u6.png
│   └── page_1_1
├── index.html
├── plugins // 自带的 plugins，无需更改内容
├── resources // 自带资源文件，无需更改内容
└── start_with_pages.html
```

## CoDesign 接入 Axure 模块

Axure 这个模块在 CoDesign 中如何接入，如何做这一块的设计。用流程架构图的形式来展示，代码细节不做演示：

### web 端通信流程

<FigmaContainer url="https://www.figma.com/file/E2utI9rEseFTc7tJ3Bbl9o/blog?type=whiteboard&node-id=1598-982&t=oyHf5qQSFlbfnhzh-4"/>

#### Axure 容器

<FigmaContainer url="https://www.figma.com/file/E2utI9rEseFTc7tJ3Bbl9o/blog?type=whiteboard&node-id=1598-1000&t=oyHf5qQSFlbfnhzh-4"/>

#### 评论组件容器

<FigmaContainer url="https://www.figma.com/file/E2utI9rEseFTc7tJ3Bbl9o/blog?type=whiteboard&node-id=1598-1006&t=oyHf5qQSFlbfnhzh-4"/>

<!-- ### 如何运行

在 CoDesign 怎么跑起来 -->

<!-- ## Axure SDK

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

Axure 内置功能在 web 端很多都需要重新实现

#### Axure 评论

...

#### 点击热区高亮

...

### 画板模式

...

### Axure 8，9，10 兼容性如何处理

... -->

## 基于 Electron 的客户端上传插件

<FigmaContainer url="https://www.figma.com/file/E2utI9rEseFTc7tJ3Bbl9o/blog?type=whiteboard&node-id=6050-2207&t=i3Z2mSJ07cOBb7GA-4"/>

- 一个基于 Electron 的客户端应用
- 

## 插件更新机制

<FigmaContainer url="https://www.figma.com/file/E2utI9rEseFTc7tJ3Bbl9o/blog?type=whiteboard&node-id=6050-2291&t=i3Z2mSJ07cOBb7GA-4"/>

- 整理了客户端插件更新流程，流程如上图，是一个基于版本号的更新机制
- electron 客户端的自动更新基于 electron-updater，具体的使用流程可以参考 [官方文档](https://www.electron.build/auto-update.html)
- 更新遇到的坑：Windows 签名后，exe 文件的内容会发生变化，而 yml 描述文件使用的是老版本的文件 hash，在做文件 hash 对比时会抛出异常。在签名后需要更新 yml 文件的 hash，这一部分在流水线已经处理。

## 上传模块

<FigmaContainer url="https://www.figma.com/file/E2utI9rEseFTc7tJ3Bbl9o/blog?type=whiteboard&node-id=5341-3119&t=i3Z2mSJ07cOBb7GA-4"/>

## 内容安全加固

### 安全问题

我们也遇到了一些安全问题：

- 无法控制 axure html 在 CD 之外的访问，存在泄露风险（前文的混淆 axure 产物解决了这个问题）
- 用户盗用 Cos Token，上传非法的 html，导致大量安全单（原理是，拿到 token 以后，直接上传个有巨大安全隐患的 HTML，且访问域名为 qq.com），解决这个问题的方法就是，cos 拒绝 HTML 文件的上传。

### 采取的措施

采取了下面的措施：

- 增加 csp 规则，资源加载限制（治标不治本）
- axure-sdk 控制内容加载，本站外无法访问
- HTML 转为 txt 加载，全站 cos 拒绝 html 上传

### 基于 Blob 的 Iframe 数据加载

<FigmaContainer url="https://www.figma.com/file/E2utI9rEseFTc7tJ3Bbl9o/blog?type=whiteboard&node-id=5341-3343&t=XYqh81JwF7tzbA93-4"/>

核心点：

- 文件上传：将 HTML 文件，通过 .txt 的格式上传至 cos，禁用 html 上传
- 内容加载：通过读取 txt 文件内容的形式，将内容转成 blob，iframe 通过加载 blob 可以读取到文件内容
- 无限嵌套的 iframe：axure 的 iframe 可以进行无限嵌套的，这边其实就是一个迭代，每一个子 iframe 都需要主动去发现子 iframe，并加载，代码如下：

```js
async loadChildIframe() {
  // 读取所有 iframe
  const allIframe = document.querySelectorAll('iframe');
  for (const iframe of allIframe) {
    iframe.onload = async () => {
      // 拿到 path url
      const pathUrl = iframe.getAttribute('src');
      // 拿到子框架对应的资源
      const blobUrl = await fetchPageBlobUrl(this.baseUrl + pathUrl, this.env);
      // 加载 blobUrl
      iframe.setAttribute('src', blobUrl + `#${pathUrl}-${iframe.id}`);
    };
  }
}
```

- 图片代理：由于图片的 url 继承自 iframe 的域名，但是通过 blob 的方式加载 html 是没有域名的，需要做一个图片代理，利用 image 的 onerror 属性

```js
async proxyImage() {
  const allImage = document.querySelectorAll('img');
  for (const image of allImage) {
    image.onerror = () => {
      const pathUrl = image.getAttribute('src');
      const fileUrl = this.baseUrl + pathUrl;
      image.setAttribute('src', fileUrl);
    };
  }
}
```

## 总结

以上是在开发 axure 产品原型功能时遇到的各种问题，以及对应的解决办法，整体来说，这个项目是一个可以称为魔法的项目，因为很多东西都不是标准化的，在遇到问题是快速找到解决办法是最大的收获。新版的 axure 产品原型上线后，得到了用户良好的反馈，成为了 CoDesign 第二大使用的模块。
