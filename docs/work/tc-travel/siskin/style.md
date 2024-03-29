# 样式包

在做组件库的时候，需要满足使用方的5个渠道 `wechat app elong qq touch`5个渠道主题样式,一套混合样式(用于使用class类名来加载不同样式的应用)，一套全尺寸样式(基于750px)的应用，一套vw样式（以375px基准）。简单说一些整个流程:

## 文件目录如下

```shell
├── app
│   └── variables.less
├── qq
│   └── variables.less
├── wechat
│   └── variables.less
├── default
│   ├── action-sheet.less
│   ├── anchor.less
│   ├── base.less
│   ├── button.less
│   ├── calendar.less
│   ├── card.less
│   ├── checkbox.less
│   ├── city-picker.less
│   ├── date-picker.less
│   ├── dialog.less
│   ├── fonts
│   │   ├── iconfont.ttf
│   │   └── iconfont.woff
│   ├── icon.less
│   ├── image-upload.less
│   ├── index.less
│   ├── input-number.less
│   ├── label.less
│   ├── name-to-spell.less
│   ├── notice.less
│   ├── picker.less
│   ├── popup.less
│   ├── radio.less
│   ├── skeleton.less
│   ├── slide.less
│   ├── slider.less
│   ├── swiper.less
│   ├── switch.less
│   ├── tab-bar.less
│   ├── table.less
│   ├── time-line.less
│   ├── tip.less
│   ├── toast.less
│   ├── transition.less
│   └── variables.less
├── gulpfile.js
├── less-extract.js

```

每个渠道的variables.less的中存放各渠道的环境变量，default存放基础样式信息。

最终得到的产物

![img](../../images/7tMW11.png)

首先分各渠道，`fullsize`和`vwsize`分别对应二倍屏和`vw`单位的样式包，`hybrid`包用于使用方使用`class`来区分渠道的包。

### 打包流程

- 生成extract目录（只包含变量名的less文件）用于生产混合包，优化代码体积
- 从default(样式为wechat)文件中复制各组件样式文件到各渠道目录下
- 复制相同样式的渠道
- 编译各渠道基础样式
- 编译各渠道extract目录到factory目录，生成带类名的样式文件
- 连接各渠道的基础样式与带类名的样式文件，生成混合包
- 生成全尺寸样式包,生成vw样式包,开发环境时执行空任务
- 复制字体文件到各个渠道
- 复制到lib生产目录
- 删除生成的文件，打包结束

### code

```js
// gulpfile
const { series, src, dest, task, parallel } = require('gulp')
const less = require('gulp-less')
const autoprefixer = require('gulp-autoprefixer')
const cssmin = require('gulp-cssmin')
var cssWrap = require('@wwh/gulp-css-wrap')
var merge = require('merge-stream')
const concat = require('gulp-concat')
const replace = require('gulp-replace')
const rimraf = require('rimraf')
const generateExtract = require('./less-extract')
const components = require('../build/components.json')
components.push('index')


// 基础渠道样式
let channelList = ['app', 'wechat', 'qq']

// 生成extract目录（只包含变量名的less文件）用于生产混合包，优化代码体积
async function createExtract(done) {
  channelList = ['app', 'wechat', 'qq']
  await generateExtract(components)
  done()
}

// 复制相同样式的渠道
function copySameChannel() {
  const taskList = []
  // 复制app到touch组件目录加入touch站
  taskList.push(src('./app/**').pipe(dest(`./touch/`)))
  // 复制qq到elong组件目录加入elong站
  taskList.push(src('./qq/**').pipe(dest(`./elong/`)))
  channelList.push('touch', 'elong')
  return merge(...taskList)
}

```

```js
// 编译各渠道基础样式
function compileBase() {
  const taskList = []
  for (const channel of channelList) {
    const channelCompile = src(`./${channel}/*.less`).pipe(less())
      .pipe(autoprefixer({
        overrideBrowserslist: ['ie > 9', 'last 2 versions'],
        cascade: false
      }))
      .pipe(cssmin())
      .pipe(dest(`./${channel}/lib`))
    taskList.push(channelCompile)
  }
  return merge(...taskList)
}
// 合成全尺寸包
function copyFullSize() {
  const taskList = []
  for (const channel of channelList) {
    let copyPath = `./${channel}/lib/*.css`
    if (channel == 'hybrid') {
      copyPath = `./hybrid/*.css`
    }
    const channelCompile = src(copyPath)
      .pipe(replace(/([0-9]+(\.?[0-9]+)?)px/g, (match, p1) => {
        return Number(p1) * 2 + 'px'
      }))
      .pipe(dest(`./fullsize/${channel}`))
    taskList.push(channelCompile)
  }
  return merge(...taskList)
}

// 合成vw单位包
function copyVWSize() {
  const taskList = []
  for (const channel of channelList) {
    let copyPath = `./${channel}/lib/*.css`
    if (channel == 'hybrid') {
      copyPath = `./hybrid/*.css`
    }
    const channelCompile = src(copyPath)
      .pipe(replace(/([0-9]+(\.?[0-9]+)?)px/g, (match, p1) => {
          return Number(p1) / 3.75 + 'vw'
      }))
      .pipe(dest(`./vwsize/${channel}`))
    taskList.push(channelCompile)
  }
  return merge(...taskList)
}

// 复制字体文件
function copyFont() {
  const taskList = []
  for (const channel of channelList) {
    const channelCopy = src('./default/fonts/**')
      .pipe(dest(`./fullsize/${channel}/fonts`))
      .pipe(dest(`./vwsize/${channel}/fonts`))
      .pipe(dest(channel === 'hybrid' ? `./${channel}/fonts` : `./${channel}/lib/fonts`))
    taskList.push(channelCopy)
  }
  return merge(...taskList)
}
```

```js
// 复制到生产目录
function copyToLib() {
  // 加入vwsize,fullsize样式包
  channelList.push('vwsize', 'fullsize')
  const taskList = []
  for (const channel of channelList) {
    const channelCopy = src(
      ['hybrid', 'vwsize', 'fullsize'].indexOf(channel) > -1 ? `./${channel}/**` : `./${channel}/lib/**`)
      .pipe(dest(`../lib/${channel}`))
    taskList.push(channelCopy)
  }
  return merge(...taskList)
}

const trash = done => {
  // 加入需要删除的一些文件渠道
  channelList.push('factory')
  for (const channel of channelList) {
    rimraf(['app', 'wechat', 'qq'].indexOf(channel) == -1 ? `./${channel}` : `./${channel}/lib/**`, {}, () => {})
  }
  components.push('loading', 'icon', 'base')
  for (const channel of ['app', 'wechat', 'qq']) {
    for (const component of components) {
      rimraf(`./${channel}/${component}.less`, {}, () => {})
    }
    rimraf(`./${channel}/fonts`, {}, () => {})
    rimraf(`./${channel}/extract`, {}, () => {})
  }
  done()
}
const empty = done => done()
const generator = type => {
  return series(
    createExtract, // 生成extract目录
    copyLess, // 生成less目录
    type == 'build' ? copySameChannel : empty, // 复制相同样式的渠道
    compileBase, // 编译各渠道基础样式
    compileHybrid, // 编译各渠道加类名样式
    connectHybrid, // 生成混合包
    type == 'build' ? parallel(copyFullSize, copyVWSize) : empty, // 生成全尺寸样式包
    copyFont, // copy字体文件
    copyToLib, // 复制到lib
    trash // 删除生成的文件
  )
}

task('build', done => {
    generator('build')()
})
```

### 混合样式

通过类名区分多站点样式，使用混合样式（体积较大）

  ```html
  <!-- 在根节点加类名，channel为wechat、app、elong、qq、touch其中之一，会获取该渠道类名下的样式 -->
  <!-- 不加类名区分则默认为wechat样式 -->
  <div id="app" :class="channel"></div>
  ```

 ```js
  //全量引入混合样式
  import 'tc-flight-siskin/lib/hybrid/index.css'

  //单一组件引入混合样式示例（以button为例）
  import 'tc-flight-siskin/lib/hybrid/button.css'

 ```

### 分渠道样式

通过引入不同样式单css包加载样式，

  ``` javascript
  // 构建时可通过环境变量区别渠道，通过别名引入
  // npm scripts，构建脚本加环境变量
  "scripts": {
    "build:app": "channel=app"
  }

  // webpack config设置别名
  alias: {
    "tc-flight-siskin-theme": "tc-flight-siskin/lib/" + process.env.channel,
    // 全尺寸样式路径
    "tc-flight-siskin-theme": "tc-flight-siskin/lib/fullsize" + process.env.channel,
  },

  // 全量引用样式
  import 'tc-flight-siskin-theme/index.css'
  // 单个组件引用样式
  import 'tc-flight-siskin-theme/button.css'
  ```

  ```js
  //app样式
  import 'tc-flight-siskin/lib/app/index.css'
  //touch站样式
  import 'tc-flight-siskin/lib/touch/index.css'
  //微信样式
  import 'tc-flight-siskin/lib/wechat/index.css'
  //艺龙样式
  import 'tc-flight-siskin/lib/elong/index.css'
  //qq样式
  import 'tc-flight-siskin/lib/qq/index.css'
  ```

### 全尺寸样式

基于`750px`，全量引用样式与混合引用规则同上

  ```js
  //全尺寸混合样式
  import 'tc-flight-siskin/lib/fullsize/hybrid/index.css'
  //全尺寸app样式
  import 'tc-flight-siskin/lib/fullsize/app/index.css'
  //全尺寸touch站样式
  import 'tc-flight-siskin/lib/fullsize/touch/index.css'
  //全尺寸微信样式
  import 'tc-flight-siskin/lib/fullsize/wechat/index.css'
  //全尺寸艺龙样式
  import 'tc-flight-siskin/lib/fullsize/elong/index.css'
  //全尺寸qq样式
  import 'tc-flight-siskin/lib/fullsize/qq/index.css'

  // 单个组件引用样式(app渠道的button示例)
  import 'tc-flight-siskin/lib/fullsize/app/button.css'
  ```

### VW样式

基于`375px`，全量引用样式与混合引用规则同上

```js
//VW包混合样式
import 'tc-flight-siskin/lib/vwsize/hybrid/index.css'
//VW包app样式
import 'tc-flight-siskin/lib/vwsize/app/index.css'
//VW包touch站样式
import 'tc-flight-siskin/lib/vwsize/touch/index.css'
//VW包微信样式
import 'tc-flight-siskin/lib/vwsize/wechat/index.css'
//VW包艺龙样式
import 'tc-flight-siskin/lib/vwsize/elong/index.css'
//VW包qq样式
import 'tc-flight-siskin/lib/vwsize/qq/index.css'

// 单个组件引用样式(app渠道的button示例)
import 'tc-flight-siskin/lib/vwsize/app/button.css'
```

## gulp插件

pipe 意味管道，很好理解，文件流通过 pipe 管道，那么就可以在这个过程中对文件流进行操作，定制自己的需求。所有的处理都是在 pipe 中进行的。在组件库样式包的处理中，我们也实现了一个`gulp`插件,用来给混合包加上对应渠道的`class`类名.

### 第一步：插件定义

```js
const PluginError = require('plugin-error'); // 错误处理
const through = require('through2'); // 流处理包，整个gulp流的处理
const cssWrap = require('./cssWrap'); // 业务处理工程

const PLUGIN_NAME = 'gulp-css-wrap';

module.exports = (options = {}) => {
  function transform(file, encoding, callback) {
    if (file.isNull()) return callback(null, file);

    if (file.isStream()) {
      return callback(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
    }
    // 执行业务
    file.contents = Buffer.from(cssWrap(file.contents.toString(), options, file.path));

    callback(null, file);
  }

  return through.obj(transform);
};

```

### 第二步

```js
const path = require('path');
const fs = require('fs-extra');
const deepmerge = require('deepmerge');
const cssParse = require('css-parse');
const cssStringify = require('css-stringify');
const chalk = require('chalk');
const log = require('fancy-log');

const processRules = (list, options) => list.map((r) => {
  if (r.selectors) {
    r.selectors.forEach((s, index) => {
      if (options.skip && options.skip.test(s)) return;
      let selector = options.selector
      // 关键代码，将类名进去前缀拼接
      if (typeof selector === 'string') {
        selector = options.selector ? `${options.selector} ${s}` : s;
      } else {
        let arr = []
        options.selector.forEach(e => {
          arr.push(`${e} ${s}`)
        })
        selector = arr.join(', ')
      }
      r.selectors[index] = selector;
    });
  }
  if (r.type === 'media') {
    r.rules = processRules(r.rules, options);
  }
  return r;
});
const cssWrap = (string, options = {}, filePath = ' ') => {
  // 初始化参数
  const _options = deepmerge({
    selector: '.css-wrap',
    skip: null,
    log: true,
  }, options);
  // 读取文件
  if (fs.existsSync(path.resolve(string))) {
    try {
      string = fs.readFileSync(string).toString();
    } catch (error) {
      if (log) {
        const fileName = path.basename(filePath);
        log(`${chalk.yellow('css-wrap: skipping empty file ->')} ${fileName}\n`);
      }
      return '';
    }
  }
  // 解析css
  const css = cssParse(string);
  // 处理css
  css.stylesheet.rules = processRules(css.stylesheet.rules, _options);
  // 序列化css然后返回
  return cssStringify(css);
};


module.exports = cssWrap;
```

- cssParse 解析css

![img](../../images/wph1Jq.png)
