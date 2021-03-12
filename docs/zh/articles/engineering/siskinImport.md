# 组件库之按需加载

## 组件库按需加载

目前按需加载有两种方式实现。

- 使用`babel-plugin-import`插件来自动按需引入
- 提供`es module`版本，开启`tree shaking`

### babel-plugin-import

`babel-plugin-import`是`ant-design`团队出的一个`babel`插件，主要用于模块的按需加载。其原理就是将直接引入的方式通过`babel`转化成按需引入的方式。如果`css`也需要按需加载，也会注入`css`引用代码。

例如

```js
import { Button } from 'antd';
```

转换成

```js
import Button from 'antd/es/button';
import 'antd/es/button/style';
```

### tree shaking

如果组件库提供了`es module`版本，并开启了`tree shaking`，那么不需要`babel-plugin-import`，也可以达到按需加载的目的，这个方法只针对于`js`，对于样式的按需加载仍需要手动引入。 当然`babel-plugin-import`和`tree shaking` 也可以并存使用。但大部分情况并存使用与单独使用体积差距不是很大。
例如：

```js
import { Button } from 'antd';
import 'antd/es/button/style';
```

`webpack`可以通过在`package.json`设置`sideEffects: false`,开启`tree shaking`。
