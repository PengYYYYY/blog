# 部署工具

接触过很多部署网站的工具，总体来说分为静态网站托管和 `serverless`。

## 基本流程

部署工具基本包含以下三大块：触发器、CI、CD

### 触发器

触发器指的是触发部署动作，分为两大类：

- cli: 腾讯云 `TCD`, `vercel-cli` 这类工具实现本地命令行登陆账号，通过本地命令行出发构建部署。
- webhook: 通过 `GitHub`, `gitlab` 这类平台的 `webhook` 监听到指定的分支代码推送，触发相应的构建和部署。

### CI

持续集成过程，在 `ci` 过程中，可以实现命令行可以操作的一切东西，通常用来做代码测试，代码检查，产物包大小对比，(`npm`包、`docker`镜像、静态资源)的构建与推送等。

### CD

产物部署阶段需要进入生产环境中，分为以下三类：

- 静态资源：静态资源，无法部署 `node` 服务,通常用户静态资源的CDN加速场景，适用于博客类，无法部署API。
- serverless：云函数类，部署的是函数服务，使用场景受限，适合轻量的 `API` 服务
- 容器：微信云托管，托管容器，最为灵活，可以部署任何你想部署的东西，和企业级的部署方式类似。

## 静态网站部署

### vercel

[vercel](https://vercel.com/dashboard) 是一个前端明星团队。使用 `vercel` 部署非常简单：

- 上 `vercel` 官网，选择对应的模版
- 选择对应的代码托管平台并且授权，以 `github` 为例，会自动安装 `vercel app`。
- 选择对应的 `group` 或个人
- 创建代码库，开始部署。

按流程来一遍即可，非常简单

### githubPages

`githubPages` 是 `github` 用来部署项目主页的工具，结合 `workflow`, 利用 `gh-pages` 这个 `action`， 部署起来非常快。代码如下：

```shell
name: my-blog deploy to gh-pages
on:
  push:
    branches:
      - master
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout 🛎️
        uses: actions/checkout@v2.3.1

      - name: Install and Build 🔧
        run: |
          npx pnpm install --no-frozen-lockfile
          npm run build
      - name: Deploy 🚀
        uses: JamesIves/github-pages-deploy-action@4.1.3
        with:
          branch: gh-pages
          folder: docs/.vitepress/dist
```

:::warning
需要到 `github` 项目中 `settings` -> `pages` 开启对应的分支。也可以解析到自己的 `domain`。默认域名为 `https://pengyyyyy.github.io/project-name/`。由于使用了 `base-url` 为项目名，构建时需要做相应的配置。
:::

## serverless

`serverless` 近几年发展比较快，从 `aws lambda` 开始，各家云厂商也有了对标的产品，在这一块，腾讯云函数做的挺不错的。

### 腾讯云

腾讯云在serverless 方面有两个产品，云函数和云开发，功能对比如下：

| 功能 | 云函数Serverless | 云开发 |
|  ----  | ---- | ---- |
|  在线代码编辑  | ✅ | ❌ |
|  函数层管理  | ✅ | ❌ |
|  触发器配置  | ✅ | ✅ |
|  流量监控  | ✅ | ✅ |
|  日志监控  | ✅ | ✅ |
|  私有网络配置  | ✅ | ✅ |
|  函数服务  | ✅ | ✅ |
|  静态资源托管  | ❌ | ✅ |
|  访问服务  | ❌ | ✅ |
|  云托管  | ❌ | ✅ |
|  数据库  | ❌ | ✅ |
|  对象存储  | ❌ | ✅ |
|  用户管理  | ❌ | ✅ |

可以看到，云函数Serverless在函数服务细分模块的功能要更强大一点，而云开发则应用面更广。一开始我也比较纳闷为什么会有两个同类型的产品，一对比后发现还是有很大区别的。

两个服务使用起来都很简单，就不做过多实践了，去官网试一下就可以，部署一些轻量API还是很方便的。不需要自己买服务器，价格也很便宜，也有免费额度。

### vercel 云函数

`vercel` 的云函数，适合部署轻量 `API`, 增加一个 `vercel.json` 配置文件，且安装 `@vercel/node`。

```json
{
  "version": 2,
  "builds": [
    {
      "use": "node"
    },
    {
      "src": "index.js", //函数入口
      "use": "@vercel/node" //使用@vercel/node
    }
  ],
  "routes": [
    {
        "src": "/(.*)",
        "dest": "index.js" //函数录路由
    }
  ]
}
```

#### 部署与调试

使用 `vercel-cli` 进行部署即可。

```shell
# 正式环境
vercel

# 开发环境
vercel dev
```

具体可参考 [figma-api-live](https://github.com/pengYYYYY/figma-api-live/blob/master/server)

## 容器托管

容器技术近些年来发展迅猛，成为了主流的运维环境，大家熟知的 `docker`, `k8s`等等，基本上公司里面的部署也是通过这一套流程来做的。在面向个人用户云托管可以成为一个很好的选择。

### 微信云托管

2021年的时候，使用过腾讯云托管容器使用过，但是各方面都不成熟，除了demo其他的项目就没部署成功过。最近上腾讯云开发的时候发现整体迁移到了微信云托管上面了，于是尝试使用。让人非常惊喜，除了公网服务只能用于测试（很痛）以外
，其他的服务完美。期待后面能够开放公网服务。

[开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloudrun/src/basic/intro.html)

#### 容器服务

部署容器服务非常简单，细节可以看开发文档，在github也有代码示例，主要是以下步骤，

- 创建项目：项目名，`github` 仓库，触发器，服务监听端口
- 项目编写 `dockerfile`，根据项目不同，写好对应逻辑，暴露API对应端口
- 推送代码，触发 CI 流程
- CI 执行 `dockerfile` 构建镜像
- CD 应用镜像，启动容器，开启服务

#### 数据库服务

微信云托管还提供了 `mysql` 数据库服务，这是非常让人意外的，之前使用的微信云开发都是 `noSql` 的服务。并且这个 `mysql` 和 `TDSql` 的服务一模一样。我买的云数据库一个月也得将近 `50`。

#### 对象存储

对象存储就和腾讯云开发的基本一样了。就是简化版的 `cos`。

## 总结

当前处于云原生时代，对前端开发人员也越来越友好，各种部署工具层出不穷，我们只需要专注于自己的核心能力即可，能够被标准化的产业肯定会被标准化的，云函数也好，云托管也好，本质上就是让开发者能够更快更简单的去上线自己的创意，自己的项目。并且收费方面也非常人性化，适合个人和创业公司使用。
