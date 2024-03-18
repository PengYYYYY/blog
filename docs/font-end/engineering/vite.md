# Vite

## 基本原理

- `vite` 主要对应的场景是开发模式，原理是拦截浏览器发出的 `ES imports` 请求并做相应处理。
- `vite` 在开发模式下不需要打包，只需要编译浏览器发出的 `HTTP` 请求对应的文件即可，所以热更新速度很快。

需要项目中只使用原生 `ES imports`，使用了 `require` 将失效，从本质上来说，`vite` 可能更像是替代了 `webpack-dev-server` 的一个东西，生产环境中使用 `rollup` 进行打包。

## modules 模块

这边牵扯到了模块化，`cmd`、`amd`、`umd`、`commonjs`、`es module` 。

```js
<script type="module">
import { main } from './main.js'
</script>
```

当声明一个 `script` 标签类型为 `module` 时，浏览器将对其内部的 `import` 引用发起 `HTTP` 请求获取模块内容。比如上述，浏览器将发起一个对 `HOST/main.js` 的 `HTTP` 请求，获取到内容之后再执行。

`vite` 会劫持这个请求，相当于做一层代理，并在后端进行相应的处理，（将 `Vue` 文件拆分成 `template、style、script` 三个部分），然后再返回给浏览器。

由于浏览器会对用到的模块发起 `HTTP` 请求，所以 `Vite` 没必要对项目里所有的文件先打包后返回，而是只编译浏览器发起 `HTTP` 请求的模块即可。相当于按需更新。

## 拦截 HTTP 请求

```js
import { createApp } from 'vue'
```

替换成

```js
import { createApp } from '/@modules/vue
```

`Vite` 在拦截的请求里，对直接引用 `node_modules` 的模块都做了路径的替换，换成了 `/@modules/` 并返回回去。而后浏览器收到后，会发起对 `/@modules/xxx` 的请求，然后被 `Vite` 再次拦截，并由 `Vite` 内部去访问真正的模块，并将得到的内容再次做同样的处理后，返回给浏览器。

对于`@modules/* 路径解析`,核心逻辑就是`node_modules`里找有没有对应的模块，有的话就返回，没有的话就报 404。

## vite 启动

`vite` 启动会利用 `esbuild` 将依赖包进行打包，导出 `es` 模块, 运行 `vite --force` 时会重新编译依赖，启动过程中需要一点时间，但是不会很长，在后续的热更新过程中非常快。

`[vite] ✨ new dependencies optimized: prismjs, prismjs/components/prism-bash.js`

## vite 热更新

vite通过 `WebSocket` 来实现的热更新通信。

### 客户端

Vite 的 WS 客户端目前监听这几种消息：

- connected: `WebSocket` 连接成功
- vue-reload: `Vue` 组件重新加载（当你修改了 `script` 里的内容时）
- vue-rerender: `Vue` 组件重新渲染（当你修改了 `template` 里的内容时）
- style-update: 样式更新
- style-remove: 样式移除
- js-update: js 文件更新
- full-reload: `fallback` 机制，网页重刷新

其中针对 Vue 组件本身的一些更新，都可以直接调用 HMRRuntime 提供的方法，非常方便。其余的更新逻辑，基本上都是利用了 timestamp 刷新缓存重新执行的方法来达到更新的目的。

### 服务端

核心是监听项目文件的变更，然后根据不同文件类型（目前只有 `vue` 和 `js`）来做不同的处理：

对于 `vue` 文件的热更新而言，主要是重新编译 Vue 文件，检测 `template` `、script` `、style` 的改动，如果有改动就通过 `WS` 服务端发起对应的热更新请求。

对于热更新 `js` 文件而言，会递归地查找引用这个文件的 `importer`。比如是某个 `Vue` 文件所引用了这个 `js`，就会被查找出来。假如最终发现找不到引用者，则会返回 `hasDeadEnd: true`。
